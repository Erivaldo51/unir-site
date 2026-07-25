import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Curso } from "@/data/cursos";

export function CourseCard({ curso }: { curso: Curso }) {
  const disponivel = curso.checkoutUrl !== null;

  return (
    <Card className="h-full bg-unir-ink text-white ring-unir-ink">
      <div className="relative aspect-video">
        <Image
          src={curso.imagem}
          alt={curso.nome}
          fill
          className="object-cover"
          style={{ objectPosition: curso.imagemFoco ?? "center" }}
        />
      </div>
      <CardHeader>
        <div className="mb-1 flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-white/20 bg-white/10 text-white/80"
          >
            {curso.modalidade}
          </Badge>
          {curso.destaque && (
            <Badge className="bg-unir-amber text-unir-ink hover:bg-unir-amber">
              Mais procurado
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-snug text-white">{curso.nome}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="text-sm text-white/70">{curso.resumo}</p>
        <p className="text-xs text-white/50">{curso.detalhesModalidade}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-3 border-t-0 bg-transparent px-4">
        <p className="text-base font-semibold text-white">
          {curso.preco ?? "Consultar valor"}
        </p>
        {disponivel ? (
          <a
            href={curso.checkoutUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            {curso.ctaLabel ?? "Ver detalhes"}
          </a>
        ) : (
          <span className="text-center text-sm text-white/50">
            Em breve — fale com a Bianca para mais informações
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
