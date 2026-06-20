import type { OfficialQuery, QueryConfig } from '../types'

const BASE_GEO: QueryConfig['geoFilter'] = { level: 'PAIS', items: [] }

export const OFFICIAL_QUERIES: OfficialQuery[] = [
  {
    id: 'oq1',
    title: 'Distribuição de renda por cor/raça e sexo',
    description: 'Rendimento domiciliar médio segmentado por cor ou raça e sexo, para o Brasil.',
    researchId: 'CD2010',
    tag: 'Censo 2010', tagColor: 'amb',
    varCount: 3,
    geoLabel: 'Brasil',
    config: {
      researchId: 'CD2010',
      rows: [
        { id:'V0606', code:'V0606', label:'Cor ou raça',     type:'categorical' },
        { id:'V0601', code:'V0601', label:'Sexo',             type:'categorical' },
      ],
      columns: [],
      measures: [{ variable:{ id:'V6531', code:'V6531', label:'Rendimento domiciliar', type:'quantitative' }, aggregation:'Média' }],
      geoFilter: BASE_GEO,
      period: '31/07/2010',
    },
  },
  {
    id: 'oq2',
    title: 'Bens duráveis × Rendimento domiciliar',
    description: 'Cruzamento entre combinações de bens duráveis e o rendimento domiciliar médio.',
    researchId: 'CD2010',
    tag: 'Censo 2010', tagColor: 'amb',
    varCount: 4,
    geoLabel: 'Brasil',
    config: {
      researchId: 'CD2010',
      rows: [
        { id:'V0222', code:'V0222', label:'Automóvel, existência',          type:'categorical' },
        { id:'V0220', code:'V0220', label:'Máquina de lavar, existência',   type:'categorical' },
        { id:'V0240', code:'V0240', label:'Microcomp. c/ Internet',         type:'categorical' },
      ],
      columns: [],
      measures: [
        { variable:{ id:'V6531', code:'V6531', label:'Rendimento domiciliar', type:'quantitative' }, aggregation:'Média' },
      ],
      geoFilter: BASE_GEO,
    },
  },
  {
    id: 'oq3',
    title: 'Taxa de desocupação por escolaridade e sexo',
    description: 'Pessoas desocupadas por nível de instrução e gênero — série histórica disponível.',
    researchId: 'PNAD',
    tag: 'PNAD 2022', tagColor: 'grn',
    varCount: 3,
    geoLabel: 'Brasil',
    config: {
      researchId: 'PNAD',
      rows: [
        { id:'VD4002', code:'VD4002', label:'Condição de ocupação', type:'categorical' },
        { id:'V2007',  code:'V2007',  label:'Sexo',                 type:'categorical' },
      ],
      columns: [],
      measures: [{ variable:{ id:'VD4020', code:'VD4020', label:'Rendimento do trabalho', type:'quantitative' }, aggregation:'Média' }],
      geoFilter: BASE_GEO,
    },
  },
  {
    id: 'oq4',
    title: 'Domicílios por condição de ocupação',
    description: 'Distribuição de domicílios por tipo de posse (próprio pago, alugado, cedido, etc.).',
    researchId: 'CD2010',
    tag: 'Censo 2010', tagColor: 'amb',
    varCount: 2,
    geoLabel: 'Brasil',
    config: {
      researchId: 'CD2010',
      rows: [
        { id:'V0201', code:'V0201', label:'Condição de ocupação', type:'categorical' },
      ],
      columns: [],
      measures: [
        { variable:{ id:'V6531', code:'V6531', label:'Rendimento domiciliar', type:'quantitative' }, aggregation:'Média' },
      ],
      geoFilter: BASE_GEO,
    },
  },
]

export async function fetchOfficialQueries(): Promise<OfficialQuery[]> {
  await new Promise(r => setTimeout(r, 100))
  return OFFICIAL_QUERIES
}
