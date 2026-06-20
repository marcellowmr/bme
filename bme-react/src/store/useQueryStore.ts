import { create } from 'zustand'
import type { Variable, SelectedMeasure, GeoFilter, QueryResult, QueryConfig, User } from '../types'
import { runQuery } from '../data/results'

interface QueryStore {
  // Auth
  user: User | null
  setUser: (u: User | null) => void

  // Current research
  researchId: string
  setResearchId: (id: string) => void

  // Axes
  rows: Variable[]
  columns: Variable[]
  measures: SelectedMeasure[]

  addToRows:    (v: Variable) => void
  removeFromRows:    (id: string) => void
  addToColumns:  (v: Variable) => void
  removeFromColumns: (id: string) => void
  addMeasure:    (m: SelectedMeasure) => void
  removeMeasure: (id: string) => void

  // Geo
  geoFilter: GeoFilter
  setGeoFilter: (g: GeoFilter) => void

  // Execution
  result: QueryResult | null
  isRunning: boolean
  error: string | null
  executeQuery: () => Promise<void>

  // Load official query
  loadConfig: (config: QueryConfig) => void

  // Reset
  resetQuery: () => void
}

const DEFAULT_GEO: GeoFilter = { level: 'PAIS', items: [] }

export const useQueryStore = create<QueryStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),

  researchId: 'CD2010',
  setResearchId: (id) => set({ researchId: id, rows: [], columns: [], measures: [], result: null }),

  rows: [],
  columns: [],
  measures: [],
  geoFilter: DEFAULT_GEO,
  result: null,
  isRunning: false,
  error: null,

  addToRows: (v) => set(s => ({
    rows: s.rows.find(r => r.id === v.id) ? s.rows : [...s.rows, v]
  })),
  removeFromRows: (id) => set(s => ({ rows: s.rows.filter(r => r.id !== id) })),

  addToColumns: (v) => set(s => ({
    columns: s.columns.find(c => c.id === v.id) ? s.columns : [...s.columns, v]
  })),
  removeFromColumns: (id) => set(s => ({ columns: s.columns.filter(c => c.id !== id) })),

  addMeasure: (m) => set(s => ({
    measures: s.measures.find(x => x.variable.id === m.variable.id && x.aggregation === m.aggregation)
      ? s.measures
      : [...s.measures, m]
  })),
  removeMeasure: (id) => set(s => ({ measures: s.measures.filter(m => m.variable.id !== id) })),

  setGeoFilter: (geoFilter) => set({ geoFilter }),

  executeQuery: async () => {
    const { researchId, rows, columns, measures, geoFilter } = get()
    if (!rows.length && !measures.length) return
    set({ isRunning: true, error: null, result: null })
    try {
      const config: QueryConfig = { researchId, rows, columns, measures, geoFilter }
      const result = await runQuery(config)
      set({ result, isRunning: false })
    } catch (e) {
      set({ error: 'Erro ao executar consulta.', isRunning: false })
    }
  },

  loadConfig: (config) => set({
    researchId: config.researchId,
    rows: config.rows,
    columns: config.columns,
    measures: config.measures,
    geoFilter: config.geoFilter ?? DEFAULT_GEO,
    result: null,
  }),

  resetQuery: () => set({
    rows: [], columns: [], measures: [],
    geoFilter: DEFAULT_GEO,
    result: null, error: null,
  }),
}))
