// Cards de Ressonância Magnética e Densitometria passam a levar para a página de vendas (não direto pra área de membros).
// Pedido do usuário em 25/09/2026. Idempotente; salva backup local do content.json antes de gravar.
//   node --env-file=.env.local scripts/cards-rm-dxa-landing.mjs
import { put, list } from "@vercel/blob";
import { writeFileSync } from "node:fs";

const PATHNAME = "content/site-content.json";
const { blobs } = await list({ prefix: PATHNAME, limit: 1 });
const content = await (await fetch(blobs[0].url, { cache: "no-store" })).json();
writeFileSync(`scripts/backup-site-content-${Date.now()}.json`, JSON.stringify(content, null, 2));

const links = {
  "ressonancia-magnetica": "https://ressonancia.uniradiologiacademy.com.br/",
  "densitometria-ossea": "https://densitometria.uniradiologiacademy.com.br/",
};
for (const [slug, url] of Object.entries(links)) {
  const card = content.cursos.find((c) => c.slug === slug);
  if (!card) throw new Error("card não encontrado: " + slug);
  console.log(slug, ":", card.checkoutUrl, "->", url);
  card.checkoutUrl = url;
}
await put(PATHNAME, JSON.stringify(content, null, 2), {
  access: "public", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true,
});
console.log("gravado");
