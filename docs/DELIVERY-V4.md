# Entrega V4 — 2 de outubro de 2026

Prévia: http://127.0.0.1:3000. V4 pronta para revisão local. Sem commit, push ou deploy nesta rodada; HEAD permanece a290efd. Os 24 itens solicitados:

1. **Causa:** onFocus disparava Explorar (+1051px); ponte sem saída; rede completa ~65% com esperas finais. Não houve disputa de timelines.
2. **Correção:** foco atualiza contexto; Explorar explícito. Máscara na ponte, guard CSS e reorganização contínua.
3. **Final da Hero:** Comunicação encerra antes da rede; últimos cinco estados testados lentamente, rápido e em reverso.
4. **Início da rede:** somente núcleo, depois conexões/conceitos progressivos; foco invisível bloqueado, header sincronizado.
5. **Mosaico:** 12 colunas, registros reais em escalas variadas, navy; drift discreto, escala até 1.04.
6. **Fotos:** nove na Hero. Dos 15 originais fotográficos, onze usados, três reserva e um não usado. Logo usado; quatro dos cinco vídeos usados. Catálogo literal em ASSET-USAGE-V4.md; todos os 21 originais intactos.
7. **Qualidade:** variantes diretas, sem upscale ou compressão em cascata; WebP máximo dos retratos copiado sem recodificação. sizes inclui escala; quadros/densidade física conferidos em DPR1/2.
8. **Vídeos encontrados:** cinco; 14.63, 6.29, 5.78, 10.20 e 73.09s; revistos integralmente e por frames, sem identidade inferida.
9. **Vídeos usados:** quatro. 09.04.26 majoritariamente mostra mesa/projeção vazia; sem trecho humano suficientemente longo.
10. **Destino:** 09.04.25 / 2–9s → Como/Experimentar; 09.04.25 (1) / .1–2.5s → Movimento/Expressar; 09.04.28 / .3–8.3s → Movimento/Compartilhar; 09.04.29 / 58–68s → Movimento/Conversar. Posters e razões em VIDEO-PLAN-V4.md.
11. **Audiovisual:** três cenas coordenadas no novo capítulo, palavra/contexto/registro vertical, mais vídeo em Como. Muted/playsInline/loop; fontes sob demanda; um player ativo; pausa por cena/viewport/aba e pausa humana preservada. Mobile/reduced/Save-Data exigem play explícito.
12. **Ação:** duas turmas/ambientes fora do mosaico, composições alternadas na mesma grid; vídeo de prática migrou para Movimento. Origem textual evita repetição.
13. **Primeiro QA:** rostos nos vazios de GROUP, controles mascarados, vídeo distante, header fracionário, origem repetida/teto, sizes sem scale e posters antecipados. Último percurso revelou mistura de nome/retrato no trilho horizontal.
14. **Após QA:** fotos reposicionadas; máscara na superfície; vídeo recentrado; tolerância no header; origem recomposta; sizes corrigido; posters lazy. Especialistas em cenas verticais coordenadas e mais curtas. Capturas finais revisadas.
15. **1920×1080:** aceitação principal, percurso lento nativo inteiro / 35 estados / onze capítulos; 35 estados editoriais adicionais. Sem overflow, seis pins, zero violações axe.
16. **1440×900:** composição revisada em 35 estados, controles, densidade, slow/fast/reverse/refresh PASS; sem overflow, zero violações axe.
17. **1366×768:** composição/controles revisados em 35 estados, adaptação pela altura útil; sem overflow, zero violações axe.
18. **Mobile:** 390×844 e 360×800, 390 DPR2 e tablet 768×1024; onze capítulos em fluxo, sem pin/overflow, posters/play explícito.
19. **Reduced motion:** sem pins/autoplay, quatorze cenas disponíveis; troca de preferência e fallback sem JavaScript testados.
20. **Performance:** 61 derivados/9.97MiB no disco. Amostra local da abertura ~608KiB em 1920 DPR1, ~1064KiB DPR2; zero fontes de vídeo/posters. LCP 256ms e CLS .000274 em 1920 DPR1 são medições locais, não certificação de produção. Clips silenciosos curtos e fontes/imports condicionais.
21. **Lint:** npm.cmd run lint — PASS.
22. **Typecheck:** npm.cmd run typecheck — PASS.
23. **Build:** npm.cmd run build — PASS, seis rotas estáticas; produção local executável. QA geral 47 grupos/oito cenários, limite nove grupos, aceitação três grupos/quatro loops.
24. **Arquivos:** CHANGES-V4.md traz lista literal; inclui mosaico, capítulos, conteúdo, player, scroll/header, estilos, clips, pipelines, QA e documentação. Sem nova dependência, edição dos originais ou publicação.

CREATIVE-DIRECTION, CONTENT-MAP e MOTION-SYSTEM registram escolhas atuais; PLAN-V4 preserva plano anterior. ASSET-USAGE-V4 classifica cada um dos 21 originais com papel, razão, dimensões e peso. VIDEO-PLAN-V4 documenta os cinco vídeos. VISUAL-QA-V4 reúne crítica, correções, resultados, evidências e limites. Os três relatórios V3 apontam para V4; versões anteriores em history/v3.

Frases comerciais novas são PROVISÓRIAS. Nenhum cliente, case, métrica, depoimento, credencial ou identidade inventados. Contato aprovado: WhatsApp 5511993843003 e contato@btfgroup.com.br. Bios/especialidades e domínio institucional pendentes de confirmação editorial. Safari/Firefox/aparelhos físicos não testados.
