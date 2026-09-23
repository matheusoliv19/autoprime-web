/* =============================================
   AUTOPRIME - BANCO DE DADOS DE VEÍCULOS
   ============================================= */

const CARROS = [
  {
    id: 1,
    marca: "Toyota",
    modelo: "Corolla",
    versao: "XEi 2.0 Flex Automático",
    tipo: "Sedan",
    ano: 2024,
    km: 8500,
    preco: 142900,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Branco Pérola",
    potencia: "177 cv",
    motor: "2.0 Flex 16V",
    tracao: "Dianteira",
    portas: 4,
    destaque: true,
    novo: false,
    opcionais: [
      "Ar-condicionado digital dual zone",
      "Bancos em couro",
      "Teto solar panorâmico",
      "Central multimídia 9\"",
      "Apple CarPlay / Android Auto",
      "Câmera de ré 360°",
      "Controle de cruzeiro adaptativo",
      "Frenagem automática de emergência",
      "Sensor de ponto cego",
      "Piloto automático",
      "Rodas de liga leve 17\"",
      "Faróis full LED"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
    ],
    descricao: "Toyota Corolla XEi com pacote completo de segurança e conforto. Carro em excelente estado, único dono, revisões em concessionária autorizada."
  },
  {
    id: 2,
    marca: "Volkswagen",
    modelo: "T-Cross",
    versao: "Highline 1.4 TSI Automático",
    tipo: "SUV",
    ano: 2024,
    km: 12300,
    preco: 138500,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Cinza Platinum",
    potencia: "150 cv",
    motor: "1.4 TSI Flex 16V",
    tracao: "Dianteira",
    portas: 4,
    destaque: true,
    novo: false,
    opcionais: [
      "Ar-condicionado digital",
      "Bancos em couro",
      "Central multimídia 10\"",
      "Apple CarPlay / Android Auto",
      "Câmera de ré",
      "Sensor de estacionamento dianteiro e traseiro",
      "Teto solar elétrico",
      "Controle de cruzeiro adaptativo",
      "Lane assist",
      "Rodas 17\"",
      "Faróis LED"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"
    ],
    descricao: "VW T-Cross Highline top de linha. SUV compacto com espaço interno generoso, tecnologia de ponta e eficiência no consumo."
  },
  {
    id: 3,
    marca: "BMW",
    modelo: "320i",
    versao: "M Sport 2.0 Turbo Automático",
    tipo: "Sedan",
    ano: 2023,
    km: 22000,
    preco: 289900,
    combustivel: "Gasolina",
    cambio: "Automático",
    cor: "Preto Safira",
    potencia: "184 cv",
    motor: "2.0 Turbo 16V",
    tracao: "Traseira",
    portas: 4,
    destaque: true,
    novo: false,
    opcionais: [
      "Pacote M Sport completo",
      "Bancos esportivos em couro Vernasca",
      "Teto solar elétrico",
      "Central multimídia iDrive 8.5\"",
      "Head-up display",
      "Câmera 360°",
      "Estacionamento semiautônomo",
      "Suspensão esportiva",
      "Rodas 18\" M",
      "Faróis adaptativos LED",
      "Sistema Hi-Fi Harman Kardon"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1617469767600-e7af0abb27ed?w=800&q=80"
    ],
    descricao: "BMW 320i M Sport em impecável estado. Toda revisão realizada na concessionária BMW, com histórico completo e garantia de fábrica."
  },
  {
    id: 4,
    marca: "Chevrolet",
    modelo: "Tracker",
    versao: "Premier 1.2 Turbo Automático",
    tipo: "SUV",
    ano: 2023,
    km: 31000,
    preco: 119900,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Vermelho Chili",
    potencia: "133 cv",
    motor: "1.2 Turbo Flex",
    tracao: "Dianteira",
    portas: 4,
    destaque: false,
    novo: false,
    opcionais: [
      "Ar-condicionado automático",
      "Bancos em couro",
      "Mylink 8\"",
      "Apple CarPlay / Android Auto",
      "Câmera de ré",
      "Sensor de estacionamento",
      "Teto solar elétrico",
      "Keyless entry",
      "Rodas 17\"",
      "Faróis LED"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80"
    ],
    descricao: "Chevrolet Tracker Premier, versão mais completa. SUV urbano ideal para o dia a dia com muito conforto e tecnologia."
  },
  {
    id: 5,
    marca: "Honda",
    modelo: "HR-V",
    versao: "EXL 1.5 Turbo CVT",
    tipo: "SUV",
    ano: 2024,
    km: 5200,
    preco: 168900,
    combustivel: "Flex",
    cambio: "CVT",
    cor: "Azul Obsidiana",
    potencia: "177 cv",
    motor: "1.5 VTEC Turbo Flex",
    tracao: "Dianteira",
    portas: 4,
    destaque: true,
    novo: true,
    opcionais: [
      "Ar-condicionado dual zone automático",
      "Bancos em couro",
      "Honda Sensing completo",
      "Central multimídia 9\" com GPS",
      "Apple CarPlay / Android Auto",
      "Câmera 360°",
      "Assistente de frenagem",
      "Manutenção de faixa",
      "Rodas 18\"",
      "Faróis full LED com autoajuste"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80"
    ],
    descricao: "Honda HR-V EXL quase zero km, com o completo sistema Honda Sensing de segurança. SUV premium com espaço interno superior à categoria."
  },
  {
    id: 6,
    marca: "Ford",
    modelo: "Ranger",
    versao: "Storm 3.0 V6 4x4 Diesel AT",
    tipo: "Picape",
    ano: 2024,
    km: 15000,
    preco: 298500,
    combustivel: "Diesel",
    cambio: "Automático",
    cor: "Preto Absoluto",
    potencia: "250 cv",
    motor: "3.0 V6 Turbo Diesel",
    tracao: "4x4",
    portas: 4,
    destaque: true,
    novo: false,
    opcionais: [
      "Pacote Storm exclusivo",
      "Bancos em couro/alcântara",
      "SYNC 4A 12\"",
      "Matrix LED adaptativo",
      "Câmera 360°",
      "Controle de descida em rampa",
      "Tração 4x4 com diferencial traseiro blocável",
      "Suspensão elevada off-road",
      "Rodas 18\" exclusivas Storm",
      "Rolagem de caçamba elétrica"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&q=80"
    ],
    descricao: "Ford Ranger Storm, a configuração mais radical da linha. Ideal para quem precisa de máxima capacidade off-road sem abrir mão do luxo."
  },
  {
    id: 7,
    marca: "Hyundai",
    modelo: "Creta",
    versao: "Platinum 1.0 Turbo AT",
    tipo: "SUV",
    ano: 2023,
    km: 28000,
    preco: 109800,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Prata Metálico",
    potencia: "120 cv",
    motor: "1.0 T-GDI Flex",
    tracao: "Dianteira",
    portas: 4,
    destaque: false,
    novo: false,
    opcionais: [
      "Ar-condicionado automático",
      "Bancos dianteiros ventilados",
      "SmartSense Safety",
      "Central multimídia 10.25\"",
      "Apple CarPlay / Android Auto",
      "Câmera de ré HD",
      "Sensores de estacionamento",
      "Keyless push-button",
      "Rodas 17\"",
      "Faróis LED projetores"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80"
    ],
    descricao: "Hyundai Creta Platinum com excelente custo-benefício. SUV moderno, econômico e cheio de recursos de segurança e tecnologia."
  },
  {
    id: 8,
    marca: "Audi",
    modelo: "A3",
    versao: "Sedan Performance 2.0 TFSI S Tronic",
    tipo: "Sedan",
    ano: 2023,
    km: 18500,
    preco: 248000,
    combustivel: "Gasolina",
    cambio: "Automático",
    cor: "Branco Glacial",
    potencia: "190 cv",
    motor: "2.0 TFSI 16V",
    tracao: "Dianteira",
    portas: 4,
    destaque: false,
    novo: false,
    opcionais: [
      "Virtual Cockpit 10.25\"",
      "MMI Navigation Plus",
      "Bancos esportivos Alcântara/couro",
      "Bang & Olufsen Premium Sound",
      "Audi Pre Sense",
      "Câmera 360°",
      "Rodas 18\" Performance",
      "Faróis Matrix LED",
      "Park Assist",
      "Clima automático de 3 zonas"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80"
    ],
    descricao: "Audi A3 Sedan Performance, berlina premium com excelente dinâmica de condução. Bem equipado e em ótimo estado de conservação."
  },
  {
    id: 9,
    marca: "Fiat",
    modelo: "Pulse",
    versao: "Audace 1.0 Turbo CVT",
    tipo: "SUV",
    ano: 2023,
    km: 34000,
    preco: 94900,
    combustivel: "Flex",
    cambio: "CVT",
    cor: "Verde Urban",
    potencia: "130 cv",
    motor: "1.0 T200 Turbo Flex",
    tracao: "Dianteira",
    portas: 4,
    destaque: false,
    novo: false,
    opcionais: [
      "Ar-condicionado automático",
      "Bancos em couro",
      "Central multimídia 10.1\"",
      "Apple CarPlay / Android Auto sem fio",
      "Câmera de ré",
      "Sensor de estacionamento traseiro",
      "Keyless",
      "Rodas 16\" aro diamantado",
      "Faróis full LED"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&q=80"
    ],
    descricao: "Fiat Pulse Audace bem equipado e revisado. SUV compacto ideal para cidade com baixo consumo e ótimo espaço interno."
  },
  {
    id: 10,
    marca: "Mercedes",
    modelo: "GLA 200",
    versao: "Progressive 1.3 Turbo DCT",
    tipo: "SUV",
    ano: 2023,
    km: 25000,
    preco: 289000,
    combustivel: "Gasolina",
    cambio: "Automático",
    cor: "Azul Denim",
    potencia: "163 cv",
    motor: "1.3 Turbo 16V",
    tracao: "Dianteira",
    portas: 4,
    destaque: true,
    novo: false,
    opcionais: [
      "MBUX com tela 10.25\"",
      "Hey Mercedes (assistente de voz)",
      "Bancos em couro Nappa",
      "Teto panorâmico elétrico",
      "Active Parking Assist",
      "Câmera 360°",
      "Ambient lighting 64 cores",
      "Rodas AMG 18\"",
      "Faróis Multibeam LED",
      "Sistema de som Burmester"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80"
    ],
    descricao: "Mercedes-Benz GLA 200 Progressive com todos os itens de luxo da linha. Premium compacto com muito espaço, tecnologia e sofisticação."
  },
  {
    id: 11,
    marca: "Volkswagen",
    modelo: "Polo",
    versao: "Track 1.0 MPI",
    tipo: "Hatch",
    ano: 2023,
    km: 41000,
    preco: 74900,
    combustivel: "Flex",
    cambio: "Manual",
    cor: "Cinza Platinum",
    potencia: "84 cv",
    motor: "1.0 MPI Flex",
    tracao: "Dianteira",
    portas: 4,
    destaque: false,
    novo: false,
    opcionais: [
      "Ar-condicionado",
      "Direção elétrica",
      "Central multimídia 6.5\"",
      "Bluetooth",
      "Câmera de ré",
      "Rodas de aço com calotas 15\""
    ],
    fotos: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80"
    ],
    descricao: "VW Polo Track econômico e confiável. Perfeito para quem busca um hatch compacto, fácil de estacionar e com baixo custo de manutenção."
  },
  {
    id: 12,
    marca: "Toyota",
    modelo: "Hilux",
    versao: "SRX 2.8 TDI 4x4 Diesel AT",
    tipo: "Picape",
    ano: 2024,
    km: 9800,
    preco: 328900,
    combustivel: "Diesel",
    cambio: "Automático",
    cor: "Branco Pérola",
    potencia: "204 cv",
    motor: "2.8 TDI 4 cilindros",
    tracao: "4x4",
    portas: 4,
    destaque: true,
    novo: false,
    opcionais: [
      "Bancos em couro",
      "Multimídia Toyota 9\" com GPS",
      "Apple CarPlay / Android Auto",
      "Câmera 360°",
      "Tração 4x4 com diferencial blocável",
      "Controle de descida em rampa",
      "Suspensão com amortecedores Bilstein",
      "Rodas 18\"",
      "Faróis full LED",
      "BSM (sensor de ponto cego)"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80"
    ],
    descricao: "Toyota Hilux SRX top de linha, a picape mais vendida do Brasil. Robustez, conforto e tecnologia em um único veículo."
  },
  {
    id: 13,
    marca: "Honda",
    modelo: "Civic",
    versao: "Touring 1.5 Turbo CVT",
    tipo: "Sedan",
    ano: 2023,
    km: 19500,
    preco: 189900,
    combustivel: "Flex",
    cambio: "CVT",
    cor: "Preto Cristal",
    potencia: "182 cv",
    motor: "1.5 VTEC Turbo Flex",
    tracao: "Dianteira",
    portas: 4,
    destaque: false,
    novo: false,
    opcionais: [
      "Honda Sensing completo",
      "Bancos em couro ventilado",
      "Teto solar elétrico",
      "Multimídia 9\" com GPS",
      "Apple CarPlay / Android Auto",
      "Câmera 360°",
      "Faróis full LED",
      "Rodas 18\"",
      "Head-Up Display",
      "Wireless charger"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80"
    ],
    descricao: "Honda Civic Touring, o sedan esportivo mais completo da Honda. Teto solar, HUD e pacote Honda Sensing de segurança ativa."
  },
  {
    id: 14,
    marca: "Chevrolet",
    modelo: "Onix",
    versao: "Premier 1.0 Turbo AT",
    tipo: "Hatch",
    ano: 2024,
    km: 7600,
    preco: 89900,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Branco Summit",
    potencia: "116 cv",
    motor: "1.0 Turbo Flex",
    tracao: "Dianteira",
    portas: 4,
    destaque: false,
    novo: true,
    opcionais: [
      "Ar-condicionado automático",
      "Bancos em couro",
      "Mylink 8\"",
      "Apple CarPlay / Android Auto",
      "Câmera de ré",
      "Sensor de estacionamento",
      "Rodas 16\"",
      "Faróis de neblina LED"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80"
    ],
    descricao: "Chevrolet Onix Premier quase zero. O hatch mais vendido do Brasil na versão mais completa, automático e muito econômico."
  },
  {
    id: 15,
    marca: "Hyundai",
    modelo: "Ioniq 6",
    versao: "RWD Long Range",
    tipo: "Eletrico",
    ano: 2024,
    km: 4200,
    preco: 298000,
    combustivel: "Elétrico",
    cambio: "Automático",
    cor: "Verde Opaco",
    potencia: "229 cv",
    motor: "Motor Elétrico 77.4 kWh",
    tracao: "Traseira",
    portas: 4,
    destaque: true,
    novo: true,
    opcionais: [
      "Carregamento rápido 800V",
      "Autonomia até 614 km (WLTP)",
      "Bancos em couro vegano",
      "Tela dupla 12\"",
      "Head-up display",
      "Câmera 360°",
      "Highway Driving Assist 2",
      "Smart Park",
      "V2L (Vehicle-to-Load)",
      "Faróis IFS LED"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80"
    ],
    descricao: "Hyundai Ioniq 6 elétrico puro com autonomia de até 614 km. O carro do futuro disponível hoje, com recarga ultra-rápida de 800V."
  },
  {
    id: 16,
    marca: "Ford",
    modelo: "Bronco Sport",
    versao: "Badlands 2.0 EcoBoost 4x4 AT",
    tipo: "SUV",
    ano: 2023,
    km: 32000,
    preco: 219900,
    combustivel: "Gasolina",
    cambio: "Automático",
    cor: "Laranja Cyber",
    potencia: "245 cv",
    motor: "2.0 EcoBoost 16V",
    tracao: "4x4",
    portas: 4,
    destaque: false,
    novo: false,
    opcionais: [
      "Modo G.O.A.T. (Goes Over Any Type of Terrain)",
      "Bancos em couro",
      "SYNC 4 8\"",
      "Apple CarPlay / Android Auto",
      "Câmera de ré",
      "Controle de descida em rampa",
      "Diferencial traseiro Torsen",
      "Rodas 18\" off-road",
      "Faróis LED"
    ],
    fotos: [
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800&q=80"
    ],
    descricao: "Ford Bronco Sport Badlands, o SUV off-road mais capaz do mercado. Ideal para aventura com todo o conforto de um veículo premium."
  }
];

