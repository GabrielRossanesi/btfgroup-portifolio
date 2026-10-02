# Relatório de entrega — BTF Group V2

02/10/2026. Registro da entrega visual anterior à autorização de versionamento. A etapa Git posteriormente autorizada está documentada em VERSIONING.md. Publicação do site não realizada. Prévia http://127.0.0.1:3000.

## 1. Diagnóstico da V1

A base técnica estava saudável. O produto ainda seguia uma landing page: fotografia/CTA na abertura, blocos sequenciais, palavras substituídas num manifesto e especialistas apresentados como galeria. Isso não sustentava uma apresentação conduzida em reunião.

## 2. Conceito V2

Uma ideia ganha espaço. Marca e Comunicação abrem a narrativa; desenvolvimento profissional se expande num sistema de competências. Prática, especialistas e contextos empresariais vêm em seguida; origem e conversa encerram. São dez capítulos úteis ao apresentador e ao visitante autônomo. Não houve reinício da engenharia.

## 3. Componentes preservados

Media, Logo, Arrow, derivados responsivos, fontes locais, infraestrutura Next/React/TypeScript/Tailwind, dependências e configuração. Política do vídeo preservada, com textos centralizados. Metadata/robots/sitemap/schema condicional e contatos reais mantidos. Todos os 21 originais passaram na comparação SHA-256.

## 4. Componentes substituídos

HeroTitle e Manifesto removidos do runtime. Page/CSS recompostos: abertura monumental, atos de competências, cenas fotográficas, especialistas individuais, relações empresariais e encerramento. Navigation e ScrollExperience refatorados; CompetencyNetwork e Experts criados. Sem acumular overrides V1 ou inventar biografias.

## 5. Desenvolvimento profissional

Núcleo quase isolado no início. Comunicação, Oratória, Argumentação, Persuasão, Presença e Escuta saem do núcleo, ocupam coordenadas novas e constroem curvas. Há hierarquia de escala e descrição na base, sem caixas/setas de organograma. Scroll reversível, sem snap. Explorar a rede, clicar ou focar um nó conclui a construção e permite sustentar uma conversa sobre cada relação. Conteúdo/posições/descrições centralizados; relações editoriais provisórias.

## 6. Navegação de apresentação

Menu nativo dos dez capítulos, indicador atual discreto e botão de tela cheia desktop. Âncoras respeitam o header e coordenadas de pins. Histórico/back/forward preservados. Trilho de especialistas tem três controles de nomes. Testado o percurso direto pedido no briefing. Tela cheia real foi aberta/fechada pelo botão durante QA.

## 7. Decisões de Motion

Motion restrito à opacidade breve do painel do menu. Não controla abertura, rede, trilho ou fotografia. Reduced motion elimina transições. Nenhuma propriedade/nó é disputado com GSAP. Disclosures, foco, labels e estados seguem HTML/React/CSS.

## 8. Decisões de GSAP

Import dinâmico somente ≥1024 px, altura ≥700, pointer:fine e movimento permitido. Rede: pin do frame, filhos com x/y/scale/opacity e dash SVG comprimento→zero; end de duas alturas úteis, scrub .25. Especialistas: três painéis de largura da viewport; x/distância reais, ease none, scrub .35, pin do viewport. Seleção conclui scrub imediatamente. matchMedia reverte classes/estilos/triggers/listeners; refresh após fontes/imagens/disclosures/fullscreen/histórico. Sem scroll hijacking, smooth-scroll extra, zoom de vídeo ou parallax decorativo.

## 9. Mobile

Narrativa vertical em tablet/mobile, sem pins ou trilho horizontal. Rede vira seis disclosures editoriais; especialistas seguem individualmente. Títulos longos têm escala própria em 360 px, áreas empresariais e canais permanecem completos. Reduced motion desktop usa rede final estática. Sem JS, menu e disclosures nativos funcionam e o vídeo tem link de fallback.

## 10. Lint / TypeScript / build

PASS nos três. Build estático otimizado, sem nova dependência. TypeScript exclui cópias históricas da V1 para não compilá-las como aplicação. Originais, fontes, configuração e dependências preservados.

## 11. QA

PASS: seis resoluções, 31 grupos de verificações, zero erros JS/HTTP de mídia, zero overflow/copy cortada e zero violações detectadas pelo axe. Rede inicial/intermediária/final, nós por teclado, três especialistas, oito áreas empresariais, capítulos, vídeo/pausa persistente, fullscreen real, resize/rotação, reduced motion ao vivo, no-JS e hashes. Projeção revisada em 1920×1080, 1440×900 e 1366×768. Capturas e números em QA-REPORT.md e docs/qa. Não testados hardware de projeção, Safari/Firefox ou aparelhos físicos.

## 12. Arquivos alterados

| Operação | Arquivos |
|---|---|
| Recompostos | src/app/page.tsx; src/app/globals.css; src/content/site.ts |
| Refatorados | src/components/navigation/Navigation.tsx; src/components/motion/ScrollExperience.tsx |
| Criados | src/components/presentation/CompetencyNetwork.tsx; src/components/presentation/Experts.tsx |
| Ajustado | src/components/video-story/PracticeVideo.tsx (copy centralizada) |
| Removidos do runtime | src/components/hero/HeroTitle.tsx; src/components/manifesto/Manifesto.tsx |
| Validação/config | scripts/qa.mjs; tsconfig.json |
| Documentação atualizada | README.md; docs/CREATIVE-DIRECTION.md; docs/CONTENT-MAP.md; docs/MOTION-SYSTEM.md; docs/VIDEO-PLAN.md; docs/TODO-CONTENT.md; docs/ASSET-INVENTORY.md; docs/QA-REPORT.md |
| Documentação criada | docs/DELIVERY-V2.md; docs/history/v1 (documentos, código-chave e resultado QA anterior) |
| Evidências locais | docs/qa/v2-*.png; docs/qa/results.json |

Dados ainda não confirmados ficam ocultos. Copy, paleta, direitos, programas/disponibilidade e domínio aguardam aprovação editorial. Preview segue bloqueado para indexação. WhatsApp +55 11 99384-3003 e contato@btfgroup.com.br estão conectados, sem formulário ou envio automático.
