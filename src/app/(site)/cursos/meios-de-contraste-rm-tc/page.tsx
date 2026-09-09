import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  PlayCircle,
  AlertTriangle,
  GraduationCap,
  Infinity as InfinityIcon,
  BadgeCheck,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { WhatsappTrackedLink } from "@/components/whatsapp-tracked-link";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { getContent } from "@/lib/content-store";
import { SITE_URL } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// TODO: trocar pelo link de checkout do Mercado Pago assim que estiver criado.
// Enquanto isso, o CTA principal abre o WhatsApp com uma mensagem pronta.
const CHECKOUT_URL: string | null = null;

// TODO: subir a Aula 1 no YouTube como "não listado" e colar o ID do vídeo aqui
// (o que vem depois de "v=" na URL do YouTube). Enquanto estiver vazio, mostramos
// um aviso de "em breve" no lugar do player.
const AULA1_YOUTUBE_ID = "";

const PRECO = "R$ 97";
const NOME_CURSO = "Meios de Contraste em RM e TC";
const SLUG = "meios-de-contraste-rm-tc";

const MENSAGEM_WHATSAPP = `Olá! Quero garantir minha vaga no curso "${NOME_CURSO}" por ${PRECO}.`;

export const metadata: Metadata = {
  title: `${NOME_CURSO} — Curso Online | Uniradiologia Academy`,
  description:
    "Curso online com 8 videoaulas sobre contraste iodado e gadolínio: mecanismo de ação, reações adversas, contraindicações, triagem, extravasamento e fases do contraste na TC de abdome total. Feito para técnicos, tecnólogos e enfermagem em radiologia.",
  alternates: { canonical: `${SITE_URL}/cursos/${SLUG}` },
};

const CONTEUDO_PROGRAMATICO = [
  {
    numero: 1,
    titulo: "Fundamentos dos Meios de Contraste em Diagnóstico por Imagem",
    resumo:
      "Por que usamos contraste, como ele interage com cada modalidade e qual o papel da equipe de enfermagem e tecnologia em todo o processo.",
  },
  {
    numero: 2,
    titulo: "Contraste Iodado em Tomografia Computadorizada",
    resumo:
      "Mecanismo de ação, contraste iônico x não-iônico, osmolaridade, vias de administração e cuidados práticos na injeção intravenosa.",
  },
  {
    numero: 3,
    titulo: "Contraste à Base de Gadolínio em Ressonância Magnética",
    resumo:
      "Como o gadolínio altera o sinal da ressonância, agentes lineares x macrocíclicos, e por que a estabilidade química importa para a segurança do paciente.",
  },
  {
    numero: 4,
    titulo: "Reações Adversas e Manejo de Emergências",
    resumo:
      "Classificação por gravidade, reações fisiológicas x alérgicas, e o protocolo de resposta da equipe diante de uma emergência real.",
  },
  {
    numero: 5,
    titulo: "Contraindicações, Triagem do Paciente e Função Renal",
    resumo:
      "O que perguntar numa triagem completa, nefropatia induzida por contraste iodado, fibrose sistêmica nefrogênica pelo gadolínio, e quando adiar um exame.",
  },
  {
    numero: 6,
    titulo: "Extravasamento e Boas Práticas de Segurança",
    resumo:
      "Sinais de alerta durante a injeção, como prevenir e a conduta correta quando o contraste escapa do vaso sanguíneo.",
  },
  {
    numero: 7,
    titulo: "Fases do Contraste na TC de Abdome Total: Timing e Indicações",
    resumo:
      "As fases de aquisição (sem contraste, arterial precoce e tardia, portal, tardia/excretora), o tempo de cada uma e o que cada fase revela.",
  },
  {
    numero: 8,
    titulo: "Particularidades por Órgão e Erros Comuns de Protocolo",
    resumo:
      "Fígado, pâncreas, rins e baço em cada fase — as armadilhas de interpretação mais comuns e os erros de protocolo que comprometem o exame.",
  },
] as const;

