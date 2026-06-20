import type { QueryConfig, QueryResult } from '../types'

// ── Pre-computed results keyed by a stable query signature ──────────────────

const RESULT_DB: Record<string, QueryResult> = {

  // Censo 2010 · Automóvel × Máq.lavar × Microcomp → Rendimento + Contagem
  'CD2010|V0222,V0220,V0240|V6531:Média,COUNT|PAIS': {
    period: '31/07/2010 (Ocorrência do Censo Demográfico 2010)',
    totalRows: 13,
    columns: [
      { key: 'geo',      header: 'Localização',                          isGeo: true  },
      { key: 'V0222',    header: 'Automóvel'                                          },
      { key: 'V0220',    header: 'Máq. lavar roupa'                                  },
      { key: 'V0240',    header: 'Microcomp. c/ Internet'                             },
      { key: 'V6531',    header: 'Rendimento domiciliar – Média (R$)',  isNumeric: true },
      { key: 'count',    header: 'Domicílios',                          isNumeric: true },
    ],
    rows: [
      { geo:'Brasil (País)', V0222:'Não aplicável', V0220:'Não aplicável', V0240:'Não aplicável', V6531:162.60,    count:730894    },
      { geo:'Brasil (País)', V0222:'Sim',           V0220:'Sim',           V0240:'Sim',           V6531:2637.12,   count:4034847  },
      { geo:'Brasil (País)', V0222:'Sim',           V0220:'Sim',           V0240:'Não',           V6531:6531.55,   count:10847958 },
      { geo:'Brasil (País)', V0222:'Sim',           V0220:'Não',           V0240:'Sim',           V6531:3169.93,   count:1567643  },
      { geo:'Brasil (País)', V0222:'Sim',           V0220:'Não',           V0240:'Não',           V6531:1749.29,   count:3833958  },
      { geo:'Brasil (País)', V0222:'Sim',           V0220:'Sim',           V0240:'Não aplicável', V6531:3672.79,   count:1704035  },
      { geo:'Brasil (País)', V0222:'Sim',           V0220:'Não',           V0240:'Não aplicável', V6531:2393.77,   count:653157   },
      { geo:'Brasil (País)', V0222:'Não',           V0220:'Sim',           V0240:'Não aplicável', V6531:1485.61,   count:6265662  },
      { geo:'Brasil (País)', V0222:'Não',           V0220:'Sim',           V0240:'Sim',           V6531:2638.45,   count:3309340  },
      { geo:'Brasil (País)', V0222:'Não',           V0220:'Sim',           V0240:'Não',           V6531:1844.30,   count:1071010  },
      { geo:'Brasil (País)', V0222:'Não',           V0220:'Não',           V0240:'Não aplicável', V6531:919.12,    count:21228893 },
      { geo:'Brasil (País)', V0222:'Não',           V0220:'Não',           V0240:'Sim',           V6531:1875.34,   count:1754147  },
      { geo:'Brasil (País)', V0222:'Não',           V0220:'Não',           V0240:'Não',           V6531:1444.16,   count:1049905  },
    ],
    timings: [
      { label: 'Cache',         ms: 143 },
      { label: 'Geração SQL',   ms: 55  },
      { label: 'Execução 1',    ms: 1000},
      { label: 'Execução 2',    ms: 139 },
      { label: 'Indexação',     ms: 15  },
    ],
  },

  // Censo 2010 · Cor/raça × Sexo → Rendimento domiciliar
  'CD2010|V0606,V0601|V6531:Média|PAIS': {
    period: '31/07/2010 (Ocorrência do Censo Demográfico 2010)',
    totalRows: 10,
    columns: [
      { key: 'geo',    header: 'Localização',                         isGeo: true  },
      { key: 'V0606',  header: 'Cor ou raça'                                       },
      { key: 'V0601',  header: 'Sexo'                                               },
      { key: 'V6531',  header: 'Rendimento domiciliar – Média (R$)', isNumeric: true },
      { key: 'count',  header: 'Domicílios',                         isNumeric: true },
    ],
    rows: [
      { geo:'Brasil (País)', V0606:'Branca',   V0601:'Masculino', V6531:2890.10, count:19423445 },
      { geo:'Brasil (País)', V0606:'Branca',   V0601:'Feminino',  V6531:2540.80, count:21301230 },
      { geo:'Brasil (País)', V0606:'Preta',    V0601:'Masculino', V6531:1320.45, count:4321100  },
      { geo:'Brasil (País)', V0606:'Preta',    V0601:'Feminino',  V6531:1180.30, count:4987650  },
      { geo:'Brasil (País)', V0606:'Amarela',  V0601:'Masculino', V6531:3410.20, count:412300   },
      { geo:'Brasil (País)', V0606:'Amarela',  V0601:'Feminino',  V6531:3120.90, count:398100   },
      { geo:'Brasil (País)', V0606:'Parda',    V0601:'Masculino', V6531:1450.70, count:22105400 },
      { geo:'Brasil (País)', V0606:'Parda',    V0601:'Feminino',  V6531:1280.40, count:23890100 },
      { geo:'Brasil (País)', V0606:'Indígena', V0601:'Masculino', V6531:890.30,  count:322100   },
      { geo:'Brasil (País)', V0606:'Indígena', V0601:'Feminino',  V6531:780.50,  count:315800   },
    ],
    timings: [
      { label: 'Cache',       ms: 88  },
      { label: 'Geração SQL', ms: 42  },
      { label: 'Execução',    ms: 820 },
      { label: 'Indexação',   ms: 11  },
    ],
  },

  // Censo 2010 · Condição de ocupação do domicílio
  'CD2010|V0201|V6531:Média,COUNT|PAIS': {
    period: '31/07/2010 (Ocorrência do Censo Demográfico 2010)',
    totalRows: 6,
    columns: [
      { key: 'geo',   header: 'Localização',                         isGeo: true  },
      { key: 'V0201', header: 'Condição de ocupação'                               },
      { key: 'V6531', header: 'Rendimento domiciliar – Média (R$)', isNumeric: true },
      { key: 'count', header: 'Domicílios',                         isNumeric: true },
    ],
    rows: [
      { geo:'Brasil (País)', V0201:'Próprio – já pago',          V6531:1820.40, count:34521000 },
      { geo:'Brasil (País)', V0201:'Próprio – ainda pagando',    V6531:3120.80, count:6234000  },
      { geo:'Brasil (País)', V0201:'Alugado',                    V6531:2340.50, count:10845000 },
      { geo:'Brasil (País)', V0201:'Cedido por empregador',      V6531:1100.20, count:1230000  },
      { geo:'Brasil (País)', V0201:'Cedido de outra forma',      V6531:980.60,  count:3420000  },
      { geo:'Brasil (País)', V0201:'Outra condição',             V6531:1050.30, count:890000   },
    ],
    timings: [{ label:'Execução', ms:430 }],
  },
}

