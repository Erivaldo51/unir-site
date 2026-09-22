"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/admin/session";
import { updateContent, type Curso, type LinkAfiliado } from "@/lib/content-store";

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

function strOrNull(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value === "" ? null : value;
}

// ---------- Cursos ----------

export async function saveCurso(formData: FormData): Promise<void> {
  await verifySession();

  const originalSlug = str(formData, "originalSlug");
  const nome = str(formData, "nome");
  const slug = originalSlug || slugify(nome);

  const curso: Curso = {
    slug,
    nome,
    modalidade: str(formData, "modalidade") === "Presencial" ? "Presencial" : "Online",
    detalhesModalidade: str(formData, "detalhesModalidade"),
    resumo: str(formData, "resumo"),
    preco: strOrNull(formData, "preco"),
    checkoutUrl: strOrNull(formData, "checkoutUrl"),
    destaque: formData.get("destaque") === "on",
    imagem: str(formData, "imagem"),
    imagemFoco: strOrNull(formData, "imagemFoco") ?? undefined,
    ctaLabel: strOrNull(formData, "ctaLabel") ?? undefined,
  };

  await updateContent((draft) => {
    const index = draft.cursos.findIndex((c) => c.slug === originalSlug);
    if (index >= 0) {
      draft.cursos[index] = curso;
    } else {
      draft.cursos.push(curso);
    }
  });

  revalidatePath("/admin/cursos");
  redirect("/admin/cursos?status=saved");
}

export async function deleteCurso(formData: FormData): Promise<void> {
  await verifySession();
  const slug = str(formData, "slug");
  await updateContent((draft) => {
    draft.cursos = draft.cursos.filter((c) => c.slug !== slug);
  });
  revalidatePath("/admin/cursos");
  redirect("/admin/cursos?status=deleted");
}

// Ordem de exibição = ordem do array (não há campo "ordem" nem drag-and-drop
// na UI) — mover um curso pra cima/baixo troca sua posição com a vizinha.
export async function moverCurso(formData: FormData): Promise<void> {
  await verifySession();
  const slug = str(formData, "slug");
  const direcao = str(formData, "direcao") === "cima" ? -1 : 1;

  await updateContent((draft) => {
    const index = draft.cursos.findIndex((c) => c.slug === slug);
    const alvo = index + direcao;
    if (index < 0 || alvo < 0 || alvo >= draft.cursos.length) return;
    [draft.cursos[index], draft.cursos[alvo]] = [draft.cursos[alvo], draft.cursos[index]];
  });

  revalidatePath("/admin/cursos");
  redirect("/admin/cursos?status=saved");
}

// ---------- Notícias ----------

export async function saveNoticia(formData: FormData): Promise<void> {
  await verifySession();
  const index = Number(str(formData, "index") || "-1");
  const item = {
    titulo: str(formData, "titulo"),
    descricao: str(formData, "descricao"),
    url: str(formData, "url"),
    logo: str(formData, "logo"),
  };
  await updateContent((draft) => {
    if (index >= 0 && index < draft.noticias.length) {
      draft.noticias[index] = item;
    } else {
      draft.noticias.push(item);
    }
  });
  revalidatePath("/admin/noticias");
  redirect("/admin/noticias?status=saved");
}

export async function deleteNoticia(formData: FormData): Promise<void> {
  await verifySession();
  const index = Number(str(formData, "index"));
  await updateContent((draft) => {
    draft.noticias.splice(index, 1);
  });
  revalidatePath("/admin/noticias");
  redirect("/admin/noticias?status=deleted");
}

// ---------- FAQ ----------

export async function saveFaq(formData: FormData): Promise<void> {
  await verifySession();
  const index = Number(str(formData, "index") || "-1");
  const item = {
    pergunta: str(formData, "pergunta"),
    resposta: str(formData, "resposta"),
  };
  await updateContent((draft) => {
    if (index >= 0 && index < draft.faq.length) {
      draft.faq[index] = item;
    } else {
      draft.faq.push(item);
    }
  });
  revalidatePath("/admin/faq");
  redirect("/admin/faq?status=saved");
}

export async function deleteFaq(formData: FormData): Promise<void> {
  await verifySession();
  const index = Number(str(formData, "index"));
  await updateContent((draft) => {
    draft.faq.splice(index, 1);
  });
  revalidatePath("/admin/faq");
  redirect("/admin/faq?status=deleted");
}

// ---------- Recursos / afiliados ----------

const CATEGORIAS_VALIDAS: LinkAfiliado["categoria"][] = ["Livro", "Evento", "Equipamento", "Outro"];

