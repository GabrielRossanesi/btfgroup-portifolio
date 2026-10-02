# Correções pontuais — Hero, Desenvolvimento e Conversa

02/10/2026. Escopo restrito às duas correções solicitadas. Fotos, vídeos, conteúdo editorial, composição final da rede e os cinco capítulos protegidos pelo briefing não foram modificados. Sem commit, push, staging ou deploy. Prévia de produção local: http://127.0.0.1:3000.

## 1. Causa exata do bug

Reprodução antes de editar em 1920×1080: após a inicialização completa, o scroll comum já tinha progressão correta, com início em1016 e fim em3251. Não atribuí o problema a um start errado sem evidência.

Duas situações reproduziram a rede pronta no momento errado:

- **Carregamento:** o HTML/CSS inicial expunha seis nós e caminhos SVG completos. O GSAP só estabelecia o estado inicial depois do useEffect, timer250ms, import dinâmico e fontes. Ao atrasar JavaScript em1800ms e chegar àfronteira da Hero, todos os nós tinham opacity1 e todos os caminhos strokeDashoffset0. Captura before-pending.png.
- **Interação invisível:** os nós eram escondidos apenas por opacity0. Continuavam focáveis e seu onFocus chamava Explorar. Focar Comunicação no início do capítulo deslocou scrollY de1016 para2626 e deixou seis nós emopacity1. Captura before-focus.png. Esse salto acontece por interação; não deve ser confundido com a progressão normal do scroll.

Além disso, o header usava top≤40% da altura da tela para todos os capítulos. Em1920×1080, assumia capítulo02 emscrollY648,368pixels antes do início real1016. Pequenos resíduos SVG no primeiro frame vinham do arredondamento dos comprimentos e das pontas arredondadas dos strokes.

## 2. ScrollTriggers envolvidos

Hero não tem pin. O tween de .opening-bridge é a transição existente, agora identificado como btf-opening-bridge e criado antes da rede. Desenvolvimento usa btf-network, trigger no capítulo e pin em .network-frame. A nova mudança tonal usa btf-conversation-tone, sem pin, somente no fechamento. Não há duas timelines disputando os transforms do núcleo/nós.

## 3. Start/end antes e depois

Os limites corretos da rede e da transição foram **preservados**. A correção é de estado inicial, interação e header.

| Trigger | Antes | Depois |
|---|---|---|
| Hero/transição | start bottom bottom; end bottom64px; scrub true; sem pin | mesmos limites; id explícito; invalidateOnRefresh true; criação antes da rede |
| Rede | start top64px; end +=(innerHeight−64)×2,2; scrub0,2; pin frame | mesmos limites/scrub/pin; estados explícitos e inicialização controlada |
| Conversa | nenhum trigger tonal | start top bottom; end top64px; scrub true; sem pin |

| Viewport | Rede start/end antes | Rede start/end depois | Transição start/end depois |
|---|---|---|---|
|1920×1080|1016 /3251|1016 /3251|0 /1016|
|1440×900|836 /2675¹|836 /2675|0 /836|
|1366×768|704 /2253¹|704 /2253|0 /704|

¹Valores antes nas duas telas menores derivados da mesma fórmula e geometria preservadas; a captura baseline antes de editar foi executada em1920. Valores depois medidos no navegador nas três telas.

Rede: pinSpacing true, anticipatePin0 e refreshPriority0 (defaults), invalidateOnRefresh true. Os triggers são criados na ordem documental; GSAP matchMedia fornece contexto/revert. useEffect permanece assíncrono para carregar GSAP apenas em desktop elegível. CSS protege o primeiro paint, portanto a correção não depende de trocar useEffect por useLayoutEffect. Fontes continuam aguardadas; refresh e restauração de leitura existentes mantidos.

## 4. Estado inicial corrigido

Antes da inicialização, desktop elegível mostra o núcleo e mantém nós/linhas indisponíveis com visibility:hidden. Descrições nativas continuam disponíveis se JavaScript não carregar. Reduced motion e mobile mantêm seus fallbacks legíveis.

GSAP set estabelece núcleo, posições recolhidas, escala0,6/autoAlpha0 dos nós e strokes retraídos **antes** de remover a proteção CSS pela classe is-building. Descrições só são substituídas pela experiência interativa quando a timeline existe. Os fromTo da construção têm immediateRender:false, pois o estado inicial já foi definido. Comprimentos SVG inteiros, gap e margem extra impedem pequenas pontas de stroke antes da primeira conexão.

## 5. Construção sincronizada

Posições x/y, escala, strokes e estados contextuais continuam respondendo ao scroll. A cada etapa, nós deixam o núcleo e conexões se desenham. A composição completa e o reagrupamento em vocabulário editorial continuam como clímax. Não foi aplicado um fade coletivo para mascarar o bug. autoAlpha acrescenta controle de disponibilidade aos nós que ainda não foram revelados; a transformação espacial existente permanece.

Progressão medida em oito posições por tela; há estados com0, com parte dos nós e com6 nós completos. Linha totalmente desenhada e morfada somente no final. Seleção explícita por Explorar continua disponível como alternativa intencional àleitura pelo scroll.

## 6. Header sincronizado

Somente a fronteira Hero→Desenvolvimento mudou: Navigation usa motionStart calculado pelo ScrollTrigger, com tolerância de1px. Sem enhancement usa top≤64px. O evento btf:network-layout recalcula o estado após refresh/cleanup mesmo sem novo scroll. As regras dos outros capítulos permanecem iguais.

## 7. Scroll reverso

