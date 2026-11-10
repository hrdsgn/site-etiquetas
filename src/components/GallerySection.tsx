import React, { useState } from 'react';
import { Tag, Sparkles, Layers, Scissors, CheckCircle2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockProducts';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const segments = ['todos', 'Streetwear', 'Alta Costura', 'Beachwear & Casual', 'Jeanswear', 'Slow Fashion', 'Moda Infantil'];

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeFilter === 'todos') return true;
    return item.segment === activeFilter;
  });

  return (
    <section id="galeria" className="py-12 sm:py-16 bg-white dark:bg-slate-900 transition-colors border-b border-surface-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 px-3 py-1 rounded-full inline-block mb-3">
            Fichas Técnicas & Especificações
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Exemplos de configurações técnicas
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Consulte exemplos reais de combinações de tecelagem, cortes e acabamentos desenvolvidos para cada segmento de moda.
          </p>
        </div>

        {/* Segment Filter Pills */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {segments.map(seg => (
            <button
              key={seg}
              type="button"
              onClick={() => setActiveFilter(seg)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === seg
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-surface-100 dark:bg-slate-800 hover:bg-surface-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {seg === 'todos' ? 'Todos os Segmentos' : seg}
            </button>
          ))}
        </div>

        {/* Technical Text Cards Grid - 100% TEXT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-surface-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md">
                    {item.segment}
                  </span>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.accentColor }} />
                </div>

                <h4 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">Tecelagem</span>
                  <strong className="text-slate-800 dark:text-white truncate block">{item.fabric}</strong>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">Acabamento</span>
                  <strong className="text-slate-800 dark:text-white truncate block">{item.cut}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
