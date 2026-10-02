from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import sys, subprocess, re, json, hashlib
sys.path.insert(0, str(Path('.tools/python').resolve()))
import imageio_ffmpeg
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
Path('.tools/ffmpeg-path.txt').write_text(ffmpeg)
files = sorted(Path('img').iterdir())
records=[]
thumbs=[]
for i,p in enumerate(files):
    rec={'file':p.name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
    if p.suffix.lower() in ['.jpeg','.webp','.png','.jpg']:
        im=Image.open(p); rec.update(type='image',width=im.width,height=im.height,format=im.format)
        bg=Image.new('RGB',im.size,'#20272e'); bg.paste(im,mask=im.getchannel('A') if im.mode=='RGBA' else None)
        thumbs.append((p.name,bg))
    else:
        result=subprocess.run([ffmpeg,'-hide_banner','-i',str(p)],capture_output=True,text=True)
        rec.update(type='video',probe=result.stderr)
        duration=re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)',result.stderr)
        if duration: rec['duration']=sum(float(x)*m for x,m in zip(duration.groups(),[3600,60,1]))
        size=re.search(r'Video:.*? (\d{2,5})x(\d{2,5})',result.stderr)
        if size: rec['width'],rec['height']=map(int,size.groups())
        for n,sec in enumerate([1,rec.get('duration',5)/2,max(1,rec.get('duration',5)-2)]):
            out=Path('docs/audit')/f'video-{p.stem[-8:].replace(" ","_")}-{n}.jpg'
            subprocess.run([ffmpeg,'-y','-ss',str(sec),'-i',str(p),'-frames:v','1','-vf','scale=640:-1',str(out)],capture_output=True)
            if out.exists(): thumbs.append((p.name+f' | {sec:.1f}s',Image.open(out).convert('RGB')))
    records.append(rec)
Path('docs/audit/media-metadata.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
for part in range(0,len(thumbs),12):
    batch=thumbs[part:part+12]; sheet=Image.new('RGB',(1200, len(batch[:4]) and ((len(batch)+3)//4)*265),'#e4e7eb'); draw=ImageDraw.Draw(sheet)
    for j,(name,im) in enumerate(batch):
        x=(j%4)*300; y=(j//4)*265
        fit=ImageOps.contain(im,(290,225)); sheet.paste(fit,(x+(300-fit.width)//2,y+(225-fit.height)//2))
        short=name.replace('WhatsApp Image 2026-10-02 at ','IMG ').replace('WhatsApp Video 2026-10-02 at ','VID ')
        draw.text((x+5,y+230),short,fill='black')
    sheet.save(f'docs/audit/contact-{part//12+1}.jpg')
print(json.dumps([{k:v for k,v in r.items() if k not in ['sha256','probe']} for r in records],ensure_ascii=False,indent=2))
