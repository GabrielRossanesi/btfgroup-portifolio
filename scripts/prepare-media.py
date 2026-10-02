"""Generate curated derivatives without writing to img. Requires Pillow and imageio-ffmpeg."""
from pathlib import Path
from PIL import Image, ImageOps
import sys, subprocess, shutil, json

sys.path.insert(0, str(Path('.tools/python').resolve()))
import imageio_ffmpeg

out = Path('public/media')
out.mkdir(parents=True, exist_ok=True)
selection = {
    'hero': 'WhatsApp Image 2026-10-02 at 09.04.27 (3).jpeg',
    'action': 'WhatsApp Image 2026-10-02 at 09.04.27.jpeg',
    'action-detail': 'WhatsApp Image 2026-10-02 at 09.04.27 (2).jpeg',
    'experience': 'WhatsApp Image 2026-10-02 at 09.04.26.jpeg',
    'origin': 'WhatsApp Image 2026-10-02 at 09.04.27 (4).jpeg',
    'claudia': 'Claudia-Trajano-1.webp',
    'francisco': 'Francisco-1024x759.webp',
    'luis': 'Flora.webp',
}
manifest={}
for name,source in selection.items():
    im=ImageOps.exif_transpose(Image.open(Path('img')/source)).convert('RGB')
    widths=sorted(set([min(w,im.width) for w in [480,800,1200,1600]]))
    for w in widths:
        copy=im.resize((w,round(im.height*w/im.width)),Image.Resampling.LANCZOS)
        copy.save(out/f'{name}-{w}.webp',quality=82,method=6)
    manifest[name]={'source':source,'width':im.width,'height':im.height,'widths':widths}
shutil.copy2('img/BTF-Branco-768x146.webp',out/'btf-logo.webp')
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
source='img/WhatsApp Video 2026-10-02 at 09.04.28.mp4'
base=[ffmpeg,'-y','-ss','0.3','-i',source,'-t','9','-an','-vf','fps=24,setsar=1']
subprocess.run(base+['-c:v','libx264','-crf','27','-preset','slow','-pix_fmt','yuv420p','-movflags','+faststart',str(out/'practice.mp4')],check=True,capture_output=True)
subprocess.run(base+['-c:v','libvpx-vp9','-crf','36','-b:v','0','-deadline','good','-cpu-used','3',str(out/'practice.webm')],check=True,capture_output=True)
subprocess.run([ffmpeg,'-y','-ss','1','-i',source,'-frames:v','1',str(out/'practice-poster.png')],check=True,capture_output=True)
poster=Image.open(out/'practice-poster.png')
poster.save(out/'practice-poster.webp',quality=85,method=6)
(out/'practice-poster.png').unlink()
# OpenGraph derivative uses real imagery and logo without an invented slogan baked in.
hero=ImageOps.fit(Image.open('img/'+selection['hero']).convert('RGB'),(1200,630),centering=(.5,.3))
overlay=Image.new('RGBA',hero.size,(16,44,57,100)); hero=Image.alpha_composite(hero.convert('RGBA'),overlay)
logo=Image.open('img/BTF-Branco-768x146.webp').convert('RGBA'); logo.thumbnail((420,80))
hero.alpha_composite(logo,(64,490)); hero.convert('RGB').save(out/'opengraph.jpg',quality=88)
Path('docs/audit/derivatives.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('Curated images, logo, MP4, WebM, poster and OpenGraph generated. Originals preserved.')
