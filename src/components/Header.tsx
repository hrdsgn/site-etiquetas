import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Phone, 
  Sparkles,
  Sun,
  Moon,
  Home,
  Layers,
  Scissors,
  HelpCircle,
  FileText,
  Mail
} from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/adminConfig';
import { PageRoute } from '../types';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: PageRoute; label: string; highlight?: boolean }[] = [
    { id: 'home', label: 'Início' },
    { id: 'personalizador', label: 'Criador de Etiquetas', highlight: true },
    { id: 'catalogo', label: 'Tecidos' },
    { id: 'dobras', label: 'Cortes & Dobras' },
    { id: 'como-funciona', label: 'Como Funciona' },
    { id: 'galeria', label: 'Amostras' },
    { id: 'faq', label: 'Dúvidas' },
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-surface-200 dark:border-slate-800 transition-colors">
      {/* Top Notice Bar */}
      <div className="bg-slate-900 dark:bg-black text-white text-xs py-2 px-4 border-b border-slate-800">
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
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white shadow-glow-red group-hover:scale-105 transition-transform relative overflow-hidden">
              <span className="font-extrabold text-xl tracking-tighter">U</span>
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/30" />
            </div>

            <div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none block">
                UNIVERSO<span className="text-brand">.</span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">
                Das Etiquetas
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Multi-Page) */}
          <nav className="hidden xl:flex items-center space-x-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              if (item.highlight) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 ${
                      isActive
                        ? 'bg-brand text-white shadow-sm'
                        : 'text-brand bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? 'text-brand dark:text-brand-400 font-bold'
                      : 'hover:text-brand dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Dark Mode Toggle + WhatsApp + Mobile Menu */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* DARK MODE TOGGLE BUTTON */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-surface-50 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-surface-100 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1.5"
              title={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              aria-label="Alternar tema escuro/claro"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline text-xs font-bold text-slate-200">Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="hidden sm:inline text-xs font-bold text-slate-700">Escuro</span>
                </>
              )}
            </button>

            {/* WhatsApp Direct Action */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20sobre%20etiquetas.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-surface-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              aria-label="Menu de Navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-surface-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2">
          {navItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-surface-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {item.highlight && <Sparkles className="w-4 h-4" />}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center space-x-2"
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
