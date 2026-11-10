import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Download, Eye, LayoutGrid } from 'lucide-react';
import { PhysicalConfig, ArtworkConfig } from '../../types';
import { isLurexThread, getLurexColor } from '../../data/adminConfig';

interface Step3Props {
  config: PhysicalConfig;
  artwork: ArtworkConfig;
}

export const Step3Preview: React.FC<Step3Props> = ({ config, artwork }) => {
  const [viewMode, setViewMode] = useState<'loom' | 'single'>('loom');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [labelImageUrl, setLabelImageUrl] = useState<string>('');
  const [isRendering, setIsRendering] = useState(true);

  // ─────────────────────────────────────────────────────────────
  // RASTERIZAÇÃO DA ETIQUETA EM IMAGEM DE ALTA DEFINIÇÃO (PNG)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;

    const renderLabelToImage = () => {
      try {
        const dpr = Math.max(2, window.devicePixelRatio || 1);
        const pxPerMm = 10 * dpr;
        const canvasWidth = Math.max(160, Math.round(config.widthMm * pxPerMm));
        const canvasHeight = Math.max(160, Math.round(config.lengthMm * pxPerMm));

        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 1. Fundo da fita
        ctx.fillStyle = artwork.backgroundColor || '#FFFFFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // 2. Simulação de Trama Têxtil conforme o Tecido Escolhido
        const isDupla = config.fabricId === 'dupla_densidade';

        const drawWeaveLines = (startY: number, endY: number, stepPx: number, alpha: number) => {
          ctx.save();
          ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
          ctx.lineWidth = Math.max(1, 1 * dpr);
          for (let y = startY; y < endY; y += stepPx) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasWidth, y);
            ctx.stroke();
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
          for (let x = 0; x < canvasWidth; x += stepPx) {
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.stroke();
          }
          ctx.restore();
        };

        if (isDupla) {
          const halfH = canvasHeight / 2;
          drawWeaveLines(0, halfH, Math.max(3, Math.round(pxPerMm * 0.35)), 0.08);
          drawWeaveLines(halfH, canvasHeight, Math.max(6, Math.round(pxPerMm * 0.85)), 0.17);

          // Divisão da dupla densidade
          ctx.save();
          ctx.setLineDash([8 * dpr, 6 * dpr]);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
          ctx.lineWidth = 1.5 * dpr;
          ctx.beginPath();
          ctx.moveTo(0, halfH);
          ctx.lineTo(canvasWidth, halfH);
          ctx.stroke();
          ctx.restore();
        } else if (config.fabricId === 'tafeta') {
          drawWeaveLines(0, canvasHeight, Math.max(6, Math.round(pxPerMm * 0.85)), 0.18);
        } else if (config.fabricId === 'tafeta_gold') {
          drawWeaveLines(0, canvasHeight, Math.max(4, Math.round(pxPerMm * 0.5)), 0.12);
        } else if (config.fabricId === 'super_batido') {
          drawWeaveLines(0, canvasHeight, Math.max(2, Math.round(pxPerMm * 0.25)), 0.09);
        } else {
          // Alta Definição
          drawWeaveLines(0, canvasHeight, Math.max(3, Math.round(pxPerMm * 0.35)), 0.08);
        }

        // 3. Marcações das dobras (contínua) e cortes (traçada) - Sem números
        // Na opção Rolo, a produção é contínua sem dobra ou corte algum!
        if (config.cutId !== 'rolo') {
          // A) Traçada para corte (extremidades superior e inferior)
          ctx.save();
          ctx.setLineDash([8 * dpr, 5 * dpr]); // linha traçada
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.65)';
          ctx.lineWidth = 1.8 * dpr;
          // Corte topo
          ctx.beginPath();
          ctx.moveTo(0, 2 * dpr);
          ctx.lineTo(canvasWidth, 2 * dpr);
          ctx.stroke();
          // Corte base
          ctx.beginPath();
          ctx.moveTo(0, canvasHeight - 2 * dpr);
          ctx.lineTo(canvasWidth, canvasHeight - 2 * dpr);
          ctx.stroke();
          ctx.restore();

          // B) Contínua para dobra (conforme tipo de dobra)
          if (config.cutId === 'dobra_meio') {
            ctx.save();
            ctx.setLineDash([]); // linha contínua
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
            ctx.lineWidth = 2 * dpr;
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight / 2);
            ctx.lineTo(canvasWidth, canvasHeight / 2);
            ctx.stroke();
            ctx.restore();
          } else if (config.cutId === 'pontas') {
            ctx.save();
            ctx.setLineDash([]); // contínua
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
            ctx.lineWidth = 2 * dpr;
            // Dobra ponta superior (10%)
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight * 0.1);
            ctx.lineTo(canvasWidth, canvasHeight * 0.1);
            ctx.stroke();
            // Dobra ponta inferior (90%)
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight * 0.9);
            ctx.lineTo(canvasWidth, canvasHeight * 0.9);
            ctx.stroke();
            ctx.restore();
          } else if (config.cutId === 'meio_e_pontas') {
            ctx.save();
            ctx.setLineDash([]); // contínua
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
            ctx.lineWidth = 2 * dpr;
            // Dobra central
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight / 2);
            ctx.lineTo(canvasWidth, canvasHeight / 2);
            ctx.stroke();
            // Dobras nas pontas
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight * 0.1);
            ctx.lineTo(canvasWidth, canvasHeight * 0.1);
            ctx.moveTo(0, canvasHeight * 0.9);
            ctx.lineTo(canvasWidth, canvasHeight * 0.9);
            ctx.stroke();
            ctx.restore();
          } else if (config.cutId === 'manhattan') {
            ctx.save();
            ctx.setLineDash([]); // contínua
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
            ctx.lineWidth = 2 * dpr;
            // Dobra meio
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight / 2);
            ctx.lineTo(canvasWidth, canvasHeight / 2);
            ctx.stroke();
            // Dobra superior invertida
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight * 0.12);
            ctx.lineTo(canvasWidth, canvasHeight * 0.12);
            ctx.stroke();
            ctx.restore();
          }
          // 'so_cortada': apenas o traçado de corte já feito acima, sem dobra contínua.
        }

        // 4. Renderização dos textos com trava de cor para Lurex
        const isLurex = isLurexThread(config.threadId);
        const lurexColor = getLurexColor(config.threadId);
        const baseFontScale = pxPerMm / 4.2;

        artwork.textElements.forEach(el => {
          const text = el.uppercase ? el.text.toUpperCase() : el.text;
          if (!text.trim()) return;

          ctx.save();
          const fontSize = Math.max(12, Math.round(el.fontSize * baseFontScale));
          const fontStyle = `${el.italic ? 'italic ' : ''}${el.bold ? 'bold ' : ''}${fontSize}px "${el.fontFamily}", system-ui, -apple-system, sans-serif`;
          ctx.font = fontStyle;
          // Se for Lurex Ouro ou Prata, força a cor metálica fixa
          ctx.fillStyle = isLurex && lurexColor ? lurexColor : el.color;
          ctx.textBaseline = 'middle';

          const targetY = (el.y / 100) * canvasHeight;
          let targetX = canvasWidth / 2;

          if (el.alignment === 'left') {
            targetX = canvasWidth * 0.08;
            ctx.textAlign = 'left';
          } else if (el.alignment === 'right') {
            targetX = canvasWidth * 0.92;
            ctx.textAlign = 'right';
          } else {
            ctx.textAlign = 'center';
          }

          if (el.rotation === 90) {
            ctx.translate(targetX, targetY);
            ctx.rotate(Math.PI / 2);
            ctx.textAlign = el.alignment;
            ctx.fillText(text, 0, 0);
          } else {
            ctx.fillText(text, targetX, targetY);
          }
          ctx.restore();
        });

        const dataUrl = canvas.toDataURL('image/png');
        if (isMounted) {
          setLabelImageUrl(dataUrl);
          setIsRendering(false);
        }
      } catch (err) {
        console.error('Erro ao renderizar etiqueta:', err);
      }
    };

    setIsRendering(true);
    if (document.fonts?.ready) {
      document.fonts.ready.then(renderLabelToImage);
    } else {
      renderLabelToImage();
    }

    return () => {
      isMounted = false;
    };
  }, [config, artwork]);

  // Fitas e repetições
  const numColumns = Math.max(4, Math.min(12, Math.round(120 / config.widthMm)));
  const numVerticalRepeats = Math.max(3, Math.min(6, Math.round(260 / config.lengthMm)));

  const handleDownload = () => {
    if (!labelImageUrl) return;
    const link = document.createElement('a');
    link.download = `etiqueta-${config.widthMm}x${config.lengthMm}mm.png`;
    link.href = labelImageUrl;
    link.click();
  };

  return (
    <div className="space-y-4">
      {/* Barra de controle discreta */}
      <div className="flex items-center justify-between gap-3 bg-surface-100 dark:bg-slate-800 p-2.5 rounded-2xl border border-surface-200 dark:border-slate-700">
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => setViewMode('loom')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              viewMode === 'loom'
                ? 'bg-brand text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Simulação no Tear</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('single')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              viewMode === 'single'
                ? 'bg-brand text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Etiqueta Unitária</span>
          </button>
        </div>

        {labelImageUrl && (
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-all flex items-center space-x-1.5"
            title="Baixar imagem da etiqueta em PNG"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Baixar Imagem</span>
          </button>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SIMULAÇÃO DA ETIQUETA NO TEAR INDUSTRIAL
          Etiquetas juntas ao máximo com traçado fino separando-as
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'loom' ? (
        <div className="bg-[#0b0f19] rounded-2xl p-4 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
          <div
            className="overflow-x-auto pb-4 pt-2 flex items-start justify-center min-w-full"
            style={{
              backgroundImage: `
                radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '16px 16px',
            }}
          >
            {/* Bloco compacto com etiquetas unidas ao máximo */}
            <div className="inline-flex items-start justify-center flex-nowrap border border-slate-700/80 rounded-md overflow-hidden bg-black/60 shadow-2xl">
              {Array.from({ length: numColumns }).map((_, colIdx) => (
                <div
                  key={`col-${colIdx}`}
                  className={`flex flex-col items-center flex-shrink-0 ${
                    colIdx < numColumns - 1 ? 'border-r border-slate-700/60' : ''
                  }`}
                  style={{
                    width: `${Math.max(34, Math.min(110, config.widthMm * 2.8))}px`,
                  }}
                >
                  {Array.from({ length: numVerticalRepeats }).map((_, repIdx) => (
                    <div
                      key={`col-${colIdx}-rep-${repIdx}`}
                      className={`w-full relative select-none ${
                        config.cutId === 'rolo'
                          ? '' // Rolo: contínuo sem corte ou separação
                          : repIdx < numVerticalRepeats - 1
                          ? 'border-b border-dashed border-red-500/40' // Traçado fino separando
                          : ''
                      }`}
                    >
                      {labelImageUrl ? (
                        <img
                          src={labelImageUrl}
                          alt="Etiqueta no tear"
                          className="w-full h-auto block select-none pointer-events-none"
                          style={{
                            aspectRatio: `${config.widthMm} / ${config.lengthMm}`,
                          }}
                        />
                      ) : (
                        <div
                          className="w-full bg-slate-800 animate-pulse"
                          style={{
                            aspectRatio: `${config.widthMm} / ${config.lengthMm}`,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────
            VISUALIZAÇÃO DA ETIQUETA INDIVIDUAL COM ZOOM
            ───────────────────────────────────────────────────────────── */
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 font-mono">
              ETIQUETA INDIVIDUAL ({config.widthMm}mm × {config.lengthMm}mm)
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => setZoomLevel(z => Math.max(0.6, z - 0.2))}
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
                onClick={() => setZoomLevel(z => Math.min(2.5, z + 0.2))}
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

          <div className="flex items-center justify-center min-h-[340px] overflow-auto p-6 bg-[#070b14] rounded-xl border border-slate-800/80">
            {labelImageUrl && (
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <img
                  src={labelImageUrl}
                  alt="Etiqueta individual"
                  className="rounded-xs shadow-2xl block select-none pointer-events-none"
                  style={{
                    width: `${Math.max(80, Math.min(320, config.widthMm * 4.5))}px`,
                    aspectRatio: `${config.widthMm} / ${config.lengthMm}`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
