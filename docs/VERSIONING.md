# Preparação para versionamento

02/10/2026. Git autorizado após a entrega V2. Remote: https://github.com/GabrielRossanesi/btfgroup-portifolio.git. Branch main. Repositório remoto consultado e fetch realizado: sem histórico ou branches existentes nesta preparação. Sem force push.

## Revisão

git status e lista completa de não rastreados revisados. .gitignore ampliado para Node/Next: dependências, build, caches, logs, temporários, IDE, ambiente/credenciais e ferramentas internas. .gitattributes registra normalização textual e assets binários. Identidade Git existente preservada.

Varredura dos arquivos textuais candidatos para chaves privadas, API keys, tokens GitHub/OpenAI/Google/Slack/AWS, JWT, credenciais em URL e segredos literais: nenhum identificado. Contatos comerciais públicos confirmados e créditos/licenças permanecem no projeto.

## Acervo e exclusões

- img: 21 originais, 20,90 MiB; maior original ~11,89 MiB. Preservados no disco e ignorados no Git.
- public/media: somente 29 derivados utilizados na aplicação/metadata, cerca de 1,97 MiB no total; maior arquivo practice.mp4, 450.335 bytes (~440 KiB).
- Fontes locais, licenças e icon.png incluídos.
- Quatro derivados action-* de reserva, capturas/frames de auditoria, resultados QA gerados, ferramentas, skills locais e caches não enviados.
- Todos os arquivos .env* excluídos, inclusive o exemplo local sem credenciais. Configuração opcional documentada no README.

O site não depende dos originais: assets prontos estão versionados. Scripts de preparação e a etapa de comparação de hashes do QA completo dependem do acervo original local, deliberadamente externo ao Git. Os 21 originais locais foram preservados e verificados pelo QA.

## Validação pré-commit

Lint, TypeScript e build de produção aprovados. Servidor local iniciado novamente; QA disponível executado antes do commit: seis resoluções, 31 grupos, zero erros JS/HTTP de mídia e zero violações detectadas pelo axe.

Não foram alterados frontend, estilos, animações ou comportamento do produto nesta etapa. Somente Git, exclusões, atributos e documentação de versionamento.

Mensagem do commit: feat: build BTF Group corporate portfolio experience. A identificação definitiva do commit e o estado do envio constam no histórico Git e na resposta final da execução. Publicação do código no GitHub não constitui deploy do site.


## Atualização V3 e QA pontual — 02/10/2026

Publicação das alterações autorizada pelo usuário após revisão local. Branch main, origin https://github.com/GabrielRossanesi/btfgroup-portifolio.git. Fetch prévio confirmou histórico alinhado; envio normal, sem force. Os relatórios anteriores registram o estado local à época da entrega, antes desta autorização.

Incluídos frontend V3, correções Hero/rede/header/Conversa, scripts, configuração, documentação, histórico V2 e derivados usados. public/media contém55arquivos/7,73MiB; maior arquivo practice.mp4,1091814bytes. Não há candidato acima de5MiB. Os21originais (20,90MiB) permanecem locais e intactos; env, node_modules, .next, caches, logs, ferramentas/skills locais e evidências geradas continuam ignorados. A foto action agora efetivamente usada tem derivados incluídos.

Varredura de todos os arquivos textuais candidatos: nenhum segredo literal identificado. Git diff --check aprovado. Lint, typecheck e build de produção aprovados. QA principal47grupos/oito cenários e pontual9grupos aprovados, zero errosJS/HTTP e zero violações axe. Originais preservam SHA-256. Safari/Firefox e dispositivos físicos não testados.

Commit descritivo reúne V3 e QA pontual. Hash definitivo consta no histórico Git e na resposta final. Esta etapa envia código aoGitHub; nenhum comando manual de deploy é executado.
