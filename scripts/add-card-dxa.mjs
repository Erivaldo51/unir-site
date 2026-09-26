// Adiciona o card do Curso de Densitometria Óssea (DXA) (publicado na área de membros em 25/09/2026).
// Idempotente; salva backup local do content.json antes de gravar.
//   node --env-file=.env.local scripts/add-card-dxa.mjs
import { put, list } from "@vercel/blob";
import { writeFileSync } from "node:fs";

const PATHNAME = "content/site-content.json";
const { blobs } = await list({ prefix: PATHNAME, limit: 1 });
const content = await (await fetch(blobs[0].url, { cache: "no-store" })).json();
writeFileSync(`scripts/backup-site-content-${Date.now()}.json`, JSON.stringify(content, null, 2));

const card = {
  slug: "densitometria-ossea",
  nome: "Curso de Densitometria Óssea (DXA)",
  modalidade: "Online",
  detalhesModalidade: "Curso 100% online, acesso imediato após a confirmação do pagamento.",
  resumo:
    "Técnica, posicionamento, análise e controle de qualidade da densitometria por DXA: física e equipamento, " +
    "preparo e anamnese, coluna lombar, fêmur proximal e antebraço (rádio 33%), regiões de interesse, DMO, " +
    "T-score e Z-score pelos critérios da OMS, phantom e LSC. 8 videoaulas, questionários comentados, apostila e caderno de exercícios.",
  preco: "R$ 97,00 (PIX ou parcelado no cartão)",
  checkoutUrl: "https://app.uniradiologiacademy.com.br/cursos/curso-de-densitometria-ossea-dxa",
  destaque: true,
  imagem:
    "https://rvh64qrmi8fs3ehv.public.blob.vercel-storage.com/cursos/cmuhnj3lv000504juvckprtdf/capa-irQrkIAS9wB8cY2ZPCmmsYRZrJvbPn.jpg",
};

if (content.cursos.some((c) => c.slug === card.slug)) {
  console.log("Card de Densitometria já existe — nada a fazer.");
  process.exit(0);
}
const iRm = content.cursos.findIndex((c) => c.slug === "ressonancia-magnetica");
content.cursos.splice(iRm >= 0 ? iRm + 1 : content.cursos.length, 0, card);

const r = await put(PATHNAME, JSON.stringify(content, null, 2), {
  access: "public", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true,
});
console.log("Card adicionado na posição", iRm + 2, "de", content.cursos.length, "->", r.url);
