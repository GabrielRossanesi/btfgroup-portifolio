# Visual QA V3

02/10/2026. Resultado: **PASS**. Revisão publicada antes das alterações, nos dez capítulos em desktop/mobile; implementação conferida no build de produção local. Evidências geradas em docs/qa/v3 e docs/audit permanecem locais e ignoradas pelo Git. Histórico V2 em docs/history/v2.

## Diagnóstico comprovado e correções

| Problema observado | Causa medida | Correção e evidência |
|---|---|---|
| Fotografia horizontal suavizada em tela grande | Original1600 exibido em1920CSS; WebP82 recomprimido | Máximo800CSS, WebP94 direto do original; no1920DPR2 currentSrc hero-1600, cobertura1,00. Comparações em v3-before-quality.png e v3-after-quality.png (pixels1:1; retrato máximo idêntico porSHA-256); tabela completa MEDIA-AUDIT-V3.md |
| Retratos com perda de definição | Raster1080/1024, caixa~849×680 com cover e recompressão | Proporção original e máximo512CSS; maior WebP copiado byte a byte; noDPR2 Claudia1080, Francisco1024, Luís1080; cobertura≥1,00 |
| Mobile exigia mais pixels do que sizes indicava | Foto800 em cover390×565; raster necessário~1699px noDPR2 | Coluna útil342CSS em390; contain/ratio intrínseco, hero-960; cobertura1,40 |
| Fonte640 insuficiente no viewport1440 durante primeira rodada V3 | sizes43vw estimava619 enquanto quadro efetivo691CSS | sizes50vw para desktop intermediário; rodada final verifica120 instâncias sem insuficiência |
| Imagem lazy sem área reservada durante implementação | width:auto/height:auto em quadro sem dimensão efetiva | width100% com atributos físicos e ratio; todas imagens carregam/decodificam no percurso |
| Cena/legenda de vídeo curta podia exceder altura768 | Player vertical com altura de desktop grande | Limite por altura disponível; os três estados de Como cabem em1366×768, incluindo copy, legenda e controles |
| Rede final podia sair do quadro | Transform percentual do núcleo interpolado sem base explícita | xPercent/yPercent inicializados; seis palavras e núcleo dentro1920×1080 no clímax; conexões visíveis/morfadas |
| Refresh de leitura no meio de capítulo reposicionava | Fontes/pins e âncora do navegador alteravam geometria | Aguardar fontes, overflow-anchor:none, restauração de posição na navegação reload;18 testes de refresh passam |
| Controles no mural claro tinham contraste insuficiente | Cor destinada a superfície escura | Cor da superfície clara corrigida; axe final zero violações nos oito cenários |

Sem sharpen, upscale por IA ou cadeia de derivados. Não atribuir qualidade de fotografia original à otimização: handheld, obstruções e detalhe limitado de algumas fontes permanecem visíveis. Abertura publicada é tipográfica, preservada; o identificador interno hero pertence à foto de prática.

## Matriz executada

| ViewportCSS | DPR | Pins desktop | Overflow / copy cortada | Axe |
|---|---|---|---|---|
|1920×1080|1|5|Não / não|0|
|1440×900|1|5|Não / não|0|
|1366×768|1|5|Não / não|0|
|768×1024|1|0|Não / não|0|
|390×844|1|0|Não / não|0|
|360×800|1|0|Não / não|0|
|1920×1080|2|5|Não / não|0|
|390×844|2|0|Não / não|0|

Edge Chromium isolado, Playwright/axe, sem perfil do usuário. QA principal47 grupos e complementar11 grupos: **58**, zero erros JS/HTTP nas verificações principais e zero erros JS complementares. Scripts npm run qa e npm run qa:story. Lint, typecheck e build: PASS. Axe auxilia a revisão e não constitui certificação.

## Revisão de composição e imagem

