# Plano de vídeo

Todos os cinco originais foram inspecionados com FFmpeg e frames no começo, meio e fim. Metadata completa, codecs, bitrate, áudio e SHA-256 em `docs/audit/media-metadata.json`; contact sheets em `docs/audit`. FFmpeg local de `imageio-ffmpeg` usado só na preparação, não no bundle. Não modificar `/img`.

## Curadoria por arquivo

| Original | Duração / formato | Conteúdo e qualidade | Decisão / trecho | Reprodução | Otimização |
|---|---|---|---|---|---|
| WhatsApp Video 2026-10-02 at 09.04.25 (1).mp4 | 6.29 s; H.264 Baseline/AAC; 1024×576 codificado, rotação -90°, apresentação vertical 576×1024; 30fps | Pessoa gesticula e câmera desloca-se para slides; handheld e luz fluorescente. IDENTIDADE A CONFIRMAR | Reserva; movimento de câmera e final dominado por projeção | Não servido | Se usado, corrigir orientação por autorotate e selecionar 0–2 s; não recortar horizontal |
| WhatsApp Video 2026-10-02 at 09.04.25.mp4 | 14.63 s; H.264 Baseline/AAC; 464×832; 30fps | Pessoa apresenta diante de slides de oratória e redação; conteúdo predominantemente estável. IDENTIDADE A CONFIRMAR | Reserva de capítulo de aula; possível 3–10 s | Não servido inicialmente | Resolução baixa, manter vertical e tratar slides/áudio com aprovação |
| WhatsApp Video 2026-10-02 at 09.04.26.mp4 | 5.78 s; H.264 Baseline/AAC; 848×480 codificado, -90°, exibição 480×848; 30fps | Câmera desloca-se para palco vazio; sujeito incompleto no início. IDENTIDADE A CONFIRMAR | Não usar na primeira versão | Não servido | Não é boa âncora narrativa |
| WhatsApp Video 2026-10-02 at 09.04.28.mp4 | 10.20 s; H.264 High/AAC; 478×850; ~30fps | Pessoa em pé interage entre cadeiras e participantes; mão/câmera oscilam. IDENTIDADE A CONFIRMAR | Selecionado em Oratória em movimento, 0.3–9.3 s; interação mais legível | Desktop silencioso, loop opcional só visível; pausa/play; mobile play explícito | Derivado MP4 H.264 e WebM VP9, 478×850, 24fps, sem áudio, poster 1s, faststart; preservar proporção |
| WhatsApp Video 2026-10-02 at 09.04.29.mp4 | 73.09 s; H.264 High/AAC; 478×850; ~30fps; 12.47 MB | Apresentação e público em ambiente semelhante; tomada longa. IDENTIDADE A CONFIRMAR | Reserva; duração maior não justifica hero nem download integral | Não servido | Selecionar trecho só após aprovar mensagem e eventual transcrição |

## Decisão do hero

Usar fotografia horizontal real com pessoa falando entre participantes. Todo vídeo disponível é vertical. Um hero desktop 16:9 baseado nesses arquivos cortaria rosto, mãos ou público, ou exigiria ampliação destrutiva. A alternativa fotográfica é expressamente permitida no briefing.

## Derivados

`public/media/practice.mp4`, `practice.webm`, `practice-poster.webp`. Os derivados não têm áudio: são evidência visual de prática, não um depoimento ou explicação cujo conteúdo precise ser interpretado. Descrever o conteúdo num texto adjacente. Se futuramente houver fala informativa com áudio, solicitar transcrição e legendas WebVTT antes de publicar.

Vídeo nativo `playsInline`, muted, controles e poster. `preload=none` em todos os modos; sources são anexadas quando o desktop elegível aproxima-se da viewport, ou após play explícito. Reproduzir somente visível, pausar fora da tela ou aba inativa. Mobile, Save-Data e reduced motion não recebem autoplay nem download antecipado.

O wrapper pode crescer até 8% com scroll desktop; o próprio vídeo mantém 478:850. Limitar largura para preservar a qualidade. Sem currentTime controlado pelo scroll: source H.264 comprimida e vertical não justifica custo de seeking. WebM é opção de codec mais eficiente, MP4 fallback de compatibilidade.

Direitos de imagem, identidade, eventos, local e cronologia pendentes em TODO-CONTENT.md.
