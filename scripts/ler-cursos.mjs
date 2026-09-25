// Só leitura: lista os cursos do content.json do Blob (slug, nome, preço, link) e mostra o card
// inteiro do slug passado como argumento (padrão: biosseguranca-ressonancia-magnetica).
//   node --env-file=.env.local scripts/ler-cursos.mjs [slug]
// Atenção: logo depois de gravar, o Blob pode devolver a versão antiga por ~1 min (cache da CDN).
import { list } from "@vercel/blob";

const { blobs } = await list({ prefix: "content/site-content.json", limit: 1 });
const content = await (await fetch(blobs[0].url, { cache: "no-store" })).json();
console.log("chaves do curso:", Object.keys(content.cursos[0]).join(", "));
for (const c of content.cursos) {
  console.log(`- ${c.slug} | ${c.nome} | ${c.preco ?? "-"} | ${c.checkoutUrl ?? "-"}`);
}
const alvo = content.cursos.find((c) => c.slug === (process.argv[2] || "biosseguranca-ressonancia-magnetica"));
if (alvo) console.log("\nCARD:\n" + JSON.stringify(alvo, null, 2));
