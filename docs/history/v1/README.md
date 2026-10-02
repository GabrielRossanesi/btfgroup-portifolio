# BTF Group — portfólio corporativo

Experiência editorial em português, com fotografia real, um manifesto tipográfico guiado por scroll, especialistas, projetos educacionais e contato corporativo. Implementação local em Next.js App Router, React, TypeScript, Tailwind CSS, Motion e GSAP/ScrollTrigger.

## Executar

Node.js 20.9+; validado com Node 24.14.0. Na raiz do projeto:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abrir http://127.0.0.1:3000. `npm.cmd` evita depender da política de execução de scripts PowerShell.

Produção:

```powershell
npm.cmd run build
npm.cmd run start
```

O servidor está limitado ao computador local. Para hospedagem, adaptar hostname e porta ao provedor escolhido. Nenhuma publicação foi feita por este projeto.

## Conteúdo e contatos

- `src/content/site.ts`: títulos, descrições, soluções, produtos conhecidos, especialistas e campos opcionais.
- WhatsApp confirmado pela cliente: **+55 11 99384-3003**.
- E-mail confirmado: **contato@btfgroup.com.br**.
- Links abrem o canal escolhido; o site não envia mensagens automaticamente, não recebe dados de formulário e não usa analytics.
- Biografias/especialidades não confirmadas ficam `null`. O disclosure informa **TODO** até receber o conteúdo real.
- Métricas ficam em array vazio. Só preencher com números e fontes aprovados.
- Os quatro territórios são uma organização editorial provisória. Produtos conhecidos: Workshop de Oratória e Mentoria Fale com Autoridade. Formatos e disponibilidade devem ser alinhados com a BTF.

## Domínio e SEO

Copiar `.env.example` para `.env.local` e configurar **somente o domínio oficial confirmado**:

```dotenv
NEXT_PUBLIC_SITE_URL=https://dominio-oficial-confirmado
NEXT_PUBLIC_CONTACT_URL=https://wa.me/5511993843003
```

O domínio acima é ilustrativo, não um endereço da BTF. A configuração aceita somente origem HTTPS. Sem domínio, a versão de preparação recebe `noindex, nofollow` e robots com `Disallow: /`. Canonical, URLs absolutas de OpenGraph/Twitter, sitemap e schema Organization passam a ser produzidos quando o domínio é configurado. Após mudar variáveis públicas, reconstruir o site.

Metadata social e imagem de compartilhamento real já estão preparadas. Schema usa apenas nome, descrição, logo e contatos confirmados; sem CNPJ, sede, clientes ou certificações inventados.

## Assets

**Não modificar `/img`.** Os 21 originais têm hashes registrados em `docs/audit/media-metadata.json`. A interface serve somente derivados selecionados em `public/media`.

- WebP em múltiplas larguras, `srcset`, dimensões explícitas, hero com prioridade e demais fotos lazy.
- Duas fontes variáveis locais, recorte Latin com os caracteres portugueses, aproximadamente 66 KiB no total; licenças OFL em `docs/licenses`.
- Vídeo vertical de 9 s, sem áudio, WebM ~426 KiB e MP4 ~440 KiB, poster ~28 KiB. Sources são carregadas só quando necessário. Não há download/autoplay de vídeo em mobile ou reduced motion antes de play explícito.
- A favicon usa o símbolo recortado do logo original; não redesenha a marca.

Os derivados e fontes estão incluídos e não precisam ser gerados para executar ou fazer build. Para refazer curadoria/otimização:

```powershell
python -m pip install Pillow
python -m pip install imageio-ffmpeg --target .tools/python
python scripts/audit-assets.py
python scripts/prepare-media.py
```

Esses scripts não escrevem em `/img`. `prepare-media.py` utiliza o FFmpeg do pacote imageio-ffmpeg e gera os mesmos derivados. A auditoria sobrescreve apenas os próprios relatórios/frames de auditoria.

## Movimento e acessibilidade

Motion controla entrada do título, menu e troca de palavra em touch. GSAP controla manifesto pinned, trilho horizontal, parallax de fotografia e ampliação suave do vídeo. Nenhuma propriedade é disputada pelas duas bibliotecas.

GSAP é importado somente em desktop elegível: largura ≥1024 px, altura ≥700 px, ponteiro fine e movimento permitido. Pins são revertidos em resize ou mudança de preferência. Scroll nativo, sem wheel/touch hijacking ou snap. Navegação por teclado traz o especialista focado ao campo de visão.

Com movimento reduzido: sem pinning, parallax, autoplay ou scrub; manifesto em lista legível. Sem JavaScript: seções, menu nativo, soluções, bios, imagens e links de contato continuam disponíveis. Vídeo tem link de fallback.

## Validação

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
# Com o servidor de produção aberto em outro terminal:
npm.cmd run qa
```

QA usa uma instância **isolada** de Edge headless, sem o perfil ou abas do usuário, com Playwright e axe. Requer Microsoft Edge instalado. Para usar outra URL local, definir `QA_URL`. Capturas e resultados ficam em `docs/qa`; resumo humano em `docs/QA-REPORT.md`.

ESLint 9.39.5 está fixado porque os plugins React/import/jsx-a11y do `eslint-config-next` atual declaram compatibilidade até ESLint 9. ESLint 10 foi avaliado e incompatível com esses plugins; não há overrides de dependência. Atualizar junto com uma versão compatível do pacote oficial. Essa ferramenta é somente de desenvolvimento.

## Documentação do briefing

- `docs/ASSET-INVENTORY.md`: todos os arquivos, dimensões, codec, duração, qualidade, uso e prioridade.
- `docs/CREATIVE-DIRECTION.md`: conceito, paleta, tipografia, wireframe, curadoria e interação assinatura.
- `docs/CONTENT-MAP.md`: capítulos, mensagens, assets, interações, status factual e comportamento por dispositivo.
- `docs/MOTION-SYSTEM.md`: ownership, ciclo de vida, breakpoints e reduced motion.
- `docs/VIDEO-PLAN.md`: curadoria de todos os vídeos e decisões de reprodução.
- `docs/TODO-CONTENT.md`: aprovações e dados editoriais restantes.

As skills oficiais Anthropic frontend-design e GreenSock gsap-scrolltrigger foram lidas, revisadas e instaladas em `.agents/skills`, junto à skill de frontend já existente. Serão descobertas em uma nova sessão/turno conforme o mecanismo de skills do agente. Origem e revisão registradas na direção criativa.

## Antes de publicar

Confirmar domínio, direitos do acervo, copy e biografias. O checklist editorial está em `docs/TODO-CONTENT.md`. A entrega técnica não substitui essa aprovação. Não há fatos ou métricas preenchidos artificialmente para encobrir essas pendências.
