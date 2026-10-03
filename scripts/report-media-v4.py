"""Write the V4 distribution report from the preserved source inventory."""
from pathlib import Path
import json

assets = json.loads(Path('docs/audit/media-metadata.json').read_text(encoding='utf-8'))
derivatives = json.loads(Path('docs/audit/derivatives.json').read_text(encoding='utf-8'))
clips = json.loads(Path('docs/audit/videos-v4.json').read_text(encoding='utf-8'))
roles = {
    'hero': 'Hero (500 CSS px, até 520 com movimento); Comunicação; Trocar em Como.',
    'action': 'Hero (480 CSS px); Oratória; Aprender em Como.',
    'action-detail': 'Hero (290 CSS px); Presença. Visão entre cadeiras e apresentação.',
    'experience': 'BTF em ação, primeiro momento: turma reunida; até 800 CSS px.',
    'origin': 'BTF em ação, segundo momento: espaço e turma; até 800 CSS px. Removida a repetição no capítulo Nossa origem.',
    'claudia': 'Hero (245 CSS px) e capítulo individual de Claudia Trajano.',
    'francisco': 'Hero (235 CSS px) e capítulo individual de Francisco Barbosa.',
    'luis': 'Hero (240 CSS px) e capítulo individual de Luís Flora.',
    'book': 'Hero (230 CSS px): encontro com livro. Sem atribuir nome ao livro, pessoas ou evento.',
    'microphone': 'Hero (190 CSS px): fala em ambiente institucional; fonte pequena respeitada.',
    'legal': 'Hero (380 CSS px) e Argumentação. Nenhum case, evento ou identidade inferidos.',
}
reserves = {
    'WhatsApp Image 2026-10-02 at 09.04.26 (1).jpeg': ('RESERVE', 'Retrato na biblioteca, 640 px; identidade não confirmada e função já coberta pelos retratos nomeados.'),
    'WhatsApp Image 2026-10-02 at 09.04.26 (2).jpeg': ('RESERVE', 'Retrato posado à mesa e bandeiras; identidade pendente, menor variedade narrativa que os registros de ação.'),
    'WhatsApp Image 2026-10-02 at 09.04.26 (3).jpeg': ('NOT USED', 'Quase duplicata da pose na biblioteca em 26 (1), também 640 px. Evitar repetição.'),
    'WhatsApp Image 2026-10-02 at 09.04.28 (1).jpeg': ('RESERVE', 'Retrato posado com bandeiras, 640 px; redundante e identidade não confirmada.'),
}
rows = []
for item in assets:
    filename = item['file']
    match = next(((key, value) for key, value in derivatives.items() if value['source'] == filename), None)
    if filename == 'BTF-Branco-768x146.webp':
        status, role = 'USED', 'Logo: header, footer e OpenGraph. Cópia binária do original.'
    elif match:
        status, role = 'USED', roles[match[0]]
    elif filename in reserves:
        status, role = reserves[filename]
    elif item['type'] == 'video':
        clip = next((clip for clip in clips if clip['source'] == filename), None)
        if clip:
            where = 'Como desenvolvemos / Experimentar' if clip['name'] == 'lecture' else 'BTF em movimento / '+{'gesture': 'Expressar', 'practice': 'Compartilhar', 'exchange': 'Conversar'}[clip['name']]
            status, role = 'USED', f"{where}; {clip['start']}–{clip['start']+clip['duration']} s; poster {clip['posterTime']} s. Silencioso, condicional, um player por vez."
        else:
            status, role = 'NOT USED', '09.04.26: pessoa presente por menos de 1 s, sai do enquadramento; a maior parte mostra mesa/projeção vazia. Não tem trecho humano suficiente para a narrativa.'
    else:
        raise RuntimeError('Unclassified original: '+filename)
    size = f"{item['width']}×{item['height']}"+(' codificados, rotação no plano de vídeo' if item['type'] == 'video' else '')
    rows.append(f"| {filename} | {size}; {item['bytes']/1024:.1f} KiB | {status} | {role} |")
text = '''# Uso do acervo V4

Inventário: 21 originais = 15 fotografias + 1 logo + 5 vídeos. Usados: 11 fotografias, logo e 4 vídeos (16/21). Hero usa 9 fotografias; as duas fotos de turmas ficam fora dela. Três fotografias em reserva; uma quase duplicata e um vídeo não utilizados. Todos continuam em `/img`, sem alteração de SHA-256.

O catálogo foi revisto pelo conteúdo. Pessoas de arquivos genéricos não recebem identidade por aparência. As frases e associações comerciais novas são PROVISÓRIAS.

| Original literal | Dimensão / peso | Status | Papel e destino |
|---|---|---|---|
'''+ '\n'.join(rows)+'''

## Qualidade e estratégia

Derivados de imagem em 320/640/960/1280/1600 px, limitados à largura original. JPEG → WebP qualidade 94 diretamente do original. WebP máximo dos retratos é cópia binária, sem recodificar. Sem AI upscale, sharpening ou cascata de derivados. A grade da Hero limita cada foto de acordo com os pixels disponíveis; `sizes` inclui a escala máxima 1.04. Fotografias contextuais ficam até 800 CSS px para fontes de 1600 px em DPR 2, ou menores conforme a fonte.

Uma foto da capa recebe fetchPriority high, a apresentação de sala é eager/auto; as outras sete são lazy. Não há preload dos nove arquivos em conjunto. Vídeos abaixo da dobra usam imagem de poster lazy; o poster nativo e as fontes só entram na ativação do player. Nunca se baixa o original longo de 73 segundos.

`docs/audit/derivatives-v4.json` registra os arquivos físicos. `docs/qa/v4/full/results.json` registra naturalWidth, currentSrc, srcset, sizes, CSS, fit, DPR e densidade por instância. naturalWidth pode ser ajustado pelo navegador à densidade; por isso a checagem física usa também a largura do arquivo no manifest.

O mosaico é uma camada decorativa, com alt vazio e aria-hidden; os registros narrativos posteriores têm descrições de conteúdo e os retratos nomeados têm alt correspondente. Hero não publica credenciais, clientes ou cases.
'''
Path('docs/ASSET-USAGE-V4.md').write_text(text, encoding='utf-8')
Path('docs/audit/derivatives-v4.json').write_text(json.dumps(derivatives, ensure_ascii=False, indent=2), encoding='utf-8')
print('All 21 originals classified for V4.')
