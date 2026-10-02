# BTF Group — apresentação digital V2

Apresentação institucional e comercial interativa, para reuniões conduzidas e navegação autônoma. Next.js App Router, React, TypeScript, Tailwind CSS, Motion e GSAP/ScrollTrigger. V1 preservada em docs/history/v1. Repositório: https://github.com/GabrielRossanesi/btfgroup-portifolio. Publicação do site não realizada.

## Executar

Node validado: 24.14.0. Na raiz:

```powershell
npm.cmd ci
npm.cmd run dev
# Produção local:
npm.cmd run build
npm.cmd run start
```

Prévia: http://127.0.0.1:3000. Hostname limitado ao computador local. npm.cmd evita a política de execução de scripts PowerShell.

## Apresentar e editar

Menu Capítulos acessa dez momentos; indicador discreto acompanha o capítulo. Tela cheia no desktop via botão, saída pelo botão/Escape do navegador. Scroll nativo. Desenvolvimento profissional constrói a rede; Explorar a rede ou focar um nó completa o desenho. Especialistas avançam pelo scroll ou pelos três controles de nomes. Áreas empresariais usam disclosures acessíveis.

src/content/site.ts centraliza copy comercial, capítulos, competências/relações, alt/labels, especialistas e formatos. Copy é provisória. bio/specialty null são omitidos. Novos formatos têm published=false e só devem ser liberados quando confirmados. Produtos nomeados conhecidos: Workshop de Oratória e Mentoria Fale com Autoridade; disponibilidade consultada com a BTF.

Contatos confirmados: +55 11 99384-3003, contato@btfgroup.com.br. Links abrem canais oficiais, sem envio automático, formulário ou coleta de dados.

## Domínio

```dotenv
NEXT_PUBLIC_SITE_URL=https://dominio-oficial-confirmado
NEXT_PUBLIC_CONTACT_URL=https://wa.me/5511993843003
```

Domínio acima ilustrativo. Configurar somente origem HTTPS aprovada; reconstruir após mudar env pública. Sem domínio, noindex/nofollow e robots bloqueado; canonical/sitemap/schema URL e OG absoluto somente quando confirmado. Metadata/icon e mídia social preservados.

## Base preservada

21 originais em img intactos por SHA-256; derivados WebP responsivos em public/media, dimensões/srcset/lazy. Duas fontes variáveis locais, ~66 KiB, licenças em docs/licenses. Vídeo 478×850, 9 s, sem áudio, WebM ~426 KiB/MP4 ~440 KiB; só carrega quando necessário, pausa fora da viewport e preserva decisão do usuário.

Não modificar img. Scripts audit-assets.py e prepare-media.py reproduzem preparação; dependem de Pillow/imageio-ffmpeg. Derivados/fontes já incluídos. write-inventory.py pertence à preparação V1 e não deve ser executado para gerar documentos V2.

GSAP importado dinamicamente somente ≥1024 px, altura ≥700, pointer:fine e movimento permitido. matchMedia reverte estilos/pins/listeners no resize/preferência. Mobile/reduced: conteúdo final legível, sem pin; sem JS: menu e disclosures nativos. Motion somente opacity do painel do menu; sem disputa de transforms, snap ou captura de roda.

## Validar

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
# Servidor local aberto:
npm.cmd run qa
```

QA usa Edge headless isolado, Playwright/axe, sem perfil do usuário. Seis viewports, rede/teclado/capítulos/fullscreen/resize/reduced/no-JS/vídeo/hash dos originais. Capturas/resultados em docs/qa, resumo docs/QA-REPORT.md. QA_URL permite outra URL local.

O Git inclui os derivados utilizados pela V2, fontes e licenças. O arquivo de origem img, ferramentas locais, arquivos .env* (inclusive o exemplo local), capturas geradas e a foto otimizada de reserva action-* não são enviados. Nenhum desses arquivos foi apagado. Instalação, build e execução do site independem de img; scripts de preparação e a etapa de hashes do QA completo exigem restaurar o acervo original local. As variáveis opcionais estão documentadas acima e podem ser criadas manualmente em .env.local.

ESLint 9.39.5 mantido pela compatibilidade dos plugins oficiais Next; não há overrides nem novas dependências. Histórico excluído do TypeScript, pois suas cópias não fazem parte da aplicação.

## Documentos

CREATIVE-DIRECTION: diagnóstico, KEEP/REFACTOR/REPLACE, conceito/wireframe.
CONTENT-MAP: capítulos e status editorial.
MOTION-SYSTEM: estados, ownership, triggers, cleanup e fallbacks.
ASSET-INVENTORY / VIDEO-PLAN: auditoria e usos.
TODO-CONTENT: confirmações da cliente.
DELIVERY-V2: relatório completo da reconstrução e arquivos.
QA-REPORT: resultados e limites da validação.

Skills frontend-design, frontend-skill e gsap-scrolltrigger relidas; defaults de landing page cedem à apresentação definida no briefing. Aprovar copy, direitos, marca e domínio antes de publicar.
