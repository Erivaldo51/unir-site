"use client";

import { useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

export function ImageUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setError(null);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      setUrl(blob.url);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Falha no upload.");
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-unir-ink">{label}</label>

      {url && (
        <div className="relative mb-2 aspect-video w-full max-w-xs overflow-hidden rounded-lg border border-unir-mist bg-unir-mist/40">
          <Image src={url} alt="" fill className="object-cover" unoptimized />
        </div>
      )}

      <input type="hidden" name={name} value={url} />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-unir-slate file:mr-3 file:rounded-lg file:border-0 file:bg-unir-mist file:px-3 file:py-2 file:text-sm file:font-medium file:text-unir-ink hover:file:bg-unir-mist/70"
      />

      {status === "uploading" && <p className="mt-1 text-xs text-unir-slate">Enviando…</p>}
      {status === "error" && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
