# BTF Group — apresentação digital V4

Apresentação para reunião conduzida ou navegação autônoma. Next.js App Router, React, TypeScript, Tailwind, Motion e GSAP/ScrollTrigger. V4: mosaico real de nove fotografias, transição Hero/rede corrigida, capítulo audiovisual, especialistas coordenados e turmas em grid. Versionamento e envio ao [repositório GitHub](https://github.com/GabrielRossanesi/btfgroup-portifolio) autorizados em 2 de outubro de 2026. Histórico V1/V2/V3 em docs/history.

## Executar

Node validado: 24.14.0. Na raiz:

```powershell
npm.cmd ci
npm.cmd run dev
# Produção local:
npm.cmd run build
npm.cmd run start
```

Prévia http://127.0.0.1:3000, limitada ao computador local. npm.cmd evita bloqueio PowerShell de npm.ps1. Instalação/build/execução não dependem dos originais em img; os derivados necessários estão em public/media.

## Apresentar e editar

Onze capítulos: abertura, desenvolvimento, competências, prática, especialistas, movimento, ação, empresa, formatos, origem, conversa. Scroll nativo reversível; fullscreen; seis pins no desktop elegível. Mobile/tablet/reduced motion em fluxo. Sem JavaScript: onze capítulos, quatorze cenas, menu nativo e quatro links MP4. Controles de capítulos/cenas funcionam por teclado.

src/content/site.ts centraliza copy, alt, labels, contextos, especialistas, formatos e vídeos. src/content/media.ts contém metadados gerados. Frases comerciais novas são PROVISÓRIAS; Aprender/Experimentar/Trocar não são método oficial confirmado. Bio/especialidade null ficam omitidas. Produtos conhecidos: Workshop de Oratória e Mentoria Fale com Autoridade; disponibilidade consultada com a BTF. Nenhum cliente/resultado/identidade de participante inferidos das imagens.

Contatos aprovados: +55 11 99384-3003 e contato@btfgroup.com.br. Links abrem canais sem envio automático.

## Configuração pública opcional

```dotenv
NEXT_PUBLIC_SITE_URL=https://dominio-oficial-confirmado
NEXT_PUBLIC_CONTACT_URL=https://wa.me/5511993843003
```

Domínio ilustrativo. Configurar origem HTTPS aprovada e reconstruir. Sem domínio confirmado: noindex/nofollow e robots bloqueado; canonical/sitemap/schema URL/OG absoluto somente quando confirmado. A prévia Vercel foi consultada como referência visual, sem alterar sua publicação.

## Acervo e movimento

21 originais: 15 fotografias + logo + cinco vídeos. Usados: onze fotos, logo, quatro vídeos. Três fotos em reserva, uma quase duplicata e um vídeo não usados; todos preservados por SHA-256. Hero usa nove fotos; duas turmas/ambientes pertencem a Ação. Catálogo literal em docs/ASSET-USAGE-V4.md.

61 arquivos em public/media, 9.97MiB no disco. WebP qualidade 94 diretamente dos JPEG; maior variante dos retratos WebP copiada sem recodificar. sizes inclui escala 1.04; srcset/quadros/densidade física verificados em DPR2. Sem upscale. Uma foto high priority, uma eager/auto, sete lazy na Hero.

Clips silenciosos MP4/WebM com posters: lecture 464×832/7s em Como; gesture 576×1024/2.417s, practice 478×850/8s, exchange 478×850/10s em Movimento. Sources e poster nativo condicionais, posters iniciais lazy. Um player ativo; pausa fora da cena/viewport/aba, pausa humana preservada. Mobile/reduced/Save-Data exigem play explícito. Sem seek por GSAP. Cinco originais revistos integralmente, sem identificar pessoas por aparência.

scripts/prepare-media.py usa Pillow e chama prepare-videos.py/ffmpeg; report-media-v4.py gera curadoria pelos manifests. Ferramentas locais não são dependências de execução. Preparar mídia/verificar hashes exige img e ferramentas locais; não recodificar fontes já otimizadas sem necessidade. Scripts V1/V3 são históricos. Fontes locais e licenças preservadas.

GSAP dinâmico em mínimo 1024×700, pointer fine e movimento permitido. Seis pins scoped; cleanup matchMedia; fontes estabilizadas. Âncoras/header usam início real dos pins; resize/reload/histórico/fullscreen preservam leitura. Motion somente menu. Sem captura de roda, snap ou smoother.

## Validar

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
# Produção local aberta:
npm.cmd run qa
npm.cmd run qa:story
npm.cmd run qa:experience
```

Edge headless isolado sem perfil do usuário. QA geral: 47 grupos/oito cenários, incluindo 1920 e 390 DPR2; zero violações axe nos cenários verificados. Limites: nove grupos. Aceitação: três grupos, quatro loops completos, percurso lento nativo integral em 1920×1080. Imagens, controles, pause, fallbacks, reload, resize, histórico, fullscreen e hashes dos 21 originais. QA_URL permite outra URL local. Save-Data/aba inativa simulados. Safari/Firefox/aparelhos físicos não testados. Medições locais não certificam performance de produção.

Resultados/capturas em docs/qa/v4 e frames em docs/audit/v4 são locais e ignorados. Git protege também img, env, credenciais, cache/logs, node_modules e ferramentas locais. Nenhum original removido e nenhuma dependência adicionada.

## Documentação

- docs/DELIVERY-V4.md: 24 itens; docs/CHANGES-V4.md: lista literal de arquivos. Ambos registram a revisão local anterior à autorização de commit/push; o deploy não faz parte desta etapa.
- docs/VISUAL-QA-V4.md: críticas, correções, evidências, resultados e limites.
- docs/ASSET-USAGE-V4.md e VIDEO-PLAN-V4.md: 21 originais e curadoria dos vídeos.
- docs/CREATIVE-DIRECTION.md, CONTENT-MAP.md, MOTION-SYSTEM.md: decisões atuais.
- docs/PLAN-V4.md: plano anterior à implementação.
- docs/audit/derivatives-v4.json e videos-v4.json: dimensões, peso e seleção.
- docs/history/v3: relatórios anteriores preservados; versões V3 apontam para V4.
- docs/TODO-CONTENT.md: confirmações editoriais pendentes.

Skills frontend-design, frontend-skill e gsap-scrolltrigger aplicadas. Sem novo framework, backend ou dependência.
