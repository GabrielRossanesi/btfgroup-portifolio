# Entrega V3 — relatório para revisão local

02/10/2026. Abertura preservada; rede evoluída; quatro capítulos reconstruídos. Todos21 originais intactos por SHA-256. Sem commit, push ou deploy: alterações no working tree, nada preparado no index. Base Git main,245b930; origem GabrielRossanesi/btfgroup-portifolio. Prévia local http://127.0.0.1:3000.

## 1. Causa da baixa qualidade

WebP82 recomprimia JPEG de WhatsApp e retratos já WebP. Horizontais1600 ocupavam1920CSS; retratos1080/1024 cobriam~849×680; DPR2 ampliava a insuficiência. Mobile cover podia pedir~1699pixels físicos para uma fonte800. Não havia Next/Image nem thumbnail errada no desktop: a fonte máxima era pedida, mas o quadro excedia sua capacidade.

## 2. Correção

Variantes320/640/960/1280/1600 limitadas pelo original, WebP94 direto da fonte. WebP original máximo copiado sem recodificação. Fotos horizontais≤800CSS, especialistas≤512,633px≤280CSS, vídeos≤metade do raster. Ratio e contain, sizes conferido contra área pintada; sem AI/sharpen/upscale. Apenas variantes geradas obsoletas removidas; nenhum original apagado.

## 3. Assets utilizados

14/21: logo; Claudia, Francisco e Luís; turma09.04.26; aula09.04.27; livro09.04.27(1); público09.04.27(2); participação09.04.27(3); sala09.04.27(4); fala institucional09.04.28; microfone/mesa09.04.28(2); vídeos09.04.25 e09.04.28. Quatro fotos adicionais e um vídeo adicional frente àV2. Nomes literais, dimensões, pesos, capítulos e status de cada original em ASSET-USAGE-V3.md; derivados em MEDIA-AUDIT-V3.md.

## 4. Assets não utilizados

RESERVE: fotos09.04.26(1)640/retrato sem identidade;09.04.26(2)pose institucional sem novo papel;09.04.28(1)640/retrato redundante. Vídeo09.04.25(1)tem gesto curto antes de câmera abandonar pessoa;09.04.29 repete sala/interação do28, confirmado em12/24/40/55s, com alternativa20–27s. NOT USED: foto09.04.26(3)quase duplicata640 e vídeo09.04.26 com pessoa cortada e plataforma vazia. Todos permanecem locais intactos.

## 5. Vídeos utilizados e onde

lecture: original09.04.25, trecho2–9s,464×832,7s no Como/Experimentar. practice: original09.04.28,0,3–9,3s,478×850,9s no mural BTF em ação. MP4/WebM24fps sem áudio, posters94. PesoMP4/WebM: lecture696338/675927B; practice1091814/884024B. Ambos perceptíveis em capítulos distintos. Condições e testes em VIDEO-PLAN-V3.md e VISUAL-QA-V3.md.

## 6. Desenvolvimento Profissional

Seis conceitos deixam o núcleo, curvas desenham relações, competência ativa muda explicação/ênfase e núcleo responde. Clímax reorganiza Comunicação/Oratória/Argumentação/Presença à esquerda e Persuasão/Escuta à direita, com núcleo deslocado e curvas morfadas; Comunicação amplia para a leitura seguinte. Não há desaparecimento coletivo por fade. Seleção/foco explica cada termo.

## 7. O que desenvolvemos

Um pin curto e quatro cenas Comunicação,Oratória,Argumentação,Presença. Palavra desloca/cede protagonismo; quadro contextual se abre com foto adequada. Texto legível e controles diretos por teclado. Estado inativo inert/aria-hidden somente no enhancement desktop; fallback expõe todos artigos.

## 8. Como desenvolvemos

Aprender→Experimentar→Trocar: três camadas horizontais, foto de aula→vídeo vertical→participação. Palavra, foto e contexto se reposicionam no pin curto. Direção editorial provisória, não método oficial atribuído àBTF.

## 9. BTF em ação

Mural editorial espacial em fluxo natural, com livro, fala, microfone, vídeo, público e turma. Tipografia Pessoas articula escala; quatro quadros têm deslocamentos suaves distintos. Sem grid de galeria/carrossel ou pin. Imagens respeitam fontes reais; curva e Sua equipe conduzem àempresa.

