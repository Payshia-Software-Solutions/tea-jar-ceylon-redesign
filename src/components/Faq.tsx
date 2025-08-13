
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: 'What types of tea does Tea Jar offer?',
    answer:
      'We offer a wide variety of premium Ceylon teas, including classic black teas, delicate green teas, complex oolongs, rare white teas, and flavorful herbal infusions. Explore our collections to find your perfect cup.',
  },
  {
    question: 'Why is Tea Jar tea special?',
    answer:
      "Our teas are single-origin, ethically sourced, and factory-fresh, reflecting the rich heritage of Ceylon tea. We combine over 30 years of expertise with traditional craftsmanship to deliver exceptional quality and a true taste of Sri Lanka.",
  },
  {
    question: 'What certifications do your teas have?',
    answer:
      'Our teas are produced in ISO 22000, HACCP, and GMP certified facilities. We also offer a range of USDA, EU, and JAS certified organic teas, ensuring the highest standards of quality and safety.',
  },
  {
    question: 'Where is Tea Jar tea sourced from?',
    answer:
      "All our teas are sourced directly from the lush, pristine tea gardens of Sri Lanka's renowned tea-growing regions, such as Dimbula, Nuwara Eliya, and Kandy.",
  },
  {
    question: 'How can I contact customer support?',
    answer:
      'You can reach our customer support team via email at marketing@teajarceylon.com or by calling us at (+94)70 55 08 800. We are available daily from 9 am to 6 pm.',
  },
];

export function Faq() {
  return (
    <section className="bg-[#353d32] py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-neutral-600/50"
              >
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline py-6 text-neutral-100">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-neutral-300 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
