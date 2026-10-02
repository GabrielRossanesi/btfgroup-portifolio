# Sistema de movimento V2

Histórico V1 em docs/history/v1. Scroll nativo, sem wheel/touchmove, snap, smoother, WebGL ou controle currentTime.

| Elemento | Dono | Propriedades |
|---|---|---|
| Palavra de passagem | GSAP | y/scale no scroll |
| Rede | GSAP ScrollTrigger | Pin frame; scale núcleo; x/y/scale/opacity nós; strokeDashoffset curvas |
| Seleção da rede | React/HTML/CSS | Texto, aria-pressed, cor; nenhum transform |
| Especialistas | GSAP | Pin viewport; x trilho, ease none; índice via eventos |
| Menu | Motion | opacity painel; details/foco React/HTML |
| Disclosures/botões | HTML/CSS | Layout nativo, underline/indicador |
| Vídeo | API nativa | Play/pause, visibilidade, preferência e usuário |

Não há disputa de propriedades. Fotografias/vídeo estáveis; retirar parallax e ampliação decorativa V1.

## Estados da assinatura

0. Núcleo Desenvolvimento profissional isolado e ampliado.
1. Comunicação sai do núcleo; primeira curva se desenha.
2. Oratória se relaciona com Comunicação.
3. Argumentação prolonga o conjunto.
4. Persuasão conecta-se à Argumentação.
5. Presença ocupa eixo inferior, ligada à Oratória.
6. Escuta fecha relação com Comunicação; rede completa permanece no trecho final.

Nós partem do núcleo às coordenadas percentuais finais, ganhando escala. Curvas SVG usam getTotalLength para dasharray e dashoffset comprimento→0, sem plugin pago. Unidades reais evitam segmentos visíveis no estado vazio. Descrições não dependem da opacidade. Foco/seleção permite completar o desenho via scroll nativo calculado e manter o foco; não atualizar React a cada frame.

Trigger #desenvolvimento, start top 64px, pin .network-frame (animar filhos), end +=200% da altura útil, scrub .25, invalidateOnRefresh. Seis passos e repouso. Âncora chega no início para apresentar construção; seleção completa para explorar.

## Especialistas, navegação e ciclo

Três painéis de largura útil. Start top 64px, end = track.scrollWidth - viewport.clientWidth, x = menos essa distância, scrub .35, ease none. Botões convertem índice em scroll. Foco em conteúdo posiciona painel. Mobile/reduced: articles verticais.

Links possuem href reais. Resolução de âncora considera start dos triggers após refresh: rede/especialistas→start, outros→posição documental menos header. Hash/back/forward atualizam posição sem travar estado. Sem JS links continuam nativos. Fullscreen API após clique humano, refresh em fullscreenchange; falha deixa mensagem acessível e preserva uso normal.

Elegibilidade: largura ≥1024, altura ≥700, pointer:fine, no-preference. Import dinâmico após hidratação. matchMedia reverte timelines, estilos, classes e listeners no resize/preferência/unmount; cleanup scoped, nunca kill global. Triggers em ordem documental. Refresh rAF deduplicado depois de fontes/imagens/disclosures/pageshow/fullscreenchange; resize nativo. Coordenadas e distância recalculadas. Reposição de hash somente ao navegar/mudar modo.

Tablet/mobile: disclosures editoriais, sem pin/curvas/horizontal. Reduced desktop: rede final + explicações, sem scrub/pin/autoplay. Sem JS: rede completa e descriptions/disclosures, todos painéis/canais. Teclado: skip, menu Escape, links, nós, especialistas; foco visível. Vídeo preserva Save-Data e pausa persistente V1.

## QA

Seis tamanhos anteriores; estados inicial/intermediário/final e todos nós; percurso Abertura→Especialistas→Empresa→Desenvolvimento→Origem; especialistas por teclado; fullscreen real/retorno; resize/reduced; hash direto/back/forward; sem JS; geometria/axe, carga vídeo, erros e hashes 21 originais.
