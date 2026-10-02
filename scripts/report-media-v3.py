"""Write the audited V3 curation and render tables; never modifies original assets."""
from pathlib import Path
import json
from PIL import Image

originals=json.loads(Path('docs/audit/media-metadata.json').read_text(encoding='utf-8'))
manifest=json.loads(Path('docs/audit/derivatives-v3.json').read_text(encoding='utf-8'))
used={item['source']:name for name,item in manifest.items()}
used['BTF-Branco-768x146.webp']='logo / header e footer, cópia binária'
used['WhatsApp Video 2026-10-02 at 09.04.25.mp4']='lecture / Como desenvolvemos, 2–9s'
used['WhatsApp Video 2026-10-02 at 09.04.28.mp4']='practice / BTF em ação, 0,3–9,3s'
decisions={
'WhatsApp Image 2026-10-02 at 09.04.26 (1).jpeg':('RESERVE','Retrato biblioteca640: identidade pendente, sem ação; pode ilustrar um retrato depois de validação, não substituir retrato nomeado.'),
'WhatsApp Image 2026-10-02 at 09.04.26 (2).jpeg':('RESERVE','Retrato posado à mesa/bandeiras1280: não acrescenta ação às cenas escolhidas; identidade pendente.'),
'WhatsApp Image 2026-10-02 at 09.04.26 (3).jpeg':('NOT USED','Quase duplicata de26(1): mesma pose/biblioteca e640px. Evitar repetição.'),
'WhatsApp Image 2026-10-02 at 09.04.28 (1).jpeg':('RESERVE','Retrato posado640 com bandeiras: duplicaria função dos institucionais sem identidade confirmada.'),
'WhatsApp Video 2026-10-02 at 09.04.25 (1).mp4':('RESERVE','Gesto útil só no início0,3–2,2s; câmera abandona pessoa e percorre slides. Alternativa curta ao lecture, sem duplicar função.'),
'WhatsApp Video 2026-10-02 at 09.04.26.mp4':('NOT USED','Pessoa cortada/sai do quadro; plataforma vazia domina, sem ação narrativa legível.'),
'WhatsApp Video 2026-10-02 at 09.04.29.mp4':('RESERVE','Reamostrado12/24/40/55s: mesma sala/interação/público do28.20–27s é alternativa; não há variedade adicional. Duração não é a razão isolada.')}
roles={
'hero':'Comunicação e troca na prática, não abertura; ≤800CSS, ratio original.',
'action':'Oratória/aprender: novo uso efetivo; ≤800CSS.',
'action-detail':'Presença e público no mural; ≤450CSS.',
'experience':'Turma no mural; ≤800CSS.',
'origin':'Contexto coletivo/origem; ≤800CSS, sem cortar pessoas.',
'claudia':'Especialistas: nome confirmado pelo briefing/arquivo; ≤512CSS, máximo WebP preservado.',
'francisco':'Especialistas: nome confirmado pelo briefing/arquivo; ≤512CSS, máximo WebP preservado.',
'luis':'Especialistas: nome confirmado pelo briefing/arquivo; ≤512CSS, máximo WebP preservado.',
'book':'Encontro/livro no mural; ≤360CSS, sem nomear livro ou pessoas.',
'microphone':'Fala institucional no mural;633px, ≤280CSS, sem identidade inferida.',
'legal':'Gesto ao microfone em Argumentação/mural; ≤600CSS, sem evento/case ou identidade inferidos.'}
lines=['# Uso do acervo V3','','02/10/2026. Nova curadoria dos21 originais, independente deP1/P2/P3. Plano editorial registrado antes dos componentes; tabela conferida pela implementação. Todos preservados emimg e comSHA256 da auditoria. Fotografias adicionais não recebem identidade por aparência.','','| Original literal | Fonte / peso | Status | Destino / motivo |','|---|---|---|---|']
for item in originals:
    name=item['file']
    if name in used:
        status='USED';key=used[name];reason=key+' — '+roles.get(key,'')
    else:status,reason=decisions[name]
    dimensions=f"{item.get('width','?')}×{item.get('height','?')}"
    if item['type']=='video':dimensions+=' codificados; rotação/duração emVIDEO-PLAN-V3.md'
    lines.append(f"| {name} | {dimensions}; {item['bytes']/1024:.1f}KiB | {status} | {reason} |")
lines+=['','12 imagens incluindo logo+2 vídeos=14/21, frente a8imagens+1vídeoV2. Quatro fotografias adicionais+novo vídeo, sem galeria de retratos redundantes. Reservas e não usados permanecem locais; não geram download pela interface.','','## Pipeline conferido','','Larguras320/640/960/1280/1600 até limite real. WebPquality94, maior WebP original copiado sem recodificar. JPEGderivado diretamente de cada original; sem cadeia de derivados, AIupscale ou sharpen. MP4CRF21/VP9CRF28 e posterWebP94. Abertura tipográfica sem fotografia/preload de mídia; outras imagens lazy, fontes locais.','', 'docs/audit/derivatives-v3.json registra original, formato, peso, dimensões, larguras e compressão por derivado. docs/qa/v3/results.json registra cada instância CSS/currentSrc/srcset/sizes/fit/crop/DPR e densidade. naturalWidth pode ser corrigido por densidade: dimensões físicas vêm doarquivo.']
Path('docs/ASSET-USAGE-V3.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
results_path=Path('docs/qa/v3/results.json')
if results_path.exists():
    qa=json.loads(results_path.read_text(encoding='utf-8'))
    render=['# Auditoria de mídia renderizada V3','','Dados da execução: '+qa['status']+'. Cada linha corresponde a uma imagem efetivamente renderizada, incluindo repetições editoriais. Dimensões/peso/formato originais e de todos os candidatos estão no manifest. Esta tabela usa a fonte física do currentSrc, não naturalWidth density-corrected.','','| Viewport / DPR | Asset / instância | CSS | Arquivo servido / pixels | Densidade coberta | Fit / posição | sizes |','|---|---|---|---|---|---|---|']
    for group in qa.get('images',[]):
        for i,row in enumerate(group['images']):
            d=row['derivative']
            render.append(f"| {group['label']} | {row['name']} / {i+1} | {row['cssWidth']:.1f}×{row['cssHeight']:.1f} | {d['file']} / {d['width']}×{d['height']} | {row['densityCoverage']:.3f}× | {row['objectFit']} / {row['objectPosition']} | {row['sizes']} |")
    render+=['','## Fontes e compressão','','| Asset | Original / dimensão / peso | Derivados / compressão |','|---|---|---|']
    for name,item in manifest.items():
        render.append(f"| {name} | {item['source']} / {item['width']}×{item['height']} / {item['sourceBytes']/1024:.1f}KiB / {item['sourceFormat']} | "+'; '.join(f"{d['file']}: {d['width']}×{d['height']}, {d['bytes']/1024:.1f}KiB, WebP {d['quality']}" for d in item['derivatives'])+' |')
    render+=['','Logo original768×146/7,3KiB copiado. Header/footer usam145CSSdesktop/117CSSmobile, suficiente emDPR2. Posters: lecture464×832 e practice478×850, WebP94; render máximo232/239CSS. OpenGraph1200×630JPEGquality88, sem papel de fotografia fullscreen na interface.']
    Path('docs/MEDIA-AUDIT-V3.md').write_text('\n'.join(render)+'\n',encoding='utf-8')
print('V3 curation and per-instance media audit updated.')
