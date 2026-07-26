import { CursoForm } from "@/components/admin/curso-form";

export default function NovoCursoPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Novo curso</h1>
      <div className="mt-6">
        <CursoForm />
      </div>
    </div>
  );
}
