# Plano audiovisual V4

Os cinco originais foram reproduzidos no navegador local, silenciosamente, e revistos por sequência de frames: vídeos curtos a cada 0.5s; registro longo inteiro a cada 3s. A seleção considera ação, enquadramento, duração e papel narrativo. Nomes de participantes não foram inferidos pela aparência.

| Original | Revisão integral e qualidade | Decisão / trecho / poster |
|---|---|---|
| WhatsApp Video 2026-10-02 at 09.04.25.mp4 | 14.63s, 464×832. Pessoa gesticula diante de projeção sobre oratória; câmera relativamente estável, fonte comprimida. | USED: Como / Experimentar. 2–9s, 7s; poster 5s. Contexto de apresentar e experimentar a fala. |
| WhatsApp Video 2026-10-02 at 09.04.25 (1).mp4 | 6.29s; codificado 1024×576, rotação → 576×1024. Pessoa ao microfone com gestos; câmera abandona a pessoa entre 2.5 e 5s e retorna no final. | USED: Movimento / Expressar. 0.1–2.5s, 2.4s; poster 1.2s. O corte evita o pan vazio e privilegia expressão. |
| WhatsApp Video 2026-10-02 at 09.04.28.mp4 | 10.20s, 478×850. Pessoa diante de participantes; câmera abre para o público e retorna, depois se afasta para uma mesa vazia. | USED: Movimento / Compartilhar. 0.3–8.3s, 8s; poster 1s. Sai de Ação; termina antes do pan final sem pessoas. |
| WhatsApp Video 2026-10-02 at 09.04.29.mp4 | 73.09s, 478×850; mesma sala, câmera mais estável. O registro alterna gestos amplos e aproximação dos participantes no final. | USED: Movimento / Conversar. 58–68s, 10s; poster 64s. Novo papel: aproximação e troca, complementando a abertura para o público do anterior. |
| WhatsApp Video 2026-10-02 at 09.04.26.mp4 | 5.78s; codificado 848×480, rotação → 480×848. Pessoa em pé por menos de 1s, depois mesa/projeção domina; enquadramento não sustenta ação. | NOT USED. Preservado localmente. Nenhum poster ou source servido pela aplicação. |

## Composição

BTF em movimento vem após Especialistas e antes de Ação. Palavra/contexto à esquerda, vídeo vertical à direita, dentro da mesma grid. Três cenas pinned no desktop e três artigos em fluxo no mobile/reduced. Navegação de cenas por scroll ou controles explícitos, nunca uma grade de players. O vídeo contextual de Como responde à prática de apresentar; o capítulo dedicado percorre gesto, público e aproximação.

Novas frases são PROVISÓRIAS. Os clips silenciosos mostram movimento e contexto, não traduzem nem alegam o conteúdo falado. Nenhuma instituição visível é apresentada como cliente, case ou comprovação de resultados.

## Engenharia e pixels

H264 CRF21 faststart e VP9 CRF28, 24fps, sem áudio e sem aumento de dimensão. Posters extraídos dos originais, WebP94, sem sharpening. Arquivos e pesos em audit/videos-v4.json. A rotação é respeitada pelo ffmpeg. Desktop DPR1 permite até 300 CSS px conforme altura; DPR2 limita lecture a 232, gesture a 288, practice/exchange a 239. Mobile tem poster e play explícito, até 239px. Os limites respeitam a fonte; fullscreen nativo pode ultrapassar o tamanho de projeto por decisão do usuário.

Somente um player ativo. Pausa ao sair da cena/viewport, ao ocultar a aba e por decisão humana persistente. Fontes WebM/MP4 são alternativas; o navegador escolhe uma. Posters abaixo da dobra são lazy e fontes não existem na abertura. Loop das tomadas handheld pode ter corte perceptível; controles sempre permitem interromper. No-JS mantém links MP4 e descrições.

Quatro loops reais foram observados cruzando seus endpoints; pause/retorno/ratio/fontes/atividade por cena são testados em oito cenários. Save-Data e sinal de aba inativa são simulados explicitamente. Resultados finais em VISUAL-QA-V4.md.
