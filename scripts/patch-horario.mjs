// Patch pontual (2026-09-29): adiciona o campo "horario" no content.json do Blob
// (rodapé/contato), sincronizado com o horário sugerido no Google Meu Negócio
// (segunda a sexta, 08:00-17:00). Rodar com:
//   node --env-file=.env.local scripts/patch-horario.mjs
import { put, list } from "@vercel/blob";

const PATHNAME = "content/site-content.json";
const NOVO = "Segunda a sexta, das 8h às 17h";

const { blobs } = await list({ prefix: PATHNAME, limit: 1 });
if (blobs.length === 0) {
  console.log("content/site-content.json não existe.");
  process.exit(1);
}

const res = await fetch(blobs[0].url, { cache: "no-store" });
const content = await res.json();

console.log("Horário atual:", content.config.horario);
if (content.config.horario === NOVO) {
  console.log("Já está atualizado, nada a fazer.");
  process.exit(0);
}

content.config.horario = NOVO;

const result = await put(PATHNAME, JSON.stringify(content, null, 2), {
  access: "public",
  contentType: "application/json",
  addRandomSuffix: false,
  allowOverwrite: true,
});

console.log("Horário atualizado:", result.url);
