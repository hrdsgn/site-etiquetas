import React, { useState, useEffect } from 'react';
import { Sparkles, MousePointer, Sliders, Palette, CheckCircle2, Layers } from 'lucide-react';

interface SimulationState {
  brandText: string;
  subText: string;
  widthMm: number;
  lengthMm: number;
  bgColor: string;
  textColor: string;
  fabricName: string;
  cutName: string;
  weaveClass: string;
  isDupla: boolean;
  cursorAction: string;
}

const SIMULATION_STEPS: SimulationState[] = [
  {
    brandText: 'UNIVERSO CLUB',
    subText: '100% ALGODÃO • BRASIL',
    widthMm: 20,
    lengthMm: 65,
    bgColor: '#FFFFFF',
    textColor: '#DC2626',
    fabricName: 'Alta Definição',
    cutName: 'DOBRA MEIO',
    weaveClass: 'tear-weave-alta-definicao tear-text-alta-definicao',
    isDupla: false,
    cursorAction: 'Digitando nome da marca...',
  },
  {
    brandText: 'ATELIER BOTANIC',
    subText: 'ALTA COSTURA • FEITO À MÃO',
    widthMm: 35,
    lengthMm: 70,
    bgColor: '#FBF8F2',
    textColor: '#15803D',
    fabricName: 'Tafetá Gold',
    cutName: 'PONTAS',
    weaveClass: 'tear-weave-tafeta-gold tear-text-tafeta-gold',
    isDupla: false,
    cursorAction: 'Ajustando largura para 35mm...',
  },
  {
    brandText: 'DENIM HERITAGE',
    subText: 'ESTOQUE LIMITADO • 1984',
    widthMm: 45,
    lengthMm: 60,
    bgColor: '#0F172A',
    textColor: '#D97706',
    fabricName: 'Super Batido',
    cutName: 'SÓ CORTADA',
    weaveClass: 'tear-weave-super-batido tear-text-super-batido',
    isDupla: false,
    cursorAction: 'Trocando cor para Preto Ônix & Ouro...',
  },
  {
    brandText: 'STUDIO NOIR',
    subText: '50% ALTA / 50% TAFETÁ',
    widthMm: 25,
    lengthMm: 75,
    bgColor: '#FFFFFF',
    textColor: '#000000',
    fabricName: 'Dupla Densidade',
    cutName: 'MANHATTAN',
    weaveClass: 'tear-weave-dupla',
    isDupla: true,
    cursorAction: 'Alternando para Dupla Densidade meio a meio...',
  },
];

export const HeroAnimatedEditor: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex(prev => (prev + 1) % SIMULATION_STEPS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const current = SIMULATION_STEPS[stepIndex];

  // Proportional width for visual demo
  const displayWidthPx = Math.min(270, Math.max(140, current.widthMm * 5.2));
  const displayHeightPx = Math.min(240, Math.max(160, current.lengthMm * 2.8));

  return (
    <div className="relative mx-auto max-w-sm sm:max-w-md">
      {/* Decorative ambient glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-red-500/25 via-brand/20 to-amber-500/15 rounded-3xl blur-2xl -z-10" />

      {/* Main Software Mockup Window */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-800 space-y-4">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono font-bold text-slate-400 pl-2">
              Editor de Etiquetas 2D
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-[10px] bg-red-950/60 text-brand-300 font-bold px-2 py-0.5 rounded-full border border-red-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            <span>AO VIVO</span>
          </div>
        </div>

        {/* Action Status Indicator */}
        <div className="flex items-center justify-between bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px]">
          <div className="flex items-center space-x-1.5 text-slate-300">
            <MousePointer className="w-3.5 h-3.5 text-brand animate-bounce" />
            <span className="font-medium truncate max-w-[200px]">{current.cursorAction}</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">{current.fabricName}</span>
        </div>

        {/* Live Animated Canvas Container */}
        <div className="flex items-center justify-center min-h-[220px] bg-gradient-to-b from-slate-950 to-slate-900/90 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
          {/* Background grid */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '12px 12px'
            }}
          />

          {/* The Animated Label Element */}
          <div
            className="rounded-xs shadow-2xl relative overflow-hidden transition-all duration-700 ease-out label-elevation flex flex-col justify-between"
            style={{
              width: `${displayWidthPx}px`,
              height: `${displayHeightPx}px`,
              backgroundColor: current.bgColor,
              color: current.textColor,
            }}
          >
            {/* Dupla Densidade split texture */}
            {current.isDupla ? (
              <>
                <div className="absolute inset-x-0 top-0 h-1/2 tear-weave-alta-definicao border-b border-dashed border-red-500/50 pointer-events-none">
                  <span className="absolute top-1 right-1 text-[7px] font-mono font-bold bg-slate-900/80 text-emerald-300 px-1 rounded">
                    Alta
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 tear-weave-tafeta pointer-events-none">
                  <span className="absolute bottom-1 right-1 text-[7px] font-mono font-bold bg-slate-900/80 text-amber-300 px-1 rounded">
                    Tafetá
                  </span>
                </div>
              </>
            ) : (
              <div className={`absolute inset-0 pointer-events-none ${current.weaveClass}`} />
            )}

            {/* Dobra Meio line indicator */}
            {current.cutName === 'DOBRA MEIO' && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-red-500/60 pointer-events-none z-10" />
            )}

            {/* Label Content Header */}
            <div className="pt-2 px-3 text-center relative z-10">
              <span className="text-[8px] uppercase tracking-widest opacity-75 font-mono block">
                {current.cutName}
              </span>
            </div>

            {/* Main Animated Text */}
            <div className="px-3 text-center relative z-10 my-auto">
              <div className="font-black tracking-tight uppercase leading-none font-sans text-sm sm:text-base drop-shadow-xs transition-all duration-300">
                {current.brandText}
              </div>
              <div className="text-[9px] tracking-wider mt-1 opacity-85 font-medium uppercase font-sans">
                {current.subText}
              </div>
            </div>

            {/* Bottom Sizing / Spec */}
            <div className="pb-2 px-3 flex items-center justify-between text-[9px] font-bold opacity-80 border-t border-current/15 pt-1 relative z-10 font-mono">
              <span>TAMANHO M</span>
              <span>{current.widthMm}×{current.lengthMm}mm</span>
            </div>
          </div>
        </div>

        {/* Live Controller Sliders Demonstration Bar */}
        <div className="pt-1 grid grid-cols-3 gap-2 text-[10px] text-slate-400 border-t border-slate-800">
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-500 block">Largura Tear</span>
            <strong className="text-white font-mono text-xs">{current.widthMm} mm</strong>
          </div>
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-500 block">Acabamento</span>
            <strong className="text-white font-mono text-xs truncate block">{current.cutName}</strong>
          </div>
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-500 block">Tecelagem</span>
            <strong className="text-emerald-400 font-mono text-xs truncate block">{current.fabricName}</strong>
          </div>
        </div>
      </div>

      {/* Floating interactive badge */}
      <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3 rounded-xl shadow-card border border-slate-200 flex items-center space-x-2.5 max-w-[240px]">
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
          ✓
        </div>
        <div className="text-xs">
          <div className="font-bold text-slate-900 leading-tight">Simulação de Tear Ativa</div>
          <div className="text-slate-500 text-[10px]">Pixelização fiel ao tecido</div>
        </div>
      </div>
    </div>
  );
};
