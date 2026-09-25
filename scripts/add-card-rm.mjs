// Adiciona o card do Curso de Ressonância Magnética - Online (publicado na área de membros em 25/09/2026).
// Idempotente; salva backup local do content.json antes de gravar.
//   node --env-file=.env.local scripts/add-card-rm.mjs
import { put, list } from "@vercel/blob";
import { writeFileSync } from "node:fs";

const PATHNAME = "content/site-content.json";
const { blobs } = await list({ prefix: PATHNAME, limit: 1 });
const content = await (await fetch(blobs[0].url, { cache: "no-store" })).json();
writeFileSync(`scripts/backup-site-content-${Date.now()}.json`, JSON.stringify(content, null, 2));

const card = {
  slug: "ressonancia-magnetica",
  nome: "Curso de Ressonância Magnética - Online",
  modalidade: "Online",
  detalhesModalidade: "Curso 100% online, acesso imediato após a confirmação do pagamento.",
  resumo:
    "Para quem está começando em RM: física básica sem complicação, formação da imagem, equipamento e bobinas, " +
    "segurança (zonas, MR Safe/Conditional/Unsafe e quench) e rotina clínica, com T1, T2, FLAIR, STIR, difusão, " +
    "preparo do paciente e artefatos. 13 videoaulas, questionários comentados, apostila e caderno de exercícios.",
  preco: "R$ 297,00 (PIX ou parcelado no cartão)",
  checkoutUrl: "https://app.uniradiologiacademy.com.br/cursos/curso-de-ressonancia-magnetica",
  destaque: true,
  imagem:
    "https://rvh64qrmi8fs3ehv.public.blob.vercel-storage.com/cursos/cmsx59leq000004la90x13xf0/capa-Z2pqcF7O8HCGwa7L9ewTOPWvZleE3y.jpg",
};

if (content.cursos.some((c) => c.slug === card.slug)) {
  console.log("Card de RM já existe — nada a fazer.");
  process.exit(0);
}
const iMamo = content.cursos.findIndex((c) => c.slug === "mamografia");
content.cursos.splice(iMamo >= 0 ? iMamo + 1 : content.cursos.length, 0, card);

const r = await put(PATHNAME, JSON.stringify(content, null, 2), {
  access: "public", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true,
});
console.log("Card adicionado na posição", iMamo + 2, "de", content.cursos.length, "->", r.url);
