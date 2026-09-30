// Correção (2026-09-29): o endereço nunca mudou — a UNIRadiologia sempre esteve em
// Av. João Machado, 1234 - Centro (mesmo local já mostrado no Google Maps da empresa,
// CID 13658498919318009356). O registro anterior de "mudança para Av. Jesus de Nazaré/SVI"
// estava errado (confundido com outro hospital, "Instituto Walfredo Guedes Pereira").
// Reverte config.address e config.mapsUrl pro local correto. Rodar com:
//   node --env-file=.env.local scripts/fix-endereco-joao-machado.mjs
import { put, list } from "@vercel/blob";

const PATHNAME = "content/site-content.json";
const NOVO_ADDRESS = "Av. João Machado, 1234 - Centro, João Pessoa - PB, CEP: 58013-522";
const NOVO_MAPS_URL = "https://maps.google.com/?cid=13658498919318009356";

const { blobs } = await list({ prefix: PATHNAME, limit: 1 });
if (blobs.length === 0) {
  console.log("content/site-content.json não existe.");
  process.exit(1);
}

const res = await fetch(blobs[0].url, { cache: "no-store" });
const content = await res.json();

console.log("Endereço atual:", content.config.address);
console.log("Maps URL atual:", content.config.mapsUrl);

content.config.address = NOVO_ADDRESS;
content.config.mapsUrl = NOVO_MAPS_URL;

const result = await put(PATHNAME, JSON.stringify(content, null, 2), {
  access: "public",
  contentType: "application/json",
  addRandomSuffix: false,
  allowOverwrite: true,
});

console.log("Corrigido:", result.url);
