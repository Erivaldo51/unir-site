export type Curso = {
  slug: string;
  nome: string;
  modalidade: "Presencial" | "Online";
  detalhesModalidade: string;
  resumo: string;
  preco: string | null; // null = "consultar na página"
  checkoutUrl: string | null; // null = indisponível, não renderiza CTA
  destaque?: boolean;
  imagem: string; // foto real de treinamento (public/galeria), reaproveitada por tema
  imagemFoco?: string; // object-position CSS — ajusta o enquadramento do corte 16:9 (padrão: "center")
  ctaLabel?: string; // texto do botão de checkout (padrão: "Ver detalhes")
};

// Fonte da verdade: meu-agente/agent_core.py (SYSTEM_PROMPT, seção 7 — Links de Checkout).
// Não alterar preços/links aqui sem conferir contra esse arquivo.
export const cursos: Curso[] = [
  {
    slug: "tomografia-computadorizada",
    nome: "Curso de Tomografia Computadorizada",
    modalidade: "Presencial",
    detalhesModalidade:
      "100h aula, 100% prático — você já opera o equipamento desde o primeiro dia. Turmas mensais de apenas 4 vagas, dentro do Hospital São Vicente de Paulo.",
    resumo: "Formação prática e completa em Tomografia Computadorizada, com turmas mensais reduzidas.",
    preco: "R$ 700 (em até 3x sem juros ou PIX)",
    checkoutUrl: "https://pay.kiwify.com.br/DP4XJqv",
    destaque: true,
    imagem: "/galeria/evento-22.jpg",
    imagemFoco: "50% 25%",
    ctaLabel: "Garantir minha vaga",
  },
  {
    slug: "protecao-radiologica",
    nome: "Curso de Proteção Radiológica (RDC 611/22 e NR 32)",
    modalidade: "Online",
    detalhesModalidade: "100% online, sem turma fixa e sem limite de vagas.",
    resumo: "Conformidade com as normas ANVISA de proteção radiológica, para profissionais e clínicas.",
    preco: "R$ 97 (em até 3x sem juros ou PIX)",
    checkoutUrl: "https://pay.kiwify.com.br/aLhFCUv",
    destaque: true,
    imagem: "/cursos/protecao-radiologica-capa.jpg",
  },
  {
    slug: "ppr",
    nome: "Plano de Proteção Radiológica (PPR)",
    modalidade: "Online",
    detalhesModalidade: "Material e consultoria para elaboração do PPR da sua clínica.",
    resumo: "Documento essencial de conformidade e segurança operacional em radiologia.",
    preco: null,
    checkoutUrl: "https://kiwify.app/c8gVDli",
    imagem: "/cursos/ppr-capa.png",
  },
  {
    slug: "nefroprotecao",
    nome: "Protocolo de Nefroproteção para Meios de Contraste",
    modalidade: "Online",
    detalhesModalidade: "Material com protocolo de segurança para uso de contrastes.",
    resumo: "Protocolo prático para prevenção de nefropatia induzida por contraste.",
    preco: null,
    checkoutUrl: "https://pay.kiwify.com.br/JUi5F91",
    imagem: "/cursos/nefroprotecao-capa.png",
  },
  // TODO(usuário): confirmar o link de checkout real (não está em meu-agente/agent_core.py).
  {
    slug: "ebook-meios-de-contraste",
    nome: "E-book sobre Meios de Contraste",
    modalidade: "Online",
    detalhesModalidade: "Material digital de apoio.",
    resumo: "Implementação de protocolos de segurança e conduta em meios de contrastes na radiologia.",
    preco: null,
    checkoutUrl: null,
    imagem: "/cursos/ebook-meios-de-contraste-capa.png",
    imagemFoco: "50% 15%",
  },
  {
    slug: "documentacao-sanitaria",
    nome: "Documentação Sanitária — 50 POPs editáveis",
    modalidade: "Online",
    detalhesModalidade: "Pacote de 50 Procedimentos Operacionais Padrão, editáveis.",
    resumo: "Para clínicas de Radiodiagnóstico, odontológicas, estéticas e hospitais organizarem sua documentação sanitária.",
    preco: "R$ 47,00",
    checkoutUrl: "https://pay.kiwify.com.br/Rj3dQVK",
    destaque: true,
    imagem: "/cursos/documentacao-sanitaria-capa.png",
    imagemFoco: "50% 15%",
  },
];

export const cursosDisponiveis = cursos.filter((c) => c.checkoutUrl !== null);
export const cursosDestaque = cursos.filter((c) => c.destaque);
