import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Scissors
} from 'lucide-react';
import { HeroAnimatedEditor } from './HeroAnimatedEditor';

interface HeroProps {
  onStartCustomizing: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCustomizing,
  onExploreCatalog
}) => {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-white via-surface-50 to-surface-100 py-16 sm:py-20 lg:py-24 border-b border-surface-200">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#dc2626 1px, transparent 1px), radial-gradient(#000000 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
              <span>Etiquetas Tecidas em Alta Definição</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Personalize sua etiqueta e{' '}
              <span className="relative inline-block text-brand underline decoration-brand-200 decoration-wavy decoration-2 underline-offset-8">
                aprove antes de pagar.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Escolha entre <strong>Tafetá, Tafetá Gold, Dupla Densidade, Super Batido e Alta Definição</strong>. Configure medidas, cores e orientação horizontal/vertical, visualize a prévia com simulação de tear e receba a aprovação técnica oficial.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onStartCustomizing}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand hover:bg-brand-700 text-white font-extrabold text-base transition-all shadow-glow-red hover:shadow-lg flex items-center justify-center space-x-3 group"
              >
                <Sparkles className="w-5 h-5 text-brand-200" />
                <span>Crie sua etiqueta</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-surface-50 border border-slate-300 text-slate-800 font-bold text-base transition-colors flex items-center justify-center space-x-2"
              >
                <span>Ver Tipos de Tecido</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">Aprovação Prévia</div>
                  <div className="text-[11px] text-slate-500">Pague só após aprovar</div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Award className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">5 Tecelagens</div>
                  <div className="text-[11px] text-slate-500">Tafetá a Alta Definição</div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Scissors className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">8 Acabamentos</div>
                  <div className="text-[11px] text-slate-500">Dobra meio, laser, etc.</div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">A partir de 100 un</div>
                  <div className="text-[11px] text-slate-500">Mínimo flexível</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Animated Editor Mockup in Loop */}
          <div className="lg:col-span-5">
            <HeroAnimatedEditor />
          </div>
        </div>
      </div>
    </section>
  );
};
