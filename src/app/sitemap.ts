import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/cursos", "/noticias", "/quem-somos", "/contato"];

  return rotas.map((rota) => ({
    url: `${SITE_URL}${rota}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.8,
  }));
}
