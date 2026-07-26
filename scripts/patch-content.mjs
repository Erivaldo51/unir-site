// Patch pontual: adiciona o campo `textos.botoes` ao content.json que já existe
// no Blob, sem mexer no resto. Rodar com:
//   node --env-file=.env.local scripts/patch-content.mjs
import { put, list } from "@vercel/blob";

const PATHNAME = "content/site-content.json";

const { blobs } = await list({ prefix: PATHNAME, limit: 1 });
if (blobs.length === 0) {
  console.log("content/site-content.json não existe ainda — rode scripts/seed-content.mjs primeiro.");
  process.exit(1);
}

const res = await fetch(blobs[0].url, { cache: "no-store" });
const content = await res.json();

if (content.textos.botoes) {
  console.log("textos.botoes já existe, nada a fazer.");
  process.exit(0);
}

content.textos.botoes = {
  headerVerCursos: "Ver cursos",
  homeVerTodos: "Ver todos",
  cursoMaisProcurado: "Mais procurado",
  cursoConsultarValor: "Consultar valor",
  cursoEmBreve: "Em breve — fale com a Bianca para mais informações",
};

const result = await put(PATHNAME, JSON.stringify(content, null, 2), {
  access: "public",
  contentType: "application/json",
  addRandomSuffix: false,
  allowOverwrite: true,
});

console.log("Patch aplicado com sucesso:", result.url);
