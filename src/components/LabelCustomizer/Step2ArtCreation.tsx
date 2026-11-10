import React, { useRef, useState } from 'react';
import {
  Type,
  UploadCloud,
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
  FileText,
  AlertCircle,
  Check,
  X,
  RotateCw,
} from 'lucide-react';
import { ArtworkConfig, TextElement } from '../../types';
import { FONT_OPTIONS, BACKGROUND_COLORS, THREAD_COLORS } from '../../data/adminConfig';

interface Step2Props {
  artwork: ArtworkConfig;
  onChange: (updated: Partial<ArtworkConfig>) => void;
}

function createId(): string {
  return 'el-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
}

export const Step2ArtCreation: React.FC<Step2Props> = ({ artwork, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingElementId, setEditingElementId] = useState<string | null>(null);

  const updateElement = (id: string, updates: Partial<TextElement>) => {
    onChange({
      textElements: artwork.textElements.map(el =>
        el.id === id ? { ...el, ...updates } : el
      ),
    });
  };

  const addTextElement = () => {
    const newEl: TextElement = {
      id: createId(),
      text: '',
      fontFamily: 'Inter',
      fontSize: 16,
      color: '#000000',
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'image/svg+xml'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!validTypes.includes(file.type) && ext !== 'pdf' && ext !== 'svg') {
      alert('Formato inválido. Por favor, envie um arquivo PDF ou SVG.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert('Arquivo muito grande. O tamanho máximo permitido é 20 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        mode: 'upload',
        uploadedFileUrl: reader.result as string,
        uploadedFileName: file.name,
        uploadedFileType: file.type || `arquivo/${ext}`,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    onChange({
      uploadedFileUrl: null,
      uploadedFileName: null,
      uploadedFileType: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* ── MODE TABS ── */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-surface-100 rounded-xl border border-surface-200">
        <button
          type="button"
          onClick={() => onChange({ mode: 'online' })}
          className={`py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
            artwork.mode === 'online'
              ? 'bg-white text-brand shadow-sm border border-brand/20'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Criar arte no site</span>
        </button>
        <button
          type="button"
          onClick={() => onChange({ mode: 'upload' })}
          className={`py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
            artwork.mode === 'upload'
              ? 'bg-white text-brand shadow-sm border border-brand/20'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Enviar arte pronta</span>
        </button>
      </div>

      {/* ════════════════════════════════════════════ */}
      {/* MODE A — CRIAR ARTE NO SITE                 */}
      {/* ════════════════════════════════════════════ */}
      {artwork.mode === 'online' && (
        <div className="space-y-6">
          {/* Background Color */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
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
                      ? 'scale-125 ring-2 ring-brand ring-offset-2'
                      : 'hover:scale-110 border-slate-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <input
                type="color"
                value={artwork.backgroundColor}
                onChange={e => onChange({ backgroundColor: e.target.value })}
                title="Cor personalizada de fundo"
                className="w-8 h-8 rounded-full cursor-pointer border border-slate-300 p-0"
              />
            </div>
          </div>

          {/* Text elements list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center space-x-2 text-sm font-bold text-slate-800">
                <Type className="w-4 h-4 text-brand" />
                <span>Textos da etiqueta</span>
              </label>
              <button
                type="button"
                onClick={addTextElement}
                className="px-3 py-1.5 rounded-lg bg-brand hover:bg-brand-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar texto</span>
              </button>
            </div>

            {artwork.textElements.length === 0 && (
              <div className="text-center py-8 bg-surface-50 rounded-xl border border-dashed border-slate-300">
                <Type className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500 font-medium">
                  Nenhum texto adicionado ainda.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Clique em "Adicionar texto" para inserir marca, tamanho ou composição.
                </p>
              </div>
            )}

            <div className="space-y-2.5">
              {artwork.textElements.map((el, idx) => (
                <div
                  key={el.id}
                  className={`rounded-xl border transition-all ${
                    editingElementId === el.id
                      ? 'border-brand bg-white shadow-md ring-1 ring-brand/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Element header row */}
                  <div
                    className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer"
                    onClick={() => setEditingElementId(editingElementId === el.id ? null : el.id)}
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <span className="text-xs font-mono text-slate-400 flex-shrink-0">
                        #{idx + 1}
                      </span>
                      <span
                        className="text-sm font-semibold text-slate-800 truncate"
                        style={{ fontFamily: el.fontFamily }}
                      >
                        {el.text || '(digite o texto...)'}
                      </span>
                      {el.rotation === 90 && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-bold">
                          90° Vertical
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); moveElement(el.id, 'up'); }}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        title="Mover para cima"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); moveElement(el.id, 'down'); }}
                        disabled={idx === artwork.textElements.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        title="Mover para baixo"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); removeElement(el.id); }}
                        className="p-1 text-slate-400 hover:text-red-600"
                        title="Remover texto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded editor */}
                  {editingElementId === el.id && (
                    <div className="px-3.5 pb-4 space-y-4 border-t border-slate-100 pt-3">
                      {/* Text input */}
                      <div>
                        <input
                          type="text"
                          value={el.text}
                          onChange={e => updateElement(el.id, { text: e.target.value })}
                          placeholder="Digite o texto da etiqueta..."
                          className="w-full px-3 py-2.5 bg-surface-50 border border-slate-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-slate-900"
                          autoFocus
                        />
                      </div>

                      {/* Rotation Orientation Toggle (Horizontal vs Vertical 90°) */}
                      <div>
                        <span className="block text-xs font-bold text-slate-700 mb-1.5">
                          Orientação do Texto
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => updateElement(el.id, { rotation: 0 })}
                            className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                              (el.rotation ?? 0) === 0
                                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span>Horizontal (Padrão)</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => updateElement(el.id, { rotation: 90 })}
                            className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                              el.rotation === 90
                                ? 'bg-brand text-white border-brand shadow-sm'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Vertical (Virado 90°)</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Font family */}
                        <div>
                          <span className="block text-xs font-bold text-slate-700 mb-1">Fonte</span>
                          <select
                            value={el.fontFamily}
                            onChange={e => updateElement(el.id, { fontFamily: e.target.value })}
                            className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-brand"
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
                          <span className="block text-xs font-bold text-slate-700 mb-1">
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
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
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
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
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
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                          title="MAIÚSCULAS"
                        >
                          <CaseSensitive className="w-4 h-4" />
                        </button>

                        <div className="w-px h-6 bg-slate-200 mx-1" />

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
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                              title={align === 'left' ? 'Alinhar à esquerda' : align === 'center' ? 'Centralizar' : 'Alinhar à direita'}
                            >
                              <AlignIcon className="w-4 h-4" />
                            </button>
                          );
                        })}
                      </div>

                      {/* Text color */}
                      <div>
                        <span className="block text-xs font-bold text-slate-700 mb-1.5">Cor do texto / fio</span>
                        <div className="flex flex-wrap gap-2 items-center">
                          {THREAD_COLORS.map(c => (
                            <button
                              key={c.hex}
                              type="button"
                              title={c.name}
                              onClick={() => updateElement(el.id, { color: c.hex })}
                              className={`w-7 h-7 rounded-full border-2 transition-transform ${
                                el.color === c.hex
                                  ? 'scale-125 ring-2 ring-brand ring-offset-1'
                                  : 'hover:scale-110 border-slate-300'
                              }`}
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                          <input
                            type="color"
                            value={el.color}
                            onChange={e => updateElement(el.id, { color: e.target.value })}
                            className="w-7 h-7 rounded-full cursor-pointer border border-slate-300 p-0"
                          />
                        </div>
                      </div>

                      {/* Vertical position */}
                      <div>
                        <span className="block text-xs font-bold text-slate-700 mb-1">
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
                        <div className="flex justify-between text-[10px] text-slate-400">
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
      )}

      {/* ════════════════════════════════════════════ */}
      {/* MODE B — ENVIAR ARTE PRONTA                 */}
      {/* ════════════════════════════════════════════ */}
      {artwork.mode === 'upload' && (
        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-brand rounded-2xl p-8 text-center cursor-pointer transition-colors bg-white group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.svg"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center transition-colors mb-3">
              <UploadCloud className="w-7 h-7 text-brand" />
            </div>

            {artwork.uploadedFileName ? (
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Arquivo Carregado</span>
                </div>
                <p className="font-bold text-slate-800 text-sm flex items-center justify-center space-x-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>{artwork.uploadedFileName}</span>
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="text-xs text-brand font-bold hover:underline"
                  >
                    Substituir arquivo
                  </button>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="text-xs text-red-600 font-bold hover:underline flex items-center space-x-1"
                  >
                    <X className="w-3 h-3" />
                    <span>Remover</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-slate-800 text-sm sm:text-base">
                  Arraste seu arquivo ou clique para selecionar
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Formatos aceitos: <strong>PDF</strong> e <strong>SVG</strong> (máx. 20 MB)
                </p>
              </div>
            )}
          </div>

          {artwork.uploadedFileUrl && artwork.uploadedFileType === 'image/svg+xml' && (
            <div className="bg-surface-50 rounded-xl border border-surface-200 p-4">
              <span className="text-xs font-bold text-slate-600 block mb-2">
                Prévia do arquivo SVG:
              </span>
              <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-center min-h-[120px]">
                <img
                  src={artwork.uploadedFileUrl}
                  alt="Prévia SVG"
                  className="max-h-40 max-w-full object-contain"
                />
              </div>
            </div>
          )}

          {artwork.uploadedFileUrl && artwork.uploadedFileType?.includes('pdf') && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 text-xs">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-amber-900">
                <strong>Arquivo PDF carregado com sucesso.</strong>
                <p className="mt-1 text-amber-800">
                  A prévia de arquivos PDF não é renderizada diretamente no navegador. O arquivo original será
                  encaminhado para análise técnica da equipe, que gerará a prova digital oficial.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