// ── Default result for unknown queries ──────────────────────────────────────
const GENERIC_RESULT: QueryResult = {
  period: '31/07/2010 (Ocorrência do Censo Demográfico 2010)',
  totalRows: 5,
  columns: [
    { key:'geo',   header:'Localização',  isGeo:true   },
    { key:'cat1',  header:'Variável 1'                 },
    { key:'value', header:'Valor – Média', isNumeric:true },
    { key:'count', header:'Registros',     isNumeric:true },
  ],
  rows: [
    { geo:'Brasil (País)', cat1:'Categoria A', value:2340.50, count:12450000 },
    { geo:'Brasil (País)', cat1:'Categoria B', value:1820.30, count:8920000  },
    { geo:'Brasil (País)', cat1:'Categoria C', value:3100.80, count:5340000  },
    { geo:'Brasil (País)', cat1:'Categoria D', value:980.40,  count:18760000 },
    { geo:'Brasil (País)', cat1:'Categoria E', value:1450.20, count:7230000  },
  ],
  timings: [{ label:'Execução', ms:560 }],
}

function buildKey(config: QueryConfig): string {
  const rows = config.rows.map(v => v.code).join(',')
  const measures = config.measures.map(m => `${m.variable.code}:${m.aggregation}`).join(',')
  const geo = config.geoFilter.items.length ? config.geoFilter.items.map(i=>i.code).join('-') : 'PAIS'
  return `${config.researchId}|${rows}|${measures}|${geo}`
}

export async function runQuery(config: QueryConfig): Promise<QueryResult> {
  // Simula latência de rede + processamento
  const totalMs = 800 + Math.random() * 1200
  await new Promise(r => setTimeout(r, totalMs))

  const key = buildKey(config)
  return RESULT_DB[key] ?? GENERIC_RESULT
}
