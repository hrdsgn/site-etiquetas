import React from 'react';
import { 
  Palette, 
  Sparkles, 
  Layers, 
  Headphones, 
  ShieldCheck, 
  Truck,
  CheckCircle2,
  Award
} from 'lucide-react';

const PILLARS = [
  {
    title: 'Personalização Ilimitada',
    subtitle: 'Sua marca com fidelidade milimétrica',
    desc: 'Controle absoluto sobre medidas de tear (de 12mm a 50mm), pantones de fios, acabamentos de costura e tipos de dobra.',
    icon: Palette,
    badge: '100% Sob Medida'
  },
  {
    title: 'Qualidade Fabril Superior',
    subtitle: 'Fios 50 Denier com toque de seda',
    desc: 'Tecelagem jacquard de alta densidade que resiste a lavagens severas sem desbotar, desfiar ou causar irritação na pele do cliente.',
    icon: Award,
    badge: 'Fios Oeko-Tex'
  },
  {
    title: 'Variedade de Acabamentos',
    subtitle: 'Da camisaria ao streetwear e jeanswear',
    desc: 'Amplo catálogo de dobras (central, pontas, corte reto a laser), termocolantes sem costura e etiquetas entreteladas para alfaiataria.',
    icon: Layers,
    badge: 'Múltiplas Dobras'
  },
  {
    title: 'Atendimento & Prova Virtual',
    subtitle: 'Designers têxteis dedicados ao seu pedido',
    desc: 'Você não compra no escuro. Nossos especialistas preparam a prova digital do seu layout para aprovação antes de qualquer pagamento.',
    icon: Headphones,
    badge: 'Aprovação Prévia'
  }
];

export const Benefits: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-surface-50 border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-50 border border-brand-200 px-3 py-1 rounded-full inline-block mb-3">
            Por Que a Universo das Etiquetas
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            A infraestrutura têxtil completa para valorizar suas roupas
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Combinamos tecnologia de tecelagem suíça com um atendimento consultivo e a segurança da aprovação prévia.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-bold text-brand bg-brand-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    {pillar.badge}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5 mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Factory Stats Bar */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">+5 Milhões</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Etiquetas tecidas entregues</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Aprovação prévia sem risco</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">5 a 7 Dias</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Prazo médio de produção</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">4.9 / 5.0</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Avaliação dos confeccionistas</div>
          </div>
        </div>
      </div>
    </section>
  );
};