export async function saveRecurso(formData: FormData): Promise<void> {
  await verifySession();
  const index = Number(str(formData, "index") || "-1");
  const categoriaInput = str(formData, "categoria");
  const categoria: LinkAfiliado["categoria"] = CATEGORIAS_VALIDAS.includes(
    categoriaInput as LinkAfiliado["categoria"]
  )
    ? (categoriaInput as LinkAfiliado["categoria"])
    : "Outro";

  const item: LinkAfiliado = {
    titulo: str(formData, "titulo"),
    descricao: str(formData, "descricao"),
    url: str(formData, "url"),
    categoria,
  };
  await updateContent((draft) => {
    if (index >= 0 && index < draft.afiliados.length) {
      draft.afiliados[index] = item;
    } else {
      draft.afiliados.push(item);
    }
  });
  revalidatePath("/admin/recursos");
  redirect("/admin/recursos?status=saved");
}

export async function deleteRecurso(formData: FormData): Promise<void> {
  await verifySession();
  const index = Number(str(formData, "index"));
  await updateContent((draft) => {
    draft.afiliados.splice(index, 1);
  });
  revalidatePath("/admin/recursos");
  redirect("/admin/recursos?status=deleted");
}

// ---------- Galeria ----------

export async function addFotos(formData: FormData): Promise<void> {
  await verifySession();
  const urls = formData.getAll("urls").filter((v): v is string => typeof v === "string" && v.length > 0);
  await updateContent((draft) => {
    for (const src of urls) {
      draft.galeria.push({ src, alt: "Evento ou treinamento Uniradiologia" });
    }
  });
  revalidatePath("/admin/galeria");
  redirect("/admin/galeria?status=saved");
}

export async function deleteFoto(formData: FormData): Promise<void> {
  await verifySession();
  const index = Number(str(formData, "index"));
  await updateContent((draft) => {
    draft.galeria.splice(index, 1);
  });
  revalidatePath("/admin/galeria");
  redirect("/admin/galeria?status=deleted");
}

// ---------- Textos institucionais ----------

function parseMenu(raw: string): { label: string; href: string }[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split("|").map((p) => p.trim());
      return { label: label || "", href: href || "/" };
    })
    .filter((item) => item.label);
}

function parseParagrafos(raw: string): string[] {
  return raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function saveTextos(formData: FormData): Promise<void> {
  await verifySession();

  await updateContent((draft) => {
    draft.textos.hero = {
      selo: str(formData, "hero_selo"),
      titulo: str(formData, "hero_titulo"),
      subtitulo: str(formData, "hero_subtitulo"),
      ctaVerCursos: str(formData, "hero_ctaVerCursos"),
      ctaWhatsapp: str(formData, "hero_ctaWhatsapp"),
    };
    draft.textos.home = {
      credibilidadeTitulo: str(formData, "home_credibilidadeTitulo"),
      credibilidadeTexto: str(formData, "home_credibilidadeTexto"),
      galeriaTitulo: str(formData, "home_galeriaTitulo"),
    };
    draft.textos.quemSomos = {
      fundadorNome: str(formData, "quemSomos_fundadorNome"),
      fundadorCargo: str(formData, "quemSomos_fundadorCargo"),
      fundadorFoto: str(formData, "quemSomos_fundadorFoto"),
      paragrafos: parseParagrafos(str(formData, "quemSomos_paragrafos")),
    };
    draft.textos.contato = {
      titulo: str(formData, "contato_titulo"),
      intro: str(formData, "contato_intro"),
      textoWhatsapp: str(formData, "contato_textoWhatsapp"),
      textoInstagramHandle: str(formData, "contato_textoInstagramHandle"),
      textoGrupo: str(formData, "contato_textoGrupo"),
      textoLinkGrupo: str(formData, "contato_textoLinkGrupo"),
      textoBotaoFinal: str(formData, "contato_textoBotaoFinal"),
    };
    draft.textos.footer = {
      institucional: str(formData, "footer_institucional"),
    };
    draft.textos.menu = parseMenu(str(formData, "menu"));
    draft.textos.botoes = {
      homeVerTodos: str(formData, "botoes_homeVerTodos"),
      cursoMaisProcurado: str(formData, "botoes_cursoMaisProcurado"),
      cursoConsultarValor: str(formData, "botoes_cursoConsultarValor"),
      cursoEmBreve: str(formData, "botoes_cursoEmBreve"),
    };
  });

  revalidatePath("/admin/textos");
  redirect("/admin/textos?status=saved");
}

// ---------- Configurações ----------

export async function saveConfig(formData: FormData): Promise<void> {
  await verifySession();

  await updateContent((draft) => {
    draft.config = {
      whatsappNumber: str(formData, "whatsappNumber"),
      whatsappMensagemPadrao: str(formData, "whatsappMensagemPadrao"),
      instagramUrl: str(formData, "instagramUrl"),
      youtubeUrl: str(formData, "youtubeUrl"),
      mapsUrl: str(formData, "mapsUrl"),
      whatsappGrupoUrl: str(formData, "whatsappGrupoUrl"),
      address: str(formData, "address"),
      cnpj: str(formData, "cnpj"),
      ga4Id: str(formData, "ga4Id"),
      metaPixelId: str(formData, "metaPixelId"),
    };
  });

  revalidatePath("/admin/configuracoes");
  redirect("/admin/configuracoes?status=saved");
}
