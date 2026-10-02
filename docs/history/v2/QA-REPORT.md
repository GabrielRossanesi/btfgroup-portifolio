# QA — BTF Group V2

02/10/2026. **PASS** no build de entrega. Next 16.3.8, React 19.3.0, Node 24.14.0. Lint, TypeScript e build concluídos. QA: 6 viewports, 31 grupos funcionais, zero erros JavaScript/respostas 4xx–5xx de mídia e zero violações detectadas pelo axe.

## Viewports

| Tela | Overflow / copy cortada | Pins | Axe WCAG 2/2.1 A/AA |
|---|---|---|---|
| 1920×1080 | Não / não | 2 | 0 |
| 1440×900 | Não / não | 2 | 0 |
| 1366×768 | Não / não | 2 | 0 |
| 768×1024 | Não / não | 0 | 0 |
| 390×844 | Não / não | 0 | 0 |
| 360×800 | Não / não | 0 | 0 |

Edge Chromium headless isolado, Playwright/axe; sem perfil/abas do usuário. Revisão adicional no navegador integrado e nas capturas de capítulos. Axe complementa inspeção, sem constituir certificação.

## Verificações V2

- Dez capítulos no HTML. Percurso direto Abertura→Especialistas→Empresa→Desenvolvimento→Origem, alinhamento às âncoras, fechamento do menu, Escape devolvendo foco.
- Rede inicial: nós recolhidos e conectores inteiramente retraídos. Intermediária: competências parciais com deslocamento espacial verificável. Final: seis nós e curvas desenhadas. Seleção por foco/Enter explica cada competência e completa scrub imediatamente.
- Especialistas: três painéis individuais; controles Claudia/Francisco/Luís posicionam cada painel por teclado. Sem biografia vazia/TODO.
- Oito aplicações empresariais: disclosure nativo, exclusividade, três competências e contexto; clique/Enter.
- Dois projetos conhecidos publicados; formatos futuros ocultos. Nenhum TODO/identidade não confirmada na interface.
- Vídeo 478×850, muted, reprodução/pausa; mobile sem sources antes de play explícito; pausa do usuário persiste após sair/retornar.
- Reduced motion: rede final estática, sem pins/sources antecipadas. Preferência ao vivo e resize desktop→mobile→paisagem→desktop; telas 2560×1440 e 1280×1600.
- Back/forward entre âncoras. Fullscreen API real via botão; explorar rede em fullscreen; saída sem overflow.
- Sem JavaScript em 390×844: dez capítulos, seis disclosures de competências, menu nativo e contatos funcionais.
- Todos os 21 originais preservam SHA-256 da auditoria. Noindex/robots bloqueado e canais comerciais corretos.

## Correções da revisão

Coluna da palavra comunicação em 1920; indicador de disclosure rotacionado; títulos longos em tablet/360; fundo explícito dos painéis de especialistas; conclusão imediata do scrub ao selecionar; compensação única do header nas âncoras; curvas afastadas dos títulos; dash SVG em unidades reais sem vector-effect que encurtasse o desenho.

## Performance local

Loopback sem throttling, PerformanceObserver/Resource Timing. Não são Core Web Vitals de produção nem promessa de fps.

| Tela | CLS inicial | LCP local | JS inicial |
|---|---|---|---|
| 1920×1080 | 0,00027 | 352 ms | ~217 KiB |
| 1440×900 | 0,00056 | 192 ms | ~217 KiB |
| 1366×768 | 0,00073 | 268 ms | ~217 KiB |
| 768×1024 | 0 | 180 ms | ~173 KiB |
| 390×844 | 0 | 176 ms | ~173 KiB |
| 360×800 | 0 | 164 ms | ~173 KiB |

GSAP/ScrollTrigger ~44 KiB somente desktop elegível; fontes locais ~66 KiB. Abertura tipográfica elimina o download de fotografia de hero. Poster inicial ~28 KiB. Vídeo preservado: WebM ~426 KiB, MP4 ~440 KiB, cerca de 78–79% menores que o original. Não servir vídeo original ou esticar proporção.

## Evidências e limites

docs/qa/results.json registra a execução; v2-opening-*.png, v2-network-*.png, v2-expert-*.png, capítulos, fullscreen, reduced-motion, no-js e v2-preview.png guardam capturas. Arquivos QA ignorados pelo versionamento local. Histórico V1 em docs/history/v1.

Não testados Safari/Firefox nem aparelhos/projetores físicos. Copy, marca, direitos, biografias e domínio seguem pendentes em TODO-CONTENT.md. Etapa Git documentada em VERSIONING.md; publicação do site não realizada.
