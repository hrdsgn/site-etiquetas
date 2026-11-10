import { Product, GalleryItem, FAQItem } from '../types';

export const PRODUCTS: Product[] = [
  // --- TAFETÁ ---
  {
    id: 'tafeta-padrao',
    name: 'Etiqueta Tafetá Clássica',
    category: 'tafeta',
    categoryLabel: 'Tafetá',
    tagline: 'Versatilidade e durabilidade com ótimo custo-benefício',
    description: 'Tecelagem Tafetá clássica em tear de fios entrelaçados, versátil e com excelente durabilidade mecânica. Ideal para confecções de médio e grande porte que precisam de um produto padronizado a preço competitivo.',
    features: [
      'Tecelagem clássica com pontos visíveis de tear',
      'Custo por unidade reduzido para grandes tiragens',
      'Resistência comprovada a lavagens industriais',
      'Compatível com corte reto, dobra meio, pontas e rolo'
    ],
    popular: false,
    defaultFabric: 'tafeta',
    defaultCut: 'dobra_meio',
    idealFor: ['Uniformes profissionais', 'Confecção em escala', 'Moda básica', 'Camisetas promocionais']
  },
  {
    id: 'tafeta-gold',
    name: 'Etiqueta Tafetá Gold',
    category: 'tafeta_gold',
    categoryLabel: 'Tafetá Gold',
    tagline: 'Acabamento premium com brilho acetinado e toque macio',
    description: 'Versão nobre do Tafetá com fios selecionados de acabamento acetinado. Proporciona maior definição nos traços do logotipo e toque sedoso na pele, perfeita para marcas autorais e coleções casuais.',
    features: [
      'Acabamento Gold com brilho sutil de fita',
      'Toque macio que não irrita a pele na gola',
      'Excelente definição de tipografia e detalhes',
      'Resistente a vincos e lavagens frequentes'
    ],
    popular: true,
    defaultFabric: 'tafeta_gold',
    defaultCut: 'dobra_meio',
    idealFor: ['Moda casual', 'Streetwear', 'Moda feminina', 'Marcas autorais de vestuário']
  },
  // --- DUPLA DENSIDADE ---
  {
    id: 'dupla-densidade',
    name: 'Etiqueta Dupla Densidade',
    category: 'dupla_densidade',
    categoryLabel: 'Dupla Densidade',
    tagline: 'Metade Alta Definição e metade Tafetá (meio a meio inteligente)',
    description: 'Tecelagem híbrida revolucionária: a metade superior do tear opera em Alta Definição com pontos densos para destacar seu logotipo, enquanto a metade inferior opera em Tafetá para as informações de tamanho e composição com máxima economia.',
    features: [
      'Logotipo superior com máxima nitidez em Alta Definição',
      'Base inferior em Tafetá para composição e tamanho',
      'Transição perfeita e contínua no mesmo tecido',
      'Melhor relação custo-benefício para etiquetas de gola completas'
    ],
    popular: true,
    defaultFabric: 'dupla_densidade',
    defaultCut: 'dobra_meio',
    idealFor: ['Golas completas com tamanho e composição', 'Coleções de moda', 'Marcas em expansão']
  },
  // --- SUPER BATIDO ---
  {
    id: 'super-batido',
    name: 'Etiqueta Super Batido',
    category: 'super_batido',
    categoryLabel: 'Super Batido',
    tagline: 'A maior densidade possível — trama ultra compacta e encorpada',
    description: 'A tecelagem de maior compressão e firmeza do mercado. O tear trabalha com batida reforçada de fios, gerando uma etiqueta encorpada, pesada e estruturada, imbatível para jeanswear, jaquetas e calçados.',
    features: [
      'Máxima densidade de batida do tear por centímetro',
      'Estrutura firme e encorpada sem deformações',
      'Ultra resistente a estonagem, stone wash e lavanderia pesada',
      'Corte a laser ou só cortada com bordas firmes'
    ],
    popular: false,
    defaultFabric: 'super_batido',
    defaultCut: 'so_cortada',
    idealFor: ['Jeanswear', 'Bolsas e mochilas', 'Calçados', 'Jaquetas e bermudas de sarja']
  },
  // --- ALTA DEFINIÇÃO ---
  {
    id: 'alta-definicao',
    name: 'Etiqueta Alta Definição',
    category: 'alta_definicao',
    categoryLabel: 'Alta Definição',
    tagline: 'Fios ultrafinos com resolução máxima de logotipo e textos',
    description: 'O padrão internacional de alta costura e alfaiataria. Produzida em teares de última geração com fios 50 denier de alta densidade. Reproduz letras minúsculas, monogramas complexos e traços delicados com precisão cirúrgica.',
    features: [
      'Fios ultrafinos 50 denier de máxima resolução',
      'Toque aveludado acetinado que não pinica',
      'Fidelidade extrema de monogramas e ilustrações',
      'Cores vibrantes que não desbotam com o tempo'
    ],
    popular: true,
    defaultFabric: 'alta_definicao',
    defaultCut: 'dobra_meio',
    idealFor: ['Alta costura', 'Alfaiataria fina', 'Marcas premium de luxo', 'Camisaria nobre']
  },
  // --- TERMOCOLANTE ---
  {
    id: 'termocolante-laser',
    name: 'Etiqueta Termocolante (Sem Costura)',
    category: 'termocolante',
    categoryLabel: 'Termocolante',
    tagline: 'Fixação térmica definitiva com ferro ou prensa',
    description: 'Etiqueta tecida que recebe película de resina termoplástica de adesão definitiva no verso. Fixa em algodão, malhas e sintéticos em 15 segundos a 160°C, dispensando máquinas de costura.',
    features: [
      'Aplicação instantânea com ferro comum ou prensa térmica',
      'Fixação permanente resistente a lavagens em máquina',
      'Acabamento a laser com bordas macias e seladas',
      'Disponível em qualquer uma das nossas 5 tecelagens'
    ],
    popular: false,
    defaultFabric: 'tafeta_gold',
    defaultCut: 'laser',
    idealFor: ['Moda infantil', 'Moda fitness / esportiva', 'Enxovais', 'Uniformes de identificação']
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Etiqueta de Gola Streetwear Dobra Meio',
    segment: 'Streetwear',
    fabric: 'Tafetá Gold',
    cut: 'Dobra Meio',
    description: 'Etiqueta medindo 25x70mm em Tafetá Gold, toque aveludado na gola e dobra central perfeita com margem de 7mm.',
    accentColor: '#DC2626'
  },
  {
    id: 'gal-2',
    title: 'Etiqueta Alfaiataria Sartorial Milano',
    segment: 'Alta Costura',
    fabric: 'Alta Definição',
    cut: 'Manhattan',
    description: 'Etiqueta em fios ultrafinos 50 denier, com dobra estilo Manhattan para barra externa de paletós e blazers.',
    accentColor: '#0F172A'
  },
  {
    id: 'gal-3',
    title: 'Etiqueta Pontas Dobradas para Camisaria',
    segment: 'Beachwear & Casual',
    fabric: 'Tafetá',
    cut: 'Pontas',
    description: 'Acabamento em abas viradas para trás (End Fold), costura limpa nas laterais sem precisar abrir a costura principal.',
    accentColor: '#E11D48'
  },
  {
    id: 'gal-4',
    title: 'Etiqueta Jeanswear Denim Super Batido',
    segment: 'Jeanswear',
    fabric: 'Super Batido',
    cut: 'Só Cortada',
    description: 'Trama de altíssima compactação com resistência comprovada a processos agressivos de estonagem e lavanderia industrial.',
    accentColor: '#1E3A8A'
  },
  {
    id: 'gal-5',
    title: 'Etiqueta Híbrida Dupla Densidade (Gola + Tamanho)',
    segment: 'Slow Fashion',
    fabric: 'Dupla Densidade',
    cut: 'Dobra Meio',
    description: '50% superior em Alta Definição para nitidez do nome da marca e 50% inferior em Tafetá econômico para tamanho e cuidados.',
    accentColor: '#15803D'
  },
  {
    id: 'gal-6',
    title: 'Etiqueta Macia Infantil com Corte a Laser',
    segment: 'Moda Infantil',
    fabric: 'Tafetá Gold',
    cut: 'Laser',
    description: 'Bordas ultrassônicas seladas sem rebarbas para garantir zero atrito e toque antialérgico na pele infantil.',
    accentColor: '#EC4899'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'producao',
    question: 'Quais tipos de tecido estão disponíveis?',
    answer: 'Trabalhamos com cinco tipos de tecelagem: Tafetá (clássico e versátil), Tafetá Gold (acabamento premium), Dupla Densidade (metade Alta Definição e metade Tafetá), Super Batido (denso e encorpado) e Alta Definição (máxima resolução de detalhes). Cada tipo é indicado para diferentes aplicações e orçamentos.'
  },
  {
    category: 'producao',
    question: 'Há quantidade mínima de etiquetas?',
    answer: 'Não exigimos quantidade mínima bloqueante! Você pode solicitar qualquer tiragem desejada no configurador. Lotes maiores contam com descontos progressivos por escala.'
  },
  {
    category: 'arquivos',
    question: 'Como funciona a aprovação do layout?',
    answer: 'Você cria sua arte diretamente no nosso configurador online, visualiza a prévia e a simulação de tear e envia o pedido para a equipe. Nossa equipe analisa os fios e a tecelagem e retorna com a prova digital oficial para validação. Você só efetua o pagamento após aprovar 100% o layout e o valor definitivo.'
  },
  {
    category: 'producao',
    question: 'Quais tipos de corte e acabamento estão disponíveis?',
    answer: 'Oferecemos os seguintes cortes e acabamentos: Dobra Meio (para gola e costuras embutidas), Pontas (pontas dobradas para costura reta), Só Cortada (sem dobras), Meio e Pontas (combinação), Rolo (entrega em rolo contínuo), Laser (corte a laser com bordas seladas), Manhattan (acabamento especial) e 2 Cortes (para composição dupla).'
  },
  {
    category: 'prazos',
    question: 'Qual o prazo de produção e entrega?',
    answer: 'O prazo de fabricação é informado após a aprovação da arte e varia de acordo com a complexidade e quantidade. Em geral, a produção leva de 5 a 10 dias úteis. O envio é feito para todo o Brasil via Correios ou transportadoras parceiras.'
  },
  {
    category: 'pagamento',
    question: 'Quando e como eu pago?',
    answer: 'O pagamento só é feito APÓS a aprovação da arte pela nossa equipe e pelo cliente. Primeiro você configura e envia o pedido, depois nossa equipe analisa e aprova, então o orçamento definitivo é informado e o pagamento é liberado.'
  }
];
