# BTF Group — apresentação digital V3

Apresentação institucional/comercial para reunião conduzida e navegação autônoma. Next.js App Router, React, TypeScript, Tailwind, Motion e GSAP/ScrollTrigger. Abertura preservada; quatro capítulos reconstruídos, rede evoluída e mídia conferida em DPR2. V3 e correções pontuais validadas; repositório: [BTF Group](https://github.com/GabrielRossanesi/btfgroup-portifolio). Histórico V1/V2 em docs/history.

## Executar

Node validado:24.14.0. Na raiz:

```powershell
npm.cmd ci
npm.cmd run dev
# Produção local:
npm.cmd run build
npm.cmd run start
```

Prévia http://127.0.0.1:3000. Host limitado ao computador local; npm.cmd evita bloqueio PowerShell de npm.ps1.

## Apresentar e editar

Menu Capítulos acessa dez momentos. Scroll nativo, tela cheia no desktop. Rede explica seis relações e reorganiza conceitos; O que apresenta quatro cenas; Como articula três camadas; especialistas mantêm trilho horizontal; mural reúne registros reais; empresa conecta quatro contextos. Controles funcionam por teclado. Mobile mostra todos artigos sem pin; reduced motion mantém conteúdo estático; semJS menu nativo e linksMP4.

src/content/site.ts centraliza copy/alt/labels/contextos/especialistas/formatos. Copy comercial nova PROVISÓRIA; aprender/experimentar/trocar não são método oficial. bio/specialty null omitidos. Produtos conhecidos: Workshop de Oratória e Mentoria Fale com Autoridade; disponibilidade consultada com aBTF. Nenhum case/resultado/cliente inferido das fotos.

Contatos confirmados:+55 11 99384-3003,contato@btfgroup.com.br. Links abrem canais sem envio automático.

## Configuração pública opcional

```dotenv
NEXT_PUBLIC_SITE_URL=https://dominio-oficial-confirmado
NEXT_PUBLIC_CONTACT_URL=https://wa.me/5511993843003
```

Domínio ilustrativo. Configurar origem HTTPS aprovada e reconstruir. Sem domínio institucional confirmado, noindex/nofollow e robots bloqueado; canonical/sitemap/schema URL/OG absoluto somente quando confirmado. A URL Vercel de prévia foi usada na auditoria anterior às alterações, sem publicar V3.

## Mídia e movimento

21 originais em img intactos por SHA-256;14 usados,5reservas,2não usados, com razões em ASSET-USAGE-V3.md.11fotos responsivas+logo+2vídeos+posters+OG,55arquivos/7,73MiB empublic/media. WebP94 direto de JPEG original; maior retratoWebP copiado sem recodificação. Dimensões/srcset/sizes/contain e limites CSS garantem densidade disponível emDPR2. Não ampliar fonte nem modificar img. src/content/media.ts é gerado pelo pipeline.

lecture464×832/7s no Como; practice478×850/9s no mural. Sources condicionais; somente um player toca. Pausa fora da cena/viewport, aba inativa e decisão humana preservada. Mobile/reduced/Save-Data: poster e play explícito. Sem áudio, sem GSAP controlar currentTime.

Scripts audit-assets.py/prepare-media.py usam Pillow/imageio-ffmpeg; derivados/fontes incluídos para executar sem pipeline. report-media-v3.py gera curadoria/auditoria a partir de manifests e QA. write-inventory.py pertence àV1, não usar para substituir documentos V3. Duas fontes locais e licenças preservadas.

GSAP dinâmico somente≥1024×700,pointer fine e movimento permitido. Cinco pins scoped, matchMedia com cleanup; aguarda fontes, preserva posição no reload/resize e resolve âncoras reais. Mobile IO e CSS sem pins. Motion somente menu; não há disputa de transforms, captura de roda ou smoother.

## Validar

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
# Servidor de produção local aberto:
npm.cmd run qa
npm.cmd run qa:story
```

Edge headless isolado, sem perfil do usuário. Oito cenários incluindo1920/390DPR2;47+11grupos, axe, densidade real das imagens, navegação/motion/fallbacks/vídeos/hash dos21originais. QA_URL permite outra URL local. Resultados/capturas emdocs/qa/v3 ignoradosGit. Instalação/build/start independem deimg; preparar mídia e verificar hashes completos exigem acervo original local. Aba inativa/Save-Data simulados. Safari/Firefox/aparelhos/projetores físicos não testados.

Git mantém proteção para originais, env, caches, logs, node_modules, ferramentas locais e capturas. action agora efetivamente usada tem derivados apropriados para futuro versionamento. Nenhum original removido; sem nova dependência. Os relatórios de entrega preservam o estado da revisão local anterior à autorização de versionamento.

## Documentação

- DELIVERY-V3: relatório dos18itens solicitados e CHANGES-V3: lista literal de arquivos.
- VISUAL-QA-V3/QA-REPORT: resultados, correções, evidências e limites.
- MEDIA-AUDIT-V3: cada variante e120instâncias reais por viewport/DPR.
- ASSET-USAGE-V3/VIDEO-PLAN-V3:21originais, curadoria e players.
- CREATIVE-DIRECTION/CONTENT-MAP/MOTION-SYSTEM: planos registrados antes dos componentes e engenharia final.
- ASSET-INVENTORY/VIDEO-PLAN: inventário histórico com referência àV3.
- TODO-CONTENT: confirmações editoriais existentes.

Skills frontend-design e gsap-scrolltrigger aplicadas àV3. Documentação e pipeline descrevem decisões específicas deste portfólio.