const PARA_QUEM = [
  "Técnicos e tecnólogos em radiologia que aplicam contraste no dia a dia e querem entender o \"porquê\" por trás do protocolo.",
  "Profissionais de enfermagem que atuam em centros de diagnóstico por imagem (CDI) e participam da triagem e administração do contraste.",
  "Estudantes de radiologia e enfermagem que querem chegar no estágio ou no primeiro emprego já sabendo o que a maioria só aprende depois de um susto.",
  "Quem já trabalha na área há anos, mas nunca teve uma formação estruturada sobre contraste — só o que foi aprendendo na prática, aos poucos.",
];

const FAQ = [
  {
    pergunta: "Preciso ter experiência prévia para fazer o curso?",
    resposta:
      "Não. O curso começa pelos fundamentos e constrói o conhecimento de forma progressiva. Quem já atua na área aprofunda o que já vê no dia a dia; quem está começando sai com uma base sólida.",
  },
  {
    pergunta: "O curso serve para quem trabalha só com Tomografia, ou só com Ressonância?",
    resposta:
      "Serve para os dois. O curso cobre os dois principais meios de contraste — iodado (TC) e gadolínio (RM) — incluindo as diferenças de mecanismo, segurança e protocolo entre eles.",
  },
  {
    pergunta: "Como funciona o acesso ao curso?",
    resposta:
      "O acesso é liberado direto na área de membros da Uniradiologia Academy, de forma automática após a confirmação do pagamento. Você assiste às 8 aulas no seu ritmo, quantas vezes quiser.",
  },
  {
    pergunta: "Tem certificado?",
    resposta:
      "Sim, ao concluir todas as aulas você recebe o certificado de conclusão do curso pela Uniradiologia Academy.",
  },
  {
    pergunta: "E se eu não gostar do curso?",
    resposta:
      "Você tem 7 dias de garantia a partir da compra, conforme o Código de Defesa do Consumidor. Se não for pra você, é só pedir o reembolso — sem burocracia.",
  },
  {
    pergunta: "Como funciona o pagamento?",
    resposta: "Pix ou cartão, com parcelamento disponível. O acesso é liberado assim que o pagamento é confirmado.",
  },
];

function CtaButton({
  className,
  children,
  origem,
  whatsappNumber,
}: {
  className?: string;
  children: React.ReactNode;
  origem: string;
  whatsappNumber: string;
}) {
  if (CHECKOUT_URL) {
    return (
      <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), className)}>
        {children}
      </a>
    );
  }
  return (
    <WhatsappTrackedLink
      href={buildWhatsappLink(whatsappNumber, MENSAGEM_WHATSAPP)}
      origem={origem}
      className={cn(buttonVariants({ size: "lg" }), className)}
    >
      {children}
    </WhatsappTrackedLink>
  );
}

