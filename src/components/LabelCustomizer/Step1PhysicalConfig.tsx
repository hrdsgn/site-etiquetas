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
  getMinQuantity,
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
  const minQty = getMinQuantity(config.widthMm);

  const handleQuantityChange = (val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      onChange({ quantity: num });
    }
  };

  return (
    <div className="space-y-8">
      {/* ── LARGURA ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
          <Ruler className="w-4 h-4 text-brand" />
          <span>Largura da etiqueta</span>
          <span className="ml-auto text-xs font-mono font-bold text-brand bg-brand-50 px-2 py-0.5 rounded">
            {config.widthMm} mm
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          {WIDTH_OPTIONS_MM.map(w => (
            <button
              key={w}
              type="button"
              onClick={() => {
                const newMinQty = getMinQuantity(w);
                onChange({
                  widthMm: w,
                  quantity: config.quantity < newMinQty ? newMinQty : config.quantity,
                });
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all ${
                config.widthMm === w
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {w} mm
            </button>
          ))}
        </div>
      </div>

      {/* ── COMPRIMENTO ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
          <Ruler className="w-4 h-4 text-brand rotate-90" />
          <span>Comprimento da etiqueta</span>
          <span className="ml-auto text-xs font-mono font-bold text-brand bg-brand-50 px-2 py-0.5 rounded">
            {config.lengthMm} mm
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          {LENGTH_OPTIONS_MM.map(l => (
            <button
              key={l}
              type="button"
              onClick={() => onChange({ lengthMm: l })}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all ${
                config.lengthMm === l
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {l} mm
            </button>
          ))}
        </div>
      </div>

      {/* ── TIPO DE TECIDO ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
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
                  ? 'border-brand bg-brand-50/60 ring-1 ring-brand'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-slate-900 text-sm">{fabric.name}</div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{fabric.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── TIPO DE CORTE / ACABAMENTO ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
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
                  ? 'border-brand bg-brand-50/60 ring-1 ring-brand'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-slate-900 text-xs sm:text-sm">{cut.name}</div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug hidden sm:block">{cut.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── TIPO DE FIO ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
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
                  ? 'border-brand bg-brand-50/60 ring-1 ring-brand text-slate-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {thread.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── TIPO DE APLICAÇÃO ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
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
                  ? 'border-brand bg-brand-50/60 ring-1 ring-brand text-slate-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── QUANTIDADE ── */}
      <div>
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
          <Hash className="w-4 h-4 text-brand" />
          <span>Quantidade desejada</span>
          <span className="ml-auto text-xs text-slate-500 font-medium">
            Mínimo para esta largura: <strong className="text-slate-900">{minQty} un</strong>
          </span>
        </label>
        <input
          type="number"
          min={minQty}
          step={50}
          value={config.quantity}
          onChange={e => handleQuantityChange(e.target.value)}
          className="w-full sm:w-64 px-4 py-3 bg-white border border-slate-300 rounded-xl text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
        {config.quantity < minQty && (
          <p className="text-xs text-red-600 font-semibold mt-1">
            A quantidade mínima para etiquetas de {config.widthMm}mm de largura é de {minQty} unidades.
          </p>
        )}
      </div>
    </div>
  );
};
