import React, { useState } from 'react';
import {
  Calculator,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Copy,
  Clock,
  Phone,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhysicalConfig, ArtworkConfig, QuoteMode } from '../../types';
import { calculateEstimate, formatBRL } from '../../utils/pricing';
import {
  FABRIC_OPTIONS,
  CUT_OPTIONS,
  THREAD_OPTIONS,
  APPLICATION_OPTIONS,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
} from '../../data/adminConfig';

interface Step4Props {
  config: PhysicalConfig;
  artwork: ArtworkConfig;
}

export const Step4QuoteOrder: React.FC<Step4Props> = ({ config, artwork }) => {
  const [quoteMode, setQuoteMode] = useState<QuoteMode>('automatic');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const estimate = calculateEstimate(config);

  const fabricName = FABRIC_OPTIONS.find(f => f.id === config.fabricId)?.name ?? config.fabricId;
  const cutName = CUT_OPTIONS.find(c => c.id === config.cutId)?.name ?? config.cutId;
  const threadName = THREAD_OPTIONS.find(t => t.id === config.threadId)?.name ?? config.threadId;
  const appName = APPLICATION_OPTIONS.find(a => a.id === config.applicationId)?.name ?? config.applicationId;

  const buildWhatsAppMessage = (num: string): string => {
    let msg = `Olá, Universo das Etiquetas! 👋\n\n`;
    msg += `Gostaria de enviar meu pedido para aprovação (Protocolo: *${num}*).\n\n`;
    msg += `📋 *CONFIGURAÇÃO DA ETIQUETA*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📐 Medidas: ${config.widthMm}mm (largura) × ${config.lengthMm}mm (comprimento)\n`;
    msg += `🧵 Tecido: ${fabricName.toUpperCase()}\n`;
    msg += `✂️ Corte / Acabamento: ${cutName}\n`;
    msg += `🪡 Tipo de Fio: ${threadName}\n`;
    msg += `📌 Aplicação: ${appName}\n`;
    msg += `📦 Quantidade: ${config.quantity.toLocaleString('pt-BR')} unidades\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    msg += `🎨 *ARTE CRIADA NO SITE*\n`;
    msg += `Cor de Fundo da Fita: ${artwork.backgroundColor}\n`;
    if (artwork.textElements.length > 0) {
      artwork.textElements.forEach((el, i) => {
        const txt = el.uppercase ? el.text.toUpperCase() : el.text;
        const orient = el.rotation === 90 ? '90° Vertical' : 'Horizontal';
        msg += `Texto ${i + 1}: "${txt}" (Fonte: ${el.fontFamily}, Tam: ${el.fontSize}px, Cor: ${el.color}, Orientação: ${orient})\n`;
      });
    } else {
      msg += `(Sem textos inseridos)\n`;
    }
    msg += `\n`;

    if (quoteMode === 'automatic') {
      msg += `💰 *VALOR ESTIMADO (AUTOMÁTICO)*\n`;
      msg += `Unitário estimado: ${formatBRL(estimate.unitPrice)}\n`;
      msg += `Total estimado: ${formatBRL(estimate.totalPrice)}\n`;
      msg += `(Ciente de que o valor definitivo depende da aprovação da arte)\n\n`;
    } else {
      msg += `💰 *SOLICITAÇÃO DE ORÇAMENTO MANUAL*\n`;
      msg += `Aguardo análise e envio do orçamento definitivo pela equipe.\n\n`;
    }

    msg += `👤 *DADOS DE CONTATO*\n`;
    if (customerName) msg += `Nome: ${customerName}\n`;
    if (companyName) msg += `Marca/Empresa: ${companyName}\n`;
    if (customerPhone) msg += `WhatsApp: ${customerPhone}\n`;
    if (customerEmail) msg += `E-mail: ${customerEmail}\n`;
    if (notes) msg += `\n📝 Observações: ${notes}\n`;

    msg += `\nAguardo a análise e a prova digital oficial para aprovação. Obrigado!`;

    return msg;
  };

  const handleSubmitToWhatsApp = () => {
    if (!customerName.trim()) {
      alert('Por favor, informe seu nome para enviar o pedido.');
      return;
    }
    if (!customerPhone.trim() && !customerEmail.trim()) {
      alert('Por favor, informe pelo menos um canal de contato (WhatsApp ou e-mail).');
      return;
    }

    const num = `UDE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(num);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const message = encodeURIComponent(buildWhatsAppMessage(num));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <div className="text-center py-6 space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
            Pedido Encaminhado com Sucesso!
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Layout Enviado para Análise Técnica
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Abrimos o WhatsApp com a mensagem padronizada contendo todos os dados do seu pedido.
            Nossa equipe técnica analisará a arte e retornará com a <strong>prova digital oficial</strong> e o <strong>orçamento definitivo</strong>.
          </p>
        </div>

        <div className="bg-surface-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 max-w-md mx-auto space-y-3 text-left shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Número do Pedido / Protocolo
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(orderNumber)}
              className="text-xs text-brand hover:underline font-bold flex items-center space-x-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">{orderNumber}</div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs space-y-1 text-slate-600 dark:text-slate-300">
            <div><strong>Cliente:</strong> {customerName} {companyName ? `(${companyName})` : ''}</div>
            <div><strong>Etiqueta:</strong> {fabricName} • {config.widthMm}×{config.lengthMm}mm • {cutName}</div>
            <div><strong>Quantidade:</strong> {config.quantity.toLocaleString('pt-BR')} un</div>
            <div><strong>Status Atual:</strong> <span className="text-amber-600 font-bold">Aguardando Análise da Equipe</span></div>
          </div>
        </div>

        {/* Next steps explanation */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 max-w-md mx-auto text-left text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
          <div className="flex items-center space-x-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Como funciona a aprovação e o pagamento:</span>
          </div>
          <ol className="list-decimal pl-5 space-y-1 text-emerald-800 dark:text-emerald-300">
            <li>Nossa equipe analisa a arte e a configuração do tear.</li>
            <li>Enviamos a prova digital oficial para sua conferência.</li>
            <li>Você aprova ou solicita ajustes ilimitados.</li>
            <li>Após a aprovação, enviamos o orçamento definitivo e o link de pagamento.</li>
            <li>A produção só inicia após a confirmação do pagamento.</li>
          </ol>
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(orderNumber))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Reenviar Mensagem no WhatsApp ({WHATSAPP_DISPLAY})</span>
          </a>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="w-full py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
          >
            Fazer outra configuração
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── MODALIDADE DE ORÇAMENTO ── */}
      <div>
        <label className="text-sm font-bold text-slate-800 dark:text-slate-100 block mb-2">
          Modalidade do orçamento
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setQuoteMode('automatic')}
            className={`p-4 rounded-xl border text-left transition-all ${
              quoteMode === 'automatic'
                ? 'border-brand bg-brand-50/60 dark:bg-brand-950/40 ring-1 ring-brand'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Calculator className="w-4 h-4 text-brand" />
              <strong className="text-sm text-slate-900 dark:text-white">Orçamento automático</strong>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Exibe uma estimativa calculada pela tabela padrão. O valor definitivo será confirmado pela equipe após a análise da arte.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setQuoteMode('manual')}
            className={`p-4 rounded-xl border text-left transition-all ${
              quoteMode === 'manual'
                ? 'border-brand bg-brand-50/60 dark:bg-brand-950/40 ring-1 ring-brand'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Send className="w-4 h-4 text-brand" />
              <strong className="text-sm text-slate-900 dark:text-white">Orçamento manual</strong>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Envie a configuração completa para nossa equipe analisar e retornar com o preço final oficial.
            </p>
          </button>
        </div>
      </div>

      {/* ── ESTIMATIVA AUTOMÁTICA (se selecionada) ── */}
      {quoteMode === 'automatic' && (
        <div className="bg-surface-50 dark:bg-slate-800/70 border border-surface-200 dark:border-slate-700 rounded-2xl p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Estimativa de Investimento
              </span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {formatBRL(estimate.totalPrice)}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  ({formatBRL(estimate.unitPrice)} / un)
                </span>
              </div>
            </div>

            {estimate.discountPercent > 0 && (
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-black px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
                -{estimate.discountPercent}% desconto escala
              </span>
            )}
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-xs text-amber-900 dark:text-amber-300 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Atenção:</strong> Este valor é uma estimativa preliminar. O orçamento definitivo
              será apresentado após a análise e aprovação técnica da arte pelo nosso departamento de tecelagem.
            </span>
          </div>
        </div>
      )}

      {/* ── DADOS DO CLIENTE ── */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
          Dados para contato e envio da prova
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Seu nome completo *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="Ex: Maria Clara"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nome da marca ou confecção
            </label>
            <input
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="Ex: Studio Bella"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              WhatsApp para retorno *
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={e => setCustomerPhone(e.target.value)}
              placeholder="(85) 99999-9999"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={e => setCustomerEmail(e.target.value)}
              placeholder="contato@marca.com.br"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Observações para a equipe (opcional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Ex: Gostaria de dividir em tamanhos P/M/G, preciso para evento dia 20, cores pantone específicas, etc."
            className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* ── GARANTIA DE PAGAMENTO POSTERIOR ── */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3.5 flex items-start space-x-2.5 text-xs text-emerald-950 dark:text-emerald-200">
        <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Compromisso de satisfação:</strong> Você <strong>não paga nada agora</strong>.
          O pagamento só é liberado após a equipe analisar o pedido, gerar a prova digital oficial
          e você aprovar formalmente o layout e o valor definitivo.
        </div>
      </div>

      {/* ── BOTÃO DE ENVIO DIRETO PARA O WHATSAPP ── */}
      <button
        type="button"
        onClick={handleSubmitToWhatsApp}
        className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base transition-all shadow-md flex items-center justify-center space-x-2.5"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Enviar Pedido para Aprovação no WhatsApp ({WHATSAPP_DISPLAY})</span>
      </button>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Ao clicar, o WhatsApp será aberto com todas as características selecionadas formatadas para atendimento imediato.
      </p>
    </div>
  );
};
