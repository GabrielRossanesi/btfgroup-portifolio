# Uso do acervo V4

Inventário: 21 originais = 15 fotografias + 1 logo + 5 vídeos. Usados: 11 fotografias, logo e 4 vídeos (16/21). Hero usa 9 fotografias; as duas fotos de turmas ficam fora dela. Três fotografias em reserva; uma quase duplicata e um vídeo não utilizados. Todos continuam em `/img`, sem alteração de SHA-256.

O catálogo foi revisto pelo conteúdo. Pessoas de arquivos genéricos não recebem identidade por aparência. As frases e associações comerciais novas são PROVISÓRIAS.

| Original literal | Dimensão / peso | Status | Papel e destino |
|---|---|---|---|
| BTF-Branco-768x146.webp | 768×146; 7.3 KiB | USED | Logo: header, footer e OpenGraph. Cópia binária do original. |
| Claudia-Trajano-1.webp | 1080×800; 89.1 KiB | USED | Hero (245 CSS px) e capítulo individual de Claudia Trajano. |
| Flora.webp | 1080×800; 49.7 KiB | USED | Hero (240 CSS px) e capítulo individual de Luís Flora. |
| Francisco-1024x759.webp | 1024×759; 55.6 KiB | USED | Hero (235 CSS px) e capítulo individual de Francisco Barbosa. |
| WhatsApp Image 2026-10-02 at 09.04.26 (1).jpeg | 640×641; 47.5 KiB | RESERVE | Retrato na biblioteca, 640 px; identidade não confirmada e função já coberta pelos retratos nomeados. |
| WhatsApp Image 2026-10-02 at 09.04.26 (2).jpeg | 1280×1280; 146.9 KiB | RESERVE | Retrato posado à mesa e bandeiras; identidade pendente, menor variedade narrativa que os registros de ação. |
| WhatsApp Image 2026-10-02 at 09.04.26 (3).jpeg | 640×641; 47.6 KiB | NOT USED | Quase duplicata da pose na biblioteca em 26 (1), também 640 px. Evitar repetição. |
| WhatsApp Image 2026-10-02 at 09.04.26.jpeg | 1600×1200; 235.1 KiB | USED | BTF em ação, primeiro momento: turma reunida; até 800 CSS px. |
| WhatsApp Image 2026-10-02 at 09.04.27 (1).jpeg | 1200×1600; 148.2 KiB | USED | Hero (230 CSS px): encontro com livro. Sem atribuir nome ao livro, pessoas ou evento. |
| WhatsApp Image 2026-10-02 at 09.04.27 (2).jpeg | 1200×1600; 121.3 KiB | USED | Hero (290 CSS px); Presença. Visão entre cadeiras e apresentação. |
| WhatsApp Image 2026-10-02 at 09.04.27 (3).jpeg | 1600×1065; 150.8 KiB | USED | Hero (500 CSS px, até 520 com movimento); Comunicação; Trocar em Como. |
| WhatsApp Image 2026-10-02 at 09.04.27 (4).jpeg | 1600×1200; 102.3 KiB | USED | BTF em ação, segundo momento: espaço e turma; até 800 CSS px. Removida a repetição no capítulo Nossa origem. |
| WhatsApp Image 2026-10-02 at 09.04.27.jpeg | 1600×1200; 150.3 KiB | USED | Hero (480 CSS px); Oratória; Aprender em Como. |
| WhatsApp Image 2026-10-02 at 09.04.28 (1).jpeg | 640×640; 48.6 KiB | RESERVE | Retrato posado com bandeiras, 640 px; redundante e identidade não confirmada. |
| WhatsApp Image 2026-10-02 at 09.04.28 (2).jpeg | 1600×1600; 475.9 KiB | USED | Hero (380 CSS px) e Argumentação. Nenhum case, evento ou identidade inferidos. |
| WhatsApp Image 2026-10-02 at 09.04.28.jpeg | 633×708; 41.9 KiB | USED | Hero (190 CSS px): fala em ambiente institucional; fonte pequena respeitada. |
| WhatsApp Video 2026-10-02 at 09.04.25 (1).mp4 | 1024×576 codificados, rotação no plano de vídeo; 1294.7 KiB | USED | BTF em movimento / Expressar; 0.1–2.5 s; poster 1.2 s. Silencioso, condicional, um player por vez. |
| WhatsApp Video 2026-10-02 at 09.04.25.mp4 | 464×832 codificados, rotação no plano de vídeo; 3006.1 KiB | USED | Como desenvolvemos / Experimentar; 2–9 s; poster 5 s. Silencioso, condicional, um player por vez. |
| WhatsApp Video 2026-10-02 at 09.04.26.mp4 | 848×480 codificados, rotação no plano de vídeo; 974.1 KiB | NOT USED | 09.04.26: pessoa presente por menos de 1 s, sai do enquadramento; a maior parte mostra mesa/projeção vazia. Não tem trecho humano suficiente para a narrativa. |
| WhatsApp Video 2026-10-02 at 09.04.28.mp4 | 478×850 codificados, rotação no plano de vídeo; 2027.4 KiB | USED | BTF em movimento / Compartilhar; 0.3–8.3 s; poster 1 s. Silencioso, condicional, um player por vez. |
| WhatsApp Video 2026-10-02 at 09.04.29.mp4 | 478×850 codificados, rotação no plano de vídeo; 12178.4 KiB | USED | BTF em movimento / Conversar; 58–68 s; poster 64 s. Silencioso, condicional, um player por vez. |

## Qualidade e estratégia

Derivados de imagem em 320/640/960/1280/1600 px, limitados à largura original. JPEG → WebP qualidade 94 diretamente do original. WebP máximo dos retratos é cópia binária, sem recodificar. Sem AI upscale, sharpening ou cascata de derivados. A grade da Hero limita cada foto de acordo com os pixels disponíveis; `sizes` inclui a escala máxima 1.04. Fotografias contextuais ficam até 800 CSS px para fontes de 1600 px em DPR 2, ou menores conforme a fonte.

Uma foto da capa recebe fetchPriority high, a apresentação de sala é eager/auto; as outras sete são lazy. Não há preload dos nove arquivos em conjunto. Vídeos abaixo da dobra usam imagem de poster lazy; o poster nativo e as fontes só entram na ativação do player. Nunca se baixa o original longo de 73 segundos.

`docs/audit/derivatives-v4.json` registra os arquivos físicos. `docs/qa/v4/full/results.json` registra naturalWidth, currentSrc, srcset, sizes, CSS, fit, DPR e densidade por instância. naturalWidth pode ser ajustado pelo navegador à densidade; por isso a checagem física usa também a largura do arquivo no manifest.

O mosaico é uma camada decorativa, com alt vazio e aria-hidden; os registros narrativos posteriores têm descrições de conteúdo e os retratos nomeados têm alt correspondente. Hero não publica credenciais, clientes ou cases.
