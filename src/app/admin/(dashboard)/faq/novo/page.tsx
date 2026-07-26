import { FaqForm } from "@/components/admin/faq-form";

export default function NovaFaqPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Nova pergunta</h1>
      <div className="mt-6">
        <FaqForm />
      </div>
    </div>
  );
}
