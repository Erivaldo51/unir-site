import "server-only";
import { put, list } from "@vercel/blob";
import { unstable_cache, updateTag } from "next/cache";

export type Curso = {
  slug: string;
  nome: string;
  modalidade: "Presencial" | "Online";
  detalhesModalidade: string;
  resumo: string;
  preco: string | null;
  checkoutUrl: string | null;
  destaque?: boolean;
  imagem: string;
  imagemFoco?: string;
  ctaLabel?: string;
};

export type FonteNoticia = {
  titulo: string;
  descricao: string;
  url: string;
  logo: string;
};

export type PerguntaFrequente = {
  pergunta: string;
  resposta: string;
};

export type LinkAfiliado = {
  titulo: string;
  descricao: string;
  url: string;
  categoria: "Livro" | "Evento" | "Equipamento" | "Outro";
};

export type FotoGaleria = {
  src: string;
  alt: string;
};

export type SiteContent = {
  cursos: Curso[];
  noticias: FonteNoticia[];
  faq: PerguntaFrequente[];
  afiliados: LinkAfiliado[];
  galeria: FotoGaleria[];
  textos: {
    hero: {
      selo: string;
      titulo: string;
      subtitulo: string;
      ctaVerCursos: string;
      ctaWhatsapp: string;
    };
    home: {
      credibilidadeTitulo: string;
      credibilidadeTexto: string;
      galeriaTitulo: string;
    };
    quemSomos: {
      fundadorNome: string;
      fundadorCargo: string;
      fundadorFoto: string;
      paragrafos: string[];
    };
    contato: {
      titulo: string;
      intro: string;
      textoWhatsapp: string;
      textoInstagramHandle: string;
      textoGrupo: string;
      textoLinkGrupo: string;
      textoBotaoFinal: string;
    };
    footer: {
      institucional: string;
    };
    menu: { label: string; href: string }[];
    botoes: {
      headerVerCursos: string;
      homeVerTodos: string;
      cursoMaisProcurado: string;
      cursoConsultarValor: string;
      cursoEmBreve: string;
    };
  };
  config: {
    whatsappNumber: string;
    whatsappMensagemPadrao: string;
    instagramUrl: string;
    youtubeUrl: string;
    mapsUrl: string;
    whatsappGrupoUrl: string;
    address: string;
    cnpj: string;
    ga4Id: string;
    metaPixelId: string;
  };
};

const CONTENT_PATHNAME = "content/site-content.json";
const CONTENT_TAG = "site-content";

async function resolveContentUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: CONTENT_PATHNAME, limit: 1 });
  return blobs[0]?.url ?? null;
}

async function fetchContentFromBlob(): Promise<SiteContent> {
  const url = await resolveContentUrl();
  if (!url) {
    throw new Error(
      "content/site-content.json não encontrado no Blob — rode o script de seed (scripts/seed-content.mjs) antes de usar o site."
    );
  }
  // O Blob serve esse arquivo com Cache-Control de 30 dias via CDN — sem um
  // query param único, `cache: "no-store"` só evita o cache do Next, e a CDN
  // do Blob ainda pode responder com uma cópia antiga (quebra o read-your-own-writes).
  const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Falha ao ler o conteúdo do site no Blob (status ${res.status})`);
  }
  return res.json();
}

/** Leitura cacheada — usada pelas páginas públicas. Invalidada via updateTag em toda escrita. */
export const getContent = unstable_cache(fetchContentFromBlob, ["site-content"], {
  tags: [CONTENT_TAG],
});

/**
 * Lê o conteúdo atual (sem cache, direto do Blob), aplica a mutação e salva de volta.
 * `mutate` pode alterar `draft` in-place ou retornar um novo objeto.
 * Só pode ser chamada a partir de uma Server Action (usa `updateTag` para
 * garantir que a própria requisição que salvou já veja o dado novo).
 */
export async function updateContent(
  mutate: (draft: SiteContent) => SiteContent | void
): Promise<SiteContent> {
  const current = await fetchContentFromBlob();
  const draft = structuredClone(current);
  const result = mutate(draft);
  const next = result ?? draft;

  await put(CONTENT_PATHNAME, JSON.stringify(next, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  updateTag(CONTENT_TAG);

  return next;
}
