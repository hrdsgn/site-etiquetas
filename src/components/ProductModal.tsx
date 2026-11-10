import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full">
              {product.categoryLabel}
            </span>
            <span className="text-xs text-slate-500 font-medium">Especificação Técnica</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-black text-slate-900 leading-tight">
                {product.name}
              </h3>
              <p className="text-xs font-semibold text-brand">
                {product.tagline}
              </p>
              <div className="bg-surface-50 p-3 rounded-lg border border-surface-200 text-xs text-slate-600">
                <strong>Orçamento transparente:</strong> O valor é calculado conforme medidas, acabamento e tiragem escolhidos no configurador.
              </div>
            </div>
          </div>

          {/* Detailed description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Descrição & Características Têxteis
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Diferenciais desta tecelagem
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-surface-50 p-2.5 rounded-lg border border-surface-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended garments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Ideal para aplicação em:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.idealFor.map((item, idx) => (
                <span key={idx} className="text-xs font-semibold bg-slate-100 text-slate-800 px-3 py-1 rounded-md">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-surface-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Layout e valores aprovados por você antes do pagamento</span>
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
