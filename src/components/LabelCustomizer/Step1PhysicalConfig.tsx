import React from 'react';
import { Ruler, Scissors, Layers, Box, Settings2, Hash } from 'lucide-react';
import { PhysicalConfig } from '../../types';
import {
  FABRIC_OPTIONS,
  CUT_OPTIONS,
  THREAD_OPTIONS,
  APPLICATION_OPTIONS,
  WIDTH_OPTIONS_MM,
  LENGTH_OPTIONS_MM,
} from '../../data/adminConfig';

interface Step1Props {
  config: PhysicalConfig;
  onChange: (updated: Partial<PhysicalConfig>) => void;
}

export const Step1PhysicalConfig: React.FC<Step1Props> = ({ config, onChange }) => {
  const activeFabrics = FABRIC_OPTIONS.filter(f => f.active);
  const activeCuts = CUT_OPTIONS.filter(c => c.active);
  const activeThreads = THREAD_OPTIONS.filter(t => t.active);
  const activeApplications = APPLICATION_OPTIONS.filter(a => a.active);

  // Width slider index
  const widthIndex = Math.max(0, WIDTH_OPTIONS_MM.indexOf(config.widthMm));
  const currentWidthIdx = widthIndex === -1 ? 2 : widthIndex;

  // Length slider index
  const lengthIndex = Math.max(0, LENGTH_OPTIONS_MM.indexOf(config.lengthMm));
  const currentLengthIdx = lengthIndex === -1 ? 11 : lengthIndex;

  const handleQuantityChange = (val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1) {
      onChange({ quantity: num });
    }
  };

  return (
    <div className="space-y-8">
      {/* ── LARGURA (SLIDER DESLIZANTE + BOTÕES) ── */}
      <div className="bg-surface-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-surface-200 dark:border-slate-700/80">
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-100">
            <Ruler className="w-4 h-4 text-brand" />
            <span>Largura da etiqueta (deslizante)</span>
          </label>
          <span className="text-sm font-mono font-black text-brand bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 px-2.5 py-1 rounded-lg">
            {config.widthMm} mm
          </span>
        </div>

        {/* Range Slider */}
        <div className="py-2">
          <input
            type="range"
            min={0}
            max={WIDTH_OPTIONS_MM.length - 1}
            step={1}
            value={currentWidthIdx}
            onChange={e => {
              const idx = Number(e.target.value);
              onChange({ widthMm: WIDTH_OPTIONS_MM[idx] });
            }}
            className="w-full accent-brand h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-1 px-1">
            <span>{WIDTH_OPTIONS_MM[0]}mm</span>
            <span>{WIDTH_OPTIONS_MM[Math.floor(WIDTH_OPTIONS_MM.length / 2)]}mm</span>
            <span>{WIDTH_OPTIONS_MM[WIDTH_OPTIONS_MM.length - 1]}mm</span>
          </div>
        </div>

        {/* Preset Buttons matching the slider */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          {WIDTH_OPTIONS_MM.map(w => (
            <button
              key={w}
              type="button"
              onClick={() => onChange({ widthMm: w })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                config.widthMm === w
                  ? 'bg-slate-900 dark:bg-brand text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {w} mm
            </button>
          ))}
        </div>
      </div>

      {/* ── COMPRIMENTO (SLIDER DESLIZANTE + BOTÕES) ── */}
      <div className="bg-surface-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-surface-200 dark:border-slate-700/80">
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-100">
            <Ruler className="w-4 h-4 text-brand rotate-90" />
            <span>Comprimento da etiqueta (deslizante)</span>
          </label>
          <span className="text-sm font-mono font-black text-brand bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 px-2.5 py-1 rounded-lg">
            {config.lengthMm} mm
          </span>
        </div>

        {/* Range Slider */}
        <div className="py-2">
          <input
            type="range"
            min={0}
            max={LENGTH_OPTIONS_MM.length - 1}
            step={1}
            value={currentLengthIdx}
            onChange={e => {
              const idx = Number(e.target.value);
              onChange({ lengthMm: LENGTH_OPTIONS_MM[idx] });
            }}
            className="w-full accent-brand h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-1 px-1">
            <span>{LENGTH_OPTIONS_MM[0]}mm</span>
            <span>{LENGTH_OPTIONS_MM[Math.floor(LENGTH_OPTIONS_MM.length / 2)]}mm</span>
            <span>{LENGTH_OPTIONS_MM[LENGTH_OPTIONS_MM.length - 1]}mm</span>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 max-h-28 overflow-y-auto">
          {LENGTH_OPTIONS_MM.map(l => (
            <button
              key={l}
              type="button"
              onClick={() => onChange({ lengthMm: l })}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                config.lengthMm === l
                  ? 'bg-slate-900 dark:bg-brand text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {l} mm
            </button>
          ))}
        </div>
      </div>

      {/* ── TIPO DE TECIDO ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">
          <Layers className="w-4 h-4 text-brand" />
          <span>Tipo de tecido</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {activeFabrics.map(fabric => (
            <button
              key={fabric.id}
              type="button"
              onClick={() => onChange({ fabricId: fabric.id })}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                config.fabricId === fabric.id
                  ? 'border-brand bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="font-bold text-slate-900 dark:text-white text-sm">{fabric.name}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{fabric.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── TIPO DE CORTE / ACABAMENTO ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">
          <Scissors className="w-4 h-4 text-brand" />
          <span>Tipo de corte / acabamento</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {activeCuts.map(cut => (
            <button
              key={cut.id}
              type="button"
              onClick={() => onChange({ cutId: cut.id })}
              className={`p-3 rounded-xl border text-left transition-all ${
                config.cutId === cut.id
                  ? 'border-brand bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{cut.name}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug hidden sm:block">{cut.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── TIPO DE FIO ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">
          <Settings2 className="w-4 h-4 text-brand" />
          <span>Tipo de fio</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {activeThreads.map(thread => (
            <button
              key={thread.id}
              type="button"
              onClick={() => onChange({ threadId: thread.id })}
              className={`px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                config.threadId === thread.id
                  ? 'border-brand bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand text-slate-900 dark:text-white'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {thread.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── TIPO DE APLICAÇÃO ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">
          <Box className="w-4 h-4 text-brand" />
          <span>Tipo de aplicação</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {activeApplications.map(app => (
            <button
              key={app.id}
              type="button"
              onClick={() => onChange({ applicationId: app.id })}
              className={`px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                config.applicationId === app.id
                  ? 'border-brand bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand text-slate-900 dark:text-white'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── QUANTIDADE (SEM QUANTIDADE MÍNIMA BLOQUEANTE) ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-100">
            <Hash className="w-4 h-4 text-brand" />
            <span>Quantidade desejada</span>
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Sem quantidade mínima obrigatória
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="number"
            min={1}
            step={50}
            value={config.quantity}
            onChange={e => handleQuantityChange(e.target.value)}
            className="w-full sm:w-64 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
          <div className="flex items-center space-x-1.5 text-xs">
            {[100, 500, 1000, 2500, 5000].map(q => (
              <button
                key={q}
                type="button"
                onClick={() => onChange({ quantity: q })}
                className="px-2.5 py-2 rounded-lg bg-surface-100 dark:bg-slate-800 hover:bg-surface-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
              >
                {q} un
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
