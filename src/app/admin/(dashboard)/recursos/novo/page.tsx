import { RecursoForm } from "@/components/admin/recurso-form";

export default function NovoRecursoPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Novo recurso</h1>
      <div className="mt-6">
        <RecursoForm />
      </div>
    </div>
  );
}
