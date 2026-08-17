import { saveNoticia } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { FonteNoticia } from "@/lib/content-store";

export function NoticiaForm({ item, index }: { item?: FonteNoticia; index?: number }) {
  return (
    <form key={JSON.stringify(item)} action={saveNoticia} className="grid max-w-2xl gap-4">
      <input type="hidden" name="index" value={index ?? -1} />

      <Field label="Título da fonte" htmlFor="titulo">
        <input id="titulo" name="titulo" defaultValue={item?.titulo} required className={inputClass} />
      </Field>

      <Field label="Descrição" htmlFor="descricao">
        <textarea id="descricao" name="descricao" defaultValue={item?.descricao} className={textareaClass} />
      </Field>

      <Field label="Link" htmlFor="url">
        <input id="url" name="url" type="url" defaultValue={item?.url} required className={inputClass} />
      </Field>

      <ImageUploadField name="logo" label="Logo (opcional)" defaultValue={item?.logo} />

      <div>
        <Button type="submit" size="lg">
          Salvar
        </Button>
      </div>
    </form>
  );
}