// Utilitários para os dados
const CarrosDB = {
  todos: () => CARROS,

  porId: (id) => CARROS.find(c => c.id === parseInt(id)),

  destaques: () => CARROS.filter(c => c.destaque).slice(0, 6),

  relacionados: (id, tipo, marca) => {
    return CARROS
      .filter(c => c.id !== parseInt(id) && (c.tipo === tipo || c.marca === marca))
      .slice(0, 4);
  },

  filtrar: ({ marcas = [], tipos = [], precoMax = 999999, anoMin = 2015, anoMax = 2025, combustiveis = [], cambios = [], texto = '' }) => {
    return CARROS.filter(c => {
      if (marcas.length > 0 && !marcas.includes(c.marca)) return false;
      if (tipos.length > 0 && !tipos.includes(c.tipo)) return false;
      if (c.preco > precoMax) return false;
      if (c.ano < anoMin || c.ano > anoMax) return false;
      if (combustiveis.length > 0 && !combustiveis.includes(c.combustivel)) return false;
      if (cambios.length > 0 && !cambios.includes(c.cambio)) return false;
      if (texto) {
        const q = texto.toLowerCase();
        if (
          !c.marca.toLowerCase().includes(q) &&
          !c.modelo.toLowerCase().includes(q) &&
          !c.versao.toLowerCase().includes(q) &&
          !c.tipo.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  },

  ordenar: (lista, criterio) => {
    const arr = [...lista];
    switch (criterio) {
      case 'preco-asc':  return arr.sort((a, b) => a.preco - b.preco);
      case 'preco-desc': return arr.sort((a, b) => b.preco - a.preco);
      case 'ano-desc':   return arr.sort((a, b) => b.ano - a.ano);
      case 'ano-asc':    return arr.sort((a, b) => a.ano - b.ano);
      case 'km-asc':     return arr.sort((a, b) => a.km - b.km);
      default:           return arr.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
    }
  }
};

// Helpers de formatação
const Fmt = {
  preco: (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }),
  km: (v) => v.toLocaleString('pt-BR') + ' km',
  parcela: (preco, entrada = 0, meses = 48, taxa = 0.0119) => {
    const financiado = preco - entrada;
    if (financiado <= 0) return 0;
    if (taxa === 0) return financiado / meses;
    return financiado * (taxa * Math.pow(1 + taxa, meses)) / (Math.pow(1 + taxa, meses) - 1);
  }
};
