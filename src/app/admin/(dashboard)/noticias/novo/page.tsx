import { NoticiaForm } from "@/components/admin/noticia-form";

export default function NovaNoticiaPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Nova fonte de notícia</h1>
      <div className="mt-6">
        <NoticiaForm />
      </div>
    </div>
  );
}
