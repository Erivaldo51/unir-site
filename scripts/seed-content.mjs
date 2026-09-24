// Script de migração única: sobe o conteúdo hoje hardcoded no código para o
// Blob, como content/site-content.json. Rodar uma vez com:
//   node --env-file=.env.local scripts/seed-content.mjs
// Depois disso, o site passa a ler/escrever esse conteúdo pelo painel /admin.
import { put, list } from "@vercel/blob";

const cursos = [
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

const noticias = [
  { titulo: "CONTER — Conselho Nacional de Técnicos em Radiologia", descricao: "Órgão regulador da profissão de técnico em radiologia no Brasil — registro, legislação e notícias.", url: "https://conter.gov.br/", logo: "/logos-noticias/conter.png" },
  { titulo: "CBR — Colégio Brasileiro de Radiologia e Diagnóstico por Imagem", descricao: "Entidade nacional que representa a radiologia no Brasil. Notícias, cursos e publicações científicas.", url: "https://cbr.org.br/", logo: "/logos-noticias/cbr.png" },
  { titulo: "Radiologia Brasileira", descricao: "Publicação científica oficial do CBR, uma das principais referências acadêmicas do país.", url: "https://rb.org.br/", logo: "/logos-noticias/rb.png" },
  { titulo: "SPR — Sociedade Paulista de Radiologia e Diagnóstico por Imagem", descricao: "Publica o Jornal da Imagem, referência em radiologia desde 1978.", url: "https://www.spr.org.br/", logo: "/logos-noticias/spr.png" },
  { titulo: "SOBRICE — Sociedade Brasileira de Radiologia Intervencionista e Cirurgia Endovascular", descricao: "Notícias, destaques científicos e eventos de radiologia intervencionista.", url: "https://sobrice.org.br/", logo: "/logos-noticias/sobrice.png" },
  { titulo: "PEBMED (Portal Afya)", descricao: "Principal referência em notícias e atualizações para profissionais de saúde no Brasil.", url: "https://pebmed.com.br/", logo: "/logos-noticias/pebmed.png" },
  { titulo: "PB Saúde — Fundação Paraibana de Gestão em Saúde", descricao: "Portal oficial da gestão de saúde do estado da Paraíba, onde fica a Uniradiologia.", url: "https://pbsaude.pb.gov.br/", logo: "/logos-noticias/pbsaude.png" },
  { titulo: "ANVISA — Agência Nacional de Vigilância Sanitária", descricao: "Órgão regulador responsável pela RDC 611/22, base do curso de Proteção Radiológica.", url: "https://www.gov.br/anvisa/pt-br", logo: "/logos-noticias/anvisa.png" },
  { titulo: "CNEN — Comissão Nacional de Energia Nuclear", descricao: "Órgão federal de controle e segurança em radiações ionizantes.", url: "https://www.gov.br/cnen/pt-br", logo: "/logos-noticias/cnen.png" },
  { titulo: "PCI Concursos — Vagas para Técnico em Radiologia", descricao: "Concursos públicos abertos para técnico em radiologia em todo o Brasil.", url: "https://www.pciconcursos.com.br/vagas/tecnico-em-radiologia", logo: "/logos-noticias/pci.png" },
];

const faq = [
  { pergunta: "Os cursos são reconhecidos pelo MEC?", resposta: "Os cursos da Uniradiologia são classificados como Cursos Livres de Qualificação Profissional. Essa modalidade não exige reconhecimento pelo MEC." },
  { pergunta: "Preciso já atuar na área de radiologia para fazer os cursos?", resposta: "Os cursos são voltados para quem já é formado em áreas afins da radiologia, profissionais que já atuam na área, ou quem já concluiu curso técnico/tecnólogo/graduação e quer se atualizar para o mercado de trabalho. Não são cursos de formação técnica do zero." },
  { pergunta: "Como funciona o curso de Tomografia Computadorizada?", resposta: "É presencial, dentro do Hospital São Vicente de Paulo, com 100h aula e 100% prático — você já opera o equipamento desde o primeiro dia. Acontece de terça a quinta, das 08h às 17h, e as turmas são mensais com apenas 4 vagas." },
  { pergunta: "Os outros cursos são realmente 100% online?", resposta: "Sim. Proteção Radiológica (RDC 611/22 e NR 32), Plano de Proteção Radiológica (PPR) e o Protocolo de Nefroproteção são 100% online, sem turma fixa e sem limite de vagas." },
  { pergunta: "Quais são as formas de pagamento?", resposta: "Aceitamos PIX ou cartão de crédito, parcelado em até 3x sem juros." },
  { pergunta: "Vocês oferecem estágio ou indicam para vagas de emprego?", resposta: "Não. A Uniradiologia não oferece estágio nem faz indicação para o mercado de trabalho — nosso foco é a qualificação profissional em si." },
  { pergunta: "Como tiro outras dúvidas antes de me inscrever?", resposta: "É só falar com a Bianca, nossa atendente virtual no WhatsApp — ela responde na hora e pode encaminhar pra um atendimento humano se precisar." },
];

const galeria = Array.from({ length: 38 }, (_, i) => ({
  src: `/galeria/evento-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: "Evento ou treinamento Uniradiologia",
}));

const content = {
  cursos,
  noticias,
  faq,
  afiliados: [],
  galeria,
  textos: {
    hero: {
      selo: "Desde 2017 formando profissionais de radiologia",
      titulo: "Qualificação profissional em radiologia, com quem já formou centenas de alunos",
      subtitulo:
        "Cursos práticos de Tomografia Computadorizada e Proteção Radiológica, direto com a Uniradiologia Academy. Tire suas dúvidas agora mesmo com a Bianca, nossa atendente virtual.",
      ctaVerCursos: "Ver todos os cursos",
      ctaWhatsapp: "Falar com a Bianca",
    },
    home: {
      credibilidadeTitulo: "Quem somos",
      credibilidadeTexto:
        "A Uniradiologia Cursos e Treinamentos nasceu em 2017 com a missão de viabilizar educação continuada e prestação de serviços na área da radiologia. Já formamos centenas de tecnólogos, técnicos e profissionais em turmas práticas e conteúdos 100% aplicáveis ao dia a dia da radiologia.",
      galeriaTitulo: "Nossos alunos em ação",
    },
    quemSomos: {
      fundadorNome: "Erivaldo Martins",
      fundadorCargo: "Fundador da UNIRadiologia",
      fundadorFoto: "/identidade/erivaldo-martins.png",
      paragrafos: [
        "A UNIRadiologia foi fundada em 2017 por Erivaldo Martins, com a intenção de viabilizar educação continuada e prestação de serviços na área da radiologia.",
        "Desde então, temos desenvolvido eventos, cursos e prestação de serviços na área radiológica — sempre unindo teoria e prática para quem já atua ou está se atualizando para o mercado de trabalho.",
        "Somos uma empresa que fornece cursos e serviços na área da radiologia, com destaque para a formação prática em Tomografia Computadorizada, realizada dentro do Hospital São Vicente de Paulo, e para os cursos e materiais online de Proteção Radiológica, Plano de Proteção Radiológica (PPR) e Protocolo de Nefroproteção.",
      ],
    },
    contato: {
      titulo: "Fale com a gente",
      intro: "A forma mais rápida de tirar dúvidas é falando com a Bianca, nossa atendente virtual no WhatsApp — ela responde na hora.",
      textoWhatsapp: "Fale agora com a Bianca",
      textoInstagramHandle: "@uniradiologia",
      textoGrupo: "Quer receber novidades sobre turmas e vagas do curso de Tomografia Computadorizada?",
      textoLinkGrupo: "Entre no nosso grupo de divulgação",
      textoBotaoFinal: "Falar com a Bianca agora",
    },
    footer: {
      institucional: "Educação continuada e prestação de serviços na área da radiologia, desde 2017.",
    },
    menu: [
      { label: "Início", href: "/" },
      { label: "Cursos", href: "/cursos" },
      { label: "Notícias", href: "/noticias" },
      { label: "Quem Somos", href: "/quem-somos" },
      { label: "Contato", href: "/contato" },
    ],
    botoes: {
      homeVerTodos: "Ver todos",
      cursoMaisProcurado: "Mais procurado",
      cursoConsultarValor: "Consultar valor",
      cursoEmBreve: "Em breve — fale com a Bianca para mais informações",
    },
  },
  config: {
    whatsappNumber: "5583986388435",
    whatsappMensagemPadrao: "Olá! Vim pelo site e gostaria de saber mais sobre os cursos.",
    instagramUrl: "https://www.instagram.com/uniradiologia/?hl=pt-br",
    youtubeUrl: "https://www.youtube.com/@ErivaldoMartins-l6t",
    mapsUrl: "https://maps.app.goo.gl/EXQkPEkhnPgvr9q99",
    whatsappGrupoUrl: "https://chat.whatsapp.com/CTKnF6E2CfU4KwtgohWIBJ",
    address: "Av. Jesus de Nazaré, 147 - Jaguaribe, João Pessoa - PB, CEP: 58015-340 (Hospital São Vicente de Paulo - São Vicente Imagem - SVI)",
    cnpj: "29.011.684/0001-09",
    ga4Id: "G-VM28X34JLT",
    metaPixelId: "",
  },
};

const PATHNAME = "content/site-content.json";

const { blobs } = await list({ prefix: PATHNAME, limit: 1 });
if (blobs.length > 0) {
  console.log(`Já existe content/site-content.json no Blob (${blobs[0].url}).`);
  console.log("Nada foi sobrescrito. Apague o blob manualmente antes de rodar o seed de novo, se for isso que você quer.");
  process.exit(0);
}

const result = await put(PATHNAME, JSON.stringify(content, null, 2), {
  access: "public",
  contentType: "application/json",
  addRandomSuffix: false,
});

console.log("Seed criado com sucesso:", result.url);
