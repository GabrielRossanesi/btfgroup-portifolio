# Plano de vídeo V2

Histórico da auditoria e decisões originais em docs/history/v1/VIDEO-PLAN.md. Probes e hashes em docs/audit/media-metadata.json. Nenhum original modificado.

## Curadoria preservada

| Original | Formato / duração | Uso V2 |
|---|---|---|
| 09.04.25 (1).mp4 | 576×1024 após rotação, 6,29 s | Reserva; câmera se desloca para slides |
| 09.04.25.mp4 | 464×832, 14,63 s | Reserva; apresentação vertical de resolução modesta |
| 09.04.26.mp4 | 480×848 após rotação, 5,78 s | Não servido; sujeito incompleto e plataforma vazia |
| 09.04.28.mp4 | 478×850, 10,20 s | Selecionado: 0,3–9,3 s, interação entre público/cadeiras |
| 09.04.29.mp4 | 478×850, 73,09 s | Reserva; não baixar integralmente por duração |

Sem identificação de pessoas por aparência. Acervo não estabelece cargo, evento, data ou resultados.

## Nova composição

Abertura somente tipográfica. Filme no capítulo 04 Como desenvolvemos, ao lado de A voz ocupa a sala. Largura desktop limitada a min(350px,39svh) para caber em projeção e preservar resolução. Mobile até 300 px, vertical, em espaço próprio. Sem pin do filme, parallax, zoom 1.08 ou conversão para paisagem.

Derivados preservados: practice.webm (~426 KiB), practice.mp4 (~440 KiB), practice-poster.webp (~28 KiB), 9 s, 24 fps, 478×850, sem áudio, faststart no MP4. Arquivos cerca de 78–79% menores que o original selecionado. Texto adjacente descreve a ação.

## Carregamento e reprodução

preload=none; sources anexadas somente quando desktop com pointer:fine vê o vídeo, ou após play explícito. Nenhum autoplay/download antecipado em mobile, reduced motion ou Save-Data. IntersectionObserver e visibilitychange pausam fora da viewport/aba. Pausa do usuário persiste no retorno. playsInline/muted/loop e controles nativos após carregar; poster e botão permanecem se play recusado. Sem JS: link direto ao filme silencioso.

GSAP não controla o player nem currentTime. Se houver áudio informativo futuramente, validar transcrição/legendas antes de publicar. Direitos/contexto continuam em TODO-CONTENT.md.

## Atualização V3

Plano anterior preservado como histórico. Dois vídeos finais emcapítulos distintos: lecture/Como epractice/mural. Curadoria doscincooriginais,players/condições/pesos eQA emVIDEO-PLAN-V3.md eVISUAL-QA-V3.md.
