import { saveCurso } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { Curso } from "@/lib/content-store";

export function CursoForm({ curso }: { curso?: Curso }) {
  return (
    <form key={JSON.stringify(curso)} action={saveCurso} className="grid max-w-2xl gap-4">
      <input type="hidden" name="originalSlug" value={curso?.slug ?? ""} />

      <Field label="Nome do curso" htmlFor="nome">
        <input id="nome" name="nome" defaultValue={curso?.nome} required className={inputClass} />
      </Field>

      <Field label="Modalidade" htmlFor="modalidade">
        <select id="modalidade" name="modalidade" defaultValue={curso?.modalidade ?? "Online"} className={inputClass}>
          <option value="Online">Online</option>
          <option value="Presencial">Presencial</option>
        </select>
      </Field>

      <Field label="Resumo (aparece no card)" htmlFor="resumo">
        <textarea id="resumo" name="resumo" defaultValue={curso?.resumo} required className={textareaClass} />
      </Field>

      <Field label="Detalhes da modalidade (texto menor, abaixo do resumo)" htmlFor="detalhesModalidade">
        <textarea
          id="detalhesModalidade"
          name="detalhesModalidade"
          defaultValue={curso?.detalhesModalidade}
          className={textareaClass}
        />
      </Field>

      <Field label="Preço (texto livre, ex: R$ 97 em até 3x)" htmlFor="preco" hint="Deixe em branco para mostrar 'Consultar valor'.">
        <input id="preco" name="preco" defaultValue={curso?.preco ?? ""} className={inputClass} />
      </Field>

      <Field
        label="Link de checkout"
        htmlFor="checkoutUrl"
        hint="Deixe em branco se o curso ainda não estiver disponível para compra."
      >
        <input id="checkoutUrl" name="checkoutUrl" defaultValue={curso?.checkoutUrl ?? ""} className={inputClass} />
      </Field>

      <Field label="Texto do botão de checkout" htmlFor="ctaLabel" hint="Padrão: 'Ver detalhes'.">
        <input id="ctaLabel" name="ctaLabel" defaultValue={curso?.ctaLabel ?? ""} className={inputClass} />
      </Field>

      <ImageUploadField name="imagem" label="Capa do curso" defaultValue={curso?.imagem} />

      <Field
        label="Ajuste fino da capa (avançado)"
        htmlFor="imagemFoco"
        hint="Opcional. Ex: '50% 25%' para deslocar o enquadramento da foto."
      >
        <input id="imagemFoco" name="imagemFoco" defaultValue={curso?.imagemFoco ?? ""} className={inputClass} />
      </Field>

      <label className="flex items-center gap-2 text-sm text-unir-ink">
        <input type="checkbox" name="destaque" defaultChecked={curso?.destaque} className="size-4" />
        Mostrar como destaque na home
      </label>

      <div>
        <Button type="submit" size="lg">
          Salvar
        </Button>
      </div>
    </form>
  );
}
