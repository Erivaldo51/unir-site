import { saveFaq } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/admin/fields";
import type { PerguntaFrequente } from "@/lib/content-store";

export function FaqForm({ item, index }: { item?: PerguntaFrequente; index?: number }) {
  return (
    <form key={JSON.stringify(item)} action={saveFaq} className="grid max-w-2xl gap-4">
      <input type="hidden" name="index" value={index ?? -1} />

      <Field label="Pergunta" htmlFor="pergunta">
        <input id="pergunta" name="pergunta" defaultValue={item?.pergunta} required className={inputClass} />
      </Field>

      <Field label="Resposta" htmlFor="resposta">
        <textarea id="resposta" name="resposta" defaultValue={item?.resposta} required className={textareaClass} />
      </Field>

      <div>
        <Button type="submit" size="lg">
          Salvar
        </Button>
      </div>
    </form>
  );
}
