/**
 * Base de Dados de Imóveis - Somma Imóveis (Ibirité, Sarzedo, Contagem e Região Metropolitana de BH)
 * Dados estruturados preservando códigos reais, valores e localizações auditadas no site oficial.
 */

const PROPERTIES_DATA = [
  {
    id: "4170075",
    code: "SMA310",
    title: "Apartamento com 2 Quartos no Novo Eldorado",
    slug: "apartamento-venda-contagem-mg-novo-eldorado",
    purpose: "venda", // "venda" | "locacao"
    type: "apartamento", // "apartamento" | "casa" | "cobertura" | "comercial" | "terreno"
    city: "Contagem",
    neighborhood: "Novo Eldorado",
    address: "Rua das Paineiras, Novo Eldorado - Contagem / MG",
    price: 280000,
    condoFee: 180,
    iptu: 45,
    area: 65,
    bedrooms: 2,
    suites: 0,
    bathrooms: 1,
    parkingSpots: 2,
    featured: true,
    tags: ["Oportunidade", "Aceita Financiamento"],
    description: "Excelente apartamento à venda com 2 quartos amplos, localizado no coração do bairro Novo Eldorado, Contagem. Imóvel residencial arejado, sol da manhã, piso em porcelanato polido, sala para dois ambientes com sanca de gesso e iluminação em LED. Cozinha americana planejada com armários sob medida e bancada em granito. Banheiro social modernizado com box blindex. Condomínio seguro e tranquilo, com 2 vagas de garagem demarcadas e portão eletrônico. Próximo à estação do metrô Eldorado, Avenida João César de Oliveira, bancos, supermercados e comércio completo.",
    features: [
      "2 Quartos amplos",
      "2 Vagas demarcadas",
      "Piso em Porcelanato",
      "Armários planejados na cozinha",
      "Bancada em Granito",
      "Iluminação em LED",
      "Box Blindex",
      "Portão Eletrônico",
      "Interfone",
      "Aceita FGTS e Financiamento Caixa"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "4255966",
    code: "SMC150",
    title: "Linda Casa 3 Quartos com Suíte no Serra Dourada",
    slug: "casa-venda-ibirite-mg-serra-dourada-parque-durval-de-barros",
    purpose: "venda",
    type: "casa",
    city: "Ibirité",
    neighborhood: "Serra Dourada",
    address: "Serra Dourada (Parque Durval de Barros) - Ibirité / MG",
    price: 350000,
    condoFee: 0,
    iptu: 30,
    area: 98,
    bedrooms: 3,
    suites: 1,
    bathrooms: 3,
    parkingSpots: 2,
    featured: true,
    tags: ["CASA NOVA", "Pronto para Morar"],
    description: "Sejam bem-vindos à Somma Imóveis! É com enorme satisfação que apresentamos esta magnífica casa independente no bairro Serra Dourada (região do Parque Durval de Barros). Construção de alto padrão construtivo, composta por 3 quartos generosos (sendo 1 suíte confortável), sala espaçosa para 2 ambientes com rebaixamento de teto, cozinha estilo conceito aberto com revestimentos retificados até o teto, quintal privativo nos fundos ideal para espaço gourmet com churrasqueira, e garagem para 2 carros. Localização nobre em Ibirité com rápido acesso ao Barreiro e Contagem.",
    features: [
      "3 Quartos sendo 1 Suíte",
      "Quintal privativo para Área Gourmet",
      "Garagem para 2 Veículos",
      "Entrada Independente",
      "Rebaixamento em Gesso",
      "Fachada Moderna com Textura e Detalhes",
      "Esquadrias em Alumínio",
      "Documentação 100% Regular",
      "Pronta para Morar"
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "3206011",
    code: "SMC144",
    title: "Casa Moderna 3 Dormitórios no Masterville",
    slug: "casa-venda-sarzedo-mg-masterville",
    purpose: "venda",
    type: "casa",
    city: "Sarzedo",
    neighborhood: "Masterville",
    address: "Bairro Masterville - Sarzedo / MG",
    price: 330000,
    condoFee: 0,
    iptu: 25,
    area: 85,
    bedrooms: 3,
    suites: 0,
    bathrooms: 2,
    parkingSpots: 1,
    featured: true,
    tags: ["Oportunidade", "CASA NOVA"],
    description: "Belíssima residência térrea novinha à venda no desejado bairro Masterville em Sarzedo/MG. Imóvel com projeto funcional e acabamento impecável: 3 dormitórios bem arejados, 2 banheiros completos com nicho esculpido, ampla sala integrada à copa e cozinha, área de serviço separada e coberta, além de espaço livre nos fundos para seu lazer ou pet. O bairro Masterville é um dos mais valorizados de Sarzedo, com praças, comércio, linhas de ônibus e fácil acesso à MG-040.",
    features: [
      "3 Dormitórios",
      "2 Banheiros com Nicho",
      "Sala ampla para 2 Ambientes",
      "Área de Serviço Coberta",
      "Área Privativa nos Fundos",
      "Bancadas em Granito São Gabriel",
      "Piso Porcelanato",
      "Financiamento Caixa e Bancos Privados"
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "2813121",
    code: "SM125",
    title: "Excelente Casa Duplex de Alto Padrão no Masterville",
    slug: "casa-duplex-venda-sarzedo-mg-masterville",
    purpose: "venda",
    type: "casa",
    city: "Sarzedo",
    neighborhood: "Masterville",
    address: "Rua das Acácias, Bairro Masterville - Sarzedo / MG",
    price: 530000,
    condoFee: 0,
    iptu: 35,
    area: 125,
    bedrooms: 3,
    suites: 1,
    bathrooms: 3,
    parkingSpots: 2,
    featured: true,
    tags: ["Pronto para Morar", "CASA NOVA", "Destaque"],
    description: "Excelente Casa Duplex em Sarzedo no bairro Masterville. Imóvel diferenciado com arquitetura contemporânea, pé direito imponente, 3 quartos sendo 1 suíte máster com sacada panorâmica privativa. Sala ampla e iluminada para dois ambientes com piso retificado de grande formato, lavabo social no térreo, cozinha moderna planejada para ilha gourmet. Espaço externo espetacular para recepção de amigos com pré-disposição para churrasqueira e hidromassagem. 2 vagas de garagem confortáveis.",
    features: [
      "Casa Duplex com Sacada",
      "3 Quartos (1 Suíte Master)",
      "Lavabo Social + 2 Banheiros",
      "Pé Direito Alto",
      "Quintal Gourmet Espaçoso",
      "Piso Retificado Grande Formato",
      "2 Vagas Paralelas",
      "Aceita Financiamento e Carta de Crédito"
    ],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "3125640",
    code: "SMC138",
    title: "Casa Térrea Sofisticada com Área Gourmet no Masterville",
    slug: "casa-luxo-venda-sarzedo-mg-masterville",
    purpose: "venda",
    type: "casa",
    city: "Sarzedo",
    neighborhood: "Masterville",
    address: "Alameda dos Bosques, Masterville - Sarzedo / MG",
    price: 550000,
    condoFee: 0,
    iptu: 40,
    area: 140,
    bedrooms: 3,
    suites: 1,
    bathrooms: 3,
    parkingSpots: 2,
    featured: true,
    tags: ["Pronto para Morar", "Destaque"],
    description: "Se você busca por um lar que una conforto, sofisticação e praticidade, esta casa em Masterville é a escolha perfeita. Casa individual com acabamentos nobres, 3 quartos sendo uma suíte com closet, sala ampla com teto decorado em gesso e iluminação zenital. Cozinha com bancadas em silestone, área gourmet montada com churrasqueira em alvenaria e ducha fria. Garagem para 2 veículos e paisagismo na entrada.",
    features: [
      "Suíte com Closet",
      "Área Gourmet com Churrasqueira",
      "Bancadas em Granito Nobre",
      "Ducha externa",
      "Paisagismo Completo",
      "Janelas Venezianas em Alumínio Preto",
      "Infraestrutura para Ar Condicionado",
      "2 Vagas Cobertas"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "3182241",
    code: "SMC143",
    title: "Casa Charmosa 3 Quartos no Santo Antônio",
    slug: "casa-venda-sarzedo-mg-santo-antonio",
    purpose: "venda",
    type: "casa",
    city: "Sarzedo",
    neighborhood: "Santo Antônio",
    address: "Bairro Santo Antônio - Sarzedo / MG",
    price: 230000,
    condoFee: 0,
    iptu: 18,
    area: 70,
    bedrooms: 3,
    suites: 0,
    bathrooms: 1,
    parkingSpots: 2,
    featured: false,
    tags: ["Oportunidade", "Minha Casa Minha Vida"],
    description: "Se você está à procura de um lugar acolhedor para chamar de seu por um valor que cabe no bolso, esta casa no bairro Santo Antônio em Sarzedo/MG é a oportunidade que você esperava! Com 3 dormitórios arejados, sala de estar agradável, cozinha funcional, banheiro revestido até o teto e ampla garagem para 2 carros. Bairro consolidado com escolas, transporte e postos de saúde.",
    features: [
      "3 Dormitórios",
      "2 Vagas de Garagem",
      "Enquadra no Programa Minha Casa Minha Vida",
      "Subsídio do Governo Federal",
      "Utilize seu saldo de FGTS",
      "Próximo ao Comércio e Ponto de Ônibus"
    ],
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "3825592",
    code: "SMA158",
    title: "Apartamento 2 Quartos no Bairro Canaã 1ª Seção",
    slug: "apartamento-venda-ibirite-mg-canaa-1a-secao",
    purpose: "venda",
    type: "apartamento",
    city: "Ibirité",
    neighborhood: "Canaã",
    address: "Bairro Canaã - 1ª Seção, Ibirité / MG",
    price: 220000,
    condoFee: 120,
    iptu: 20,
    area: 55,
    bedrooms: 2,
    suites: 0,
    bathrooms: 1,
    parkingSpots: 1,
    featured: false,
    tags: ["Aceita FGTS", "Oportunidade"],
    description: "Apartamento novinho para Venda no bairro Canaã - 1ª Seção, localizado no município de Ibirité / MG. Conta com 2 dormitórios ventilados, sala confortável, cozinha com área de serviço conjugada, banheiro social com ventilação natural e 1 vaga de estacionamento. Condomínio com água individualizada, interfone e portão automático.",
    features: [
      "2 Quartos",
      "1 Vaga de Garagem",
      "Água Individualizada",
      "Interfone e Portão Eletrônico",
      "Taxa de Condomínio Baixa",
      "Ponto de Ônibus na Porta"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2da97ba5?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "2813365",
    code: "SM126",
    title: "Excelente Imóvel de Investimento no Petrolina",
    slug: "casa-venda-ibirite-mg-petrolina-parque-durval-de-barros",
    purpose: "venda",
    type: "casa",
    city: "Ibirité",
    neighborhood: "Petrolina",
    address: "Petrolina (Parque Durval de Barros) - Ibirité / MG",
    price: 750000,
    condoFee: 0,
    iptu: 60,
    area: 210,
    bedrooms: 4,
    suites: 1,
    bathrooms: 3,
    parkingSpots: 3,
    featured: true,
    tags: ["Oportunidade", "Investimento"],
    description: "Ótimo imóvel de investimento no bairro Petrolina (Parque Durval de Barros)! Casa espaçosa em lote de 360m² com 4 dormitórios amplos sendo 1 com suíte, 2 salas de estar independentes, varanda colonial circundando a fachada, copa/cozinha generosa, área de lavanderia independente e quintal com árvores frutíferas. Além disso, possui estrutura para segundo pavimento e 3 vagas de garagem cobertas.",
    features: [
      "Lote de 360m²",
      "4 Quartos (1 Suíte)",
      "3 Vagas de Garagem Cobertas",
      "Varanda Colonial",
      "Quintal Amplo com Pomar",
      "Estrutura para Expansão",
      "Região Comercial Consolidada"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "4398188",
    code: "SMA040",
    title: "Apartamento 1ª Locação no Residencial Lajinha",
    slug: "apartamento-locacao-ibirite-mg-residencial-lajinha",
    purpose: "locacao",
    type: "apartamento",
    city: "Ibirité",
    neighborhood: "Lajinha",
    address: "Residencial Lajinha (Parque Durval de Barros) - Ibirité / MG",
    price: 1200,
    condoFee: 150,
    iptu: 25,
    area: 58,
    bedrooms: 2,
    suites: 0,
    bathrooms: 1,
    parkingSpots: 1,
    featured: true,
    tags: ["1ª Locação", "Pronto para Morar"],
    description: "Lindo Apartamento 1ª Locação no Bairro Lajinha (região do Parque Durval de Barros). Se você busca o privilégio de estrear um imóvel impecável com fino acabamento, venha conhecer esta unidade! 2 dormitórios claros, sala para 2 ambientes, cozinha com bancada de granito e lavanderia anexa, banheiro social e 1 vaga de estacionamento. Prédio com fachada pastilhada e interfone.",
    features: [
      "1ª Locação (Nunca Habitado)",
      "2 Dormitórios",
      "1 Vaga de Garagem",
      "Fachada Pastilhada",
      "Bancada em Granito",
      "Locação sem Burocracia com a Somma Imóveis"
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "3990850",
    code: "SML305",
    title: "Apartamento Ville Park Imperial no Barreirinho",
    slug: "apartamento-locacao-ibirite-mg-barreirinho",
    purpose: "locacao",
    type: "apartamento",
    city: "Ibirité",
    neighborhood: "Barreirinho",
    address: "Condomínio Ville Park Imperial, Barreirinho - Ibirité / MG",
    price: 750,
    condoFee: 190,
    iptu: 15,
    area: 48,
    bedrooms: 2,
    suites: 0,
    bathrooms: 1,
    parkingSpots: 1,
    featured: false,
    tags: ["Oportunidade", "Lazer Completo"],
    description: "Excelente oportunidade para locação em Ibirité! Apartamento no residencial Ville Park Imperial, bairro Barreirinho. 2 quartos, sala com cortineiro, cozinha americana com passa-prato, banheiro com box blindex. O condomínio oferece lazer seguro com playground infantil, salão de festas, espaço gourmet com churrasqueira e portaria monitorada 24 horas. Ótimo custo-benefício!",
    features: [
      "Portaria 24 Horas",
      "Salão de Festas e Espaço Gourmet",
      "Playground Infantil",
      "Box Blindex",
      "1 Vaga Demarcada",
      "Câmeras de Segurança"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "4366561",
    code: "SMA035",
    title: "Apartamento 2 Quartos para Locação no Lajinha",
    slug: "apartamento-2-quartos-locacao-ibirite-mg-lajinha",
    purpose: "locacao",
    type: "apartamento",
    city: "Ibirité",
    neighborhood: "Lajinha",
    address: "Lajinha (Parque Durval de Barros) - Ibirité / MG",
    price: 1200,
    condoFee: 140,
    iptu: 20,
    area: 56,
    bedrooms: 2,
    suites: 0,
    bathrooms: 1,
    parkingSpots: 1,
    featured: false,
    tags: ["Ótima Localização"],
    description: "Apartamento para locação no bairro Lajinha em Ibirité. Dois quartos arejados, sala ampla, cozinha com armário inferior, banheiro equipado com espelho e box de vidro. Vaga de garagem privativa. Próximo a padarias, farmácias e linhas diretas de ônibus para a Estação Diamante e Belo Horizonte.",
    features: [
      "2 Quartos",
      "Armário na Cozinha",
      "Box e Espelho no Banheiro",
      "1 Vaga de Garagem",
      "Fácil Acesso à Estação Diamante"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2da97ba5?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "5109281",
    code: "SMC202",
    title: "Casa em Condomínio Fechado com Piscina e Área Gourmet",
    slug: "casa-condominio-venda-ibirite-mg",
    purpose: "venda",
    type: "condominio",
    city: "Ibirité",
    neighborhood: "Centro",
    address: "Condomínio Residencial das Palmeiras, Centro - Ibirité / MG",
    price: 890000,
    condoFee: 420,
    iptu: 85,
    area: 240,
    bedrooms: 4,
    suites: 2,
    bathrooms: 4,
    parkingSpots: 3,
    featured: true,
    tags: ["Alto Padrão", "Condomínio Fechado"],
    description: "Espetacular casa em condomínio fechado de alto padrão em Ibirité. Viva com máxima segurança e privacidade! Residência ampla com 4 quartos (2 suítes com closet), sala com pé direito duplo, cozinha gourmet integrada com ilha central e coifa. Quintal privativo com piscina aquecida por energia solar, cascata e churrasqueira a carvão. Acabamentos premium em mármore travertino e porcelanatos nobres.",
    features: [
      "Condomínio Fechado com Portaria Armada 24h",
      "Piscina Aquecida Privativa",
      "Área Gourmet Completa com Churrasqueira",
      "4 Quartos com 2 Suítes",
      "3 Vagas de Garagem",
      "Energia Solar",
      "Pé Direito Duplo",
      "Segurança e Monitoramento 24h"
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

// Dados institucionais oficiais
const SOMMA_INFO = {
  name: "Somma Imóveis",
  legalName: "Somma Imóveis Ibirité LTDA",
  creci: "38647",
  creciState: "MG",
  phoneDisplay: "(31) 31572-299",
  phoneRaw: "3131572299",
  whatsappDisplay: "(31) 98810-5868",
  whatsappNumber: "5531988105868",
  email: "sommaimoveisc@gmail.com",
  address: "Avenida São Paulo, 977, Loja 02, Bairro Nascimento",
  city: "Ibirité",
  state: "MG",
  cep: "32400-570",
  hours: "Segunda a Sexta: 08:30 às 17:30 | Sábados: sob agendamento",
  citiesCovered: ["Ibirité", "Sarzedo", "Contagem", "Belo Horizonte", "Esmeraldas"],
  banks: [
    { name: "Caixa Econômica Federal", partner: "Correspondente Caixa Aqui", logo: "🏦 Caixa", interest: "Minha Casa Minha Vida & SBPE" },
    { name: "Banco do Brasil", partner: "Correspondente BB", logo: "🏛️ BB", interest: "Crédito Imobiliário Ágil" },
    { name: "Itaú", partner: "Parceiro Oficial", logo: "🟧 Itaú", interest: "Financiamento em até 360 meses" },
    { name: "Santander", partner: "Parceiro Oficial", logo: "🔴 Santander", interest: "Taxas Competitivas e Composição de Renda" },
    { name: "Bradesco", partner: "Parceiro Oficial", logo: "🟥 Bradesco", interest: "Agilidade na emissão do contrato" }
  ]
};

// Funções Utilitárias para Busca e Formatação
function formatCurrency(val) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
}

function getPropertyById(id) {
  return PROPERTIES_DATA.find(p => p.id === String(id) || p.code.toLowerCase() === String(id).toLowerCase());
}

function getFeaturedProperties() {
  return PROPERTIES_DATA.filter(p => p.featured);
}

function filterProperties({ purpose, type, city, neighborhood, minPrice, maxPrice, bedrooms, bathrooms, parkingSpots, searchCode }) {
  return PROPERTIES_DATA.filter(p => {
    if (purpose && purpose !== "todos" && p.purpose !== purpose) return false;
    if (type && type !== "todos" && p.type !== type) return false;
    if (city && city !== "todas" && p.city.toLowerCase() !== city.toLowerCase()) return false;
    if (neighborhood && neighborhood !== "todos" && !p.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())) return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    if (bedrooms && bedrooms !== "todos" && p.bedrooms < Number(bedrooms)) return false;
    if (bathrooms && bathrooms !== "todos" && p.bathrooms < Number(bathrooms)) return false;
    if (parkingSpots && parkingSpots !== "todos" && p.parkingSpots < Number(parkingSpots)) return false;
    if (searchCode && searchCode.trim() !== "") {
      const q = searchCode.trim().toLowerCase().replace("#", "");
      const matchCode = p.code.toLowerCase().includes(q);
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchNeigh = p.neighborhood.toLowerCase().includes(q);
      const matchCity = p.city.toLowerCase().includes(q);
      if (!matchCode && !matchTitle && !matchNeigh && !matchCity) return false;
    }
    return true;
  });
}

if (typeof window !== 'undefined') {
  window.PROPERTIES_DATA = PROPERTIES_DATA;
  window.SOMMA_INFO = SOMMA_INFO;
  window.formatCurrency = formatCurrency;
  window.getPropertyById = getPropertyById;
  window.getFeaturedProperties = getFeaturedProperties;
  window.filterProperties = filterProperties;
}

