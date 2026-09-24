// Patch pontual (2026-09-24): troca o endereço da sede no content.json do Blob
// (rodapé + /contato) pelo do Hospital São Vicente de Paulo (SVI). Rodar com:
//   node --env-file=.env.local scripts/patch-endereco.mjs
import { put, list } from "@vercel/blob";

const PATHNAME = "content/site-content.json";
const NOVO = "Av. Jesus de Nazaré, 147 - Jaguaribe, João Pessoa - PB, CEP: 58015-340 (Hospital São Vicente de Paulo - São Vicente Imagem - SVI)";

const { blobs } = await list({ prefix: PATHNAME, limit: 1 });
if (blobs.length === 0) {
  console.log("content/site-content.json não existe.");
  process.exit(1);
}

const res = await fetch(blobs[0].url, { cache: "no-store" });
const content = await res.json();

console.log("Endereço atual:", content.config.address);
console.log("Link do mapa:", content.config.mapsUrl);
if (content.config.address === NOVO) {
  console.log("Já está atualizado, nada a fazer.");
  process.exit(0);
}

content.config.address = NOVO;

const result = await put(PATHNAME, JSON.stringify(content, null, 2), {
  access: "public",
  contentType: "application/json",
  addRandomSuffix: false,
  allowOverwrite: true,
});

console.log("Endereço atualizado:", result.url);
