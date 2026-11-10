import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Layers, FileText } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onCustomize: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onCustomize
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 px-2.5 py-0.5 rounded-full">
              {product.categoryLabel}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Especificação Técnica</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable - 100% TEXTUAL */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h3>
            <p className="text-sm font-semibold text-brand">
              {product.tagline}
            </p>
          </div>

          {/* Detailed description */}
          <div className="bg-surface-50 dark:bg-slate-800/60 p-4 rounded-xl border border-surface-200 dark:border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Descrição & Comportamento Têxtil
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Diferenciais desta tecelagem
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300 bg-surface-50 dark:bg-slate-800 p-2.5 rounded-lg border border-surface-200 dark:border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended garments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Aplicações recomendadas:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.idealFor.map((item, idx) => (
                <span key={idx} className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-surface-50 dark:bg-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Layout aprovado por você antes do pagamento</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onCustomize(product);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-700 text-white font-bold text-sm transition-colors shadow-sm flex items-center justify-center space-x-2"
          >
            <span>Configurar com este Tecido</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
