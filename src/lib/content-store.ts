import "server-only";
import { put, list } from "@vercel/blob";

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

// A URL do blob é estável (mesmo pathname, sem sufixo aleatório, sempre
// sobrescrito no lugar) — resolver uma vez por instância do servidor e
// reusar evita bater na API de management do Blob (list()) a cada leitura,
// o que sob carga esbarra em rate limit e derruba a página com 503.
let cachedContentUrl: string | null = null;

/** Falhas transitórias (rate limit, blip de rede) no Blob não devem virar
 * um "salvei e não vi a mudança" pro usuário — tenta de novo antes de desistir. */
async function withRetry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 400): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
      }
    }
  }
  throw lastError;
}

async function resolveContentUrl(): Promise<string | null> {
  if (cachedContentUrl) return cachedContentUrl;
  const { blobs } = await withRetry(() => list({ prefix: CONTENT_PATHNAME, limit: 1 }));
  cachedContentUrl = blobs[0]?.url ?? null;
  return cachedContentUrl;
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
  return withRetry(async () => {
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Falha ao ler o conteúdo do site no Blob (status ${res.status})`);
    }
    return res.json();
  });
}

/**
 * Lê o conteúdo direto do Blob, sem camada de cache do Next no servidor.
 * O conteúdo é pequeno (poucos KB) e o Blob responde em milissegundos, então
 * não vale a pena arriscar inconsistência por causa de cache no servidor.
 */
export const getContent = fetchContentFromBlob;

/**
 * Lê o conteúdo atual, aplica a mutação e salva de volta no Blob.
 * `mutate` pode alterar `draft` in-place ou retornar um novo objeto.
 *
 * Não chama revalidatePath aqui de propósito: revalidar várias rotas de
 * uma vez dentro da própria Server Action gerava várias leituras do Blob
 * simultâneas na mesma invocação e isso derrubava a chamada com "Connection
 * closed" (visto nos logs da Vercel). Quem chama `updateContent` deve
 * revalidar só o(s) caminho(s) que realmente precisa, depois de salvar.
 */
export async function updateContent(
  mutate: (draft: SiteContent) => SiteContent | void
): Promise<SiteContent> {
  const current = await fetchContentFromBlob();
  const draft = structuredClone(current);
  const result = mutate(draft);
  const next = result ?? draft;

  await withRetry(() =>
    put(CONTENT_PATHNAME, JSON.stringify(next, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    })
  );

  return next;
}