Fotografias, rostos, mãos, microfones e pessoas conferidos nas capturas de cada cena e contra contact sheets dos originais. Enquadramentos completos, sem foto ampla esticada como background e sem texto sobre rosto. Os três especialistas mantêm fundo/proporção originais; o retrato maior é cópia binária. Mural revisado em quatro posições emDPR2; livro, fala institucional, público, aula, turma e vídeo têm escalas e posições distintas. Tipografia Pessoas não cobre o rosto das fotos vizinhas. Todas as cenas de O que/Como e os quatro contextos empresariais têm registro de composição.

O cálculo usa dimensões físicas do arquivo efetivamente pedido, não naturalWidth corrigido pelo navegador. contain usa a área realmente pintada; cover considera a ampliação interna. Cada instância registra CSS width/height, currentSrc, srcset, sizes, object-fit, object-position, DPR, original e derivado. Fonte disponível≥raster necessário em todos120 registros (tolerância de arredondamento1,5%). Não aumenta resolução nem promete detalhe ausente do acervo.

## Movimento, navegação e fallbacks

Seis capítulos: rede, competências, prática, especialistas, mural e empresa. Percursos lentos, saltos rápidos, reverso e parada; transformações variam ao longo do percurso. Reload sem hash no meio de cada capítulo preserva posição em1920/1440/1366. Resize feito dentro de cada um: desktop→1366×768→1920→390→1920; sem pins órfãos, cinco elegíveis/zero mobile, nenhuma cena mobile escondida. Também paisagem844×390,2560×1440,1280×1600. Seis rotas back/forward, dez âncoras, controles por teclado, Escape/foco do menu e Fullscreen API real passam.

Reduced motion inicial e preferência alterada ao vivo: conteúdo estático completo, zero pins/autoload. Mobile: leitura vertical, pequenos deslocamentos de quadro/progresso via IO, nenhuma narrativa dependente de pin. NoJS390: dez capítulos, onze artigos completos, menu nativo, dois links de vídeo. Animações não capturam roda/toque nem controlam tempo do player.

## Vídeos

lecture464×832/7s no Como; practice478×850/9s no mural. Source zero antes da intenção em mobile/reduced/Save-Data; desktop exige viewport e cena visíveis. Poster/carga/play/muted/ratio, pausa fora da viewport ou cena, pausa humana persistente e somente um player confirmados. QA complementar atravessa a fronteira real dos dois loops e confirma retorno ao início ainda tocando. MP4/WebM sem áudio e sem upscale; controles e legenda cabem no viewport curto.

Aba inativa: document.hidden e evento visibilitychange **simulados**, com pausa/retorno verificados. Save-Data também simulado por conexão. Não equivale a ensaio em aparelho físico. Cortes de loop mantêm a natureza handheld do original, sem alegar continuidade cinematográfica perfeita.

## Performance local e limites

Loopback, sem throttling, medidas iniciais PerformanceObserver/Resource Timing: CLS0 a0,000731; LCP156–628ms; JS~227KiB desktop/~183KiB mobile. GSAP/ScrollTrigger~44KiB adicionais somente desktop elegível. Fontes locais~65KiB. Posters~88KiB somados; fontes de vídeo condicionais. A leitura inicial pode antecipar a primeira foto por heurística lazy do navegador; não alegar zero downloads de mídia abaixo da dobra. Total55 arquivos public/media:7,73MiB, incluindo variantes alternativas que não são baixadas todas juntas.

Métricas locais não são Core Web Vitals de produção, benchmark de rede móvel ou garantia de fps. Não testados Safari/Firefox, aparelhos ou projetor físicos. Copy comercial/contextos seguem provisórios; confirmações editoriais em TODO-CONTENT.md. V3 não publicada.

Evidências: results.json, story-results.json, baseline-images.json, before-*.png, network-climax-dpr2.png, mural-0..3-dpr2.png, practice-short-0..2.png, lecture-loop-dpr2.png, practice-loop-dpr2.png, review-mobile.jpg, review-{competencies,practice,experts,company}.jpg. Capturas devem ser regeneradas ao modificar código funcional.
