import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ProductCatalog } from './components/ProductCatalog';
import { LabelCustomizer } from './components/LabelCustomizer/LabelCustomizer';
import { FoldTypesGuide } from './components/FoldTypesGuide';
import { GallerySection } from './components/GallerySection';
import { Benefits } from './components/Benefits';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ProductModal } from './components/ProductModal';
import { BudgetModal } from './components/BudgetModal';
import { CartDrawer } from './components/CartDrawer';
import { Product, PhysicalConfig, ArtworkConfig, PageRoute } from './types';
import { PRODUCTS } from './data/mockProducts';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from './data/adminConfig';
import { 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Layers,
  ChevronRight,
  Home
} from 'lucide-react';

export function App() {
  // Dark mode state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Multi-page routing state
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validPages: PageRoute[] = [
        'home',
        'personalizador',
        'catalogo',
        'dobras',
        'como-funciona',
        'galeria',
        'faq',
        'contato'
      ];
      if (validPages.includes(hash)) return hash;
    }
    return 'home';
  });

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to hash changes for browser forward/backward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validPages: PageRoute[] = [
        'home',
        'personalizador',
        'catalogo',
        'dobras',
        'como-funciona',
        'galeria',
        'faq',
        'contato'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Configuration passed to customizer and cart
  const currentConfig: PhysicalConfig = {
    widthMm: 20,
    lengthMm: 65,
    fabricId: selectedProduct?.defaultFabric || 'tafeta_gold',
    cutId: selectedProduct?.defaultCut || 'dobra_meio',
    threadId: 'poliester',
    applicationId: 'costura',
    quantity: 1000,
  };

  const currentArtwork: ArtworkConfig = {
    mode: 'online',
    backgroundColor: '#FFFFFF',
    textElements: [
      {
        id: 'el-1',
        text: 'SUA MARCA',
        fontFamily: 'Inter',
        fontSize: 18,
        color: '#DC2626',
        alignment: 'center',
        bold: true,
        italic: false,
        uppercase: true,
        rotation: 0,
        y: 40,
      },
    ],
  };

  const handleSelectProductToCustomize = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('personalizador');
  };

  // Breadcrumb helper
  const renderBreadcrumb = (pageTitle: string) => (
    <div className="bg-surface-100 dark:bg-slate-800/80 border-b border-surface-200 dark:border-slate-800 py-3 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-brand flex items-center space-x-1"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Início</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-bold text-slate-800 dark:text-slate-200">{pageTitle}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased transition-colors duration-200">
      {/* Header with Multi-Page Navigation and Dark Mode Switch */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* ─────────────────────────────────────────────────────────────
          MULTI-PAGE ROUTING VIEWS
          ───────────────────────────────────────────────────────────── */}
      <main className="flex-1">
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <div>
            <Hero
              onStartCustomizing={() => navigateTo('personalizador')}
              onExploreCatalog={() => navigateTo('catalogo')}
            />

            {/* Quick Teaser: As 4 Etapas */}
            <HowItWorks
              onStartCustomizing={() => navigateTo('personalizador')}
            />

            {/* Quick Teaser: Tecidos Textuais (Sem Fotos) */}
            <section className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-t border-b border-surface-200 dark:border-slate-800 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 px-3 py-1 rounded-full inline-block mb-2">
                      Fibras & Tecelagens
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      Conheça os 5 tipos de tecidos disponíveis
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('catalogo')}
                    className="text-xs font-bold text-brand hover:underline flex items-center space-x-1"
                  >
                    <span>Ver especificações completas de tecidos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {PRODUCTS.slice(0, 3).map(product => (
                    <div
                      key={product.id}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-surface-50 dark:bg-slate-800 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-brand bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {product.categoryLabel}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-3">
                          {product.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSelectProductToCustomize(product)}
                        className="w-full py-2 px-3 rounded-xl bg-brand hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <span>Criar com este tecido</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Teaser: Acabamentos */}
            <section className="py-12 bg-surface-50 dark:bg-slate-950 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Pronto para configurar sua etiqueta?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                  Sem quantidade mínima bloqueante e com simulação real de 1 metro no tear. Você só paga após aprovar a prova digital técnica.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => navigateTo('personalizador')}
                    className="px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-700 text-white font-bold text-sm shadow-glow-red flex items-center space-x-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Abrir Criador de Etiquetas</span>
                  </button>
                  <button
                    onClick={() => navigateTo('dobras')}
                    className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <span>Ver Guia de Cortes & Dobras</span>
                  </button>
                </div>
              </div>
            </section>

            <Benefits />
          </div>
        )}

        {/* PAGE 2: PERSONALIZADOR (PÁGINA EXCLUSIVA DO CRIADOR DE ETIQUETAS) */}
        {currentPage === 'personalizador' && (
          <div>
            {renderBreadcrumb('Criador de Etiquetas')}
            <LabelCustomizer selectedProduct={selectedProduct} />
          </div>
        )}

        {/* PAGE 3: CATÁLOGO DE TECIDOS (100% TEXTO, SEM FOTOS) */}
        {currentPage === 'catalogo' && (
          <div>
            {renderBreadcrumb('Catálogo Técnico de Tecidos')}
            <ProductCatalog
              onSelectProductToCustomize={handleSelectProductToCustomize}
              onViewProductDetails={product => setViewingProduct(product)}
            />
          </div>
        )}

        {/* PAGE 4: CORTES & DOBRAS */}
        {currentPage === 'dobras' && (
          <div>
            {renderBreadcrumb('Guia de Cortes e Acabamentos')}
            <FoldTypesGuide />
          </div>
        )}

        {/* PAGE 5: COMO FUNCIONA */}
        {currentPage === 'como-funciona' && (
          <div>
            {renderBreadcrumb('Como Funciona o Processo')}
            <HowItWorks onStartCustomizing={() => navigateTo('personalizador')} />
            <Benefits />
          </div>
        )}

        {/* PAGE 6: GALERIA / AMOSTRAS (100% TEXTUAL) */}
        {currentPage === 'galeria' && (
          <div>
            {renderBreadcrumb('Fichas Técnicas & Amostras')}
            <GallerySection />
          </div>
        )}

        {/* PAGE 7: DÚVIDAS / FAQ */}
        {currentPage === 'faq' && (
          <div>
            {renderBreadcrumb('Dúvidas Frequentes')}
            <FAQSection onOpenBudgetModal={() => setIsBudgetModalOpen(true)} />
          </div>
        )}

        {/* PAGE 8: CONTATO & ORÇAMENTO ESPECIAL */}
        {currentPage === 'contato' && (
          <div>
            {renderBreadcrumb('Contato & Orçamento Especial')}
            <section className="py-12 sm:py-16 bg-white dark:bg-slate-900 transition-colors">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 px-3 py-1 rounded-full inline-block mb-3">
                    Fale com a Fábrica
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Canais de Atendimento Direto
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
                    Entre em contato diretamente com nossos engenheiros têxteis para tirar dúvidas técnicas ou solicitar atendimento B2B.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* WhatsApp Box */}
                  <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">WhatsApp Direto</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Atendimento rápido para envio de artes, conferência de arquivos e pedidos.
                      </p>
                      <strong className="text-lg font-mono text-emerald-700 dark:text-emerald-400 block mt-2">
                        {WHATSAPP_DISPLAY}
                      </strong>
                    </div>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm"
                    >
                      <span>Abrir Conversa no WhatsApp</span>
                    </a>
                  </div>

                  {/* Special Quote Box */}
                  <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-surface-50 dark:bg-slate-800 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">Proposta B2B / Escala</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Para projetos corporativos, grandes tiragens e faturamento com CNPJ.
                      </p>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mt-2">
                        contato@universodasetiquetas.com.br
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsBudgetModalOpen(true)}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
                    >
                      <span>Preencher Formulário B2B</span>
                    </button>
                  </div>
                </div>

                <div className="bg-surface-50 dark:bg-slate-800 p-6 rounded-2xl border border-surface-200 dark:border-slate-700 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-2 font-bold text-slate-800 dark:text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Garantia de Aprovação Antes do Pagamento</span>
                  </div>
                  <p>
                    Em qualquer canal de atendimento, a política permanece a mesma: você recebe a prova digital oficial para validação e só efetua o pagamento após a aprovação formal do layout e do orçamento.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer with Multi-Page Links */}
      <Footer
        onNavigate={navigateTo}
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Modals */}
      <ProductModal
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onCustomize={handleSelectProductToCustomize}
      />

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        config={currentConfig}
        artwork={currentArtwork}
        onGoToCustomizer={() => navigateTo('personalizador')}
      />
    </div>
  );
}

export default App;
