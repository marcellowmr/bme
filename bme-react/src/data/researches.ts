import type { Research } from '../types'

export const RESEARCHES: Research[] = [
  {
    id: 'CD2010',
    code: 'CD2010',
    name: 'Censo Demográfico 2010',
    shortName: 'Censo 2010',
    year: '2010',
    varCount: 320,
    description: 'O Censo Demográfico é a mais complexa operação estatística realizada por um país, investigando características de toda a população e dos domicílios do Território Nacional.',
    tree: [
      {
        id: 'dom', label: 'Domicílios',
        children: [
          {
            id: 'dom-bens', label: 'Bens duráveis',
            description: 'Conjunto de variáveis que identificam a posse de bens duráveis nos domicílios particulares permanentes. Bens duráveis são produtos com vida útil superior a três anos adquiridos pelos moradores.',
            notes: 'A pesquisa investiga apenas a existência do bem, não a quantidade. Veículos de uso exclusivamente comercial não são contabilizados.',
            children: [
              { id: 'V0222', code: 'V0222', label: 'Automóvel, uso particular, existência', type: 'categorical',
                description: 'Indica se o domicílio particular permanente possui automóvel ou veículo similar destinado ao uso pessoal dos moradores.',
                notes: 'Inclui automóveis, caminhonetas e utilitários de uso pessoal. Não inclui veículos utilizados exclusivamente para fins comerciais, como táxis e vans de frete.',
                source: 'Censo Demográfico 2010 – Questionário da Amostra, quesito V0222.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'},{value:'9',label:'Não aplicável'}] },
              { id: 'V0219', code: 'V0219', label: 'Geladeira, existência', type: 'categorical',
                description: 'Indica a existência de geladeira ou freezer no domicílio particular permanente.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
              { id: 'V0220', code: 'V0220', label: 'Máquina de lavar roupa, existência', type: 'categorical',
                description: 'Indica se o domicílio particular permanente possui máquina de lavar roupa, independentemente do tipo (automática ou semiautomática).',
                notes: 'Máquinas de lavar de uso coletivo (lavanderias de condomínio, por exemplo) não são consideradas.',
                source: 'Censo Demográfico 2010 – Questionário da Amostra, quesito V0220.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
              { id: 'V0240', code: 'V0240', label: 'Microcomputador com acesso à Internet, existência', type: 'categorical',
                description: 'Indica se o domicílio possui microcomputador (incluindo notebooks e netbooks) com acesso à Internet, independentemente do tipo de conexão (banda larga, discada, móvel).',
                notes: 'Tablets e smartphones não eram considerados microcomputadores no Censo 2010. Acesso via modem 3G/4G é contabilizado.',
                source: 'Censo Demográfico 2010 – Questionário da Amostra, quesito V0240.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'},{value:'9',label:'Não aplicável'}] },
              { id: 'V0239', code: 'V0239', label: 'Microcomputador, existência', type: 'categorical',
                description: 'Indica se o domicílio particular permanente possui microcomputador, independentemente de ter acesso à Internet.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
              { id: 'V0223', code: 'V0223', label: 'Motocicleta, para uso particular, existência', type: 'categorical',
                description: 'Indica se o domicílio possui motocicleta destinada ao uso pessoal dos moradores. Não inclui motonetas e ciclomotores utilizados para entrega e trabalho.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
              { id: 'V0215', code: 'V0215', label: 'Rádio, existência', type: 'categorical',
                description: 'Indica a existência de aparelho de rádio no domicílio, incluindo radiogravadores, som automotivo e aparelhos de som com rádio integrado.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
              { id: 'V0218', code: 'V0218', label: 'Telefone celular, existência', type: 'categorical',
                description: 'Indica se algum morador do domicílio possui telefone celular, independentemente da operadora ou plano contratado.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
              { id: 'V0217', code: 'V0217', label: 'Telefone fixo, existência', type: 'categorical',
                description: 'Indica a existência de linha telefônica fixa instalada no domicílio.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
              { id: 'V0216', code: 'V0216', label: 'Televisão, existência', type: 'categorical',
                description: 'Indica a existência de aparelho de televisão no domicílio. Inclui televisores de qualquer tecnologia (tubo, LCD, plasma, LED).',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
            ]
          },
          {
            id: 'dom-geral', label: 'Características gerais',
            description: 'Variáveis que descrevem as características físicas, legais e de infraestrutura dos domicílios particulares permanentes recenseados.',
            children: [
              { id: 'V2011', code: 'V2011', label: 'Aluguel mensal', type: 'quantitative',
                description: 'Valor do aluguel mensal pago pelo domicílio, em reais. Investigado apenas para domicílios alugados.',
                notes: 'Valores deflacionados para julho de 2010 (data de referência do Censo). Exclui condomínio e IPTU.',
                aggregations: ['Soma','Média','Mediana'] },
              { id: 'V0201', code: 'V0201', label: 'Domicílio, condição de ocupação', type: 'categorical',
                description: 'Classifica o domicílio particular permanente segundo a condição de posse ou uso por parte dos moradores.',
                notes: 'A condição "Próprio – ainda pagando" inclui imóveis financiados pelo SFH, FGTS ou construtoras. "Cedido" abrange imóveis de uso de empregados, familiares e outras formas.',
                source: 'Censo Demográfico 2010 – Questionário Básico, quesito V0201.',
                categories: [{value:'1',label:'Próprio – já pago'},{value:'2',label:'Próprio – ainda pagando'},{value:'3',label:'Alugado'},{value:'4',label:'Cedido por empregador'},{value:'5',label:'Cedido de outra forma'},{value:'6',label:'Outra condição'}] },
              { id: 'V0202', code: 'V0202', label: 'Domicílio, espécie', type: 'categorical',
                description: 'Identifica o tipo de construção em que está instalado o domicílio particular permanente.',
                categories: [{value:'1',label:'Casa'},{value:'2',label:'Casa de vila ou em condomínio'},{value:'3',label:'Apartamento'},{value:'4',label:'Habitação em casa de cômodos'}] },
              { id: 'V0204', code: 'V0204', label: 'Domicílio, situação', type: 'categorical',
                description: 'Classifica o domicílio de acordo com a sua localização em área urbana ou rural, conforme a legislação municipal vigente na data do Censo.',
                categories: [{value:'1',label:'Urbano'},{value:'2',label:'Rural'}] },
              { id: 'V0203', code: 'V0203', label: 'Domicílio, tipo', type: 'categorical',
                categories: [{value:'1',label:'Particular permanente ocupado'},{value:'2',label:'Particular permanente não ocupado'}] },
              { id: 'V0212', code: 'V0212', label: 'Energia elétrica, existência', type: 'categorical',
                description: 'Indica se o domicílio é servido por energia elétrica, seja de rede pública ou de gerador particular.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
              { id: 'V2001', code: 'V2001', label: 'Famílias no domicílio, número', type: 'quantitative', aggregations: ['Média','Soma','Contagem'] },
            ]
          },
          {
            id: 'dom-renda', label: 'Rendimentos',
            description: 'Variáveis de rendimento domiciliar derivadas dos rendimentos individuais de todos os moradores. Valores expressos em reais de julho de 2010.',
            notes: 'Os rendimentos domiciliares são calculados pelo IBGE a partir dos quesitos de rendimento individual, aplicando deflator quando necessário para comparações temporais.',
            children: [
              { id: 'V6531', code: 'V6531', label: 'Rendimento domiciliar', type: 'quantitative',
                description: 'Soma dos rendimentos mensais de todos os moradores do domicílio, em reais. Inclui rendimentos do trabalho, aposentadorias, pensões, aluguéis e outras fontes.',
                notes: 'Domicílios sem rendimento declarado são excluídos do cálculo de médias e medianas. O valor zero indica ausência de renda declarada, não necessariamente ausência de renda real.',
                source: 'Variável derivada – Censo Demográfico 2010, Questionário da Amostra.',
                aggregations: ['Média','Mediana','Soma'] },
              { id: 'V6532', code: 'V6532', label: 'Rendimento domiciliar per capita', type: 'quantitative',
                description: 'Rendimento domiciliar total dividido pelo número de moradores do domicílio, em reais.',
                notes: 'Utilizado como referência para programas de transferência de renda (ex.: Bolsa Família). Valor de corte para extrema pobreza em 2010: R$ 70,00/mês per capita.',
                aggregations: ['Média','Mediana','Soma'] },
              { id: 'V6533', code: 'V6533', label: 'Rendimento domiciliar, salários mínimos', type: 'quantitative', aggregations: ['Média','Mediana'] },
              { id: 'V6534', code: 'V6534', label: 'Rendimento domiciliar per capita, salários mínimos', type: 'quantitative', aggregations: ['Média','Mediana'] },
            ]
          },
          {
            id: 'dom-san', label: 'Saneamento básico',
            description: 'Variáveis relativas ao acesso a serviços de saneamento básico: abastecimento de água, esgotamento sanitário e destinação do lixo.',
            notes: 'O Plano Nacional de Saneamento Básico (PLANSAB) utiliza esses quesitos como indicadores de universalização do saneamento até 2033.',
            children: [
              { id: 'V0207', code: 'V0207', label: 'Abastecimento de água', type: 'categorical',
                description: 'Forma de abastecimento de água utilizada pelo domicílio. Prioriza a fonte principal quando há mais de uma.',
                categories: [{value:'1',label:'Rede geral'},{value:'2',label:'Poço ou nascente'},{value:'3',label:'Outra'}] },
              { id: 'V0208', code: 'V0208', label: 'Esgotamento sanitário', type: 'categorical',
                description: 'Destino dado ao esgoto do domicílio (banheiros e cozinha). Considera apenas a forma de escoamento, não o tratamento posterior.',
                categories: [{value:'1',label:'Rede geral de esgoto'},{value:'2',label:'Fossa séptica'},{value:'3',label:'Outro'}] },
              { id: 'V0209', code: 'V0209', label: 'Coleta de lixo', type: 'categorical',
                description: 'Destino dado ao lixo produzido no domicílio.',
                categories: [{value:'1',label:'Coletado'},{value:'2',label:'Queimado/enterrado'},{value:'3',label:'Outro destino'}] },
            ]
          },
        ]
      },
      {
        id: 'pes', label: 'Pessoas',
        children: [
          {
            id: 'pes-iden', label: 'Identificação',
            description: 'Variáveis de identificação demográfica das pessoas recenseadas, incluindo sexo, cor ou raça e faixas etárias.',
            children: [
              { id: 'V0601', code: 'V0601', label: 'Sexo', type: 'categorical',
                description: 'Sexo da pessoa recenseada, conforme declaração do próprio morador ou do responsável pelo domicílio.',
                source: 'Censo Demográfico 2010 – Questionário Básico, quesito V0601.',
                categories: [{value:'1',label:'Masculino'},{value:'2',label:'Feminino'}] },
              { id: 'V0606', code: 'V0606', label: 'Cor ou raça', type: 'categorical',
                description: 'Cor ou raça da pessoa, conforme autodeclaração. O IBGE adota a classificação de cinco categorias desde o Censo de 1991, baseada na percepção do próprio indivíduo.',
                notes: 'A categoria "Indígena" foi incluída a partir do Censo 1991. "Amarela" refere-se a pessoas de origem oriental (japonesa, chinesa, coreana, etc.). A autodeclaração pode variar conforme contexto social e regional.',
                source: 'Censo Demográfico 2010 – Questionário Básico, quesito V0606.',
                categories: [{value:'1',label:'Branca'},{value:'2',label:'Preta'},{value:'3',label:'Amarela'},{value:'4',label:'Parda'},{value:'5',label:'Indígena'}] },
              { id: 'V6036', code: 'V6036', label: 'Idade', type: 'quantitative',
                description: 'Idade da pessoa em anos completos na data de referência do Censo (31 de julho de 2010).',
                aggregations: ['Média','Mediana'] },
              { id: 'V6400', code: 'V6400', label: 'Grupo de idade', type: 'categorical',
                description: 'Faixa etária derivada da idade em anos completos. Utilizada em tabulações demográficas padrão.',
                categories: [{value:'1',label:'0 a 4 anos'},{value:'2',label:'5 a 9 anos'},{value:'3',label:'10 a 14 anos'},{value:'4',label:'15 a 19 anos'},{value:'5',label:'20 a 24 anos'},{value:'6',label:'25 a 29 anos'},{value:'7',label:'30 a 39 anos'},{value:'8',label:'40 a 49 anos'},{value:'9',label:'50 a 59 anos'},{value:'10',label:'60 anos ou mais'}] },
            ]
          },
          {
            id: 'pes-edu', label: 'Educação',
            description: 'Variáveis relativas ao nível de escolaridade e alfabetização das pessoas de 5 anos ou mais de idade.',
            notes: 'A classificação de nível de instrução segue as diretrizes da Lei de Diretrizes e Bases da Educação Nacional (LDB 9.394/1996) e os padrões internacionais da ISCED/UNESCO.',
            children: [
              { id: 'V0627', code: 'V0627', label: 'Alfabetização', type: 'categorical',
                description: 'Indica se a pessoa de 5 anos ou mais sabe ler e escrever um bilhete simples no idioma que conhece.',
                notes: 'Considera-se alfabetizada a pessoa que aprendeu a ler e escrever, mesmo que não mantenha o hábito. Não exige escolaridade formal.',
                source: 'Censo Demográfico 2010 – Questionário Básico, quesito V0627.',
                categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
              { id: 'V6400E', code: 'V6400E', label: 'Nível de instrução', type: 'categorical',
                description: 'Nível mais elevado de ensino frequentado pela pessoa, considerando cursos concluídos ou séries completadas com aprovação.',
                notes: 'Variável derivada a partir das respostas sobre frequência escolar e série concluída. A codificação segue a ISCED 2011 (UNESCO), adaptada ao sistema educacional brasileiro.',
                source: 'Variável derivada – Censo Demográfico 2010, Questionário da Amostra.',
                categories: [{value:'1',label:'Sem instrução'},{value:'2',label:'Fundamental incompleto'},{value:'3',label:'Fundamental completo'},{value:'4',label:'Médio incompleto'},{value:'5',label:'Médio completo'},{value:'6',label:'Superior incompleto'},{value:'7',label:'Superior completo'},{value:'8',label:'Pós-graduação'}] },
            ]
          },
          {
            id: 'pes-renda', label: 'Rendimentos pessoais',
            children: [
              { id: 'V6527', code: 'V6527', label: 'Rendimento mensal habitual de todos os trabalhos', type: 'quantitative', aggregations: ['Média','Mediana','Soma'] },
              { id: 'V6529', code: 'V6529', label: 'Rendimento mensal habitual de outras fontes',     type: 'quantitative', aggregations: ['Média','Mediana','Soma'] },
            ]
          },
        ]
      },
      {
        id: 'mort', label: 'Mortalidade',
        children: [
          { id: 'V6036M', code: 'V6036M', label: 'Mortalidade, existência no domicílio', type: 'categorical', categories: [{value:'1',label:'Sim'},{value:'2',label:'Não'}] },
        ]
      },
      {
        id: 'fam', label: 'Famílias',
        children: [
          { id: 'V6527F', code: 'V6527F', label: 'Rendimento familiar per capita',   type: 'quantitative', aggregations: ['Média','Mediana'] },
          { id: 'V0401',  code: 'V0401',  label: 'Espécie de família',                type: 'categorical',  categories: [{value:'1',label:'Família convivente principal'},{value:'2',label:'Família convivente secundária'}] },
        ]
      },
    ]
  },
  {
    id: 'CD2022',
    code: 'CD2022',
    name: 'Censo Demográfico 2022',
    shortName: 'Censo 2022',
    year: '2022',
    varCount: 290,
    description: 'Censo Demográfico realizado em 2022, primeiro em 12 anos.',
    tree: [
      { id: 'dom22', label: 'Domicílios', children: [
        { id: 'dom22-geral', label: 'Características gerais', children: [
          { id: 'V0201_22', code: 'V0201', label: 'Domicílio, condição de ocupação', type: 'categorical', categories: [{value:'1',label:'Próprio'},{value:'2',label:'Alugado'},{value:'3',label:'Cedido'}] },
          { id: 'V6531_22', code: 'V6531', label: 'Rendimento domiciliar', type: 'quantitative', aggregations: ['Média','Mediana','Soma'] },
        ]},
      ]},
      { id: 'pes22', label: 'Pessoas', children: [
        { id: 'pes22-id', label: 'Identificação', children: [
          { id: 'V0601_22', code: 'V0601', label: 'Sexo', type: 'categorical', categories: [{value:'1',label:'Masculino'},{value:'2',label:'Feminino'}] },
          { id: 'V0606_22', code: 'V0606', label: 'Cor ou raça', type: 'categorical', categories: [{value:'1',label:'Branca'},{value:'2',label:'Preta'},{value:'3',label:'Amarela'},{value:'4',label:'Parda'},{value:'5',label:'Indígena'}] },
        ]},
      ]},
    ]
  },
  {
    id: 'PNAD',
    code: 'PNAD',
    name: 'PNAD Contínua',
    shortName: 'PNAD',
    year: '2022',
    varCount: 180,
    description: 'Pesquisa Nacional por Amostra de Domicílios Contínua.',
    tree: [
      { id: 'pnad-trab', label: 'Trabalho', children: [
        { id: 'pnad-ocup', label: 'Ocupação', children: [
          { id: 'VD4002', code: 'VD4002', label: 'Condição de ocupação', type: 'categorical', categories: [{value:'1',label:'Ocupado'},{value:'2',label:'Desocupado'}] },
          { id: 'VD4009', code: 'VD4009', label: 'Posição na ocupação', type: 'categorical', categories: [{value:'1',label:'Empregado setor privado'},{value:'2',label:'Empregado setor público'},{value:'3',label:'Empregador'},{value:'4',label:'Conta própria'},{value:'5',label:'Trabalhador familiar auxiliar'}] },
          { id: 'VD4020', code: 'VD4020', label: 'Rendimento mensal efetivo do trabalho principal', type: 'quantitative', aggregations: ['Média','Mediana','Soma'] },
        ]},
      ]},
      { id: 'pnad-pes', label: 'Pessoas', children: [
        { id: 'V2007', code: 'V2007', label: 'Sexo', type: 'categorical', categories: [{value:'1',label:'Masculino'},{value:'2',label:'Feminino'}] },
        { id: 'V2010', code: 'V2010', label: 'Cor ou raça', type: 'categorical', categories: [{value:'1',label:'Branca'},{value:'2',label:'Preta'},{value:'3',label:'Amarela'},{value:'4',label:'Parda'},{value:'5',label:'Indígena'}] },
      ]},
    ]
  },
  {
    id: 'POF',
    code: 'POF',
    name: 'POF 2017–18',
    shortName: 'POF',
    year: '2018',
    varCount: 210,
    description: 'Pesquisa de Orçamentos Familiares.',
    tree: [
      { id: 'pof-desp', label: 'Despesas', children: [
        { id: 'pof-alim', label: 'Alimentação', children: [
          { id: 'V9001', code: 'V9001', label: 'Despesa com alimentação', type: 'quantitative', aggregations: ['Média','Soma'] },
        ]},
        { id: 'pof-habit', label: 'Habitação', children: [
          { id: 'V9002', code: 'V9002', label: 'Despesa com habitação', type: 'quantitative', aggregations: ['Média','Soma'] },
        ]},
      ]},
    ]
  },
]

/** Simula chamada à API – retorna lista de pesquisas disponíveis para o usuário */
export async function fetchResearches(allowedIds?: string[]): Promise<Research[]> {
  await delay(120)
  if (!allowedIds) return RESEARCHES
  return RESEARCHES.filter(r => allowedIds.includes(r.id))
}

export async function fetchResearch(id: string): Promise<Research | undefined> {
  await delay(80)
  return RESEARCHES.find(r => r.id === id)
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }
