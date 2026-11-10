/**
 * CONFIGURAÇÃO ADMINISTRATIVA DE PRODUÇÃO
 * 
 * Este arquivo centraliza todas as opções de produção disponíveis.
 * O administrador pode adicionar, remover ou editar opções sem alterar
 * o restante do código. Em uma futura integração com backend/CMS,
 * estes dados viriam de uma API ou banco de dados.
 */

// ────────────────────────────────────────────
// TIPOS DE TECIDO
// ────────────────────────────────────────────
export interface FabricOption {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export const FABRIC_OPTIONS: FabricOption[] = [
  {
    id: 'tafeta',
    name: 'Tafetá',
    description: 'Tecelagem clássica, versátil e com boa durabilidade.',
    active: true,
  },
  {
    id: 'tafeta_gold',
    name: 'Tafetá Gold',
    description: 'Versão premium do Tafetá com acabamento refinado e brilho sutil.',
    active: true,
  },
  {
    id: 'dupla_densidade',
    name: 'Dupla Densidade',
    description: 'Metade Alta Definição e metade Tafetá, unindo qualidade e economia.',
    active: true,
  },
  {
    id: 'super_batido',
    name: 'Super Batido',
    description: 'Tecelagem densa com toque encorpado e excelente definição.',
    active: true,
  },
  {
    id: 'alta_definicao',
    name: 'Alta Definição',
    description: 'Máxima resolução de traços e detalhes, ideal para logotipos complexos.',
    active: true,
  },
];

// ────────────────────────────────────────────
// TIPOS DE CORTE / ACABAMENTO
// ────────────────────────────────────────────
export interface CutOption {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export const CUT_OPTIONS: CutOption[] = [
  {
    id: 'dobra_meio',
    name: 'Dobra Meio',
    description: 'Dobrada ao meio para embutir na costura da gola ou lateral.',
    active: true,
  },
  {
    id: 'pontas',
    name: 'Pontas',
    description: 'Pontas dobradas para trás, pronta para costura reta.',
    active: true,
  },
  {
    id: 'so_cortada',
    name: 'Só Cortada',
    description: 'Etiqueta cortada sem dobras, entregue plana.',
    active: true,
  },
  {
    id: 'meio_e_pontas',
    name: 'Meio e Pontas',
    description: 'Combinação de dobra ao meio com pontas dobradas.',
    active: true,
  },
  {
    id: 'rolo',
    name: 'Rolo',
    description: 'Entregue em rolo contínuo para corte na confecção.',
    active: true,
  },
  {
    id: 'laser',
    name: 'Laser',
    description: 'Corte a laser com bordas seladas e acabamento premium.',
    active: true,
  },
  {
    id: 'manhattan',
    name: 'Manhattan',
    description: 'Acabamento Manhattan com dobra especial diferenciada.',
    active: true,
  },
  {
    id: '2_cortes',
    name: '2 Cortes',
    description: 'Etiqueta com dois cortes para fixação ou composição dupla.',
    active: true,
  },
];

// ────────────────────────────────────────────
// TIPOS DE FIO
// ────────────────────────────────────────────
export interface ThreadOption {
  id: string;
  name: string;
  active: boolean;
}

export const THREAD_OPTIONS: ThreadOption[] = [
  { id: 'poliester', name: 'Poliéster', active: true },
  { id: 'algodao', name: 'Algodão', active: true },
  { id: 'lurex_ouro', name: 'Lurex Ouro', active: true },
  { id: 'lurex_prata', name: 'Lurex Prata', active: true },
];

// ────────────────────────────────────────────
// TIPOS DE APLICAÇÃO
// ────────────────────────────────────────────
export interface ApplicationOption {
  id: string;
  name: string;
  active: boolean;
}

export const APPLICATION_OPTIONS: ApplicationOption[] = [
  { id: 'costura', name: 'Costura', active: true },
  { id: 'termocolante', name: 'Termocolante', active: true },
  { id: 'adesivo', name: 'Adesivo', active: true },
];

// ────────────────────────────────────────────
// OPÇÕES DE LARGURA (mm)
// ────────────────────────────────────────────
export const WIDTH_OPTIONS_MM: number[] = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
];

// ────────────────────────────────────────────
// OPÇÕES DE COMPRIMENTO (mm)
// ────────────────────────────────────────────
export const LENGTH_OPTIONS_MM: number[] = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
];

// ────────────────────────────────────────────
// QUANTIDADE MÍNIMA POR FAIXA DE LARGURA
// ────────────────────────────────────────────
export interface MinQuantityRule {
  maxWidthMm: number;
  minQuantity: number;
}

export const MIN_QUANTITY_RULES: MinQuantityRule[] = [
  { maxWidthMm: 25, minQuantity: 100 },
  { maxWidthMm: 40, minQuantity: 200 },
  { maxWidthMm: 60, minQuantity: 500 },
];

