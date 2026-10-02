# Uso do acervo V3

02/10/2026. Nova curadoria dos21 originais, independente deP1/P2/P3. Plano editorial registrado antes dos componentes; tabela conferida pela implementação. Todos preservados emimg e comSHA256 da auditoria. Fotografias adicionais não recebem identidade por aparência.

| Original literal | Fonte / peso | Status | Destino / motivo |
|---|---|---|---|
| BTF-Branco-768x146.webp | 768×146; 7.3KiB | USED | logo / header e footer, cópia binária —  |
| Claudia-Trajano-1.webp | 1080×800; 89.1KiB | USED | claudia — Especialistas: nome confirmado pelo briefing/arquivo; ≤512CSS, máximo WebP preservado. |
| Flora.webp | 1080×800; 49.7KiB | USED | luis — Especialistas: nome confirmado pelo briefing/arquivo; ≤512CSS, máximo WebP preservado. |
| Francisco-1024x759.webp | 1024×759; 55.6KiB | USED | francisco — Especialistas: nome confirmado pelo briefing/arquivo; ≤512CSS, máximo WebP preservado. |
| WhatsApp Image 2026-10-02 at 09.04.26 (1).jpeg | 640×641; 47.5KiB | RESERVE | Retrato biblioteca640: identidade pendente, sem ação; pode ilustrar um retrato depois de validação, não substituir retrato nomeado. |
| WhatsApp Image 2026-10-02 at 09.04.26 (2).jpeg | 1280×1280; 146.9KiB | RESERVE | Retrato posado à mesa/bandeiras1280: não acrescenta ação às cenas escolhidas; identidade pendente. |
| WhatsApp Image 2026-10-02 at 09.04.26 (3).jpeg | 640×641; 47.6KiB | NOT USED | Quase duplicata de26(1): mesma pose/biblioteca e640px. Evitar repetição. |
| WhatsApp Image 2026-10-02 at 09.04.26.jpeg | 1600×1200; 235.1KiB | USED | experience — Turma no mural; ≤800CSS. |
| WhatsApp Image 2026-10-02 at 09.04.27 (1).jpeg | 1200×1600; 148.2KiB | USED | book — Encontro/livro no mural; ≤360CSS, sem nomear livro ou pessoas. |
| WhatsApp Image 2026-10-02 at 09.04.27 (2).jpeg | 1200×1600; 121.3KiB | USED | action-detail — Presença e público no mural; ≤450CSS. |
| WhatsApp Image 2026-10-02 at 09.04.27 (3).jpeg | 1600×1065; 150.8KiB | USED | hero — Comunicação e troca na prática, não abertura; ≤800CSS, ratio original. |
| WhatsApp Image 2026-10-02 at 09.04.27 (4).jpeg | 1600×1200; 102.3KiB | USED | origin — Contexto coletivo/origem; ≤800CSS, sem cortar pessoas. |
| WhatsApp Image 2026-10-02 at 09.04.27.jpeg | 1600×1200; 150.3KiB | USED | action — Oratória/aprender: novo uso efetivo; ≤800CSS. |
| WhatsApp Image 2026-10-02 at 09.04.28 (1).jpeg | 640×640; 48.6KiB | RESERVE | Retrato posado640 com bandeiras: duplicaria função dos institucionais sem identidade confirmada. |
| WhatsApp Image 2026-10-02 at 09.04.28 (2).jpeg | 1600×1600; 475.9KiB | USED | legal — Gesto ao microfone em Argumentação/mural; ≤600CSS, sem evento/case ou identidade inferidos. |
| WhatsApp Image 2026-10-02 at 09.04.28.jpeg | 633×708; 41.9KiB | USED | microphone — Fala institucional no mural;633px, ≤280CSS, sem identidade inferida. |
| WhatsApp Video 2026-10-02 at 09.04.25 (1).mp4 | 1024×576 codificados; rotação/duração emVIDEO-PLAN-V3.md; 1294.7KiB | RESERVE | Gesto útil só no início0,3–2,2s; câmera abandona pessoa e percorre slides. Alternativa curta ao lecture, sem duplicar função. |
| WhatsApp Video 2026-10-02 at 09.04.25.mp4 | 464×832 codificados; rotação/duração emVIDEO-PLAN-V3.md; 3006.1KiB | USED | lecture / Como desenvolvemos, 2–9s —  |
| WhatsApp Video 2026-10-02 at 09.04.26.mp4 | 848×480 codificados; rotação/duração emVIDEO-PLAN-V3.md; 974.1KiB | NOT USED | Pessoa cortada/sai do quadro; plataforma vazia domina, sem ação narrativa legível. |
| WhatsApp Video 2026-10-02 at 09.04.28.mp4 | 478×850 codificados; rotação/duração emVIDEO-PLAN-V3.md; 2027.4KiB | USED | practice / BTF em ação, 0,3–9,3s —  |
| WhatsApp Video 2026-10-02 at 09.04.29.mp4 | 478×850 codificados; rotação/duração emVIDEO-PLAN-V3.md; 12178.4KiB | RESERVE | Reamostrado12/24/40/55s: mesma sala/interação/público do28.20–27s é alternativa; não há variedade adicional. Duração não é a razão isolada. |

12 imagens incluindo logo+2 vídeos=14/21, frente a8imagens+1vídeoV2. Quatro fotografias adicionais+novo vídeo, sem galeria de retratos redundantes. Reservas e não usados permanecem locais; não geram download pela interface.

## Pipeline conferido

Larguras320/640/960/1280/1600 até limite real. WebPquality94, maior WebP original copiado sem recodificar. JPEGderivado diretamente de cada original; sem cadeia de derivados, AIupscale ou sharpen. MP4CRF21/VP9CRF28 e posterWebP94. Abertura tipográfica sem fotografia/preload de mídia; outras imagens lazy, fontes locais.

docs/audit/derivatives-v3.json registra original, formato, peso, dimensões, larguras e compressão por derivado. docs/qa/v3/results.json registra cada instância CSS/currentSrc/srcset/sizes/fit/crop/DPR e densidade. naturalWidth pode ser corrigido por densidade: dimensões físicas vêm doarquivo.
