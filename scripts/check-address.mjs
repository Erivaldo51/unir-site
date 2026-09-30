import { list } from "@vercel/blob";
const { blobs } = await list({ prefix: "content/site-content.json", limit: 1 });
const res = await fetch(blobs[0].url, { cache: "no-store" });
const content = await res.json();
console.log("address:", content.config.address);
console.log("horario:", content.config.horario);
console.log("mapsUrl:", content.config.mapsUrl);