export function getMinQuantity(widthMm: number): number {
  for (const rule of MIN_QUANTITY_RULES) {
    if (widthMm <= rule.maxWidthMm) {
      return rule.minQuantity;
    }
  }
  return MIN_QUANTITY_RULES[MIN_QUANTITY_RULES.length - 1].minQuantity;
}

// ────────────────────────────────────────────
// TABELA DE PREÇOS (configurável pelo admin)
// ────────────────────────────────────────────
export interface PriceTableConfig {
  basePricePerFabric: Record<string, number>;
  sizeMultipliers: { maxAreaMm2: number; multiplier: number }[];
  quantityDiscounts: { minQty: number; discountPercent: number }[];
  cutSurcharges: Record<string, number>;
  threadSurcharges: Record<string, number>;
}

export const PRICE_TABLE: PriceTableConfig = {
  basePricePerFabric: {
    tafeta: 0.35,
    tafeta_gold: 0.45,
    dupla_densidade: 0.55,
    super_batido: 0.50,
    alta_definicao: 0.60,
  },
  sizeMultipliers: [
    { maxAreaMm2: 500, multiplier: 0.8 },
    { maxAreaMm2: 1200, multiplier: 1.0 },
    { maxAreaMm2: 2500, multiplier: 1.3 },
    { maxAreaMm2: 5000, multiplier: 1.6 },
    { maxAreaMm2: Infinity, multiplier: 2.0 },
  ],
  quantityDiscounts: [
    { minQty: 100, discountPercent: 0 },
    { minQty: 500, discountPercent: 10 },
    { minQty: 1000, discountPercent: 20 },
    { minQty: 2500, discountPercent: 30 },
    { minQty: 5000, discountPercent: 40 },
    { minQty: 10000, discountPercent: 50 },
  ],
  cutSurcharges: {
    dobra_meio: 0,
    pontas: 0,
    so_cortada: 0,
    meio_e_pontas: 0.02,
    rolo: -0.03,
    laser: 0.08,
    manhattan: 0.05,
    '2_cortes': 0.04,
  },
  threadSurcharges: {
    poliester: 0,
    algodao: 0.02,
    lurex_ouro: 0.10,
    lurex_prata: 0.10,
  },
};

// ────────────────────────────────────────────
// FONTES DISPONÍVEIS PARA CRIAÇÃO DE ARTE
// ────────────────────────────────────────────
export interface FontOption {
  id: string;
  name: string;
  category: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { id: 'Inter', name: 'Inter', category: 'Sem Serifa / Moderna' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', category: 'Sem Serifa / Display' },
  { id: 'Space Grotesk', name: 'Space Grotesk', category: 'Técnica / Streetwear' },
  { id: 'Cinzel', name: 'Cinzel', category: 'Serifada / Alfaiataria' },
  { id: 'Dancing Script', name: 'Dancing Script', category: 'Cursiva / Artesanal' },
  { id: 'Oswald', name: 'Oswald', category: 'Condensada / Industrial' },
  { id: 'Arial', name: 'Arial', category: 'Padrão / Universal' },
  { id: 'Times New Roman', name: 'Times New Roman', category: 'Serifada / Clássica' },
];

// ────────────────────────────────────────────
// CORES PREDEFINIDAS DE FUNDO E FIO
// ────────────────────────────────────────────
export const BACKGROUND_COLORS = [
  { hex: '#FFFFFF', name: 'Branco' },
  { hex: '#000000', name: 'Preto' },
  { hex: '#FBF8F2', name: 'Cru / Off-White' },
  { hex: '#1E3A8A', name: 'Azul Marinho' },
  { hex: '#DC2626', name: 'Vermelho' },
  { hex: '#334155', name: 'Grafite' },
  { hex: '#166534', name: 'Verde Escuro' },
  { hex: '#92400E', name: 'Marrom' },
  { hex: '#6B21A8', name: 'Roxo' },
  { hex: '#BE185D', name: 'Rosa' },
];

export const THREAD_COLORS = [
  { hex: '#000000', name: 'Preto' },
  { hex: '#FFFFFF', name: 'Branco' },
  { hex: '#DC2626', name: 'Vermelho' },
  { hex: '#D97706', name: 'Dourado' },
  { hex: '#94A3B8', name: 'Prata' },
  { hex: '#2563EB', name: 'Azul Royal' },
  { hex: '#16A34A', name: 'Verde' },
  { hex: '#E11D48', name: 'Pink' },
  { hex: '#7C3AED', name: 'Violeta' },
  { hex: '#EA580C', name: 'Laranja' },
];

// ────────────────────────────────────────────
// WHATSAPP DA EMPRESA
// ────────────────────────────────────────────
export const WHATSAPP_NUMBER = '5585991943392';
export const WHATSAPP_DISPLAY = '(85) 99194-3392';
