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
      'Compatível com corte reto, dobra meio e rolo'
    ],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
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
    description: 'O padrão internacional de alta costura e alfaiataria. Produzida em teares suíços de última geração com fios 50 denier de alta densidade. Reproduz letras minúsculas, monogramas complexos e traços delicados com precisão cirúrgica.',
    features: [
      'Fios ultrafinos 50 denier de máxima resolução',
      'Toque aveludado acetinado com toque zero',
      'Fidelidade extrema de monogramas e ilustrações',
      'Cores vibrantes que não desbotam com o tempo'
    ],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
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
    description: 'Etiqueta tecida de alta definição que recebe película de resina termoplástica de adesão definitiva no verso. Fixa em algodão, malhas e sintéticos em 15 segundos a 160°C, dispensando máquinas de costura.',
    features: [
      'Aplicação instantânea com ferro comum ou prensa térmica',
      'Fixação permanente resistente a lavagens em máquina',
      'Acabamento a laser com bordas macias e seladas',
      'Disponível em qualquer uma das nossas 5 tecelagens'
    ],
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80',
    accentColor: '#DC2626'
  },
  {
    id: 'gal-2',
    title: 'Etiqueta Alfaiataria Sartorial Milano',
    segment: 'Alta Costura',
    fabric: 'Alta Definição',
    cut: 'Manhattan',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0F172A'
  },
  {
    id: 'gal-3',
    title: 'Etiqueta Pontas Dobradas para Camisaria',
    segment: 'Beachwear',
    fabric: 'Tafetá',
    cut: 'Pontas',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
    accentColor: '#E11D48'
  },
  {
    id: 'gal-4',
    title: 'Etiqueta Jeanswear Denim Super Batido',
    segment: 'Jeanswear',
    fabric: 'Super Batido',
    cut: 'Só Cortada',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    accentColor: '#1E3A8A'
  },
  {
    id: 'gal-5',
    title: 'Etiqueta Híbrida Dupla Densidade (Gola + Tamanho)',
    segment: 'Slow Fashion',
    fabric: 'Dupla Densidade',
    cut: 'Dobra Meio',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    accentColor: '#15803D'
  },
  {
    id: 'gal-6',
    title: 'Etiqueta Macia Infantil com Corte a Laser',
    segment: 'Moda Infantil',
    fabric: 'Tafetá Gold',
    cut: 'Laser',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
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
    question: 'Qual é a quantidade mínima de etiquetas por pedido?',
    answer: 'A quantidade mínima varia de acordo com a largura da etiqueta. Para larguras até 25mm, o mínimo é de 100 unidades. Para larguras de 26mm a 40mm, o mínimo é de 200 unidades. Para larguras acima de 40mm, o mínimo é de 500 unidades.'
  },
  {
    category: 'arquivos',
    question: 'Como funciona o envio da arte e a aprovação?',
    answer: 'Você pode criar sua arte diretamente no nosso configurador online ou enviar um arquivo pronto em PDF ou SVG. Após o envio, nossa equipe analisa a arte e as configurações. Se necessário, solicitamos ajustes. Somente após a aprovação da arte é que o orçamento definitivo é informado e o pagamento é liberado. Você nunca paga antes de aprovar o layout.'
  },
  {
    category: 'arquivos',
    question: 'Quais formatos de arquivo são aceitos?',
    answer: 'Para envio de arte pronta, aceitamos arquivos nos formatos PDF e SVG. Se você tiver seu logotipo em outro formato, entre em contato pelo WhatsApp que nossa equipe pode ajudar na conversão.'
  },
  {
    category: 'prazos',
    question: 'Qual o prazo de produção e entrega?',
    answer: 'O prazo de fabricação é informado após a aprovação da arte e varia de acordo com a complexidade e quantidade. Em geral, a produção leva de 5 a 10 dias úteis. O envio é feito para todo o Brasil via Correios ou transportadoras parceiras.'
  },
  {
    category: 'pagamento',
    question: 'Quando e como eu pago?',
    answer: 'O pagamento só é feito APÓS a aprovação da arte pela nossa equipe e pelo cliente. Primeiro você configura e envia o pedido, depois nossa equipe analisa e aprova, então o orçamento definitivo é informado e o pagamento é liberado. As formas de pagamento e condições são informadas junto com o orçamento final.'
  },
  {
    category: 'producao',
    question: 'Quais tipos de corte e acabamento estão disponíveis?',
    answer: 'Oferecemos os seguintes cortes e acabamentos: Dobra Meio (para gola e costuras embutidas), Pontas (pontas dobradas para costura reta), Só Cortada (sem dobras), Meio e Pontas (combinação), Rolo (entrega em rolo contínuo), Laser (corte a laser com bordas seladas), Manhattan (acabamento especial) e 2 Cortes (para composição dupla).'
  }
];
