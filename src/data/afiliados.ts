export type LinkAfiliado = {
  titulo: string;
  descricao: string;
  url: string;
  categoria: "Livro" | "Evento" | "Equipamento" | "Outro";
};

// Vazio por enquanto — fase 2 do projeto (curadoria de produtos relacionados
// à radiologia: livros, eventos, equipamentos). Popular quando o usuário
// trouxer a lista de links reais.
export const afiliados: LinkAfiliado[] = [];
