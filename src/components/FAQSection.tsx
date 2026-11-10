import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockProducts';

interface FAQSectionProps {
  onOpenBudgetModal: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBudgetModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  const categories = [
    { id: 'todas', label: 'Todas as Dúvidas' },
    { id: 'producao', label: 'Tecelagem & Produção' },
    { id: 'arquivos', label: 'Arquivos & Aprovação' },
    { id: 'prazos', label: 'Prazos & Envio' },
    { id: 'pagamento', label: 'Faturamento & Pagamento' }
  ];

  const filteredItems = FAQ_ITEMS.filter(item => {
    if (selectedCategory === 'todas') return true;
    return item.category === selectedCategory;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-b border-surface-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-50 border border-brand-200 px-3 py-1 rounded-full inline-block mb-3">
            Tire Suas Dúvidas
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Tudo o que você precisa saber sobre o processo de personalização, tecelagem e envio.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-surface-100 hover:bg-surface-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 hover:bg-surface-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 whitespace-pre-line">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Budget CTA Card */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Precisa de um Projeto Especial?
            </span>
            <h3 className="text-xl font-extrabold text-white">
              Tiragens corporativas acima de 10.000 unidades ou tags exclusivas?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Nossa equipe de engenharia têxtil oferece condições diferenciadas e faturamento B2B direto com a fábrica.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBudgetModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand hover:bg-brand-600 text-white font-bold text-sm transition-colors shadow-glow-red flex items-center justify-center space-x-2 whitespace-nowrap"
          >
            <span>Solicitar Orçamento</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
