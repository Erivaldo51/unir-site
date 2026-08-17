import { getContent } from "@/lib/content-store";
import { saveTextos } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { StatusBanner } from "@/components/admin/status-banner";

export default async function AdminTextosPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { textos } = await getContent();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Textos do site</h1>

      <div className="mt-4">
        <StatusBanner status={status} />
      </div>

      <form key={JSON.stringify(textos)} action={saveTextos} className="mt-6 grid max-w-2xl gap-8">
        <fieldset className="grid gap-4">
          <legend className="mb-1 font-heading text-lg font-semibold text-unir-ink">
            Topo da home (banner)
          </legend>
          <Field label="Selo (texto pequeno acima do título)" htmlFor="hero_selo">
            <input id="hero_selo" name="hero_selo" defaultValue={textos.hero.selo} className={inputClass} />
          </Field>
          <Field label="Título principal" htmlFor="hero_titulo">
            <textarea id="hero_titulo" name="hero_titulo" defaultValue={textos.hero.titulo} className={textareaClass} />
          </Field>
          <Field label="Subtítulo" htmlFor="hero_subtitulo">
            <textarea
              id="hero_subtitulo"
              name="hero_subtitulo"
              defaultValue={textos.hero.subtitulo}
              className={textareaClass}
            />
          </Field>
          <Field label="Texto do botão 'Ver cursos'" htmlFor="hero_ctaVerCursos">
            <input
              id="hero_ctaVerCursos"
              name="hero_ctaVerCursos"
              defaultValue={textos.hero.ctaVerCursos}
              className={inputClass}
            />
          </Field>
          <Field label="Texto do botão do WhatsApp" htmlFor="hero_ctaWhatsapp">
            <input
              id="hero_ctaWhatsapp"
              name="hero_ctaWhatsapp"
              defaultValue={textos.hero.ctaWhatsapp}
              className={inputClass}
            />
          </Field>
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="mb-1 font-heading text-lg font-semibold text-unir-ink">
            Seção &quot;Quem somos&quot; na home
          </legend>
          <Field label="Título" htmlFor="home_credibilidadeTitulo">
            <input
              id="home_credibilidadeTitulo"
              name="home_credibilidadeTitulo"
              defaultValue={textos.home.credibilidadeTitulo}
              className={inputClass}
            />
          </Field>
          <Field label="Texto" htmlFor="home_credibilidadeTexto">
            <textarea
              id="home_credibilidadeTexto"
              name="home_credibilidadeTexto"
              defaultValue={textos.home.credibilidadeTexto}
              className={textareaClass}
            />
          </Field>
          <Field label="Título da galeria de fotos" htmlFor="home_galeriaTitulo">
            <input
              id="home_galeriaTitulo"
              name="home_galeriaTitulo"
              defaultValue={textos.home.galeriaTitulo}
              className={inputClass}
            />
          </Field>
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="mb-1 font-heading text-lg font-semibold text-unir-ink">Página Quem Somos</legend>
          <Field label="Nome do fundador" htmlFor="quemSomos_fundadorNome">
            <input
              id="quemSomos_fundadorNome"
              name="quemSomos_fundadorNome"
              defaultValue={textos.quemSomos.fundadorNome}
              className={inputClass}
            />
          </Field>
          <Field label="Cargo do fundador" htmlFor="quemSomos_fundadorCargo">
            <input
              id="quemSomos_fundadorCargo"
              name="quemSomos_fundadorCargo"
              defaultValue={textos.quemSomos.fundadorCargo}
              className={inputClass}
            />
          </Field>
          <ImageUploadField
            name="quemSomos_fundadorFoto"
            label="Foto do fundador"
            defaultValue={textos.quemSomos.fundadorFoto}
          />
          <Field
            label="Parágrafos do texto"
            htmlFor="quemSomos_paragrafos"
            hint="Separe cada parágrafo deixando uma linha em branco entre eles."
          >
            <textarea
              id="quemSomos_paragrafos"
              name="quemSomos_paragrafos"
              defaultValue={textos.quemSomos.paragrafos.join("\n\n")}
              className={`${textareaClass} min-h-48`}
            />
          </Field>
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="mb-1 font-heading text-lg font-semibold text-unir-ink">Página Contato</legend>
          <Field label="Título" htmlFor="contato_titulo">
            <input id="contato_titulo" name="contato_titulo" defaultValue={textos.contato.titulo} className={inputClass} />
          </Field>
          <Field label="Texto de introdução" htmlFor="contato_intro">
            <textarea id="contato_intro" name="contato_intro" defaultValue={textos.contato.intro} className={textareaClass} />
          </Field>
          <Field label="Texto do card do WhatsApp" htmlFor="contato_textoWhatsapp">
            <input
              id="contato_textoWhatsapp"
              name="contato_textoWhatsapp"
              defaultValue={textos.contato.textoWhatsapp}
              className={inputClass}
            />
          </Field>
          <Field label="Usuário do Instagram exibido (ex: @uniradiologia)" htmlFor="contato_textoInstagramHandle">
            <input
              id="contato_textoInstagramHandle"
              name="contato_textoInstagramHandle"
              defaultValue={textos.contato.textoInstagramHandle}
              className={inputClass}
            />
          </Field>
          <Field label="Texto do convite pro grupo do WhatsApp" htmlFor="contato_textoGrupo">
            <textarea
              id="contato_textoGrupo"
              name="contato_textoGrupo"
              defaultValue={textos.contato.textoGrupo}
              className={textareaClass}
            />
          </Field>
          <Field label="Texto do link do grupo" htmlFor="contato_textoLinkGrupo">
            <input
              id="contato_textoLinkGrupo"
              name="contato_textoLinkGrupo"
              defaultValue={textos.contato.textoLinkGrupo}
              className={inputClass}
            />
          </Field>
          <Field label="Texto do botão final" htmlFor="contato_textoBotaoFinal">
            <input
              id="contato_textoBotaoFinal"
              name="contato_textoBotaoFinal"
              defaultValue={textos.contato.textoBotaoFinal}
              className={inputClass}
            />
          </Field>
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="mb-1 font-heading text-lg font-semibold text-unir-ink">Rodapé</legend>
          <Field label="Texto institucional" htmlFor="footer_institucional">
            <textarea
              id="footer_institucional"
              name="footer_institucional"
              defaultValue={textos.footer.institucional}
              className={textareaClass}
            />
          </Field>
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="mb-1 font-heading text-lg font-semibold text-unir-ink">Menu do site</legend>
          <Field
            label="Itens do menu"
            htmlFor="menu"
            hint="Uma linha por item, no formato: Rótulo | /link — ex: Início | /"
          >
            <textarea
              id="menu"
              name="menu"
              defaultValue={textos.menu.map((item) => `${item.label} | ${item.href}`).join("\n")}
              className={`${textareaClass} min-h-32 font-mono text-xs`}
            />
          </Field>
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="mb-1 font-heading text-lg font-semibold text-unir-ink">
            Textos de botões espalhados pelo site
          </legend>
          <Field label="Botão 'Ver todos' (ao lado de Cursos em destaque, na home)" htmlFor="botoes_homeVerTodos">
            <input
              id="botoes_homeVerTodos"
              name="botoes_homeVerTodos"
              defaultValue={textos.botoes.homeVerTodos}
              className={inputClass}
            />
          </Field>
          <Field label="Selo 'Mais procurado' nos cards de curso em destaque" htmlFor="botoes_cursoMaisProcurado">
            <input
              id="botoes_cursoMaisProcurado"
              name="botoes_cursoMaisProcurado"
              defaultValue={textos.botoes.cursoMaisProcurado}
              className={inputClass}
            />
          </Field>
          <Field
            label="Texto de preço quando o curso não tiver preço definido"
            htmlFor="botoes_cursoConsultarValor"
          >
            <input
              id="botoes_cursoConsultarValor"
              name="botoes_cursoConsultarValor"
              defaultValue={textos.botoes.cursoConsultarValor}
              className={inputClass}
            />
          </Field>
          <Field
            label="Texto quando o curso ainda não tiver link de checkout"
            htmlFor="botoes_cursoEmBreve"
          >
            <input
              id="botoes_cursoEmBreve"
              name="botoes_cursoEmBreve"
              defaultValue={textos.botoes.cursoEmBreve}
              className={inputClass}
            />
          </Field>
        </fieldset>

        <div>
          <Button type="submit" size="lg">
            Salvar textos
          </Button>
        </div>
      </form>
    </div>
  );
}
