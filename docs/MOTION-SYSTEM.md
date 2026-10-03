# Sistema de movimento V4

## Princípio

Scroll nativo e reversível. Sem captura de roda, snap, ScrollSmoother, biblioteca nova ou alteração de currentTime por GSAP. Enhanced desktop: mínimo 1024×700, pointer fine, prefers-reduced-motion no-preference. Aguarda fontes locais; imports dinâmicos de GSAP e ScrollTrigger. Seis pins; wrappers permanecem fixos e somente seus filhos animam. Criação em ordem do documento: rede, competências, prática, especialistas, movimento, empresa. matchMedia e efeitos removem listeners/classes/propriedades ao sair da condição.

## Hero → Desenvolvimento

Medição anterior em 1920×1080: rede de y=1016 a y=3251; foco num nó em y=1575 saltava para y=2626. A ponte tinha apenas x/y/scale, sem encerramento. O onFocus disparava o mesmo evento de Explorar; não havia duas timelines concorrentes controlando esses elementos. A rede chegava montada a aproximadamente 65%, seguida de esperas de 1.1 e 0.5 unidades.

Agora uma máscara encerra Comunicação de bottom/bottom até bottom/55%; ela termina antes dos cinco últimos estados da capa. A Hero continua em fluxo. Nove quadros se deslocam entre 20 e 40px e chegam no máximo a escala 1.04. Reverse reconstrói a mesma capa.

Rede começa com somente o núcleo. Guard CSS impede o estado completo antes do import; autoAlpha bloqueia foco em nós ainda invisíveis. Seis conexões/nós se constroem sequencialmente: intervalo .68, entrada do nó em i*.68+.32, duração .68. Total de construção: 4.4 unidades; reorganização contínua de 4.4 a 5.25. Clímax próximo de 84%, seguido imediatamente pela transformação, sem esperas finais. Distância 1.55×altura útil: y=1016 a 2591 em 1920×1080, 660px a menos. Selecionar/focar nós só muda a explicação; apenas o botão Explorar avança intencionalmente ao clímax.

## Cenas

Competências: quatro cenas verticais, 2.25×altura útil. Prática: três cenas horizontais, 1.65×. Movimento: três cenas horizontais, 1.9×. Empresa: quatro contextos e construção de relações, 2×. Controles selecionam a cena com scroll real. aria-hidden/inert seguem a cena ativa. Máscaras de vídeos ficam em practice-screen, sem cortar botões/legendas. Deslocamentos e escala leves mantêm mídia e texto alinhados.

Especialistas: três painéis verticais completos, nome e foto no mesmo eixo. Distância 1.5×altura útil; entradas/saídas de .55 unidades e pequenos reveals de foto. Timeline de 4.2 unidades. Substitui o trilho horizontal longo que misturava visualmente nomes e retratos. Controles explícitos, estado acessível e cleanup de fallback.

Ação: fluxo de duas composições em grid, com drift limitado nas fotografias. Handoffs tipográficos explicam a sequência. Conversa interpola discretamente #102c39 → #172f3b em pseudo-elemento; contraste e CTA permanecem constantes.

## Player e resiliência

Posters são imagens lazy. Fontes entram apenas na ativação. Desktop autoplay depende de viewport, cena ativa, aba ativa, movimento permitido, ausência de Save-Data e pausa humana. Evento global pausa os demais players. Atualização de cena aguarda um frame para ler aria-hidden/inert já atualizados pelo React. Mobile/reduced/Save-Data exigem play explícito; no-JS oferece poster, descrição e link MP4 silencioso.

refresh ao estabilizar fontes/imagens, details, resize, fullscreen, pageshow e histórico. Recarga preserva posição no sessionStorage quando disponível; resize preserva progresso do pin ativo. Header usa início real dos pins e tolerância de 1px em âncoras naturais. Quando a condição enhanced sai, não restam pins e todo conteúdo volta ao fluxo.

QA de construção, cinco estados finais, foco, entrada limpa, atraso de JS, reverso, reload, resize e fallback: scripts/qa-boundary-v4.mjs e scripts/qa-v4.mjs. QA de loops e percurso completo nativo: scripts/qa-experience-v4.mjs.
