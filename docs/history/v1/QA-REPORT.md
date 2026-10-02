# QA — BTF Group

02/10/2026. Build Next.js 16.3.8, React 19.3.0, Node 24.14.0. Resultado final: **PASS**.

## Validação

Build de produção, lint e tipagem concluídos. `npm run qa`: seis viewports, 25 grupos de verificações funcionais, zero erros JavaScript e zero respostas HTTP 4xx/5xx de assets. Os 21 originais preservam os SHA-256 registrados na auditoria inicial. A instalação de dependências reportou zero vulnerabilidades na auditoria npm.

QA automatizado usa Edge Chromium headless isolado, Playwright e axe-core. Inspeção visual adicional no navegador integrado do Codex. Os testes não utilizam o perfil ou abas do usuário.

| Viewport | Overflow horizontal | Texto ultrapassando coluna | Pins | Axe WCAG 2 A/AA e 2.1 AA |
|---|---|---|---|---|
| 1920×1080 | Não | Não | 2, desktop | 0 violações |
| 1440×900 | Não | Não | 2, desktop | 0 violações |
| 1366×768 | Não | Não | 2, desktop | 0 violações |
| Tablet 768×1024 | Não | Não | 0 | 0 violações |
| Mobile 390×844 | Não | Não | 0 | 0 violações |
| Mobile 360×800 | Não | Não | 0 | 0 violações |

Axe complementa a inspeção, não constitui certificação. Foco visível, navegação sem mouse, disclosures nativos, skip link e estrutura semântica também foram verificados.

## Comportamentos verificados

- Quatro estados do manifesto desktop e seleção por toque emulado no tablet/mobile.
- Foco do último especialista desloca o trilho até Luís Flora; Enter abre/fecha a biografia TODO e o controle permanece visível.
- Soluções: exclusividade de disclosure e operação por Enter.
- Menu mobile: abre/fecha, Escape devolve foco ao summary, navegação fecha o menu.
- Vídeo: 478×850, 9 s, muted, sem deformação; play/pausa e pausa do usuário preservada ao sair/retornar à viewport. Mobile sem source/download antes de play explícito.
- Reduced motion inicial: sem pin, sem source de vídeo, quatro palavras em lista. Alteração da preferência ao vivo inicia/reverte o sistema corretamente.
- Resize desktop → 390×844 → 844×390 → desktop; sem pins em touch/baixa altura e sem overflow.
- Telas 2560×1440 e 1280×1600: sem overflow do documento.
- Âncoras e back/forward, com atualização dos triggers.
- Sem JS: conteúdo, quatro palavras, nomes, fotos e links comerciais; menu/disclosures nativos funcionam e vídeo tem link de fallback.
- Integridade por hash de todos os originais, robots de preview, noindex e contatos reais.

## Ajustes encontrados e resolvidos

Título do CTA em 360 px; carregamento de vídeo após adicionar sources com preload none; contraste durante modulação da palavra no desktop; contraste durante troca no tablet (agora somente escala); fundo explícito no trilho de especialistas; recorte dos retratos alinhado ao topo; margem de crop no parallax; import de GSAP restrito ao desktop elegível.

## Performance local

PerformanceObserver/Resource Timing em loopback, sem throttling ou aparelho físico. **Estes números não representam Core Web Vitals de produção ou promessa de 60 fps.**

| Viewport | CLS inicial | LCP local | JS transferido inicial | Mídia inicial |
|---|---|---|---|---|
| 1920×1080 | 0 | 332 ms | ~221 KiB | ~212 KiB |
| 1440×900 | 0 | 112 ms | ~221 KiB | ~185 KiB |
| 1366×768 | 0 | 124 ms | ~221 KiB | ~202 KiB |
| 768×1024 | 0 | 112 ms | ~177 KiB | ~124 KiB |
| 390×844 | 0 | 160 ms | ~177 KiB | ~88 KiB |
| 360×800 | 0 | 112 ms | ~177 KiB | ~88 KiB |

Transferência inclui headers. Imagens lazy próximas podem ser antecipadas pelo browser. GSAP/ScrollTrigger acrescentam ~44 KiB somente no desktop elegível. As duas fontes locais somam 66.2 KiB em arquivo. Hero de maior largura: ~89 KiB.

Vídeo escolhido: original ~2 MiB; MP4 ~440 KiB / WebM ~426 KiB, ~78–79% menores; poster ~28 KiB. Sem áudio e com trecho/fps limitados. Imagens com dimensões explícitas e srcset. Não há vídeo ampliado para paisagem.

Timelines/listeners são limpos no ciclo de vida; não há wheel/touchmove hijacking, polling, smooth-scroll adicional ou custom cursor. Scrub em transform/opacity e vídeo pausado fora da viewport/aba inativa.

## SEO e evidências

WhatsApp 5511993843003 e e-mail contato@btfgroup.com.br confirmados diretamente pela cliente. Preview com noindex/nofollow e robots bloqueado. Canonical, URLs de OpenGraph/Twitter, sitemap e schema Organization são ativados ao configurar origem HTTPS confirmada em NEXT_PUBLIC_SITE_URL e reconstruir. Sem endereço, CNPJ, clientes ou certificações inventados.

`docs/qa/results.json`: resultados detalhados. `verified-hero-*.png`: seis viewports. Capturas de cada capítulo, `expert-keyboard-*.png`, `reduced-motion.png` e `no-js.png`: evidências. Capturas full-page podem conter imagens lazy ainda não visitadas; a suíte percorre cada capítulo e verifica respostas dos assets.

## Limites restantes

Domínio, copy, biografias, manual de marca, contexto e direitos de imagem permanecem em TODO-CONTENT.md. Nenhuma publicação foi feita. Safari/Firefox e aparelhos físicos não foram testados nesta execução; validar no ambiente de hospedagem quando existir.

ESLint 9.39.5 está fixado por compatibilidade com plugins oficiais do Next.js; ESLint 10 foi avaliado e ainda incompatível com esses plugins. Ferramenta apenas de desenvolvimento, sem overrides de dependências.
