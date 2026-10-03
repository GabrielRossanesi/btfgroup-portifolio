# Movimento V3

Plano anterior à implementação. Scroll nativo, sem wheel/touchmove/snap/smoother ou currentTime controlado por scroll.

| Capítulo | Transformação | Engenharia |
|---|---|---|
| Rede | Conceitos deixam núcleo, linhas desenham, vocabulário se reagrupa | Pin existente, SVG comprimento real, posição/escala e descrição por índice |
| O que | Palavra domina e transfere protagonismo | Um pin curto, quatro cenas, posição do título e quadro recortado |
| Como | Entrar na aprendizagem | Um pin curto, três camadas laterais: foto→vídeo→participação |
| Especialistas | Uma pessoa por momento | Pin horizontal preservado; distância real/ease none |
| Em ação | Percorrer mural maior que viewport | Fluxo natural; poucos y±40–70, velocidades relativas suaves |
| Empresa | Núcleo organizacional recebe relações | Pin curto, quatro contextos/conexões/descrições |

Desktop≥1024×700, pointer fine, no-preference: GSAP dinâmico e matchMedia scoped. Triggers em ordem documental; pin wrapper, animar filhos; refresh deduplicado; cleanup estilos/classes/listeners. GSAP possui transform/clip desktop, React texto/aria discreto, Motion menu. Sem aria-live por frame.

Mobile: IntersectionObserver e CSS para quadro deslocado poucos pixels e linha/progresso, sem GSAP/pins. Reduced: não ativar enhancement, todas cenas visíveis, sem autoplay. HTML inicial completo.

Continuidade específica:
- Hero→rede: Comunicação se desloca para núcleo, fundo compartilhado.
- Rede→O que: nós se reagrupam e Comunicação cresce para título; nenhuma saída coletiva por fade.
- O que→Como: enquadramento e Prática no limite conduzem à foto.
- Como→Especialistas: Pessoas conecta público a nomes sobre fundo profundo.
- Especialistas→Ação: Encontro no limite do trilho conduz ao mural.
- Ação→Empresa: Pessoas/Sua equipe transfere coletivo a Sua empresa e retoma curva editorial.

Seleções teclado concluem scrub da cena e mantêm foco. Âncoras reais/history usam starts dos triggers. Testar hash/back/forward/refresh sem estados vazios. Player próprio observa viewport e cena efetivamente visível, coordena um vídeo por vez; pausa humana persiste.

QA: seis capítulos lento/rápido/reverso/resize/mid-refresh/âncoras/back-forward;1920/1440/1366/tablet768/mobile390/360;DPR2/reduced/noJS;visual, geometria e axe. Não declarar resultados antes de executar.

## Engenharia final e validação

Fontes concluídas antes dos triggers; overflow-anchor:none erestauração opcional via sessionStorage emreload preservam leitura. Resize restaura progresso relativo; eventCallback do timeline sincroniza somente índice discreto de cena. Média de vídeo é ownership exclusivo do player. Cinco pins desktop/zero mobile,11artigos completos nofallback. QA principal47grupos ecomplementar11PASS; detalhes emVISUAL-QA-V3.md.
