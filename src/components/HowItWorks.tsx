import React from 'react';
import { 
  Sliders, 
  Palette, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Send
} from 'lucide-react';

interface HowItWorksProps {
  onStartCustomizing: () => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Escolha Medidas & Dobra',
    desc: 'Defina a largura do tear, comprimento, acabamento (costura, termocolante ou entretela) e tiragem com cálculo de desconto em tempo real.',
    icon: Sliders,
    color: 'bg-blue-50 text-blue-600 border-blue-200'
  },
  {
    step: '02',
    title: 'Crie a Arte ou Envie seu Arquivo',
    desc: 'Use nosso editor intuitivo com fontes e símbolos de lavagem ou faça o upload de seu logotipo em PDF, AI, CorelDraw, SVG ou PNG.',
    icon: Palette,
    color: 'bg-brand-50 text-brand border-brand-200'
  },
  {
    step: '03',
    title: 'Prova Digital em até 2 Horas',
    desc: 'Nossos designers têxteis preparam a ficha técnica com sangrias, amarração de fios e cores Pantone para você revisar nos mínimos detalhes.',
    icon: FileCheck,
    color: 'bg-amber-50 text-amber-600 border-amber-200'
  },
  {
    step: '04',
    title: 'Aprovação Antes do Pagamento',
    desc: 'Você confere tudo com tranquilidade e só efetua o pagamento após aprovar 100% o layout oficial. Sem surpresas na tecelagem!',
    icon: ShieldCheck,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
  }
];

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartCustomizing }) => {
  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-surface-50 border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-50 border border-brand-200 px-3 py-1 rounded-full inline-block mb-3">
            Simples, Transparente & Seguro
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Como funciona a personalização em 4 etapas
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Eliminamos os riscos da compra de etiquetas personalizadas. Você visualiza, simula e aprova antes de qualquer cobrança.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black font-mono tracking-widest text-slate-400">
                      PASSO {item.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {index === 3 && (
                  <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center space-x-1.5 text-xs text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Zero risco para você</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900">
              Pronto para colocar sua marca em destaque?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Inicie a personalização agora mesmo. Leva menos de 2 minutos.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartCustomizing}
            className="px-6 py-3 rounded-xl bg-brand hover:bg-brand-700 text-white font-bold text-sm transition-colors shadow-glow-red flex items-center space-x-2 whitespace-nowrap"
          >
            <span>Iniciar Personalização</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
