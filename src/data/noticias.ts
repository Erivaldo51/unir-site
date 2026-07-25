export type FonteNoticia = {
  titulo: string;
  descricao: string;
  url: string;
  logo: string;
};

// Curadoria de links externos — sem produção de conteúdo próprio, só interlinkar.
// Inclui sociedades/publicações de radiologia, órgãos reguladores relevantes para
// os cursos (ANVISA/CNEN) e concursos públicos da área (alta retenção de leads).
// Logos em public/logos-noticias/ — favicons oficiais de cada site.
export const fontesNoticias: FonteNoticia[] = [
  {
    titulo: "CONTER — Conselho Nacional de Técnicos em Radiologia",
    descricao: "Órgão regulador da profissão de técnico em radiologia no Brasil — registro, legislação e notícias.",
    url: "https://conter.gov.br/",
    logo: "/logos-noticias/conter.png",
  },
  {
    titulo: "CBR — Colégio Brasileiro de Radiologia e Diagnóstico por Imagem",
    descricao: "Entidade nacional que representa a radiologia no Brasil. Notícias, cursos e publicações científicas.",
    url: "https://cbr.org.br/",
    logo: "/logos-noticias/cbr.png",
  },
  {
    titulo: "Radiologia Brasileira",
    descricao: "Publicação científica oficial do CBR, uma das principais referências acadêmicas do país.",
    url: "https://rb.org.br/",
    logo: "/logos-noticias/rb.png",
  },
  {
    titulo: "SPR — Sociedade Paulista de Radiologia e Diagnóstico por Imagem",
    descricao: "Publica o Jornal da Imagem, referência em radiologia desde 1978.",
    url: "https://www.spr.org.br/",
    logo: "/logos-noticias/spr.png",
  },
  {
    titulo: "SOBRICE — Sociedade Brasileira de Radiologia Intervencionista e Cirurgia Endovascular",
    descricao: "Notícias, destaques científicos e eventos de radiologia intervencionista.",
    url: "https://sobrice.org.br/",
    logo: "/logos-noticias/sobrice.png",
  },
  {
    titulo: "PEBMED (Portal Afya)",
    descricao: "Principal referência em notícias e atualizações para profissionais de saúde no Brasil.",
    url: "https://pebmed.com.br/",
    logo: "/logos-noticias/pebmed.png",
  },
  {
    titulo: "PB Saúde — Fundação Paraibana de Gestão em Saúde",
    descricao: "Portal oficial da gestão de saúde do estado da Paraíba, onde fica a Uniradiologia.",
    url: "https://pbsaude.pb.gov.br/",
    logo: "/logos-noticias/pbsaude.png",
  },
  {
    titulo: "ANVISA — Agência Nacional de Vigilância Sanitária",
    descricao: "Órgão regulador responsável pela RDC 611/22, base do curso de Proteção Radiológica.",
    url: "https://www.gov.br/anvisa/pt-br",
    logo: "/logos-noticias/anvisa.png",
  },
  {
    titulo: "CNEN — Comissão Nacional de Energia Nuclear",
    descricao: "Órgão federal de controle e segurança em radiações ionizantes.",
    url: "https://www.gov.br/cnen/pt-br",
    logo: "/logos-noticias/cnen.png",
  },
  {
    titulo: "PCI Concursos — Vagas para Técnico em Radiologia",
    descricao: "Concursos públicos abertos para técnico em radiologia em todo o Brasil.",
    url: "https://www.pciconcursos.com.br/vagas/tecnico-em-radiologia",
    logo: "/logos-noticias/pci.png",
  },
];
