import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Layers,
  CheckCircle2,
  Tag
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
    <section id="catalogo" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-50 border border-brand-200 px-3 py-1 rounded-full inline-block mb-3">
              Tecelagens Disponíveis
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Catálogo de tipos de tecido e tecelagem
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Conheça as opções técnicas de tecelagem: Tafetá, Tafetá Gold, Dupla Densidade, Super Batido e Alta Definição.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por tecido..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-slate-900"
            />
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-surface-200">
          {CATEGORY_TABS.map(tab => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-surface-100 hover:bg-surface-200 text-slate-700'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-surface-50 rounded-2xl border border-slate-200">
            <p className="text-slate-600 text-base">Nenhum produto encontrado para "{searchTerm}".</p>
            <button
              type="button"
              onClick={() => { setSearchTerm(''); setSelectedCategory('todas'); }}
              className="mt-3 text-brand font-bold text-sm hover:underline"
            >
              Limpar filtros e ver todos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill Badge */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-slate-200">
                    {product.categoryLabel}
                  </span>

                  {product.popular && (
                    <span className="absolute top-3 right-3 bg-brand text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                      Destaque
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-brand transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-brand font-semibold mt-1">
                      {product.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      {product.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onViewProductDetails(product)}
                        className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors text-center"
                      >
                        Ver Detalhes
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectProductToCustomize(product)}
                        className="py-2.5 px-3 rounded-xl bg-brand hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5"
                      >
                        <span>Personalizar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
