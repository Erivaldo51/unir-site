import { saveRecurso } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/admin/fields";
import type { LinkAfiliado } from "@/lib/content-store";

export function RecursoForm({ item, index }: { item?: LinkAfiliado; index?: number }) {
  return (
    <form key={JSON.stringify(item)} action={saveRecurso} className="grid max-w-2xl gap-4">
      <input type="hidden" name="index" value={index ?? -1} />

      <Field label="Título" htmlFor="titulo">
        <input id="titulo" name="titulo" defaultValue={item?.titulo} required className={inputClass} />
      </Field>

      <Field label="Descrição" htmlFor="descricao">
        <textarea id="descricao" name="descricao" defaultValue={item?.descricao} className={textareaClass} />
      </Field>

      <Field label="Link" htmlFor="url">
        <input id="url" name="url" type="url" defaultValue={item?.url} required className={inputClass} />
      </Field>

      <Field label="Categoria" htmlFor="categoria">
        <select id="categoria" name="categoria" defaultValue={item?.categoria ?? "Outro"} className={inputClass}>
          <option value="Livro">Livro</option>
          <option value="Evento">Evento</option>
          <option value="Equipamento">Equipamento</option>
          <option value="Outro">Outro</option>
        </select>
      </Field>

      <div>
        <Button type="submit" size="lg">
          Salvar
        </Button>
      </div>
    </form>
  );
}
