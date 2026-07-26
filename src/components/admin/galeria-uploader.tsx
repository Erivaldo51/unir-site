"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { addFotos } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";

export function GaleriaUploader() {
  const [urls, setUrls] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setStatus("uploading");
    setError(null);
    try {
      const uploaded = await Promise.all(
        files.map((file) => upload(file.name, file, { access: "public", handleUploadUrl: "/api/admin/upload" }))
      );
      setUrls((prev) => [...prev, ...uploaded.map((b) => b.url)]);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Falha no upload.");
    }
    e.target.value = "";
  }

  return (
    <form action={addFotos} className="rounded-xl border border-dashed border-unir-mist bg-white p-5">
      {urls.map((url) => (
        <input key={url} type="hidden" name="urls" value={url} />
      ))}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        className="block w-full text-sm text-unir-slate file:mr-3 file:rounded-lg file:border-0 file:bg-unir-mist file:px-3 file:py-2 file:text-sm file:font-medium file:text-unir-ink hover:file:bg-unir-mist/70"
      />

      {status === "uploading" && <p className="mt-2 text-xs text-unir-slate">Enviando fotos…</p>}
      {status === "error" && <p className="mt-2 text-xs text-destructive">{error}</p>}

      {urls.length > 0 && (
        <>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {urls.map((url) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={url} src={url} alt="" className="aspect-square w-full rounded-lg object-cover" />
            ))}
          </div>
          <Button type="submit" className="mt-3">
            Adicionar {urls.length} foto{urls.length > 1 ? "s" : ""} à galeria
          </Button>
        </>
      )}
    </form>
  );
}
