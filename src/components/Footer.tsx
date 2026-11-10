import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/adminConfig';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBudgetModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBudgetModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 dark:bg-black text-white pt-16 pb-12 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white font-extrabold text-xl shadow-glow-red">
                U
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight leading-none block">
                  UNIVERSO<span className="text-brand">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  Das Etiquetas
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Especialistas na fabricação de etiquetas personalizadas em tecido: Tafetá, Tafetá Gold, Dupla Densidade, Super Batido e Alta Definição. Tecnologia fabril própria, acabamentos variados e aprovação do layout antes do pagamento.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleNavClick('personalizador')}
                className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-700 text-white text-xs font-bold transition-colors inline-flex items-center space-x-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Abrir Criador de Etiquetas</span>
              </button>
            </div>
          </div>

          {/* Quick Nav Links (Multi-Page) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Páginas do Site
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-brand transition-colors text-left">
                  Página Inicial
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('personalizador')} className="hover:text-brand transition-colors text-brand font-semibold text-left">
                  Criador de Etiquetas
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('catalogo')} className="hover:text-brand transition-colors text-left">
                  Catálogo de Tecidos
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('dobras')} className="hover:text-brand transition-colors text-left">
                  Cortes & Dobras
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('como-funciona')} className="hover:text-brand transition-colors text-left">
                  Como Funciona
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('galeria')} className="hover:text-brand transition-colors text-left">
                  Amostras Técnicas
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-brand transition-colors text-left">
                  Dúvidas Frequentes
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contato')} className="hover:text-brand transition-colors text-left">
                  Contato & Orçamento
                </button>
              </li>
            </ul>
          </div>

          {/* Fabrics */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Tipos de Tecido
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button onClick={() => handleNavClick('catalogo')} className="hover:text-white transition-colors text-left">
                  • Tafetá Clássico
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('catalogo')} className="hover:text-white transition-colors text-left">
                  • Tafetá Gold
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('catalogo')} className="hover:text-white transition-colors text-left">
                  • Dupla Densidade (Metade HD / Metade Tafetá)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('catalogo')} className="hover:text-white transition-colors text-left">
                  • Super Batido
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('catalogo')} className="hover:text-white transition-colors text-left">
                  • Alta Definição
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Atendimento & WhatsApp
            </h4>
            <div className="text-xs space-y-2.5 text-slate-400">
              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">WhatsApp da Fábrica:</strong>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand text-emerald-400 font-bold">
                    {WHATSAPP_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">E-mail:</strong>
                  <a href="mailto:contato@universodasetiquetas.com.br" className="hover:text-brand">
                    contato@universodasetiquetas.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Envio:</strong>
                  <span>Para todo o Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Universo das Etiquetas • Todos os direitos reservados.
          </div>

          <div className="flex items-center space-x-4">
            <span>Aprovação prévia do layout</span>
            <span>•</span>
            <span>WhatsApp {WHATSAPP_DISPLAY}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
