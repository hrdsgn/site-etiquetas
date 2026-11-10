import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Ruler,
  Palette,
  Eye,
  Calculator,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Step1PhysicalConfig } from './Step1PhysicalConfig';
import { Step2ArtCreation } from './Step2ArtCreation';
import { Step3Preview } from './Step3Preview';
import { Step4QuoteOrder } from './Step4QuoteOrder';
import { PhysicalConfig, ArtworkConfig, Product } from '../../types';
import { getMinQuantity, FABRIC_OPTIONS, CUT_OPTIONS, getLurexColor } from '../../data/adminConfig';

interface LabelCustomizerProps {
  selectedProduct?: Product | null;
}

export const LabelCustomizer: React.FC<LabelCustomizerProps> = ({ selectedProduct }) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Physical configuration
  const [config, setConfig] = useState<PhysicalConfig>({
    widthMm: 20,
    lengthMm: 65,
    fabricId: selectedProduct?.defaultFabric || 'tafeta_gold',
    cutId: selectedProduct?.defaultCut || 'dobra_meio',
    threadId: 'poliester',
    applicationId: 'costura',
    quantity: 1000,
  });

  // Artwork configuration
  const [artwork, setArtwork] = useState<ArtworkConfig>({
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
      {
        id: 'el-2',
        text: '100% ALGODÃO • FEITO NO BRASIL',
        fontFamily: 'Inter',
        fontSize: 10,
        color: '#1E293B',
        alignment: 'center',
        bold: false,
        italic: false,
        uppercase: true,
        rotation: 0,
        y: 65,
      },
    ],
  });

  const handleUpdateConfig = (updated: Partial<PhysicalConfig>) => {
    setConfig(prev => {
      const next = { ...prev, ...updated };
      if (updated.threadId) {
        const lurexColor = getLurexColor(updated.threadId);
        if (lurexColor) {
          setArtwork(prevArt => ({
            ...prevArt,
            textElements: prevArt.textElements.map(el => ({
              ...el,
              color: lurexColor,
            })),
          }));
        }
      }
      return next;
    });
  };

  const handleUpdateArtwork = (updated: Partial<ArtworkConfig>) => {
    setArtwork(prev => ({ ...prev, ...updated }));
  };

  const steps = [
    { number: 1, label: 'Configuração Física', icon: Ruler },
    { number: 2, label: 'Criação da Arte', icon: Palette },
    { number: 3, label: 'Prévia 2D Tear', icon: Eye },
    { number: 4, label: 'Orçamento & Envio', icon: Calculator },
  ];

  const minQty = getMinQuantity(config.widthMm);
  const isQuantityValid = config.quantity >= minQty;

  const fabricName = FABRIC_OPTIONS.find(f => f.id === config.fabricId)?.name ?? config.fabricId;
  const cutName = CUT_OPTIONS.find(c => c.id === config.cutId)?.name ?? config.cutId;

  // Weave texture class for mini preview
  const getMiniWeaveClass = () => {
    switch (config.fabricId) {
      case 'tafeta':
        return 'tear-weave-tafeta';
      case 'tafeta_gold':
        return 'tear-weave-tafeta-gold';
      case 'super_batido':
        return 'tear-weave-super-batido';
      case 'dupla_densidade':
        return '';
      case 'alta_definicao':
      default:
        return 'tear-weave-alta-definicao';
    }
  };

  return (
    <section id="personalizador" className="py-12 sm:py-16 bg-white border-t border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Configurador de Etiquetas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Personalize sua etiqueta em 4 etapas
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Selecione medidas, tecido e acabamento, crie sua arte ou envie o arquivo, visualize a prévia com simulação de tear e envie o pedido para aprovação antes do pagamento.
          </p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
          {steps.map(step => {
            const Icon = step.icon;
            const isActive = activeStep === step.number;
            const isCompleted = activeStep > step.number;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(step.number as any)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center space-x-3 ${
                  isActive
                    ? 'border-brand bg-brand-50/80 ring-2 ring-brand text-brand shadow-sm'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    isActive
                      ? 'bg-brand text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    Etapa {step.number}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {step.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Customizer Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {activeStep === 1 && (
              <>
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    Etapa 1 — Configuração física
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Defina medidas, tecido, acabamento, tipo de fio e aplicação.
                  </p>
                </div>

                <Step1PhysicalConfig
                  config={config}
                  onChange={handleUpdateConfig}
                />

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    disabled={!isQuantityValid}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand hover:bg-brand-700 disabled:bg-slate-300 text-white font-bold text-sm transition-colors shadow-sm flex items-center justify-center space-x-2"
                  >
                    <span>Avançar para Criação da Arte</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {activeStep === 2 && (
              <>
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    Etapa 2 — Criação da arte
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Crie a arte online no site ou envie um arquivo pronto em PDF/SVG.
                  </p>
                </div>

                <Step2ArtCreation
                  artwork={artwork}
                  threadId={config.threadId}
                  onChange={handleUpdateArtwork}
                />

                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-colors flex items-center space-x-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm flex items-center space-x-2"
                  >
                    <span>Avançar para Prévia</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {activeStep === 3 && (
              <>
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    Etapa 3 — Pré-visualização 2D
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Confira a simulação de tear e composição gráfica da sua etiqueta.
                  </p>
                </div>

                <Step3Preview
                  config={config}
                  artwork={artwork}
                />

                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-colors flex items-center space-x-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Ajustar Arte</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm flex items-center space-x-2"
                  >
                    <span>Avançar para Orçamento & Envio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {activeStep === 4 && (
              <>
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    Etapa 4 — Quantidade, orçamento e envio
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Escolha a modalidade de orçamento e envie para aprovação da equipe técnica via WhatsApp.
                  </p>
                </div>

                <Step4QuoteOrder
                  config={config}
                  artwork={artwork}
                />

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors flex items-center space-x-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar para Prévia</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Live Summary / Sticky Sidebar */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
            {/* Live 2D Preview card */}
            {activeStep !== 3 && (
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white shadow-card">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Prévia de Tear em Tempo Real
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="text-xs text-brand-300 hover:text-white font-bold"
                  >
                    Expandir →
                  </button>
                </div>

                <div className="flex items-center justify-center min-h-[220px] bg-slate-950/70 rounded-xl p-4 border border-slate-800 overflow-hidden">
                  {artwork.mode === 'online' ? (
                    <div
                      className="rounded-xs shadow-lg relative overflow-hidden label-elevation"
                      style={{
                        width: `${Math.min(260, config.widthMm * 4)}px`,
                        height: `${Math.min(220, config.lengthMm * 2.8)}px`,
                        backgroundColor: artwork.backgroundColor,
                      }}
                    >
                      {/* Split for Dupla Densidade */}
                      {config.fabricId === 'dupla_densidade' ? (
                        <>
                          <div className="absolute inset-x-0 top-0 h-1/2 tear-weave-alta-definicao border-b border-dashed border-red-400/40 pointer-events-none" />
                          <div className="absolute inset-x-0 bottom-0 h-1/2 tear-weave-tafeta pointer-events-none" />
                        </>
                      ) : (
                        <div className={`absolute inset-0 pointer-events-none ${getMiniWeaveClass()}`} />
                      )}

                      {/* Marcações de dobras (contínua) e cortes (traçada) - sem números */}
                      {config.cutId !== 'rolo' && (
                        <>
                          {/* Cortes: Linhas traçadas nas extremidades */}
                          <div className="absolute inset-x-0 top-0 border-t border-dashed border-red-500/50 pointer-events-none z-10" />
                          <div className="absolute inset-x-0 bottom-0 border-b border-dashed border-red-500/50 pointer-events-none z-10" />

                          {/* Dobras: Linhas contínuas */}
                          {config.cutId === 'dobra_meio' && (
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-solid border-red-500/60 pointer-events-none z-10" />
                          )}
                          {config.cutId === 'pontas' && (
                            <>
                              <div className="absolute inset-x-0 top-[10%] border-t border-solid border-red-500/60 pointer-events-none z-10" />
                              <div className="absolute inset-x-0 bottom-[10%] border-b border-solid border-red-500/60 pointer-events-none z-10" />
                            </>
                          )}
                          {config.cutId === 'meio_e_pontas' && (
                            <>
                              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-solid border-red-500/60 pointer-events-none z-10" />
                              <div className="absolute inset-x-0 top-[10%] border-t border-solid border-red-500/60 pointer-events-none z-10" />
                              <div className="absolute inset-x-0 bottom-[10%] border-b border-solid border-red-500/60 pointer-events-none z-10" />
                            </>
                          )}
                          {config.cutId === 'manhattan' && (
                            <>
                              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-solid border-red-500/60 pointer-events-none z-10" />
                              <div className="absolute inset-x-0 top-[12%] border-t border-solid border-red-500/60 pointer-events-none z-10" />
                            </>
                          )}
                        </>
                      )}

                      {artwork.textElements.map(el => {
                        const displayText = el.uppercase ? el.text.toUpperCase() : el.text;
                        if (!displayText) return null;
                        const isRotated = el.rotation === 90;

                        return (
                          <div
                            key={el.id}
                            className="absolute left-0 right-0 px-2 flex items-center justify-center"
                            style={{
                              top: `${el.y}%`,
                              transform: 'translateY(-50%)',
                              justifyContent: el.alignment === 'left' ? 'flex-start' : el.alignment === 'right' ? 'flex-end' : 'center',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: el.fontFamily,
                                fontSize: `${Math.max(8, el.fontSize * 0.75)}px`,
                                color: el.color,
                                fontWeight: el.bold ? 'bold' : 'normal',
                                fontStyle: el.italic ? 'italic' : 'normal',
                                lineHeight: 1.15,
                                whiteSpace: 'nowrap',
                                display: 'inline-block',
                                transform: isRotated ? 'rotate(90deg)' : 'none',
                              }}
                            >
                              {displayText}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500">
                      Configure a arte na Etapa 2
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>{config.widthMm}mm × {config.lengthMm}mm</span>
                  <span>{fabricName}</span>
                  <span className="text-brand-400">{cutName}</span>
                </div>
              </div>
            )}

            {/* Quick Flow Info */}
            <div className="bg-surface-50 border border-surface-200 rounded-2xl p-5 space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garantia de Aprovação Antes do Pagamento</span>
              </h4>
              <p className="leading-relaxed">
                Você personaliza a etiqueta e envia o pedido sem compromisso.
                Nossa equipe de engenharia têxtil prepara a prova digital oficial com cotas e amarração de fios.
                <strong> O pagamento só é realizado quando você aprovar 100% o layout e o valor.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
