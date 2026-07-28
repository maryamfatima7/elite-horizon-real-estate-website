import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const faqs = [
  {
    question: 'What areas do you serve?',
    answer: 'Elite Horizon operates across major metropolitan areas and luxury markets throughout the United States, including Beverly Hills, Manhattan, Miami, Malibu, Aspen, and Scottsdale. We also have international partnerships for clients seeking overseas properties.',
  },
  {
    question: 'How do I schedule a property viewing?',
    answer: 'You can schedule a viewing by contacting us through our website, calling our office directly, or reaching out to one of our agents. We offer flexible scheduling including evenings and weekends to accommodate your availability.',
  },
  {
    question: 'What is your commission structure?',
    answer: 'Our commission rates are competitive and vary based on the property type and listing agreement. We offer transparent pricing with no hidden fees. Contact us for a detailed consultation to discuss your specific situation.',
  },
  {
    question: 'Do you help with property financing?',
    answer: 'Yes, we work with a network of trusted mortgage brokers and financial institutions. Our team can connect you with financing specialists who understand the luxury market and can offer tailored solutions for your purchase.',
  },
  {
    question: 'Can you assist with property management?',
    answer: 'Absolutely. We offer comprehensive property management services including tenant screening, rent collection, maintenance coordination, and financial reporting. Whether you own one property or an entire portfolio, we have solutions for you.',
  },
  {
    question: 'What makes Elite Horizon different from other agencies?',
    answer: 'Our difference lies in our commitment to personalized service, deep market expertise, and a curated network of luxury properties. We combine cutting-edge technology with old-fashioned relationship building to deliver results that exceed expectations.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-navy-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <AnimatedSection className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-gold-600 text-sm uppercase tracking-[0.2em] font-medium mb-3">FAQ</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-navy-600 leading-relaxed mb-8">
              Have questions about buying, selling, or renting with Elite Horizon? We have compiled answers to the most common inquiries. If you do not find what you are looking for, feel free to reach out directly.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy-700 hover:shadow-xl"
            >
              Contact Us
            </a>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.08}>
                <div className="bg-white rounded-xl border border-navy-100/50 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-navy-900 text-sm pr-4">{faq.question}</span>
                    <span className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-navy-50 text-navy-700">
                      {openIndex === idx ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96' : 'max-h-0'}`}
                  >
                    <div className="px-5 pb-5 text-sm text-navy-600 leading-relaxed">{faq.answer}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
