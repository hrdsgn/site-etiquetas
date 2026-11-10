import React, { useState } from 'react';
import { Layers, Scissors, Flame, Check, HelpCircle, Sparkles } from 'lucide-react';
import { CUT_OPTIONS } from '../data/adminConfig';

const FOLD_DETAILS = [
  {
    id: 'dobra_meio',
    title: 'Dobra Meio',
    subtitle: 'O modelo clássico para gola e costura embutida',
    desc: 'A etiqueta é dobrada exatamente ao meio, formando duas faces (frente com a marca e verso com informações adicionais). As pontas abertas são embutidas e costuradas na junção da gola ou lateral da peça.',
    recommendedFor: 'Camisetas, polos, moletons, vestidos e laterais de peças.',
    seamMargin: 'Requer de 5mm a 7mm de margem superior para costura.',
    badge: 'Mais Utilizada',
  },
  {
    id: 'pontas',
    title: 'Pontas',
    subtitle: 'Abas laterais dobradas para trás (End Fold)',
    desc: 'As pontas laterais são viradas para trás em cerca de 5mm. A costura reta é feita diretamente sobre as dobras, dispensando a abertura da costura da gola.',
    recommendedFor: 'Camisas sociais, forros de blazers, alfaiataria e moda praia.',
    seamMargin: 'Dobra embutida de 5mm em cada extremidade.',
    badge: 'Prático & Seguro',
  },
  {
    id: 'so_cortada',
    title: 'Só Cortada',
    subtitle: 'Etiqueta plana sem dobras',
    desc: 'Entregue individualmente sem dobras prévias. Indicada para costura pespontada em todo o contorno ou para confecções que realizam a dobra no próprio processo fabril.',
    recommendedFor: 'Barras externas, bolsos jeans, jaquetas e composição interna.',
    seamMargin: 'Requer margem de costura em todo o perímetro.',
    badge: 'Versátil',
  },
  {
    id: 'meio_e_pontas',
    title: 'Meio e Pontas',
    subtitle: 'Combinação de dobra ao meio com pontas viradas',
    desc: 'Reúne a dobra central com o acabamento de pontas dobradas, conferindo maior estrutura e acabamento nobre nas bordas.',
    recommendedFor: 'Peças premium, camisaria de alto padrão e alfaiataria.',
    seamMargin: 'Margem combinada conforme gabarito técnico.',
    badge: 'Premium',
  },
  {
    id: 'rolo',
    title: 'Rolo',
    subtitle: 'Fita contínua em carretel (sem dobra ou corte)',
    desc: 'As etiquetas são produzidas e entregues em rolo contínuo, sem dobras ou cortes intermediários, ideais para corte direto na linha de produção da confecção.',
    recommendedFor: 'Grandes confecções e processos automatizados com alimentador de fita contínua.',
    seamMargin: 'Produção contínua corrida sem corte ou dobra prévia.',
    badge: 'Produção Contínua',
  },
  {
    id: 'manhattan',
    title: 'Manhattan',
    subtitle: 'Dobra especial estilo Manhattan Fold',
    desc: 'Dobra diferenciada similar à dobra central, com dobra superior invertida, muito utilizada para aplicação aparente em barras ou mangas.',
    recommendedFor: 'Streetwear, barras de camisetas oversized e acessórios de moda.',
    seamMargin: 'Margem superior de encaixe.',
    badge: 'Estilo Urbano',
  },
];

export const FoldTypesGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="dobras" className="py-16 sm:py-20 bg-surface-50 border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-50 border border-brand-200 px-3 py-1 rounded-full inline-block mb-3">
            Guia Técnico de Acabamento
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tipos de corte e acabamento disponíveis
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            O corte e a dobra definem como a etiqueta será costurada ou aplicada na peça. Conheça as 6 opções disponíveis na nossa tecelagem:
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Buttons Navigation */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {FOLD_DETAILS.map((fold, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={fold.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-brand bg-white shadow-md ring-1 ring-brand'
                      : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-slate-900 text-sm">
                      {fold.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {fold.subtitle}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                      isSelected ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {fold.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Display Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Especificação Técnica
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {FOLD_DETAILS[activeTab].title}
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface-100 text-slate-700">
                {FOLD_DETAILS[activeTab].badge}
              </span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {FOLD_DETAILS[activeTab].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-surface-50 p-4 rounded-xl border border-surface-200 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Aplicações Recomendadas:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  {FOLD_DETAILS[activeTab].recommendedFor}
                </p>
              </div>

              <div className="bg-surface-50 p-4 rounded-xl border border-surface-200 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Margem de Costura / Sangria:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  {FOLD_DETAILS[activeTab].seamMargin}
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                Tem dúvida sobre o melhor acabamento para a sua peça? Ao enviar o pedido, nossos especialistas revisam e indicam a opção ideal na prova digital.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
