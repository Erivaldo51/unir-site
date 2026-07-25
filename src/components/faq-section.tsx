import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { perguntasFrequentes } from "@/data/faq";

export function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="text-center font-heading text-3xl font-semibold text-unir-ink">
        Perguntas frequentes
      </h2>
      <Accordion className="mt-8">
        {perguntasFrequentes.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-unir-mist">
            <AccordionTrigger className="text-base text-unir-ink">
              {item.pergunta}
            </AccordionTrigger>
            <AccordionContent className="text-unir-slate">{item.resposta}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
