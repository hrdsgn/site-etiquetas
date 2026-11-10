import { PRICE_TABLE } from '../data/adminConfig';
import { PhysicalConfig, QuoteEstimate } from '../types';

/**
 * Calcula uma estimativa de preço com base nas configurações selecionadas
 * e na tabela de preços configurada pelo administrador.
 * 
 * IMPORTANTE: O valor calculado é uma ESTIMATIVA. O preço definitivo
 * será informado pela equipe após análise da arte e do pedido.
 */
export function calculateEstimate(config: PhysicalConfig): QuoteEstimate {
  const { widthMm, lengthMm, fabricId, cutId, threadId, quantity } = config;

  // 1. Preço base pelo tipo de tecido
  const basePrice = PRICE_TABLE.basePricePerFabric[fabricId] ?? 0.50;

  // 2. Multiplicador por área
  const areaMm2 = widthMm * lengthMm;
  let sizeMultiplier = 1.0;
  for (const bracket of PRICE_TABLE.sizeMultipliers) {
    if (areaMm2 <= bracket.maxAreaMm2) {
      sizeMultiplier = bracket.multiplier;
      break;
    }
  }

  // 3. Sobretaxa de corte/acabamento
  const cutSurcharge = PRICE_TABLE.cutSurcharges[cutId] ?? 0;

  // 4. Sobretaxa de fio
  const threadSurcharge = PRICE_TABLE.threadSurcharges[threadId] ?? 0;

  // 5. Preço unitário antes do desconto por quantidade
  const unitPriceBeforeDiscount = (basePrice * sizeMultiplier) + cutSurcharge + threadSurcharge;

  // 6. Desconto por quantidade (aplica a maior faixa atingida)
  let discountPercent = 0;
  for (const tier of PRICE_TABLE.quantityDiscounts) {
    if (quantity >= tier.minQty) {
      discountPercent = tier.discountPercent;
    }
  }

  // 7. Preço unitário final
  const unitPrice = Math.max(0.05, Math.round(unitPriceBeforeDiscount * (1 - discountPercent / 100) * 100) / 100);

  // 8. Preço total
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  return {
    unitPrice,
    totalPrice,
    discountPercent,
    isEstimate: true,
  };
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}
