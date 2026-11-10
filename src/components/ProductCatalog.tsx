import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Layers,
  CheckCircle2,
  Tag,
  Sliders,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockProducts';

interface ProductCatalogProps {
  onSelectProductToCustomize: (product: Product) => void;
  onViewProductDetails: (product: Product) => void;
}

const CATEGORY_TABS = [
  { id: 'todas', label: 'Todos os Tecidos' },
  { id: 'tafeta', label: 'Tafetá' },
  { id: 'tafeta_gold', label: 'Tafetá Gold' },
  { id: 'dupla_densidade', label: 'Dupla Densidade' },
  { id: 'super_batido', label: 'Super Batido' },
  { id: 'alta_definicao', label: 'Alta Definição' },
  { id: 'termocolante', label: 'Termocolante' },
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProductToCustomize,
  onViewProductDetails
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'todas' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="py-12 sm:py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 px-3 py-1 rounded-full inline-block mb-3">
              Catálogo de Tecelagens (Especificações Técnicas)
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tipos de tecido e tecelagem
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Conheça as características físicas, densidade de pontos e recomendações técnicas para cada tecelagem: Tafetá, Tafetá Gold, Dupla Densidade, Super Batido e Alta Definição.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar tecido ou aplicação..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-surface-200 dark:border-slate-800">
          {CATEGORY_TABS.map(tab => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-brand text-white shadow-sm'
                    : 'bg-surface-100 dark:bg-slate-800 hover:bg-surface-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid - 100% TEXT-DRIVEN, ZERO PHOTOS */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-surface-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-base">Nenhum tecido encontrado para "{searchTerm}".</p>
            <button
              type="button"
              onClick={() => { setSearchTerm(''); setSelectedCategory('todas'); }}
              className="mt-3 text-brand font-bold text-sm hover:underline"
            >
              Limpar filtros e ver todos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-5 group"
              >
                {/* Header Information */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 px-2.5 py-1 rounded-md">
                      {product.categoryLabel}
                    </span>

                    {product.popular && (
                      <span className="text-[10px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                        Destaque
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-xl leading-snug group-hover:text-brand transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-brand font-semibold mt-1">
                    {product.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Technical Features & Applications */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Características de Tecelagem
                    </span>
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Indicado para:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.idealFor.map((item, idx) => (
                        <span key={idx} className="text-[11px] font-semibold bg-surface-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onViewProductDetails(product)}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors text-center"
                  >
                    Ficha Técnica
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectProductToCustomize(product)}
                    className="py-2.5 px-3 rounded-xl bg-brand hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>Configurar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
