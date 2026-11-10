import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp
} from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/adminConfig';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBudgetModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBudgetModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
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

            <div className="flex items-center space-x-3 text-slate-400">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-brand transition-colors">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('personalizador')} className="hover:text-brand transition-colors text-brand font-semibold">
                  Personalizador Online
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalogo')} className="hover:text-brand transition-colors">
                  Tipos de Tecido
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dobras')} className="hover:text-brand transition-colors">
                  Cortes & Acabamentos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('como-funciona')} className="hover:text-brand transition-colors">
                  Como Funciona
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('galeria')} className="hover:text-brand transition-colors">
                  Galeria de Amostras
                </button>
              </li>
              <li>
                <button onClick={onOpenBudgetModal} className="hover:text-brand transition-colors">
                  Orçamento Especial
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
              <li>Tafetá Clássico</li>
              <li>Tafetá Gold</li>
              <li>Dupla Densidade (Metade HD / Metade Tafetá)</li>
              <li>Super Batido</li>
              <li>Alta Definição</li>
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
                  <strong className="text-white block">WhatsApp:</strong>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
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
