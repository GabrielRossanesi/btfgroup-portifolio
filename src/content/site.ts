// Commercial copy and editorial relationships are PROVISIONAL, pending client review.
// Facts are limited to the supplied briefing, named portraits and confirmed contact.
export const site = {
  name: "BTF Group",
  title: "BTF Group | Desenvolvimento profissional",
  description: "Conheça a BTF Group: comunicação, oratória, argumentação e presença no desenvolvimento profissional. Especialistas, prática e contextos para sua empresa.",
  email: "contato@btfgroup.com.br", phone: "+55 11 99384-3003", whatsapp: "https://wa.me/5511993843003",
  chapters: [
    { id: "inicio", title: "Abertura" },
    { id: "desenvolvimento", title: "Desenvolvimento profissional" },
    { id: "competencias", title: "O que desenvolvemos" },
    { id: "pratica", title: "Como desenvolvemos" },
    { id: "especialistas", title: "Especialistas" },
    { id: "em-acao", title: "BTF em ação" },
    { id: "empresa", title: "Para sua empresa" },
    { id: "formatos", title: "Formatos" },
    { id: "origem", title: "Nossa origem" },
    { id: "conversa", title: "Conversa" },
  ],
  opening: { brand: ["BTF", "GROUP"], statement: "Conhecimento encontra voz.", bridge: "Comunicação", cue: "Percorra a apresentação" },
  network: {
    title: ["Desenvolvimento", "profissional"],
    intro: "Competências que se conectam.",
    instruction: "Explore uma competência",
    explore: "Explorar a rede",
    description: "Uma ideia bem comunicada envolve mais que a palavra. Envolve voz, raciocínio, presença e escuta.",
    nodes: [
      { id: "comunicacao", title: "Comunicação", description: "Dar clareza às ideias e construir entendimento com quem está do outro lado.", x: 20, y: 18, path: "M460 180 C420 150 310 116 200 116" },
      { id: "oratoria", title: "Oratória", description: "Organizar a fala, explorar a voz e apresentar uma mensagem em diferentes situações profissionais.", x: 74, y: 18, path: "M320 110 C470 24 620 36 740 116" },
      { id: "argumentacao", title: "Argumentação", description: "Construir raciocínios, sustentar pontos de vista e considerar outras perspectivas.", x: 84, y: 50, path: "M740 122 C785 143 810 198 840 276" },
      { id: "persuasao", title: "Persuasão", description: "Comunicar com intenção e respeito, relacionando uma proposta às necessidades de quem escuta.", x: 69, y: 81, path: "M840 284 C828 350 770 426 690 437" },
      { id: "presenca", title: "Presença", description: "Conectar expressão, postura e mensagem para ocupar uma situação de comunicação com consciência.", x: 25, y: 81, path: "M725 122 C980 460 850 530 345 450" },
      { id: "escuta", title: "Escuta", description: "Perceber o contexto, acolher perguntas e abrir espaço para o diálogo.", x: 12, y: 50, path: "M200 122 C138 154 114 207 120 276" },
    ],
  },
  competencies: {
    intro: "Do conhecimento à expressão.",
    acts: [
      { title: "Clareza.", statement: "Uma ideia precisa encontrar o outro.", description: "Organizar a mensagem, escolher as palavras e conectar conhecimento a compreensão.", contexts: ["Reuniões", "Comunicação interna", "Escrita profissional"], media: null as string | null },
      { title: "Presença.", statement: "A mensagem também está em quem fala.", description: "Voz, expressão e postura na construção de uma comunicação consciente.", contexts: ["Apresentações", "Liderança", "Fala em público"], media: "hero" },
      { title: "Argumento.", statement: "Sustentar ideias. Ampliar perspectivas.", description: "Raciocínio, diálogo e intenção para conversas que exigem mais que informação.", contexts: ["Negociação", "Comercial", "Contextos jurídicos"], media: null as string | null },
    ],
  },
  practice: {
    title: ["Conhecimento", "em prática."],
    description: "Entre pessoas, a comunicação deixa de ser apenas uma ideia.",
    filmTitle: ["A voz ocupa", "a sala."],
    filmDescription: "Falar, escutar, experimentar. Um registro real da interação entre participantes.",
    caption: "Participação e troca no acervo BTF Group.",
  },
  expertsIntro: "As pessoas por trás da BTF.",
  experts: [
    { id: "claudia", name: "Claudia Trajano", lines: ["Claudia", "Trajano"], image: "claudia", bio: null as string | null, specialty: null as string | null },
    { id: "francisco", name: "Francisco Barbosa", lines: ["Francisco", "Barbosa"], image: "francisco", bio: null as string | null, specialty: null as string | null },
    { id: "luis", name: "Luís Flora", lines: ["Luís", "Flora"], image: "luis", bio: null as string | null, specialty: null as string | null },
  ],
  action: { title: "O encontro faz parte.", caption: "Pessoas. Ideias. Aprendizado compartilhado.", detail: "A comunicação acontece entre pessoas." },
  business: {
    title: ["Onde a comunicação", "encontra o trabalho."],
    intro: "Um ponto de partida para conversar com RH, T&D e liderança sobre os contextos da sua equipe.",
    relationLabel: "Competências em conexão",
    applications: [
      { area: "Liderança", competencies: ["Comunicação", "Presença", "Escuta"], context: "Dar direção, compartilhar decisões e conduzir conversas com a equipe." },
      { area: "Reuniões", competencies: ["Clareza", "Argumentação", "Escuta"], context: "Apresentar pontos de vista, ouvir perspectivas e organizar a troca de ideias." },
      { area: "Apresentações", competencies: ["Oratória", "Presença", "Comunicação"], context: "Estruturar uma mensagem e apresentá-la para diferentes públicos." },
      { area: "Comercial", competencies: ["Comunicação", "Persuasão", "Escuta"], context: "Compreender necessidades e apresentar propostas com clareza." },
      { area: "Negociação", competencies: ["Argumentação", "Persuasão", "Escuta"], context: "Sustentar posições, considerar interesses e manter espaço para o diálogo." },
      { area: "Atendimento", competencies: ["Comunicação", "Clareza", "Escuta"], context: "Acolher perguntas e explicar informações na relação com clientes." },
      { area: "Jurídico", competencies: ["Argumentação", "Oratória", "Clareza"], context: "Organizar raciocínios e comunicar ideias em contextos jurídicos." },
      { area: "Comunicação interna", competencies: ["Clareza", "Comunicação", "Escuta"], context: "Conectar pessoas e informações na rotina da organização." },
    ],
  },
  formats: {
    title: ["A conversa define", "o próximo passo."],
    description: "Conheça os projetos educacionais nomeados da BTF. Consulte os formatos e a disponibilidade para o seu contexto.",
    consult: "Conversar sobre este projeto",
    items: [
      { title: "Workshop de Oratória", type: "Workshop", published: true },
      { title: "Mentoria Fale com Autoridade", type: "Mentoria", published: true },
      { title: "Treinamentos", type: "Treinamento", published: false },
      { title: "Palestras", type: "Palestra", published: false },
      { title: "Projetos personalizados", type: "Projeto", published: false },
    ],
  },
  origin: {
    title: ["Experiência que", "se encontra.", "Educação que", "se amplia."],
    text: "A BTF Group nasce da união de Claudia Trajano, Francisco Barbosa e Luís Flora em uma proposta de educação prática.",
    connection: "Sua origem tem relação com o projeto Júri Simulado do Tribunal de Justiça. A comunicação conecta essa experiência a diferentes contextos profissionais.",
    caption: "Educação feita de encontros.",
  },
  conversation: { title: ["Sua equipe tem", "conhecimento.", "Vamos dar voz?"], description: "Converse com a BTF sobre comunicação e desenvolvimento profissional na sua empresa.", whatsapp: "Conversar pelo WhatsApp", footer: "Conhecimento encontra voz." },
  ui: {
    skip: "Pular para o conteúdo", home: "BTF Group — início", chapters: "Capítulos", chapterNav: "Navegação por capítulos", current: "Capítulo atual",
    fullscreen: "Tela cheia", exitFullscreen: "Sair da tela cheia", fullscreenError: "O navegador não permitiu tela cheia. A apresentação continua disponível.",
    expertNav: "Selecionar especialista", expertAbout: "Sobre", back: "Voltar à abertura",
    video: { label: "Registro silencioso de uma apresentação com interação entre participantes", fallback: "O registro mostra uma pessoa apresentando e interagindo com o público em uma sala de treinamento.", play: "Reproduzir vídeo", pause: "Pausar vídeo", watch: "Assistir", paused: "Pausar", silent: "Sem áudio", link: "Assistir ao vídeo silencioso" },
  },
  media: {
    hero: "Pessoa fala ao microfone entre participantes em um encontro de educação",
    action: "Apresentação diante de uma turma e projeção sobre oratória e redação",
    detail: "Vista entre as cadeiras de uma sala durante uma apresentação",
    experience: "Turma reunida em uma sala de formação",
    origin: "Participantes reunidos em uma sala de educação prática",
    portraitPrefix: "Retrato institucional de",
  },
};
export function getContactUrl() {
  const candidate = process.env.NEXT_PUBLIC_CONTACT_URL;
  if (candidate) { try { const url = new URL(candidate); if (url.protocol === "https:" || url.protocol === "mailto:") return url.toString(); } catch { /* Confirmed fallback. */ } }
  return `${site.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de conversar sobre a BTF para minha empresa.")}`;
}
export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return null;
  try { const url = new URL(raw); return url.protocol === "https:" ? url.origin : null; } catch { return null; }
}
export function getProductUrl(title: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${title}.`)}`;
}
