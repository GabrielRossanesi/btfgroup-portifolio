from pathlib import Path
import json
records=json.loads(Path('docs/audit/media-metadata.json').read_text(encoding='utf-8'))
desc={
'BTF-Branco-768x146.webp':('Logo branco transparente BTF GROUP','Boa; vetor original seria preferível','Header e footer; versão escura via filtro CSS','P1','Copiar derivado transparente sem crop'),
'Claudia-Trajano-1.webp':('Retrato institucional; nome Claudia Trajano estabelecido pelo arquivo e briefing','Boa; fundo azul embutido','Especialistas','P1','WebP responsivo; não remover fundo'),
'Flora.webp':('Retrato institucional; Luís Flora estabelecido pelo arquivo e briefing','Boa; fundo azul embutido','Especialistas','P1','WebP responsivo'),
'Francisco-1024x759.webp':('Retrato institucional; Francisco Barbosa estabelecido pelo arquivo e briefing','Boa; fundo azul embutido','Especialistas','P1','WebP responsivo'),
'WhatsApp Image 2026-10-02 at 09.04.26 (1).jpeg':('Retrato com livros ao fundo; IDENTIDADE A CONFIRMAR','Média; 640 px','Reserva; identidade jurídica mais dominante','P3','Evitar ampliar'),
'WhatsApp Image 2026-10-02 at 09.04.26 (2).jpeg':('Pessoa sentada à mesa com bandeiras; IDENTIDADE A CONFIRMAR','Boa; composição institucional','Reserva para história se identidade confirmada','P3','WebP se utilizada'),
'WhatsApp Image 2026-10-02 at 09.04.26 (3).jpeg':('Retrato com livros ao fundo, semelhante a (1); IDENTIDADE A CONFIRMAR','Média; 640 px; quase duplicata visual','Reserva; não servir duplicata','P3','Preservar original; sem derivado'),
'WhatsApp Image 2026-10-02 at 09.04.26.jpeg':('Turma diante de tela A voz e a lei da persuasão; IDENTIDADES A CONFIRMAR','Boa; horizontal, espaço superior moderado','Experiência / aprendizado coletivo','P1','WebP 640/960/1600; cortar só na apresentação'),
'WhatsApp Image 2026-10-02 at 09.04.27 (1).jpeg':('Duas pessoas posando com livro; IDENTIDADES A CONFIRMAR','Média; vertical handheld, luz de teto','Reserva; não nomear pessoas ou livro sem validação','P3','Não necessária nesta versão'),
'WhatsApp Image 2026-10-02 at 09.04.27 (2).jpeg':('Apresentação observada entre cadeiras, participante em foreground; IDENTIDADE A CONFIRMAR','Média; obstrução parcial; sensação de estar no encontro','Foto vertical em ação','P1','WebP 480/800/1200; object-position ajustado'),
'WhatsApp Image 2026-10-02 at 09.04.27 (3).jpeg':('Pessoa com microfone participa entre público; IDENTIDADES A CONFIRMAR','Boa; fotografia emocional, 1600 px; limite para 1920','Hero e detalhe de soluções','P1','WebP 640/960/1600; tratamento por CSS, sem upscale no arquivo'),
'WhatsApp Image 2026-10-02 at 09.04.27 (4).jpeg':('Turma em sala ampla; IDENTIDADES A CONFIRMAR','Média; pessoas pequenas no enquadramento','Origem / contexto de formação','P2','WebP; evitar crop que corte participantes'),
'WhatsApp Image 2026-10-02 at 09.04.27.jpeg':('Pessoa apresenta diante de projeção Oratória e Redação: A Arte da Persuasão; IDENTIDADE A CONFIRMAR','Boa; fotografia ampla, projeção clara','BTF em ação, imagem dominante','P1','WebP 640/960/1600'),
'WhatsApp Image 2026-10-02 at 09.04.28 (1).jpeg':('Retrato em evento com bandeiras; IDENTIDADE A CONFIRMAR','Média; quadrado 640 px','Reserva; usar retrato nomeado em especialistas','P3','Não necessária nesta versão'),
'WhatsApp Image 2026-10-02 at 09.04.28 (2).jpeg':('Pessoa fala ao microfone em mesa institucional com bandeiras; IDENTIDADE A CONFIRMAR','Boa; 1600 quadrado, fotografada em ação','Reserva para contexto jurídico','P2','WebP se utilizada; evitar usar como identificação'),
'WhatsApp Image 2026-10-02 at 09.04.28.jpeg':('Pessoa com microfone em ambiente de madeira escura; IDENTIDADE A CONFIRMAR','Média; 633×708, fundo escuro','Reserva; não vincular a nome por aparência','P3','Evitar ampliação')}
vdesc={
'WhatsApp Video 2026-10-02 at 09.04.25 (1).mp4':('Pessoa gesticula; câmera percorre sala e slides; IDENTIDADE A CONFIRMAR','Média; handheld e deslocamento','Reserva de aula','P3'),
'WhatsApp Video 2026-10-02 at 09.04.25.mp4':('Pessoa apresenta diante de slides de oratória e redação; IDENTIDADE A CONFIRMAR','Média; resolução vertical modesta','Reserva; 3–10 s','P2'),
'WhatsApp Video 2026-10-02 at 09.04.26.mp4':('Câmera move-se para palco sem pessoa; IDENTIDADE A CONFIRMAR','Baixa para storytelling; pessoa cortada','Não usar nesta versão','P3'),
'WhatsApp Video 2026-10-02 at 09.04.28.mp4':('Pessoa interage entre cadeiras e participantes; IDENTIDADE A CONFIRMAR','Média; handheld; interação legível','Oratória em movimento, 0.3–9.3 s','P1'),
'WhatsApp Video 2026-10-02 at 09.04.29.mp4':('Apresentação longa entre público e cadeiras; IDENTIDADE A CONFIRMAR','Média; 73 s e câmera oscilante','Reserva; não escolher por ser mais longo','P3')}
lines=['# Inventário de assets','', 'Auditoria em 02/10/2026. 21 arquivos: 16 imagens (incluindo logo) e 5 vídeos. Todos inspecionados em contact sheets; vídeos amostrados no início, meio e fim e probes completos registrados. Originais preservados, com SHA-256 registrado em `docs/audit/media-metadata.json`.','', 'Nomes dos três retratos institucionais vêm dos arquivos e do briefing; nenhuma pessoa foi identificada por reconhecimento facial. Demais pessoas: **IDENTIDADE A CONFIRMAR**. Não extrair formação, cargo, local ou clientes da aparência/ambiente.','', 'P1 = curadoria principal; P2 = reserva útil; P3 = não selecionado. Tamanho em KiB. Dimensões de apresentação aplicam rotação do vídeo, quando presente.','', '| Arquivo | Tipo / tamanho | Dimensões / proporção | Duração / codec | Conteúdo visual | Qualidade | Uso | Otimização | Prioridade |','|---|---|---|---|---|---|---|---|---|']
for r in records:
    w,h=r['width'],r['height']
    if r['type']=='image':
        d,q,u,p,opt=desc[r['file']]; duration='—'
    else:
        d,q,u,p=vdesc[r['file']]; opt='Derivado silencioso MP4/WebM + poster' if p=='P1' else 'Não servir original; orientar/selecionar/comprimir se utilizado'
        rotated='rotation of -90' in r['probe']
        if rotated: w,h=h,w
        duration=f"{r['duration']:.2f} s; H.264 / AAC; ~30fps"
    dims=f'{w}×{h}; {w/h:.3f}:1'+(' (rotacionado)' if r['type']=='video' and 'rotation of -90' in r['probe'] else '')
    lines.append(f"| {r['file']} | {r.get('format','MP4')}; {r['bytes']/1024:.1f} KiB | {dims} | {duration} | {d} | {q} | {u} | {opt} | {p} |")
