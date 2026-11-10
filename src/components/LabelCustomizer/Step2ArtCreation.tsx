import React, { useState } from 'react';
import {
  Type,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  CaseSensitive,
  Palette,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { ArtworkConfig, TextElement } from '../../types';
import { FONT_OPTIONS, BACKGROUND_COLORS, THREAD_COLORS, isLurexThread, getLurexColor } from '../../data/adminConfig';

interface Step2Props {
  artwork: ArtworkConfig;
  threadId?: string;
  onChange: (updated: Partial<ArtworkConfig>) => void;
}

function createId(): string {
  return 'el-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
}

export const Step2ArtCreation: React.FC<Step2Props> = ({ artwork, threadId = 'poliester', onChange }) => {
  const [editingElementId, setEditingElementId] = useState<string | null>(null);

  const isLurex = isLurexThread(threadId);
  const lockedColor = getLurexColor(threadId);

  const updateElement = (id: string, updates: Partial<TextElement>) => {
    // Se o fio for Lurex, nunca permite alterar a cor do bordado
    const safeUpdates = isLurex && lockedColor ? { ...updates, color: lockedColor } : updates;
    onChange({
      textElements: artwork.textElements.map(el =>
        el.id === id ? { ...el, ...safeUpdates } : el
      ),
    });
  };

  const addTextElement = () => {
    const newEl: TextElement = {
      id: createId(),
      text: '',
      fontFamily: 'Inter',
      fontSize: 16,
      color: isLurex && lockedColor ? lockedColor : '#000000',
      alignment: 'center',
      bold: true,
      italic: false,
      uppercase: false,
      rotation: 0,
      y: 50,
    };
    onChange({ textElements: [...artwork.textElements, newEl] });
    setEditingElementId(newEl.id);
  };

  const removeElement = (id: string) => {
    onChange({ textElements: artwork.textElements.filter(el => el.id !== id) });
    if (editingElementId === id) setEditingElementId(null);
  };

  const moveElement = (id: string, direction: 'up' | 'down') => {
    const idx = artwork.textElements.findIndex(el => el.id === id);
    if (idx < 0) return;
    const newArr = [...artwork.textElements];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= newArr.length) return;
    [newArr[idx], newArr[swapIdx]] = [newArr[swapIdx], newArr[idx]];
    onChange({ textElements: newArr });
  };

  return (
    <div className="space-y-6">
      {/* Background Color */}
      <div className="bg-surface-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-surface-200 dark:border-slate-700/80">
        <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-100 mb-2.5">
          <Palette className="w-4 h-4 text-brand" />
          <span>Cor de fundo da fita</span>
        </label>
        <div className="flex flex-wrap gap-2.5 items-center">
          {BACKGROUND_COLORS.map(c => (
            <button
              key={c.hex}
              type="button"
              title={c.name}
              onClick={() => onChange({ backgroundColor: c.hex })}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                artwork.backgroundColor === c.hex
                  ? 'scale-125 ring-2 ring-brand ring-offset-2 dark:ring-offset-slate-900'
                  : 'hover:scale-110 border-slate-300 dark:border-slate-600'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <input
            type="color"
            value={artwork.backgroundColor}
            onChange={e => onChange({ backgroundColor: e.target.value })}
            title="Cor personalizada de fundo"
            className="w-8 h-8 rounded-full cursor-pointer border border-slate-300 dark:border-slate-600 p-0"
          />
        </div>
      </div>

      {/* Text elements list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 dark:text-slate-100">
            <Type className="w-4 h-4 text-brand" />
            <span>Textos da etiqueta</span>
          </label>
          <button
            type="button"
            onClick={addTextElement}
            className="px-3.5 py-1.5 rounded-lg bg-brand hover:bg-brand-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar linha de texto</span>
          </button>
        </div>

        {artwork.textElements.length === 0 && (
          <div className="text-center py-8 bg-surface-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <Type className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Nenhum texto adicionado ainda.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Clique no botão acima para adicionar o nome da marca, composição ou tamanho.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {artwork.textElements.map((el, idx) => (
            <div
              key={el.id}
              className={`rounded-xl border transition-all ${
                editingElementId === el.id
                  ? 'border-brand bg-white dark:bg-slate-800 shadow-md ring-1 ring-brand/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {/* Element header row */}
              <div
                className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer"
                onClick={() => setEditingElementId(editingElementId === el.id ? null : el.id)}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 flex-shrink-0">
                    #{idx + 1}
                  </span>
                  <span
                    className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate"
                    style={{ fontFamily: el.fontFamily }}
                  >
                    {el.text || '(clique para editar texto...)'}
                  </span>
                  {el.rotation === 90 && (
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded font-mono font-bold">
                      90° Vertical
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); moveElement(el.id, 'up'); }}
                    disabled={idx === 0}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30"
                    title="Mover para cima"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); moveElement(el.id, 'down'); }}
                    disabled={idx === artwork.textElements.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30"
                    title="Mover para baixo"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); removeElement(el.id); }}
                    className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                    title="Remover texto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded editor */}
              {editingElementId === el.id && (
                <div className="px-3.5 pb-4 space-y-4 border-t border-slate-100 dark:border-slate-700 pt-3">
                  {/* Text input */}
                  <div>
                    <input
                      type="text"
                      value={el.text}
                      onChange={e => updateElement(el.id, { text: e.target.value })}
                      placeholder="Digite o texto da etiqueta..."
                      className="w-full px-3 py-2.5 bg-surface-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-slate-900 dark:text-white"
                      autoFocus
                    />
                  </div>

                  {/* Rotation Toggle */}
                  <div>
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Orientação do Texto
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => updateElement(el.id, { rotation: 0 })}
                        className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                          (el.rotation ?? 0) === 0
                            ? 'bg-slate-900 dark:bg-brand text-white border-slate-900 dark:border-brand shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span>Horizontal (0°)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateElement(el.id, { rotation: 90 })}
                        className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                          el.rotation === 90
                            ? 'bg-brand text-white border-brand shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Vertical (90°)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Font family */}
                    <div>
                      <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Fonte</span>
                      <select
                        value={el.fontFamily}
                        onChange={e => updateElement(el.id, { fontFamily: e.target.value })}
                        className="w-full px-2.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-brand text-slate-800 dark:text-slate-200"
                      >
                        {FONT_OPTIONS.map(f => (
                          <option key={f.id} value={f.id}>
                            {f.name} — {f.category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Font size */}
                    <div>
                      <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Tamanho ({el.fontSize}px)
                      </span>
                      <input
                        type="range"
                        min={8}
                        max={44}
                        step={1}
                        value={el.fontSize}
                        onChange={e => updateElement(el.id, { fontSize: Number(e.target.value) })}
                        className="w-full accent-brand"
                      />
                    </div>
                  </div>

                  {/* Style toggles & alignment */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateElement(el.id, { bold: !el.bold })}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                        el.bold
                          ? 'bg-slate-900 dark:bg-brand text-white border-slate-900 dark:border-brand'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                      title="Negrito"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => updateElement(el.id, { italic: !el.italic })}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                        el.italic
                          ? 'bg-slate-900 dark:bg-brand text-white border-slate-900 dark:border-brand'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                      title="Itálico"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => updateElement(el.id, { uppercase: !el.uppercase })}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                        el.uppercase
                          ? 'bg-slate-900 dark:bg-brand text-white border-slate-900 dark:border-brand'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                      title="MAIÚSCULAS"
                    >
                      <CaseSensitive className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

                    {(['left', 'center', 'right'] as const).map(align => {
                      const AlignIcon = align === 'left' ? AlignLeft : align === 'center' ? AlignCenter : AlignRight;
                      return (
                        <button
                          key={align}
                          type="button"
                          onClick={() => updateElement(el.id, { alignment: align })}
                          className={`p-2 rounded-lg border text-xs transition-all ${
                            el.alignment === align
                              ? 'bg-brand text-white border-brand'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                          title={align === 'left' ? 'Alinhar à esquerda' : align === 'center' ? 'Centralizar' : 'Alinhar à direita'}
                        >
                          <AlignIcon className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Text color / Fio Bordado */}
                  <div>
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Cor do texto / bordado</span>
                    {isLurex ? (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center space-x-2.5">
                        <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        <div className="text-xs">
                          <strong className="text-amber-900 dark:text-amber-200 block">
                            Fio {threadId === 'lurex_ouro' ? 'Lurex Ouro' : 'Lurex Prata'} Ativo
                          </strong>
                          <span className="text-amber-700 dark:text-amber-300">
                            A cor do bordado é fixada em {threadId === 'lurex_ouro' ? 'Dourado Metálico' : 'Prateado Metálico'}. Você pode alterar a cor de fundo da fita.
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 items-center">
                        {THREAD_COLORS.map(c => (
                          <button
                            key={c.hex}
                            type="button"
                            title={c.name}
                            onClick={() => updateElement(el.id, { color: c.hex })}
                            className={`w-7 h-7 rounded-full border-2 transition-transform ${
                              el.color === c.hex
                                ? 'scale-125 ring-2 ring-brand ring-offset-1 dark:ring-offset-slate-900'
                                : 'hover:scale-110 border-slate-300 dark:border-slate-600'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                        <input
                          type="color"
                          value={el.color}
                          onChange={e => updateElement(el.id, { color: e.target.value })}
                          className="w-7 h-7 rounded-full cursor-pointer border border-slate-300 dark:border-slate-600 p-0"
                        />
                      </div>
                    )}
                  </div>

                  {/* Vertical position */}
                  <div>
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Posição vertical ({el.y}%)
                    </span>
                    <input
                      type="range"
                      min={5}
                      max={95}
                      step={1}
                      value={el.y}
                      onChange={e => updateElement(el.id, { y: Number(e.target.value) })}
                      className="w-full accent-brand"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
                      <span>Topo</span>
                      <span>Centro</span>
                      <span>Base</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
