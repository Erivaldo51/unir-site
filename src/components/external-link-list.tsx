import Image from "next/image";
import { ExternalLink } from "lucide-react";

type Item = {
  titulo: string;
  descricao: string;
  url: string;
  categoria?: string;
  logo?: string;
};

export function ExternalLinkList({
  items,
  emptyLabel,
}: {
  items: Item[];
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-unir-mist bg-unir-mist/30 px-6 py-16 text-center">
        <p className="text-unir-slate">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-xl border border-unir-ink bg-unir-ink p-4 transition-colors hover:border-unir-amber"
          >
            {item.logo && (
              <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/10">
                <Image src={item.logo} alt="" fill className="object-contain p-1.5" />
              </div>
            )}
            <div className="flex-1">
              {item.categoria && (
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-white/50">
                  {item.categoria}
                </p>
              )}
              <p className="font-medium text-white">{item.titulo}</p>
              <p className="mt-1 text-sm text-white/70">{item.descricao}</p>
            </div>
            <ExternalLink className="mt-1 size-4 shrink-0 text-white/50 transition-colors group-hover:text-unir-amber" />
          </a>
        </li>
      ))}
    </ul>
  );
}