lines += ['', '## Qualidade e riscos', '', '- Imagens comprimidas pelo WhatsApp, sem RAW; não recuperar detalhe por ampliação artificial.', '- Foto principal limitada a 1600 px; ótima para 1440 px, qualidade moderada em telas densas/1920 px. Derivados não ampliam a resolução.', '- Vídeos todos verticais; dois codificados horizontalmente com rotação de -90°. Autorotate do FFmpeg corrige apresentação nos derivados.', '- Não há vídeo horizontal cinematográfico ou tomadas adequadas para um hero 16:9 sem perdas.', '- Dois retratos de 640×641 são quase duplicatas; não modificar/excluir originais.', '- Logo branco transparente. Não contém azul: a paleta proposta usa os retratos como referência visual e exige manual de marca.', '- Direitos de uso e contexto das imagens precisam de confirmação antes de publicação.', '', '## Artefatos de auditoria', '', '- `docs/audit/contact-1.jpg` a `contact-3.jpg`: todas as imagens e frames de todos os vídeos.', '- `docs/audit/media-metadata.json`: dimensões codificadas, probes, duração, tamanho e hash.', '- `scripts/audit-assets.py`: auditoria reproduzível; não modifica `img`.', '- `docs/VIDEO-PLAN.md`: decisões de vídeo por arquivo.']
Path('docs/ASSET-INVENTORY.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
for p in Path('docs').glob('*.md'):
    text=p.read_text(encoding='utf-8')
    text=text.replace('Contato sem destino confirmado abre preparação de briefing local; nenhum formulário simula envio.','Contato confirmado pela cliente em 02/10/2026: WhatsApp +55 11 99384-3003 e contato@btfgroup.com.br. CTAs abrem o canal oficial, sem formulário ou envio simulado.')
    text=text.replace('`NEXT_PUBLIC_CONTACT_URL` configura canal oficial HTTPS ou mailto; vazio ativa briefing local sem envio.','`NEXT_PUBLIC_CONTACT_URL` permite substituir o WhatsApp oficial confirmado https://wa.me/5511993843003. E-mail confirmado: contato@btfgroup.com.br. Não há armazenamento ou envio automático.')
    text=text.replace('Contato: link comercial configurável','Contato: WhatsApp oficial configurável')
    text=text.replace('Link comercial configurável; fallback dialog que gera briefing local para download','Link WhatsApp oficial e alternativa e-mail')
    text=text.replace('Destino TODO CLIENTE; copy PROVISÓRIO','Destino CONFIRMADO pela cliente; copy PROVISÓRIO')
    text=text.replace('CTA 44 px+, diálogo rolável','CTA 44 px+; link direto')
    text=text.replace('aviso de canal comercial em atualização quando necessário','WhatsApp e e-mail oficiais')
    text=text.replace('empresa jurídica e links sociais TODO CLIENTE','dados jurídicos e links sociais TODO CLIENTE')
    text=text.replace('O fallback de contato explica pendência comercial em texto; o preparo interativo exige JS.','Os links comerciais funcionam sem JavaScript.')
    text=text.replace('Menu e diálogo','Menu').replace('Menu/dialog:','Menu:').replace('dialog/foco/Escape,','menu/foco/Escape,')
    text=text.replace('- [ ] Canal comercial oficial: WhatsApp, e-mail ou URL de formulário. Configurar `NEXT_PUBLIC_CONTACT_URL`. Sem confirmação, interface gera somente briefing local e informa que não há envio.','- [x] Canal comercial informado diretamente pela cliente em 02/10/2026: WhatsApp **5511993843003**, e-mail **contato@btfgroup.com.br**. Implementar links oficiais, sem envio automático.')
    text=text.replace('Formulário atual não envia nem armazena dados.','Site atual usa somente links para canais oficiais, sem formulário ou armazenamento.')
    text=text.replace('Download do briefing executa somente no navegador, sem storage, analytics ou transmissão.','Os links WhatsApp e e-mail permitem que o visitante inicie uma conversa no canal escolhido. Sem storage ou analytics.')
    text=text.replace('URL comercial em variável de ambiente','URL comercial confirmada, substituível por variável de ambiente')
    text=text.replace('Sem endpoint de contato ou banco enquanto não houver destino oficial.','Sem endpoint de formulário ou banco; contato direto pelos canais oficiais.')
    p.write_text(text,encoding='utf-8')
print('Seis documentos concluídos. Contatos confirmados incorporados.')