## 10. Para sua empresa

Sua empresa ocupa núcleo; Liderança,Comercial,Jurídico,Equipes estabelecem ligações e recebem contextos/competências/exemplos editoriais. Conexão desenha, área ativa responde, núcleo se desloca discretamente. Quatro artigos e controles em vez do conjunto anterior de disclosures. Sem clientes,resultados,cases ou projetos inventados.

## 11. Transições

Hero→rede pela Comunicação/fundo compartilhado; rede→competências pelo reagrupamento; competências→Como por Prática/enquadramento; Como→especialistas por Pessoas; especialistas→mural por Encontro; mural→empresa por Sua equipe/curva. Palavras de passagem se deslocam no fluxo, sem conjunto repetido de reveals.

## 12. Mobile

Leitura vertical de todos estados, sem pin ou trilho horizontal dependente de scroll. IO acompanha quadro/progresso e estado contextual com pequenos movimentos; conteúdo não depende da animação. Reduced motion estático completo. Mobile/reduced/Save-Data exigem play explícito. SemJS mantém menu, artigos, contatos e linksMP4.

## 13. DPR2

1920×1080DPR2 e390×844DPR2 passaram. Desktop: hero800CSS→1600, especialistas512→1080/1024, mural280→633; nenhum raster insuficiente. Mobile hero342→960 e especialistas342→960.120 registros nas oito telas, com currentSrc real e área pintada, cobertura≥1 dentro tolerância de arredondamento. Registro por instância em MEDIA-AUDIT-V3.md.

## 14. QA

PASS47 grupos principais+11 complementares=58. Zero errosJS/HTTP principais e zero violações axe em oito cenários. Seis capítulos testados lento/rápido/reverso/stop/reload/resize; âncoras/back-forward/fullscreen; todos estados editoriais; loops reais, pausa humana, um vídeo ativo; Save-Data/reduced/noJS;21SHA-256 iguais. Inspeção de originais e capturas desktop/mobile/DPR2. Aba inativa e Save-Data simulados; Safari/Firefox e aparelhos/projetores físicos não testados. Nenhuma nova dependência.

## 15. Lint

npm.cmd run lint: PASS, sem erros.

## 16. Typecheck

npm.cmd run typecheck: PASS, sem erros.

## 17. Build

npm.cmd run build: PASS, geração estática e TypeScript concluídos. Produção local executável via npm.cmd run start. V3 não enviada aoGitHub nemVercel.

## 18. Arquivos alterados

Interface: src/app/page.tsx,globals.css; components/motion/ScrollExperience.tsx e novoMobileNarrative.tsx; presentation/CompetencyNetwork.tsx,Experts.tsx e novosStoryChapters.tsx,ActionMural.tsx; ui/Media.tsx; video-story/PracticeVideo.tsx; content/site.ts e novo media.ts.

Ferramentas/configuração: .gitignore,package.json; scripts/prepare-media.py,qa.mjs e novosqa-story-v3.mjs,report-media-v3.py. A foto action agora utilizada deixa de ser reserva ignorada; proteção de img,env,cache,logs e ferramentas locais continua.

Documentos: README; CREATIVE-DIRECTION,CONTENT-MAP,MOTION-SYSTEM,ASSET-INVENTORY,VIDEO-PLAN,QA-REPORT; novosASSET-USAGE-V3,MEDIA-AUDIT-V3,VIDEO-PLAN-V3,VISUAL-QA-V3,DELIVERY-V3; manifesto audit/derivatives.json e derivatives-v3.json; cópias históricasV2. Lista literal Git em CHANGES-V3.md.

Mídia:47 variantes de11fotos+logo+2posters+4vídeos+OG=55arquivos finais empublic/media (7,73MiB). Variantes usadas recompostas,4fotos/lecture adicionados;20variantes geradas obsoletas removidas do disco,17delas rastreadas noGit. Originaisimg intactos (20,90MiB). Manifesto documenta arquivo/peso/resolução/compressão. Capturas,contact sheets eJSON deexecução permanecem ignorados localmente.

Confirmações editoriais existentes (copy,biografias,direitos,marca e domínio institucional) permanecem em TODO-CONTENT.md. O domínio de prévia publicado foi auditado; V3 deve ser revisada localmente antes de autorização para versionar/publicar.
