export type PerguntaFrequente = {
  pergunta: string;
  resposta: string;
};

// Baseado em fatos confirmados no SYSTEM_PROMPT da Bianca (meu-agente/agent_core.py) —
// não inventar respostas aqui sem conferir contra esse arquivo.
export const perguntasFrequentes: PerguntaFrequente[] = [
  {
    pergunta: "Os cursos são reconhecidos pelo MEC?",
    resposta:
      "Os cursos da Uniradiologia são classificados como Cursos Livres de Qualificação Profissional. Essa modalidade é garantida por lei e não exige reconhecimento pelo MEC.",
  },
  {
    pergunta: "Preciso já atuar na área de radiologia para fazer os cursos?",
    resposta:
      "Os cursos são voltados para quem já é formado em áreas afins da radiologia, profissionais que já atuam na área, ou quem já concluiu curso técnico/tecnólogo/graduação e quer se atualizar para o mercado de trabalho. Não são cursos de formação técnica do zero.",
  },
  {
    pergunta: "Como funciona o curso de Tomografia Computadorizada?",
    resposta:
      "É presencial, dentro do Hospital São Vicente de Paulo, com 100h aula e 100% prático — você já opera o equipamento desde o primeiro dia. Acontece de terça a quinta, das 08h às 17h, e as turmas são mensais com apenas 4 vagas.",
  },
  {
    pergunta: "Os outros cursos são realmente 100% online?",
    resposta:
      "Sim. Proteção Radiológica (RDC 611/22 e NR 32), Plano de Proteção Radiológica (PPR) e o Protocolo de Nefroproteção são 100% online, sem turma fixa e sem limite de vagas.",
  },
  {
    pergunta: "Quais são as formas de pagamento?",
    resposta: "Aceitamos PIX ou cartão de crédito, parcelado em até 3x sem juros.",
  },
  {
    pergunta: "Vocês oferecem estágio ou indicam para vagas de emprego?",
    resposta:
      "Não. A Uniradiologia não oferece estágio nem faz indicação para o mercado de trabalho — nosso foco é a qualificação profissional em si.",
  },
  {
    pergunta: "Como tiro outras dúvidas antes de me inscrever?",
    resposta:
      "É só falar com a Bianca, nossa atendente virtual no WhatsApp — ela responde na hora e pode encaminhar pra um atendimento humano se precisar.",
  },
];
