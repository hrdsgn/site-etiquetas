// ────────────────────────────────────────────
// TIPOS PRINCIPAIS DO SISTEMA
// ────────────────────────────────────────────

export interface PhysicalConfig {
  widthMm: number;
  lengthMm: number;
  fabricId: string;
  cutId: string;
  threadId: string;
  applicationId: string;
  quantity: number;
}

export interface TextElement {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number; // px
  color: string; // hex
  alignment: 'left' | 'center' | 'right';
  bold: boolean;
  italic: boolean;
  uppercase: boolean;
  rotation: 0 | 90; // 0 = horizontal, 90 = vertical (girada 90 graus)
  y: number; // vertical position as percentage (0-100)
}

export interface ArtworkConfig {
  mode: 'online';
  backgroundColor: string;
  textElements: TextElement[];
}

export interface QuoteEstimate {
  unitPrice: number;
  totalPrice: number;
  discountPercent: number;
  isEstimate: boolean; // true = automatic estimate; definitive comes after approval
}

export type QuoteMode = 'automatic' | 'manual';

export type OrderStatus =
  | 'rascunho'
  | 'enviado_para_aprovacao'
  | 'em_analise'
  | 'ajustes_solicitados'
  | 'aprovado'
  | 'aguardando_pagamento'
  | 'pago'
  | 'em_producao'
  | 'enviado'
  | 'concluido';

export interface OrderSubmission {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName: string;
  physicalConfig: PhysicalConfig;
  artwork: ArtworkConfig;
  quoteMode: QuoteMode;
  quoteEstimate: QuoteEstimate | null;
  notes: string;
  status: OrderStatus;
  createdAt: string;
}

// ────────────────────────────────────────────
// CATÁLOGO DE PRODUTOS (TOTALMENTE TEXTUAL, SEM FOTOS)
// ────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  tagline: string;
  description: string;
  features: string[];
  popular?: boolean;
  defaultFabric: string;
  defaultCut: string;
  idealFor: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  segment: string;
  fabric: string;
  cut: string;
  description: string;
  accentColor: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'producao' | 'arquivos' | 'prazos' | 'pagamento';
}

// ────────────────────────────────────────────
// PÁGINAS DO SITE (MULTI-PAGE)
// ────────────────────────────────────────────
export type PageRoute = 
  | 'home' 
  | 'personalizador' 
  | 'catalogo' 
  | 'dobras' 
  | 'como-funciona' 
  | 'galeria' 
  | 'faq' 
  | 'contato';
