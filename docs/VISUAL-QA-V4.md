# Visual QA V4 — 2 de outubro de 2026

V4 implementada, compilada e conferida em produção local no Edge. Resultado funcional PASS; composição revisada manualmente após implementação. Sem commit, push ou deploy nesta rodada. Medições locais não são resultados de produção, Lighthouse com rede limitada ou dados de usuários reais.

## Diagnóstico anterior

43 capturas em docs/qa/v4/before registram Hero, rede, cinco estados finais, foco e reverso em 1920×1080. Comunicação não encerrava; onFocus dos nós disparava Explorar e mudava scrollY de 1575 para 2626. Rede montada perto de 65%, seguida de esperas de 1.1 + .5 unidades. Não se constatou competição de timelines pelas mesmas propriedades.

Depois: ponte mascarada antes da rede; foco/seleção só atualizam descrição; Explorar é uma ação explícita. Rede de 1016 a 2591, em vez de 3251; clímax ~84% seguido de reorganização contínua. Últimos cinco estados e entrada inicial limpa passaram em três desktops. Reverse recompõe a abertura. Guard CSS verificado com JavaScript atrasado em 1800ms.

## Crítica após implementação e correções

| Observação real | Correção |
|---|---|
| Rostos nos vazios de GROUP | Reposicionamento de Luís e do registro com microfone |
| Máscara cortava Sem áudio | Máscara apenas em practice-screen, controles separados |
| Vídeo de Como pequeno e distante | Recentralizado; até 300 CSS px em DPR1, limite físico menor em DPR2 |
| Header atrasava numa âncora fracionária | Tolerância de 1px e inícios reais dos pins |
| Origem repetia turma e mostrava teto | Capítulo textual com título e fatos do briefing |
| DPR2 com escala 1.04 precisava de variante maior | sizes incorpora escala; densidade pelo arquivo físico |
| Posters abaixo da dobra baixavam na abertura | Posters lazy e fontes condicionais |
| Próximo nome junto do retrato anterior nos especialistas | Cenas verticais coordenadas; pin de 3840 para 1524px em 1920 |

## Parecer final por capítulo

| Momento | Parecer |
|---|---|
| Hero inicial/meio/final | Nove registros perceptíveis, navy e tipografia aprovada; ponte encerra antes da rede |
| Desenvolvimento inicial/meio/clímax/final | Núcleo limpo, relações progressivas, contexto legível, reorganização sem espera final |
| Competências | Quatro cenas coordenam contexto à esquerda e foto à direita |
| Prática | Aprender / Experimentar / Trocar; vídeo contextual com legenda e controle completos |
| Especialistas | Nomes e respectivos retratos avançam juntos durante a passagem vertical |
| Movimento | Três cenas de vídeo vertical com palavra e contexto; composição editorial estável |
| Ação | Duas turmas fora do mosaico, lados alternados na mesma grid |
| Empresa | Contextos e relações legíveis; sem publicar clientes ou resultados inventados |
| Formatos | Dois produtos conhecidos, consulta pelo contato |
| Origem | Texto factual, sem foto repetida ou teto na entrada |
| Conversa | CTA/e-mail legíveis, cores institucionais e footer |

Passes iniciais: docs/qa/v4/pass1 e pass2. Aceitação final: final1920, final1440, final1366, 35 capturas por resolução e states.json. Percurso nativo final: 35 estados incluindo o fim, acceptance/results.json. Folhas final-contact usam exclusivamente esse manifest, não frames antigos de tentativas anteriores. Capa, rede e todos os capítulos/cenas foram inspecionados visualmente. Capturas são locais, ignoradas pelo Git.

## Verificação

**qa: PASS, 47 grupos / oito cenários.** 1920×1080, 1440×900, 1366×768, 768×1024, 390×844, 360×800; também 1920 e 390 DPR2. Sem erros JavaScript/HTTP coletados; zero violações axe nesses cenários. Seis pins no desktop elegível, zero no mobile/tablet. Onze âncoras, quatorze cenas; menu/Escape, teclado, foco, seleção, slow/fast/reverse, paradas e recargas. srcset/sizes, quadro, fit e densidade física de cada fotografia registrados em full/results.json.

**qa:story: PASS, nove grupos.** Limites Hero/rede, quinze recargas, import tardio, foco oculto, construção/clímax, últimos cinco estados, header, contraste de conversa e CTA. Executado antes da última mudança dos especialistas; Hero/rede/Conversa não mudaram depois. Suíte geral e percurso completo executados novamente com especialistas finais.

**qa:experience: PASS, três grupos.** Quatro loops reais completos: 7, 2.417, 8 e 10s, muted, um player ativo e pausa fora do capítulo. Percurso lento inteiro com roda nativa de 140px; todos os onze capítulos observados. Percurso rápido/reverso recompõe capa/rede. Abertura com zero fontes de vídeo e zero pedidos de posters.

Mobile 390/360: cenas e especialistas em fluxo, posters/play explícito, sem overflow. Tablet 768: mesmo fallback. Reduced motion e troca da preferência removem pins e preservam conteúdo. Sem JavaScript: onze capítulos, quatorze cenas, menu nativo e quatro links MP4. Save-Data e aba inativa simulados. Resize/histórico/fullscreen testados. Safari, Firefox e aparelhos físicos não testados.

160 instâncias fotográficas conferidas na matriz, cobertura mínima de densidade física igual a 1. Os 21 SHA-256 originais conferem, nenhum removido/editado. Lint, typecheck e build PASS após últimas mudanças de aplicação; seis rotas estáticas.

## Performance local da abertura

| Cenário | Recursos transferidos | LCP local | CLS local |
|---|---:|---:|---:|
| 1920×1080 DPR1 | 623085 B | 256ms | .000274 |
| 1440×900 DPR1 | 623085 B | 132ms | .000562 |
| 1366×768 DPR1 | 623085 B | 128ms | .000731 |
| 768×1024 DPR1 | 513550 B | 124ms | 0 |
| 390×844 DPR1 | 455546 B | 108ms | 0 |
| 360×800 DPR1 | 455546 B | 120ms | 0 |
| 1920×1080 DPR2 | 1090019 B | 120ms | .000274 |
| 390×844 DPR2 | 782868 B | 120ms | 0 |

TransferSize corresponde aos recursos na amostra da abertura, não ao HTML nem à visita inteira. Uma imagem high priority, uma eager/auto e sete lazy; o navegador pode baixar lazy já perto da viewport. 61 arquivos / 9.97MiB em public/media incluem variantes, dois formatos por clip, posters e OG: não é download inicial. Import GSAP dinâmico, sem nova dependência; original de 73s nunca baixado pelo site.

## Evidências e limites

full/results.json: matriz, imagens, motion, vídeos e performance. boundary/results.json: entrada/encerramento. acceptance/results.json: loops e percurso nativo. acceptance/opening-final.png: capa após reverse. final1920/final1440/final1366: composição por capítulo e cena. docs/audit/v4: sete folhas de frames dos cinco vídeos revistos integralmente.

Novas frases comerciais são PROVISÓRIAS; bios/especialidades não confirmadas omitidas. Domínio institucional e autorização de publicação continuam pendentes. Prévia Vercel consultada como referência sem alterações. Relatórios, limitações e arquivo por arquivo em DELIVERY-V4 e CHANGES-V4.
