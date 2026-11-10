import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/adminConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center bg-white px-3.5 py-2 rounded-xl shadow-xl border border-slate-200 text-xs font-semibold text-slate-800 space-x-2 animate-bounce-short">
          <span>💬 Dúvidas sobre tecidos ou medidas? Fale conosco!</span>
          <button 
            type="button" 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20tirar%20dúvidas%20sobre%20etiquetas%20em%20tecido%20personalizadas.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all relative group"
        aria-label="Atendimento via WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-brand border-2 border-white rounded-full animate-ping" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-brand border-2 border-white rounded-full" />
      </a>
    </div>
  );
};
