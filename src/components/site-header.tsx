"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Início" },
  { href: "/cursos", label: "Cursos" },
  { href: "/noticias", label: "Notícias" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-unir-mist bg-white/90 backdrop-blur supports-backdrop-filter:bg-white/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Uniradiologia Academy">
          <Image
            src="/identidade/unir-logo-horizontal.svg"
            alt="Uniradiologia Academy"
            width={180}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-unir-slate transition-colors hover:bg-unir-mist hover:text-unir-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cursos"
            className={cn(buttonVariants({ size: "lg" }), "ml-2")}
          >
            Ver cursos
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "md:hidden")}
            aria-label="Abrir menu"
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Image
                  src="/identidade/unir-logo-horizontal.svg"
                  alt="Uniradiologia Academy"
                  width={160}
                  height={32}
                  className="h-7 w-auto"
                />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-unir-ink hover:bg-unir-mist"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
