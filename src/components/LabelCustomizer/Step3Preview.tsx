import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, AlertTriangle, Layers, Info } from 'lucide-react';
import { PhysicalConfig, ArtworkConfig } from '../../types';
import { FABRIC_OPTIONS, CUT_OPTIONS } from '../../data/adminConfig';

interface Step3Props {
  config: PhysicalConfig;
  artwork: ArtworkConfig;
}

export const Step3Preview: React.FC<Step3Props> = ({ config, artwork }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const fabric = FABRIC_OPTIONS.find(f => f.id === config.fabricId);
  const fabricName = fabric?.name ?? config.fabricId;
  const cutName = CUT_OPTIONS.find(c => c.id === config.cutId)?.name ?? config.cutId;

  // Proportional scale factor mm to px
  const scaleFactor = 4.5;
  const widthPx = Math.max(130, Math.min(380, config.widthMm * scaleFactor));
  const heightPx = Math.max(130, Math.min(520, config.lengthMm * scaleFactor));

  // Determine loom weave texture and text pixelation class
  const getWeaveClasses = () => {
    switch (config.fabricId) {
      case 'tafeta':
        return {
          container: 'tear-weave-tafeta',
          text: 'tear-text-tafeta',
          badge: 'Baixa Definição (Trama Aberta de Tear)',
          desc: 'Pontos maiores e mais pixelizados característicos do Tafetá.',
        };
      case 'tafeta_gold':
        return {
          container: 'tear-weave-tafeta-gold',
          text: 'tear-text-tafeta-gold',
          badge: 'Definição Intermediária Suave',
          desc: 'Equilíbrio com pontos refinados e textura sutil.',
        };
      case 'dupla_densidade':
        return {
          container: 'tear-weave-dupla',
          text: '', // handled conditionally per half
          badge: 'Dupla Densidade (50% Alta / 50% Baixa)',
          desc: 'Metade superior em Alta Definição e metade inferior em Tafetá.',
        };
      case 'super_batido':
        return {
          container: 'tear-weave-super-batido',
          text: 'tear-text-super-batido',
          badge: 'Super Batido (Máxima Definição & Trama Compacta)',
          desc: 'Batida máxima do tear, pontos extremamente compactos e densos.',
        };
      case 'alta_definicao':
      default:
        return {
          container: 'tear-weave-alta-definicao',
          text: 'tear-text-alta-definicao',
          badge: 'Alta Definição (Fios Finos & Nitidez)',
          desc: 'Pontos densos para traços finos e máxima legibilidade.',
        };
    }
  };

  const weaveInfo = getWeaveClasses();
  const isDupla = config.fabricId === 'dupla_densidade';

  return (
    <div className="space-y-6">
      {/* Fabric Weave Indicator Badge */}
      <div className="bg-slate-800 text-white p-3.5 rounded-xl border border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-white">Simulação de Tear:</span>
          <span className="bg-brand/20 text-brand-300 font-semibold px-2 py-0.5 rounded border border-brand/40">
            {weaveInfo.badge}
          </span>
        </div>
        <span className="text-slate-400 text-[11px]">{weaveInfo.desc}</span>
      </div>

      {/* Preview Stage */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-card">
        {/* Top Info bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div className="text-xs text-slate-300 space-x-2 font-medium">
            <span className="font-bold text-white">{config.widthMm}mm × {config.lengthMm}mm</span>
            <span>•</span>
            <span>{fabricName}</span>
            <span>•</span>
            <span className="text-brand-300">{cutName}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => setZoomLevel(z => Math.max(0.6, z - 0.15))}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Diminuir zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 font-mono min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel(z => Math.min(2.2, z + 0.15))}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Aumentar zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Resetar zoom"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas area */}
        <div
          className="flex items-center justify-center min-h-[360px] sm:min-h-[440px] overflow-auto p-4"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        >
          {artwork.mode === 'upload' ? (
            /* Upload preview */
            <div className="text-center space-y-4" style={{ transform: `scale(${zoomLevel})` }}>
              {artwork.uploadedFileUrl && artwork.uploadedFileType === 'image/svg+xml' ? (
                <div
                  className={`border border-slate-600 rounded-sm p-4 inline-block shadow-2xl relative ${weaveInfo.container}`}
                  style={{ width: `${widthPx}px`, minHeight: `${heightPx}px`, backgroundColor: artwork.backgroundColor }}
                >
                  <img
                    src={artwork.uploadedFileUrl}
                    alt="Arte enviada"
                    className="max-w-full max-h-full object-contain mx-auto"
                    style={{ maxHeight: `${heightPx - 32}px` }}
                  />
                </div>
              ) : artwork.uploadedFileName ? (
                <div
                  className="border-2 border-dashed border-slate-600 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-800/80 shadow-xl"
                  style={{ width: `${widthPx}px`, minHeight: `${heightPx}px` }}
                >
                  <div className="text-4xl mb-3">📄</div>
                  <p className="text-sm text-slate-200 font-bold">{artwork.uploadedFileName}</p>
                  <p className="text-xs text-slate-400 mt-2 max-w-xs text-center">
                    Arquivo enviado para análise técnica.
                  </p>
                  <p className="text-[11px] text-brand-300 mt-1 font-semibold">
                    Nossa equipe revisará sangrias e amarração de fios.
                  </p>
                </div>
              ) : (
                <div className="text-slate-400 text-sm">
                  Nenhum arquivo enviado na Etapa 2.
                </div>
              )}

              <div className="text-xs text-slate-400">
                {config.widthMm}mm × {config.lengthMm}mm • Arquivo enviado para análise técnica
              </div>
            </div>
          ) : (
            /* Online art preview with Loom Woven Pixelation */
            <div
              className="transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* The label representation */}
              <div
                className="relative rounded-xs label-elevation overflow-hidden select-none"
                style={{
                  width: `${widthPx}px`,
                  height: `${heightPx}px`,
                  backgroundColor: artwork.backgroundColor,
                }}
              >
                {/* ── DUPLA DENSIDADE: METADE ALTA (TOPO) E METADE BAIXA (BASE) ── */}
                {isDupla ? (
                  <>
                    {/* Top Half: Alta Definição */}
                    <div
                      className="absolute inset-x-0 top-0 h-1/2 tear-weave-alta-definicao border-b border-dashed border-brand/40 pointer-events-none z-0"
                    >
                      <span className="absolute top-1 right-1 text-[8px] font-mono font-bold bg-slate-900/75 text-emerald-300 px-1 rounded">
                        Alta Definição (Logotipo)
                      </span>
                    </div>

                    {/* Bottom Half: Baixa Definição (Tafetá) */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/2 tear-weave-tafeta pointer-events-none z-0"
                    >
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono font-bold bg-slate-900/75 text-amber-300 px-1 rounded">
                        Tafetá (Composição)
                      </span>
                    </div>
                  </>
                ) : (
                  /* Single Fabric Weave Texture */
                  <div className={`absolute inset-0 pointer-events-none z-0 ${weaveInfo.container}`} />
                )}

                {/* Visual marker for Dobra Meio */}
                {config.cutId === 'dobra_meio' && (
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-red-500/60 pointer-events-none z-20 flex items-center justify-end pr-2">
                    <span className="text-[9px] font-mono font-bold text-red-600 bg-white/90 px-1 rounded shadow-xs">
                      Linha de Dobra
                    </span>
                  </div>
                )}

                {/* Visual marker for Pontas */}
                {config.cutId === 'pontas' && (
                  <>
                    <div className="absolute left-0 top-0 bottom-0 w-3 border-r border-dashed border-red-400/60 pointer-events-none z-20 bg-black/10" />
                    <div className="absolute right-0 top-0 bottom-0 w-3 border-l border-dashed border-red-400/60 pointer-events-none z-20 bg-black/10" />
                  </>
                )}

                {/* Text elements rendered with pixelated thread styling and rotation support */}
                {artwork.textElements.map(el => {
                  const displayText = el.uppercase ? el.text.toUpperCase() : el.text;
                  if (!displayText) return null;

                  // Text pixelation styling based on fabric & position (if dupla densidade)
                  let pixelClass = weaveInfo.text;
                  if (isDupla) {
                    pixelClass = el.y < 50 ? 'tear-text-alta-definicao' : 'tear-text-tafeta';
                  }

                  const isRotated = el.rotation === 90;

                  return (
                    <div
                      key={el.id}
                      className="absolute left-0 right-0 px-2 z-10 pointer-events-none flex items-center justify-center"
                      style={{
                        top: `${el.y}%`,
                        transform: 'translateY(-50%)',
                        justifyContent: el.alignment === 'left' ? 'flex-start' : el.alignment === 'right' ? 'flex-end' : 'center',
                      }}
                    >
                      <span
                        className={pixelClass}
                        style={{
                          fontFamily: el.fontFamily,
                          fontSize: `${el.fontSize}px`,
                          color: el.color,
                          fontWeight: el.bold ? 'bold' : 'normal',
                          fontStyle: el.italic ? 'italic' : 'normal',
                          lineHeight: 1.15,
                          wordBreak: 'break-word',
                          display: 'inline-block',
                          transform: isRotated ? 'rotate(90deg)' : 'none',
                          transformOrigin: 'center center',
                        }}
                      >
                        {displayText}
                      </span>
                    </div>
                  );
                })}

                {/* Empty state */}
                {artwork.textElements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 p-4 text-center z-10">
                    Volte à Etapa 2 para adicionar textos à sua etiqueta.
                  </div>
                )}
              </div>

              {/* Dimension indicators below */}
              <div className="mt-3 flex items-center justify-center space-x-4 text-xs font-mono text-slate-400">
                <span>↔ Largura: {config.widthMm}mm</span>
                <span>•</span>
                <span>↕ Comprimento: {config.lengthMm}mm</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info note */}
      <div className="bg-surface-50 rounded-xl border border-surface-200 p-4 text-xs text-slate-600 flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Fidelidade de Tecelagem:</strong> A textura de tear reflete a resolução do tecido selecionado (Tafetá possui menor definição de pontos, Alta Definição apresenta maior densidade, Super Batido oferece a máxima compactação e Dupla Densidade divide metade superior em alta e inferior em tafetá).
        </p>
      </div>
    </div>
  );
};
