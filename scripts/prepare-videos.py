"""Curated silent clips and original-resolution posters; never modify img/."""
from pathlib import Path
from PIL import Image
import sys, subprocess, json

sys.path.insert(0, str(Path('.tools/python').resolve()))
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
output = Path('public/media')
output.mkdir(parents=True, exist_ok=True)
selection = [
    ('lecture', 'WhatsApp Video 2026-10-02 at 09.04.25.mp4', 2, 7, 5, 464, 832),
    ('gesture', 'WhatsApp Video 2026-10-02 at 09.04.25 (1).mp4', .1, 2.4, 1.2, 576, 1024),
    ('practice', 'WhatsApp Video 2026-10-02 at 09.04.28.mp4', .3, 8, 1, 478, 850),
    ('exchange', 'WhatsApp Video 2026-10-02 at 09.04.29.mp4', 58, 10, 64, 478, 850),
]
manifest = []
for name, filename, start, duration, poster_time, width, height in selection:
    source = str(Path('img') / filename)
    base = [ffmpeg, '-y', '-ss', str(start), '-i', source, '-t', str(duration), '-an', '-vf', 'fps=24,setsar=1']
    subprocess.run(base + ['-c:v', 'libx264', '-crf', '21', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(output / f'{name}.mp4')], check=True, capture_output=True)
    subprocess.run(base + ['-c:v', 'libvpx-vp9', '-crf', '28', '-b:v', '0', '-deadline', 'good', '-cpu-used', '3', str(output / f'{name}.webm')], check=True, capture_output=True)
    poster_path = output / f'{name}-poster.png'
    subprocess.run([ffmpeg, '-y', '-ss', str(poster_time), '-i', source, '-frames:v', '1', str(poster_path)], check=True, capture_output=True)
    Image.open(poster_path).save(output / f'{name}-poster.webp', quality=94, method=6)
    poster_path.unlink()
    manifest.append({'name': name, 'source': filename, 'start': start, 'duration': duration, 'posterTime': poster_time, 'width': width, 'height': height, 'audio': False, 'fps': 24, 'upscale': False, 'files': {ext: (output / f'{name}.{ext}').stat().st_size for ext in ['mp4', 'webm']}, 'posterBytes': (output / f'{name}-poster.webp').stat().st_size})
Path('docs/audit/videos-v4.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print('Four silent clips and posters prepared; originals untouched.')
