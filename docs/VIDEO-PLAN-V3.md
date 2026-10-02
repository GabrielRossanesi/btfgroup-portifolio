# Vídeos V3

Revisados cinco probes e frames início/meio/fim. Vídeo longo reamostrado em12/24/40/55s (docs/audit/v3-long-review.jpg). Originais preservados; pessoas não identificadas pela aparência.

| Original09.04… | Trecho / poster | Status / papel / composição |
|---|---|---|
|25(1).mp4|0,3–2,2s;poster1s|RESERVE: gesto inicial útil, câmera abandona pessoa e vai aos slides.576×1024 após rotação,≤288CSS. Alternativa curta a aula, sem duplicar função |
|25.mp4|2–9s;poster5s|USED: lecture em Como; pessoa diante de projeção.464×832,≤232CSS,7s24fps,sem áudio/loop |
|26.mp4|0–1s fragmento humano;poster1s cortado|NOT USED: pessoa sai, mesa/plataforma vazia domina, sem ação útil.480×848 após rotação; não servir |
|28.mp4|0,3–9,3s;poster1s|USED: practice em BTF em ação; circulação entre público.478×850,≤239CSS,9s24fps,silencioso/loop |
|29.mp4|20–27s;poster24s|RESERVE após nova inspeção: mesma sala/posição/público do28; pouca variedade em12/24/40/55s. Alternativa estável, sem novo papel na sequência;478×850; nunca servir73s/11,9MiB |

H264CRF21/faststart,VP9CRF28; sem aumentar dimensão; posterWebPquality94. Loop não perfeitamente contínuo devido às tomadas handheld; controles para interromper. Fontes WebM/MP4 alternativas, browser baixa uma.

Desktop autoplay/sources somente viewport+cena visível+pointerfine+semreduced+semSaveData+abaativa. Coordenação limita um player. Pause fora/aba inativa; pausa humana persiste. Mobile/reduced/SaveData: poster e play explícito; sources ausentes antes da intenção. NoJS: linkMP4 e descrição. GSAP não controla player ou tempo.

QA previsto: poster/carga/bytes/dimensão/duração/play/loop/pause/retorno/viewport/aba inativa/SaveData/reduced/mobile/ratio. Fontes já comprimidas, sem resolução fullscreenretina; registro silencioso não ensina conteúdo falado.

## Resultado executado

PASS: ambos loops atravessados realmente,proporções/controles/carga condicionais epausa persistente verificados. Somenteumplayerativo. MP4/WebMlecture696338/675927B;practice1091814/884024B;posters36972/52778B. Aba inativa eSave-Data simulados explicitamente; detalhes emVISUAL-QA-V3.md.
