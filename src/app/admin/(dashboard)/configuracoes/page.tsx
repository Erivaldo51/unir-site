import { getContent } from "@/lib/content-store";
import { saveConfig } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/admin/fields";
import { StatusBanner } from "@/components/admin/status-banner";

export default async function AdminConfiguracoesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { config } = await getContent();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Configurações</h1>

      <div className="mt-4">
        <StatusBanner status={status} />
      </div>

      <form action={saveConfig} className="mt-6 grid max-w-xl gap-4">
        <Field label="Número de WhatsApp (com DDI e DDD, só números)" htmlFor="whatsappNumber" hint="Ex: 5583986388435">
          <input id="whatsappNumber" name="whatsappNumber" defaultValue={config.whatsappNumber} className={inputClass} />
        </Field>

        <Field label="Mensagem padrão enviada ao clicar em 'Falar com a Bianca'" htmlFor="whatsappMensagemPadrao">
          <textarea
            id="whatsappMensagemPadrao"
            name="whatsappMensagemPadrao"
            defaultValue={config.whatsappMensagemPadrao}
            className={textareaClass}
          />
        </Field>

        <Field label="Link do Instagram" htmlFor="instagramUrl">
          <input id="instagramUrl" name="instagramUrl" defaultValue={config.instagramUrl} className={inputClass} />
        </Field>

        <Field label="Link do YouTube" htmlFor="youtubeUrl">
          <input id="youtubeUrl" name="youtubeUrl" defaultValue={config.youtubeUrl} className={inputClass} />
        </Field>

        <Field label="Link do Google Maps (endereço)" htmlFor="mapsUrl">
          <input id="mapsUrl" name="mapsUrl" defaultValue={config.mapsUrl} className={inputClass} />
        </Field>

        <Field label="Link do grupo de WhatsApp (turma de Tomografia)" htmlFor="whatsappGrupoUrl">
          <input
            id="whatsappGrupoUrl"
            name="whatsappGrupoUrl"
            defaultValue={config.whatsappGrupoUrl}
            className={inputClass}
          />
        </Field>

        <Field label="Endereço" htmlFor="address">
          <input id="address" name="address" defaultValue={config.address} className={inputClass} />
        </Field>

        <Field label="CNPJ" htmlFor="cnpj">
          <input id="cnpj" name="cnpj" defaultValue={config.cnpj} className={inputClass} />
        </Field>

        <Field label="GA4 Measurement ID" htmlFor="ga4Id" hint="Ex: G-XXXXXXXXXX. Deixe em branco para desativar.">
          <input id="ga4Id" name="ga4Id" defaultValue={config.ga4Id} className={inputClass} />
        </Field>

        <Field label="Meta Pixel ID" htmlFor="metaPixelId" hint="Deixe em branco para desativar.">
          <input id="metaPixelId" name="metaPixelId" defaultValue={config.metaPixelId} className={inputClass} />
        </Field>

        <div>
          <Button type="submit" size="lg">
            Salvar configurações
          </Button>
        </div>
      </form>
    </div>
  );
}