export default async function MeiosDeContrasteRmTcPage() {
  const { config } = await getContent();
  const { whatsappNumber } = config;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: NOME_CURSO,
            description:
              "Curso online com 8 videoaulas sobre contraste iodado, gadolínio, reações adversas, contraindicações, triagem, extravasamento e fases do contraste na TC de abdome total.",
            provider: {
              "@type": "Organization",
              name: "Uniradiologia Academy",
              sameAs: SITE_URL,
            },
            offers: {
              "@type": "Offer",
              price: "97.00",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/cursos/${SLUG}`,
            },
          }),
        }}
      />

      {/* HERO */}
      <section className="bg-unir-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-unir-amber">
              Curso online · Uniradiologia Academy
            </span>
            <h1 className="mt-5 font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
              Você aplica contraste todos os dias.{" "}
              <span className="text-unir-amber">Mas você sabe o que fazer no minuto em que algo dá errado?</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
              8 videoaulas direto ao ponto sobre contraste iodado e gadolínio — do mecanismo de ação ao
              manejo de reações adversas, extravasamento e as fases do contraste na TC de abdome total.
              Pra você parar de repetir protocolo por hábito e passar a entender exatamente o porquê de cada
              etapa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton origem="hero" whatsappNumber={whatsappNumber} className="h-auto px-6 py-3.5 text-base">
                Quero garantir minha vaga por {PRECO}
              </CtaButton>
              <p className="text-sm text-white/50">Pix ou cartão parcelado · Acesso imediato</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <PlayCircle className="size-4 text-unir-amber" /> 8 videoaulas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <InfinityIcon className="size-4 text-unir-amber" /> Acesso pela área de membros
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="size-4 text-unir-amber" /> Certificado incluso
              </span>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 lg:aspect-[3/4]">
            <Image
              src="/galeria/evento-05.jpg"
              alt="Profissional de radiologia avaliando exame de imagem com contraste"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* VÍDEO ISCA */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-semibold text-unir-ink sm:text-3xl">
            Assista à Aula 1 agora mesmo, de graça
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-unir-slate">
            Antes de decidir, veja com seus próprios olhos como é o curso. A primeira aula completa está
            liberada — sem cadastro, sem enrolação.
          </p>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl bg-unir-ink shadow-lg shadow-black/10">
          {AULA1_YOUTUBE_ID ? (
            <div className="aspect-video w-full">
              <iframe
                className="size-full"
                src={`https://www.youtube.com/embed/${AULA1_YOUTUBE_ID}`}
                title={`Aula 1 — ${CONTEUDO_PROGRAMATICO[0].titulo}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 px-6 text-center">
              <PlayCircle className="size-12 text-unir-amber" />
              <p className="font-heading text-lg font-semibold text-white">
                Aula 1 — {CONTEUDO_PROGRAMATICO[0].titulo}
              </p>
              <p className="text-sm text-white/50">Vídeo disponível em breve nesta página.</p>
            </div>
          )}
        </div>
      </section>

      {/* PROBLEMA / AGITAÇÃO */}
      <section className="bg-unir-mist">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-semibold text-unir-ink sm:text-3xl">
            O contraste é rotina. O erro com contraste não pode ser.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              "Reagir tarde demais a uma reação alérgica que começou discreta e virou emergência.",
              "Não perguntar sobre função renal na triagem e o paciente sair de lá com nefropatia induzida por contraste.",
              "Não perceber o extravasamento a tempo, porque ninguém explicou os sinais de alerta certos.",
              "Adquirir a fase errada num exame de abdome e o médico não conseguir fechar o diagnóstico com a imagem.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-unir-amber" />
                <p className="text-sm text-unir-slate">{item}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-unir-slate">
            Nenhuma dessas situações acontece por falta de cuidado da equipe — acontece por falta de
            treinamento estruturado sobre o assunto. Esse curso existe pra fechar exatamente essa lacuna.
          </p>
        </div>
      </section>

      {/* CONTEÚDO PROGRAMÁTICO */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-semibold text-unir-ink sm:text-3xl">
            Conteúdo programático completo
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-unir-slate">
            8 videoaulas, direto ao ponto, sem enrolação. Clique em cada aula para ver o que ela cobre.
          </p>
        </div>
        <Accordion className="mt-8">
          {CONTEUDO_PROGRAMATICO.map((aula) => (
            <AccordionItem key={aula.numero} value={`aula-${aula.numero}`} className="border-unir-mist">
              <AccordionTrigger className="text-left text-base text-unir-ink">
                <span className="mr-3 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-unir-amber text-xs font-bold text-unir-ink">
                  {aula.numero}
                </span>
                {aula.titulo}
              </AccordionTrigger>
              <AccordionContent className="pl-10 text-unir-slate">{aula.resumo}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* PARA QUEM É */}
      <section className="bg-unir-ink">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-semibold text-white sm:text-3xl">
            Esse curso é pra você se...
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PARA_QUEM.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-unir-amber" />
                <p className="text-sm text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUTOR */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="relative mx-auto size-32 shrink-0 overflow-hidden rounded-full ring-4 ring-unir-amber sm:mx-0">
            <Image src="/identidade/erivaldo-martins.png" alt="Erivaldo Martins" fill className="object-cover" />
          </div>
          <div>
            <p className="font-heading text-xl font-semibold text-unir-ink">Erivaldo Martins</p>
            <p className="text-sm text-unir-gray">Fundador da Uniradiologia Academy</p>
            <p className="mt-4 text-unir-slate">
              A Uniradiologia foi fundada em 2017 com a intenção de viabilizar educação continuada e
              prestação de serviços na área da radiologia. Desde então, já formamos centenas de profissionais
              em formação prática de Tomografia Computadorizada dentro do Hospital São Vicente de Paulo, além
              de cursos e materiais online de Proteção Radiológica, Plano de Proteção Radiológica (PPR) e
              Protocolo de Nefroproteção — sempre unindo teoria e prática pra quem já atua ou está se
              atualizando pro mercado de trabalho.
            </p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {["evento-15.jpg", "evento-25.jpg", "evento-05.jpg"].map((foto) => (
            <div key={foto} className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-black/5">
              <Image src={`/galeria/${foto}`} alt="Formação prática Uniradiologia Academy" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* OFERTA */}
      <section className="bg-unir-mist">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <ShieldCheck className="mx-auto size-10 text-unir-amber" />
          <h2 className="mt-4 font-heading text-2xl font-semibold text-unir-ink sm:text-3xl">
            Curso completo por {PRECO}
          </h2>
          <p className="mt-2 text-unir-slate">Pix ou cartão parcelado. Acesso liberado assim que o pagamento é confirmado.</p>

          <div className="mt-8 rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-black/5 sm:p-8">
            <ul className="space-y-3">
              {[
                "8 videoaulas com acesso pela área de membros",
                "Certificado de conclusão",
                "Conteúdo sobre contraste iodado (TC) e gadolínio (RM)",
                "Módulo extra sobre fases do contraste na TC de abdome total",
                "Garantia de 7 dias — Código de Defesa do Consumidor",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-unir-amber" />
                  <span className="text-unir-ink">{item}</span>
                </li>
              ))}
            </ul>
            <CtaButton origem="oferta" whatsappNumber={whatsappNumber} className="mt-8 h-auto w-full px-6 py-3.5 text-base">
              Quero garantir minha vaga por {PRECO}
            </CtaButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-heading text-2xl font-semibold text-unir-ink sm:text-3xl">
          Perguntas frequentes
        </h2>
        <Accordion className="mt-8">
          {FAQ.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-unir-mist">
              <AccordionTrigger className="text-base text-unir-ink">{item.pergunta}</AccordionTrigger>
              <AccordionContent className="text-unir-slate">{item.resposta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA FINAL */}
      <section className="bg-unir-ink">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <GraduationCap className="mx-auto size-10 text-unir-amber" />
          <h2 className="mt-4 font-heading text-2xl font-semibold text-white sm:text-3xl">
            Sua próxima reação adversa não vai avisar antes de acontecer.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/70">
            Esteja pronto antes que o momento chegue. 8 aulas, {PRECO}, acesso imediato.
          </p>
          <CtaButton origem="cta-final" whatsappNumber={whatsappNumber} className="mx-auto mt-8 h-auto px-8 py-3.5 text-base">
            Quero garantir minha vaga agora
          </CtaButton>
          <p className="mt-4 text-xs text-white/40">
            Dúvidas? Fale com a gente pelo{" "}
            <Link
              href="/contato"
              className="underline decoration-white/40 underline-offset-2 hover:text-white/70"
            >
              WhatsApp
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