PASS nas três telas: morfologia retorna, linhas retraem, nós se recolhem e tornam-se indisponíveis, contexto volta a Explore uma competência e header retorna a01 ao cruzar a fronteira. Cinco pins elegíveis existentes; nenhum pin extra criado. Focar programaticamente um nó invisível não recebe foco nem altera scrollY.

## 8. Refresh

PASS em cinco posições ×três telas: Hero, final da Hero, início da rede, meio e clímax (15recarregamentos). Posição conservada dentro de3px; mesmos estados de visibilidade/opacity e header antes/depois. Teste com JavaScript atrasado também passa: rede completa não aparece antes da inicialização.

## 9. Cor anterior de Conversa

background:var(--blue), token #165ddb. Texto branco e detalhes claros sobre azul elétrico. O header usava --deep, tornando o contraste entre famílias muito evidente.

## 10. Cor/token atual

Base --deep (#102c39), camada tonal --ink (#172f3b), tipografia --paper (#f5f6f7). Texto secundário #d9e5ea reutiliza a cor já presente no header. Linha #83a8b9 e foco #b6e0ff pertencem aos tratamentos institucionais existentes. Nenhum token de paleta novo.

## 11. Integração com a paleta

--deep conecta o fechamento àHero/rede/header/footer. --ink oferece uma mudança discreta de luminosidade na mesma família. Frase, escala, composição e CTA são preservados. A revisão rápida percorreu os dez capítulos, sem redesenhar ou recolorir outras seções.

## 12. Contraste

Pior fundo da transição é --ink; --deep oferece contraste ainda maior.

| Elemento/estado | Contraste sobre --ink |
|---|---|
|Título, CTA, email e ícone em --paper|12,89:1|
|Texto secundário|10,85:1|
|Outline focus-visible|10,02:1|
|Texto/ícone pressionado|10,13:1|
|Linha de CTA|5,49:1|

Leitura acima de4,5:1 e indicadores acima de3:1. Axe zero violações nos cenários pontuais. Header conserva suas cores, também legíveis. Evidências de estados em cta-states.json e capturas cta-default/hover/active/focus.png.

## 13. Transição de Conversa

No desktop elegível, a camada --ink passa de0 a1 conforme a seção entra (top bottom→top64px). Base --deep permanece; texto não depende de opacity ou animação de entrada. Reverso desfaz a interpolação e os pontos intermediários retornam àmesma tonalidade. Mobile/reduced/noJS mostram --ink estático, com todo conteúdo visível. Nenhum pin ou efeito adicional sobre Origem.

## 14. CTA

Destino WhatsApp e mensagem pré-preenchida preservados; email preservado. Default tem linha discreta; hover/focus estendem sublinhado e deslocam seta3px; focus-visible mantém outline; active aproxima seta e usa accent claro existente. Reduced motion reduz duração das transições. Os quatro estados foram verificados sem abrir ou enviar mensagem comercial.

## 15. Viewports e QA

1920×1080 prioritário,1440×900,1366×768; mobile390×844 e360×800; reduced motion1920×1080 e390×844; noJS desktop1920. Edge isolado e inspeção adicional no navegador integrado. Testes A–G, quinze refreshes, foco, carregamento atrasado, cores, CTA e dez capítulos:9grupos pontuais PASS, zero errosJavaScript/HTTP e zero violações axe nos cenários analisados. Script reproduzível: node scripts/qa-boundary.mjs com produção local aberta; QA_URL opcional. Resultados/capturas em docs/qa/patch, ignoradosGit.

Regressão geral V3: **PASS,47grupos em oito cenários**, incluindo1920×1080DPR2 e390×844DPR2; zero errosJavaScript/HTTP e zero violações axe. Resultado final registrado em docs/qa/v3/results.json;21originais conservam SHA-256. Somados ao QA pontual,56grupos aprovados, além da inspeção específica dos quatro estados do CTA. Safari/Firefox e aparelhos físicos não testados; não declarar esses ambientes aprovados.

## 16. Mobile

Sem pins; título inicial e ordem dos seis conceitos/descrições nativas preservados. CTA para o número confirmado, email correto, contraste aprovado e nenhum overflow horizontal. Não replica a timeline desktop.

## 17. Reduced motion

Sem timeline/pins/autoload de vídeo. Rede/contextos compreensíveis no estado estático; Conversa legível independentemente da interpolação. Testados desktop e mobile.

## 18. Lint

npm.cmd run lint: PASS, sem erros.

## 19. Typecheck

npm.cmd run typecheck: PASS, sem erros.

## 20. Build

npm.cmd run build: PASS, geração estática concluída. Servidor de produção local permanece disponível. Nenhuma nova dependência.

## 21. Arquivos desta rodada

- src/components/motion/ScrollExperience.tsx: estados/foco/SVG, ordem da transição, evento de layout, cleanup e tonalidade de Conversa.
- src/components/presentation/CompetencyNetwork.tsx: remove readiness independente da timeline; fallback mantém descrições.
- src/components/navigation/Navigation.tsx: sincronização somente da fronteira inicial.
- src/app/globals.css: proteção do primeiro frame, fallback e cores/estados do fechamento.
- scripts/qa-boundary.mjs: regressão pontual reproduzível.
- docs/QA-PONTUAL-HERO-CONVERSA.md: este relatório.

Arquivos temporários da investigação removidos; aplicação sem markers, debug panels, console.log, outlines de debug ou flags temporárias. O outline acessível de foco permanece intencionalmente. As demais alterações já presentes no working tree pertencem àV3 anterior; não foram revertidas nem publicadas nesta rodada.
