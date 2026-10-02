// Copy is provisional. Only client-confirmed facts belong in optional factual fields.
export const site = {
  name: "BTF Group",
  title: "BTF Group | Comunicação que transforma",
  description: "Educação prática em comunicação, oratória, argumentação e presença profissional. Conheça a BTF Group, seus especialistas e projetos educacionais.",
  email: "contato@btfgroup.com.br",
  phone: "+55 11 99384-3003",
  whatsapp: "https://wa.me/5511993843003",
  hero: {
    title: ["Comunicação", "que transforma."],
    description: "Conhecimento ganha força quando encontra voz. Educação prática em comunicação, oratória e presença profissional.",
  },
  manifesto: [
    { word: "Apresentar.", description: "Dar clareza às ideias. E presença a quem as comunica." },
    { word: "Argumentar.", description: "Construir raciocínios que conectam conhecimento e compreensão." },
    { word: "Persuadir.", description: "Comunicar com intenção, escuta e respeito a quem está do outro lado." },
    { word: "Liderar.", description: "Transformar uma boa conversa em direção compartilhada." },
  ],
  solutions: [
    { title: "Comunicação executiva", description: "Clareza para conversas que movem o trabalho: reuniões, apresentações e comunicação com clientes, equipes e líderes.", contexts: "Reuniões, liderança e relações profissionais" },
    { title: "Oratória & presença", description: "Explorar voz, expressão e construção da mensagem para apresentar ideias com segurança, em diferentes situações profissionais.", contexts: "Apresentações, entrevistas e fala em público" },
    { title: "Argumentação & persuasão", description: "Organizar ideias, sustentar pontos de vista e considerar a perspectiva de quem escuta. Comunicação que abre espaço para o diálogo.", contexts: "Conversas difíceis, defesa de ideias e negociação" },
    { title: "Escrita & posicionamento", description: "Levar clareza e intenção também à palavra escrita, conectando comunicação profissional, marketing e posicionamento.", contexts: "Comunicação escrita e posicionamento profissional" },
  ],
  products: ["Workshop de Oratória", "Mentoria Fale com Autoridade"],
  experts: [
    { name: "Claudia Trajano", image: "claudia", bio: null as string | null, specialty: null as string | null },
    { name: "Francisco Barbosa", image: "francisco", bio: null as string | null, specialty: null as string | null },
    { name: "Luís Flora", image: "luis", bio: null as string | null, specialty: null as string | null },
  ],
  // Do not populate without verified figures and client approval.
  metrics: [] as { value: string; label: string }[],
  about: "A BTF Group reúne Claudia Trajano, Francisco Barbosa e Luís Flora em uma proposta de educação prática. Sua origem tem relação com o projeto Júri Simulado do Tribunal de Justiça. Essa conexão com a educação jurídica abre espaço para desenvolver comunicação em diferentes contextos profissionais.",
};

export function getContactUrl() {
  const candidate = process.env.NEXT_PUBLIC_CONTACT_URL;
  if (candidate) {
    try {
      const url = new URL(candidate);
      if (url.protocol === "https:" || url.protocol === "mailto:") return url.toString();
    } catch { /* Use the client-confirmed default when configuration is invalid. */ }
  }
  return `${site.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de conversar sobre a BTF para minha empresa.")}`;
}

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    return url.origin;
  } catch { return null; }
}
