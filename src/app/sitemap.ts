import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = [
    "",
    "/cursos",
    "/cursos/meios-de-contraste-rm-tc",
    "/noticias",
    "/quem-somos",
    "/contato",
  ]; // /recursos fica de fora até ter conteúdo real (afiliados ainda vazio)

  return rotas.map((rota) => ({
    url: `${SITE_URL}${rota}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : rota === "/cursos" ? 0.9 : 0.7,
  }));
}
