import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Phone, 
  Sparkles
} from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/adminConfig';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenBudgetModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenBudgetModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-surface-200">
      {/* Top Notice Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">
              ⚡ <strong>Diferencial Exclusivo:</strong> Envie seu pedido e <strong>aprove o layout antes de pagar</strong>.
            </span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
            <span>🚚 Envio para todo o Brasil</span>
            <span className="hidden md:inline">•</span>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20tirar%20dúvidas%20sobre%20etiquetas%20em%20tecido.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-brand-300 flex items-center space-x-1"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('inicio')}
            className="cursor-pointer flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white shadow-glow-red group-hover:scale-105 transition-transform relative overflow-hidden">
              <span className="font-extrabold text-xl tracking-tighter">U</span>
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/30" />
            </div>

            <div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none block">
                UNIVERSO<span className="text-brand">.</span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 block">
                Das Etiquetas
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-700">
            <button
              type="button"
              onClick={() => handleNavClick('personalizador')}
              className="hover:text-brand transition-colors flex items-center space-x-1.5 text-brand"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Crie sua Etiqueta</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('catalogo')}
              className="hover:text-brand transition-colors"
            >
              Tipos de Tecido
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('dobras')}
              className="hover:text-brand transition-colors"
            >
              Cortes & Acabamentos
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('como-funciona')}
              className="hover:text-brand transition-colors"
            >
              Como Funciona
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('galeria')}
              className="hover:text-brand transition-colors"
            >
              Galeria
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="hover:text-brand transition-colors"
            >
              Dúvidas
            </button>
          </nav>

          {/* Right Action Icons: WhatsApp Direct & Mobile Trigger */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20sobre%20etiquetas.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp {WHATSAPP_DISPLAY}</span>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-surface-100 text-slate-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-surface-200 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <button
              type="button"
              onClick={() => handleNavClick('personalizador')}
              className="text-left py-2 px-3 rounded-lg bg-brand-50 text-brand font-bold flex items-center justify-between"
            >
              <span>Personalizador de Etiquetas</span>
              <Sparkles className="w-4 h-4 text-brand" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('catalogo')}
              className="text-left py-2 px-3 rounded-lg hover:bg-surface-100"
            >
              Tipos de Tecido
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('dobras')}
              className="text-left py-2 px-3 rounded-lg hover:bg-surface-100"
            >
              Cortes & Acabamentos
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('como-funciona')}
              className="text-left py-2 px-3 rounded-lg hover:bg-surface-100"
            >
              Como Funciona a Aprovação
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('galeria')}
              className="text-left py-2 px-3 rounded-lg hover:bg-surface-100"
            >
              Galeria de Amostras
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="text-left py-2 px-3 rounded-lg hover:bg-surface-100"
            >
              Dúvidas Frequentes (FAQ)
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left py-2 px-3 rounded-lg text-emerald-600 font-bold flex items-center space-x-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Falar no WhatsApp ({WHATSAPP_DISPLAY})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
