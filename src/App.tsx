import React, { useState } from 'react';
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
import { Product, PhysicalConfig, ArtworkConfig } from './types';
import { PRODUCTS } from './data/mockProducts';

export function App() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Current physical config and artwork for sharing with CartDrawer
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
    uploadedFileUrl: null,
    uploadedFileName: null,
    uploadedFileType: null,
  };

  const handleSelectProductToCustomize = (product: Product) => {
    setSelectedProduct(product);
    scrollToSection('personalizador');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 text-slate-800 antialiased">
      {/* Header */}
      <Header
        cartCount={1}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
      />

      {/* Hero */}
      <Hero
        onStartCustomizing={() => scrollToSection('personalizador')}
        onExploreCatalog={() => scrollToSection('catalogo')}
      />

      {/* How it Works (4 Etapas) */}
      <HowItWorks
        onStartCustomizing={() => scrollToSection('personalizador')}
      />

      {/* Product Catalog */}
      <ProductCatalog
        onSelectProductToCustomize={handleSelectProductToCustomize}
        onViewProductDetails={product => setViewingProduct(product)}
      />

      {/* Flagship Label Customizer */}
      <LabelCustomizer
        selectedProduct={selectedProduct}
      />

      {/* 8 Fold/Cut Types Guide */}
      <FoldTypesGuide />

      {/* Real Portfolio Gallery */}
      <GallerySection />

      {/* Brand Benefits */}
      <Benefits />

      {/* FAQ & B2B Quote CTA */}
      <FAQSection
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
      />

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloatingButton />

      {/* Modals & Drawers */}
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
        onGoToCustomizer={() => scrollToSection('personalizador')}
      />
    </div>
  );
}

export default App;
