import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  MessageCircle, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { PhysicalConfig, ArtworkConfig } from '../types';
import { FABRIC_OPTIONS, CUT_OPTIONS, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/adminConfig';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: PhysicalConfig;
  artwork: ArtworkConfig;
  onGoToCustomizer: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  config,
  artwork,
  onGoToCustomizer
}) => {
  if (!isOpen) return null;

  const fabricName = FABRIC_OPTIONS.find(f => f.id === config.fabricId)?.name ?? config.fabricId;
  const cutName = CUT_OPTIONS.find(c => c.id === config.cutId)?.name ?? config.cutId;

  const handleSendToWhatsApp = () => {
    let msg = `Olá, Universo das Etiquetas! 👋\n\n`;
    msg += `Estou no site e gostaria de aprovar o orçamento da minha etiqueta personalizada:\n\n`;
    msg += `📐 Medidas: ${config.widthMm}mm × ${config.lengthMm}mm\n`;
    msg += `🧵 Tecido: ${fabricName}\n`;
    msg += `✂️ Corte: ${cutName}\n`;
    msg += `📦 Quantidade: ${config.quantity.toLocaleString('pt-BR')} unidades\n`;

    if (artwork.textElements.length > 0) {
      msg += `🎨 Arte: Fundo ${artwork.backgroundColor}, textos: ${artwork.textElements.map(t => `"${t.text}"`).join(', ')}\n`;
    }

    msg += `\nGostaria de receber a prova digital oficial para aprovação. Obrigado!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-surface-50">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-brand" />
              <h3 className="font-extrabold text-slate-900 text-base">
                Pedido de Personalização
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item details */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-surface-50 space-y-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Etiqueta em Tecido Personalizada
                </span>
                <h4 className="font-bold text-slate-900 text-base mt-0.5">
                  {fabricName} ({config.widthMm}mm × {config.lengthMm}mm)
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Acabamento: <strong>{cutName}</strong> • {config.quantity.toLocaleString('pt-BR')} unidades
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Arte: Criada no editor do site ({artwork.textElements.length} elemento{artwork.textElements.length !== 1 ? 's' : ''})
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onGoToCustomizer();
                  }}
                  className="text-brand font-bold hover:underline"
                >
                  Alterar especificações no configurador
                </button>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 space-y-2">
              <div className="flex items-center space-x-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Fluxo de aprovação antes do pagamento:</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">
                Você envia as informações pelo WhatsApp da fábrica. Nossa equipe analisa a arte, prepara a prova digital e confirma o orçamento definitivo. O pagamento só é realizado após você aprovar tudo.
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="p-5 border-t border-slate-200 bg-surface-50 space-y-3">
            <button
              type="button"
              onClick={handleSendToWhatsApp}
              className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Enviar para o WhatsApp ({WHATSAPP_DISPLAY})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onGoToCustomizer();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              Continuar Editando no Configurador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
