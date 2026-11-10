import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockProducts';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const segments = ['todos', 'Streetwear', 'Alta Costura', 'Beachwear', 'Jeanswear', 'Slow Fashion', 'Moda Infantil'];

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeFilter === 'todos') return true;
    return item.segment === activeFilter;
  });

  return (
    <section id="galeria" className="py-16 sm:py-20 bg-white border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-50 border border-brand-200 px-3 py-1 rounded-full inline-block mb-3">
            Portfólio & Amostras
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeria de etiquetas produzidas
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Inspire-se em modelos reais confeccionados em nossos teares com diferentes cortes e acabamentos.
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
                  : 'bg-surface-100 hover:bg-surface-200 text-slate-600'
              }`}
            >
              {seg === 'todos' ? 'Todos os Nichos' : seg}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-subtle hover:shadow-card-hover cursor-pointer transition-all duration-300"
            >
              <div className="h-64 sm:h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300 mb-1">
                  {item.segment}
                </span>
                <h4 className="font-extrabold text-lg text-white leading-tight">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs text-slate-300">
                  <span>{item.fabric}</span>
                  <span className="font-medium text-white/90">{item.cut}</span>
                </div>
              </div>

              {/* Hover badge */}
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedItem(null)}
          >
            <div 
              className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-700"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-80 bg-slate-900">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-xs font-bold text-brand uppercase tracking-wider">
                  {selectedItem.segment}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedItem.title}
                </h3>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-surface-50 p-3 rounded-lg border border-surface-200">
                    <span className="text-slate-500 block">Tecido / Tecelagem:</span>
                    <strong className="text-slate-900">{selectedItem.fabric}</strong>
                  </div>
                  <div className="bg-surface-50 p-3 rounded-lg border border-surface-200">
                    <span className="text-slate-500 block">Corte / Acabamento:</span>
                    <strong className="text-slate-900">{selectedItem.cut}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
