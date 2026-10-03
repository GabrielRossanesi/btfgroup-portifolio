# QA — BTF Group V3

02/10/2026. **PASS**.47grupos principais+11complementares=58; oito cenários, zero errosJavaScript/HTTP principais e zero violações axe. Lint/typecheck/build PASS.21originais intactos porSHA-256. V3 local, semcommit/push/deploy.

Relatório completo: [VISUAL-QA-V3.md](VISUAL-QA-V3.md). Curadoria: [ASSET-USAGE-V3.md](ASSET-USAGE-V3.md). Imagens por instância: [MEDIA-AUDIT-V3.md](MEDIA-AUDIT-V3.md). Entrega18itens: [DELIVERY-V3.md](DELIVERY-V3.md).

Viewports1920×1080,1440×900,1366×768,768×1024,390×844,360×800 emDPR1;1920×1080/390×844 emDPR2. Cinco pins desktop elegível, zero mobile/reduced; nenhuma imagem com raster insuficiente, nenhum overflow/copy cortada.58grupos cobrem dez capítulos, estados editoriais, seis capítulos lento/rápido/reverso/resize/reload, âncoras/back-forward/fullscreen/teclado, loops reais dos dois players, pausa persistente, um playback, Save-Data/reduced/noJS e originais.

Execução reproduzível: npm.cmd run qa e npm.cmd run qa:story, com npm.cmd run start aberto. Edge Chromium isolado, sem perfil do usuário. Evidências locais docs/qa/v3/results.json e story-results.json e capturas. Auditoria daV2 publicada embefore-*.png/baseline-images.json; relatório anterior preservado emdocs/history/v2/QA-REPORT.md.

CLS inicial0–0,000731, LCP local156–628ms; não são métricas de produção ou garantia de fps. Axe auxilia revisão, não certifica conformidade. Aba inativa eSave-Data simulados; Safari/Firefox e dispositivos/projetores físicos não testados. Copy/contextos provisórios e confirmações institucionais emTODO-CONTENT.md.
