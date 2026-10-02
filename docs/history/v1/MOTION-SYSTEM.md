# Sistema de movimento

Referências: skill oficial GreenSock auditada em `.agents/skills/gsap-scrolltrigger`; https://gsap.com/docs/v3/Plugins/ScrollTrigger/; https://motion.dev/docs/react; https://motion.dev/docs/react-accessibility.

## Ownership

| Elemento | Dono | Propriedade / função |
|---|---|---|
| Hero título | Motion | Entrada opacity + clipPath uma única vez; reduced motion elimina |
| Menu | Motion | opacity de overlay; foco e estado são React/HTML |
| Soluções e bios | CSS + HTML details | Layout nativo, feedback do ícone via CSS, sem GSAP |
| Manifesto desktop | GSAP ScrollTrigger | Pin do wrapper; escala/posição/opacidade do palco interno; índice via callback |
| Manifesto touch | Motion | Troca de palavra, sem pin; elementos diferentes do desktop |
| Foto em ação | GSAP | y de -16 a +16; desktop com fine pointer |
| Especialistas | GSAP | x do trilho, pin do wrapper; ease none, scrub 0.5 |
| Vídeo | GSAP | scale do wrapper interno 1 → 1.08; sem controlar tempo do vídeo |
| Botões | CSS | Contraste, underline e deslocamento pequeno do ícone |

Nenhum nó recebe transform de Motion e GSAP ao mesmo tempo. Sem smooth-scroll, custom cursor, snap, scroll hijacking ou listeners de wheel/touchmove.

## Valores

- Respostas: 160–240 ms, ease out.
- Entrada hero: 700 ms, uma sequência com pequeno atraso, conteúdo não depende da animação.
- Menu: 180 ms; exit limitado, sem atraso na navegação.
- Manifesto: percurso máximo 160% da altura da janela, quatro estados. Sem pin abaixo de 1024 px, altura inferior a 700 px, ponteiro coarse ou reduced motion.
- Especialistas: deslocamento calculado pelo overflow do trilho; end acompanha a distância real. Nada fixo em pixels dependente de uma única tela.
- Vídeo: transform somente; não se torna paisagem e não estica proporção.

## Ciclo de vida

GSAP importado de forma dinâmica após hidratação, somente em desktop elegível. Plugins registrados uma vez. `gsap.matchMedia` cria efeitos somente para viewports compatíveis e reverte no resize ou alteração da preferência de movimento. `gsap.context`/matchMedia limpa timelines, estilos e pins no unmount. Nenhuma limpeza global elimina animações de outros componentes.

Refresh depois de fonts.ready e carregamento de imagens. Resize nativo do ScrollTrigger; observador específico em disclosures cujo crescimento altera a posição de seções. Recalcular após navegação back/forward e pageshow. Criar triggers na ordem do documento. Não usar exemplos com `Max.max` ou `xPercent` em pixels encontrados na skill: calcular `x` em pixels corretamente.

Âncoras de especialistas apontam para wrapper externo. Foco num retrato/bio avança o scroll vertical correspondente ao card no modo pinned, preservando teclado. Na ausência de JS, layout é uma grade fluida normal. Apenas após criar o trigger, classe ativa o trilho.

## Vídeo

Reproduzir somente quando visível, documento ativo, desktop com fine pointer, sem reduced motion e sem Save-Data. Nenhum source carregado automaticamente no mobile. Controle de pausa persistente evita retomar contra a escolha do usuário. Reprodução negada pelo browser mantém poster e botão de play.

## QA previsto

Resoluções 1920×1080, 1440×900, 1366×768, tablet 768×1024, 390×844 e 360×800. Percorrer toda página; testar menu, disclosures, foco/Escape, quatro palavras, âncoras, teclado no trilho, resize, rotação, reduced motion, no JS e back/forward. Confirmar nenhum pin em touch, sem overflow no documento, sem autoplay mobile, cleanup e refresh corretos.
