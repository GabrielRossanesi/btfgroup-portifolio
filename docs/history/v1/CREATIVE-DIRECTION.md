# BTF Group — direção criativa

Data: 02/10/2026. Direção e textos PROVISÓRIOS, sujeitos à aprovação da cliente.

## Conceito

Conhecimento tem mais valor quando consegue ser comunicado. Uma experiência editorial que passa da escuta à voz e da voz à presença: fotografia humana, tipografia expansiva e ritmo calmo. Educação prática é o assunto central; a origem jurídica aparece na história e no acervo, sem símbolos jurídicos decorativos.

## Auditoria e skills

O diretório inicialmente continha somente `img` e `.agents/skills/frontend-skill`. Sem código, Git ou AGENTS.md. A skill da Anthropic citada no briefing não estava instalada. Foi lida integralmente na fonte oficial e instalada em `.agents/skills/frontend-design`. Ambas as skills de frontend foram lidas e aplicadas.

Foi localizada, lida integralmente e instalada a skill `gsap-scrolltrigger` do repositório oficial `greensock/gsap-skills`. É Markdown com exemplos, licença MIT, sem executáveis, comandos destrutivos, credenciais ou serviços. Compatível com React e cleanup por contexto. A instalação usa o instalador oficial de skills do Codex. Fonte: https://github.com/greensock/gsap-skills/tree/main/skills/gsap-scrolltrigger.

O índice de skills indicado pela página oficial do Motion retornou 404 no acesso direto. Não foi instalada uma cópia de terceiros. Motion será usado segundo https://motion.dev/docs/react. ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/. Cópias auditadas das instruções estão em `docs/references`.

## Tese visual

Um palco editorial para a comunicação: azul profundo, branco frio, pessoas reais e palavras que ganham presença.

O logo fornecido é branco e transparente, sem um azul mensurável. O azul vem dos fundos institucionais dos três retratos, e deve ser validado contra o manual de marca. Sem alegar valores oficiais.

### Tokens

| Papel | Cor | Uso |
|---|---|---|
| Azul institucional proposto | #075772 | Detalhes e origem dos retratos |
| Azul profundo | #102C39 | Hero, áreas de vídeo e rodapé |
| Azul de ação | #165DDB | CTA, solução ativa e manifesto |
| Papel frio | #F5F6F7 | Seções claras, sem creme |
| Branco | #FFFFFF | Texto sobre fundos escuros |
| Tinta | #172F3B | Corpo e títulos nas áreas claras |

Tipografia: Bricolage Grotesque variável para display, Manrope variável para corpo e UI. Ambas auto-hospedadas, duas famílias no máximo. Display com tracking negativo leve e corpo com linha confortável. Títulos grandes sem uma palavra arbitrariamente colorida, sem serif de revista jurídica. Labels em sentence case. Cor usada na mensagem inteira, e não em um vocábulo isolado.

Espaçamento: 8/16/24/40/64/96/128. Margens fluidas de 24–80 px. Imagens com cantos retos; apenas botões de ação têm curvatura pequena. Sem cards, sombras, glow, logos de clientes ou métricas inventadas.

## Composição e wireframe

Hero edge-to-edge, header sobreposto. A fotografia `09.04.27 (3)` registra uma pessoa participando com microfone, rodeada pelo público; nenhuma identidade inferida. Recorte preserva rosto e microfone à direita e tratamento escuro estabelece contraste à esquerda. O acervo de vídeo é inteiramente vertical e de resolução modesta: foto é a escolha adequada no hero, vídeo terá um capítulo próprio sem esticar a imagem.

```text
HEADER: logo real | Soluções / Especialistas / A BTF | contato
HERO: fotografia em toda a tela
      Comunicação que\ntransforma. | pessoa com microfone
      proposta + CTA             | contexto real
      scroll para conhecer / educação prática
MANIFESTO: Ter conhecimento é o começo.
           palavra ocupa a tela; índice/controle de progressão
AÇÃO: texto à esquerda / foto grande + foto vertical deslocada
SOLUÇÕES: lista editorial expansível / fotografia contextual
ESPECIALISTAS: retratos amplos / nomes / biografia sob demanda
EXPERIÊNCIA: turma real atravessa a página / contexto sem números
VÍDEO: frase à esquerda / filme vertical contido à direita
ORIGEM: BTF GROUP amplo / história curta + retrato de turma
CTA: Sua equipe tem conhecimento. Dê voz a ele.
FOOTER: logo / navegação / disponibilidade do contato
```

Alinhamento predominantemente à esquerda. Alternância de papel frio, azul e fotografia dá o ritmo. O manifesto é o único momento dominado por uma palavra gigante. Os nomes dos especialistas ganham escala sem se tornarem uma galeria anônima.

## Interação assinatura: dê presença à sua palavra

Conceito: apresentar, argumentar, persuadir e liderar são etapas de tornar conhecimento comunicável. Uma palavra por vez ocupa o manifesto; a frase de apoio explica a aplicação profissional. A passagem é um corte tipográfico com troca de escala, não quatro fade-ins de seção.

Motivo: colocar a linguagem em ação, vinculando movimento à proposta da BTF.

Desktop: a seção fica fixa por um percurso curto e limitado. Scroll vertical percorre as quatro palavras, sem snapping ou captura de roda. Controles de teclado/botões permitem escolher um capítulo e avançam a posição nativa do documento. Palavra anterior recua enquanto a próxima ganha presença. GSAP possui transforms e opacity desse palco; React controla somente texto e estado ativo.

Mobile: sem pinning; controles de quatro capítulos trocam palavra e explicação com Motion. Scroll da página continua vertical, sem horizontal obrigatório. Texto escala para 360 px.

Reduced motion: sem pinning, scrub, parallax ou reprodução automática. A lista das quatro palavras com explicações é acessível. Menu e disclosures mudam imediatamente. Conteúdo essencial fica presente no HTML antes de JS.

## Motion de apoio

Entrada discreta do título do hero; microinteração de disclosures e menu; parallax máximo de 32 px na foto da ação; progressão de especialistas horizontal somente em desktop com mouse e altura suficiente, com foco trazendo cada especialista ao campo de visão; capítulo de vídeo amplia o enquadramento até 1.08 sem crop destrutivo ou pinning.

## Revisão contra o briefing

- A ideia de vídeo full-screen no hero foi descartada após verificar formato real. Não é uma limitação escondida.
- Fotografia domina a abertura; sem mockup, imagens stock ou imagem gerada.
- Sem métricas/depoimentos/clients sem evidência.
- Soluções são temas de desenvolvimento provisórios; produtos conhecidos aparecem separadamente.
- Retratos identificados pelo nome do arquivo, não por reconhecimento facial.
- Contato confirmado pela cliente em 02/10/2026: WhatsApp +55 11 99384-3003 e contato@btfgroup.com.br. CTAs abrem o canal oficial, sem formulário ou envio simulado.
- A arquitetura preserva os dez capítulos. A experiência de turmas e a galeria têm papéis distintos: ação vs contexto coletivo.

## Aprovação editorial pendente

Paleta exata, direitos de imagem e de vídeo, biografias, copy, formatos corporativos e história. Contatos confirmados em 02/10/2026. Detalhes em TODO-CONTENT.md. O build técnico não substitui essas confirmações.
