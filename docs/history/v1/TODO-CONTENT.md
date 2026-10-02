# Pendências da cliente

Não bloquear o design nem inventar dados. Os dados abaixo precisam de confirmação antes da publicação comercial.

- [x] Canal comercial informado diretamente pela cliente em 02/10/2026: WhatsApp **5511993843003**, e-mail **contato@btfgroup.com.br**. Implementar links oficiais, sem envio automático.
- [ ] Domínio canônico definitivo para `NEXT_PUBLIC_SITE_URL`; indexação bloqueada até configurá-lo.
- [ ] Aprovação da copy de hero, manifesto, soluções, origem e CTA.
- [ ] Manual de marca: azul oficial, versões do logo e usos permitidos. Logo existente é branco transparente; azul proposto vem dos retratos.
- [ ] Biografia de Claudia Trajano, Francisco Barbosa e Luís Flora, com cargos/especialidades/formações exatamente aprovados. Campos opcionais vazios, disclosure mostra TODO quando aberto.
- [ ] Confirmação formal das identidades dos três retratos nomeados. Associação atual baseada nos nomes dos arquivos e no briefing; não por aparência.
- [ ] Identificação e contexto de cada pessoa, turma e evento nos arquivos WhatsApp: IDENTIDADE A CONFIRMAR.
- [ ] Direitos de uso das fotografias e vídeos, incluindo participantes e menores, se houver; aprovação do recorte e dos trechos escolhidos.
- [ ] Relação institucional e narrativa definitiva do Júri Simulado do Tribunal de Justiça, tribunal específico, datas, cronologia e eventual uso do nome institucional.
- [ ] Informações oficiais sobre Workshop de Oratória e Mentoria Fale com Autoridade: programa, públicos, disponibilidade, carga horária, formato, inscrições e destino.
- [ ] Validação dos quatro territórios corporativos provisórios. Eles não são apresentados como produtos in-company existentes.
- [ ] Formatos de entrega para RH/T&D: treinamento, mentoria, palestra, projeto; condições, formatos online/presencial, região de atuação. Não afirmar abrangência nacional sem confirmação.
- [ ] Métricas verificáveis, somente se desejar publicá-las: alunos, empresas, eventos, horas, fonte e data de atualização. Nenhuma está renderizada.
- [ ] Cases, depoimentos com autorização, logos de clientes e evidências. Nenhum está renderizado.
- [ ] Links sociais oficiais. Nenhum endereço foi inventado.
- [ ] Razão social, CNPJ, sede, responsável e política de privacidade caso o site receba dados por um backend no futuro. Site atual usa somente links para canais oficiais, sem formulário ou armazenamento.
- [ ] Legendas/transcrição se forem acrescentados vídeos com áudio informativo. Os derivados atuais são visuais silenciosos.
- [ ] Aprovação editorial e de imagem antes de ativar indexação e publicar.

## Integração técnica preparada

Conteúdo em `src/content/site.ts`; URL comercial confirmada, substituível por variável de ambiente; bios e métricas opcionais. Sem endpoint de formulário ou banco; contato direto pelos canais oficiais. Os links WhatsApp e e-mail permitem que o visitante inicie uma conversa no canal escolhido. Sem storage ou analytics.
