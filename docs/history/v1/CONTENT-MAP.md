# Mapa de conteúdo

Fonte factual: briefing da cliente e arquivos locais. CONFIRMADO significa confirmado por esse material, sem verificação externa de trajetória profissional. A copy comercial é PROVISÓRIA.

| Seção | Objetivo / mensagem | Conteúdo e asset | Interação / CTA | Status | Desktop | Mobile |
|---|---|---|---|---|---|---|
| Hero | Comunicar educação em comunicação imediatamente | Comunicação que transforma. Subtexto: comunicação, oratória, argumentação e presença profissional. Foto `09.04.27 (3)` | Entrada do título; Conheça as soluções / contato | Atuação CONFIRMADO; copy PROVISÓRIO; pessoa IDENTIDADE A CONFIRMAR | Fotografia ampla, texto à esquerda | Recorte vertical, texto menor, viewport dinâmico |
| Manifesto | Transformar conhecimento em voz | Ter conhecimento é o começo. Apresentar, argumentar, persuadir, liderar | Scroll curto de quatro capítulos; botões acessíveis | PROVISÓRIO | Palco tipográfico pinned | Controles touch sem pin; lista estática sem JS |
| Em ação | Mostrar prática real | Aprender é entrar em cena. Fotos `09.04.27` e `09.04.27 (2)` | Composição assimétrica, parallax sutil | Eventos do acervo CONFIRMADO; identidades TODO CLIENTE | Foto grande e vertical deslocada | Sequência de duas fotos, sem parallax |
| Soluções | Organizar conversa com RH/T&D | Quatro territórios do briefing, descrições de situações; Workshop de Oratória e Mentoria Fale com Autoridade | Disclosures sem exclusividade de hover; Prepare uma conversa | Produtos nomeados CONFIRMADO; territórios PROVISÓRIO; disponibilidade e formatos TODO CLIENTE | Lista editorial + fotografia | Lista touch, painéis no fluxo |
| Especialistas | Apresentar as três pessoas nomeadas | Claudia Trajano / Francisco Barbosa / Luís Flora. Retratos `Claudia-Trajano-1`, `Francisco-1024x759`, `Flora` | Biografias por disclosure | Nomes e vínculo CONFIRMADO pelo briefing; bios/especialidades TODO CLIENTE | Percurso horizontal progressivo se viewport comportar | Coluna vertical, retratos largos, sem pin |
| Experiência | Mostrar educação coletiva | Cada encontro, uma oportunidade de se desenvolver. Turma `09.04.26` | Fotografia larga; sem métricas não verificadas | Acervo CONFIRMADO; data, evento e resultados TODO CLIENTE | Foto panorâmica, legenda neutra | Foto 4:3 e legenda |
| Em movimento | Mostrar fala e interação reais | Comunicação se aprende praticando. Vídeo `09.04.28` | Loop silencioso opcional visível; pausa/play; ampliar de forma sutil | Acervo CONFIRMADO; pessoa IDENTIDADE A CONFIRMAR; direitos TODO CLIENTE | Filme vertical, sem upscale agressivo | Poster e play explícito, sem autoplay ou preload |
| Origem | Contextualizar depois da proposta | Experiência profissional transformada em educação. União dos três profissionais e relação com Júri Simulado do Tribunal de Justiça | História curta no fluxo | Origem CONFIRMADO no briefing; cronologia e instituição específica TODO CLIENTE | Composição tipográfica + turma `09.04.27 (4)` | Texto e foto no fluxo |
| Contato | Dar próximo passo concreto | Sua equipe tem conhecimento. Dê voz a ele. | Link WhatsApp oficial e alternativa e-mail | Destino CONFIRMADO pela cliente; copy PROVISÓRIO | CTA amplo | CTA 44 px+; link direto |
| Footer | Orientar navegação | Logo BTF, links de âncora e ano atual; WhatsApp e e-mail oficiais | Voltar ao topo / navegação / contato | Logo CONFIRMADO; dados jurídicos e links sociais TODO CLIENTE | Navegação horizontal | Agrupamentos simples |

## Dados editáveis

`src/content/site.ts` centraliza títulos, descrições, soluções, produtos, especialistas, bios opcionais, métricas opcionais e contato. Campos sem confirmação ficam `null`; nenhuma métrica é renderizada até existir dado válido. Fonte das identidades: somente nomes nos arquivos de retrato e briefing.

`NEXT_PUBLIC_SITE_URL` configura origem absoluta, canonical, sitemap e OpenGraph. Sem domínio confirmado, canonical e schema com URL são omitidos e robots bloqueia indexação da versão de preparação. `NEXT_PUBLIC_CONTACT_URL` permite substituir o WhatsApp oficial confirmado https://wa.me/5511993843003. E-mail confirmado: contato@btfgroup.com.br. Não há armazenamento ou envio automático.

## Conteúdo sem JavaScript

As dez seções, nomes, imagens e textos têm HTML de servidor. Disclosures de soluções e bios usam `details`. Navegação mobile nativa usa `details`. O manifesto mantém lista sem JS. O vídeo mantém controles nativos e poster. Os links comerciais funcionam sem JavaScript.
