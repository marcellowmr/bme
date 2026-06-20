// ── Variable tree ──────────────────────────────────────────
export type VariableType = 'categorical' | 'quantitative'

export interface Variable {
  id: string
  code: string
  label: string
  type: VariableType
  categories?: { value: string; label: string }[]
  aggregations?: string[]
  description?: string
  notes?: string
  source?: string
}

export interface VariableGroup {
  id: string
  label: string
  children: (Variable | VariableGroup)[]
  description?: string
  notes?: string
}

export function isVariable(node: Variable | VariableGroup): node is Variable {
  return 'code' in node
}

// ── Research ────────────────────────────────────────────────
export interface Research {
  id: string
  code: string
  name: string
  shortName: string
  description: string
  year: string
  varCount: number
  tree: VariableGroup[]
}

// ── Geo ─────────────────────────────────────────────────────
export type GeoLevel = 'PAIS' | 'REGIAO' | 'UF' | 'MESO' | 'MICRO' | 'MUNICIPIO'

export interface GeoItem { code: string; label: string; parentCode?: string }

export interface GeoFilter {
  level: GeoLevel
  items: GeoItem[]   // empty = all
}

// ── Query ────────────────────────────────────────────────────
export interface SelectedMeasure {
  variable: Variable
  aggregation: string
}

export interface QueryConfig {
  researchId: string
  rows: Variable[]
  columns: Variable[]
  measures: SelectedMeasure[]
  geoFilter: GeoFilter
  period?: string
}

// ── Results ──────────────────────────────────────────────────
export interface ResultColumn {
  key: string
  header: string
  isGeo?: boolean
  isNumeric?: boolean
}

export interface QueryResult {
  columns: ResultColumn[]
  rows: Record<string, string | number>[]
  timings: { label: string; ms: number }[]
  period: string
  totalRows: number
}

// ── Official query ───────────────────────────────────────────
export interface OfficialQuery {
  id: string
  title: string
  description: string
  researchId: string
  tag: string
  tagColor: string
  varCount: number
  geoLabel: string
  config: QueryConfig
}

// ── Auth ─────────────────────────────────────────────────────
export type AuthType = 'AD' | 'GOVBR' | 'BME'

export interface User {
  id: string
  username: string
  fullName: string
  email: string
  authType: AuthType
  profileCode: 'PUBLIC' | 'RESEARCHER' | 'ADMIN'
  allowedResearchIds: string[]
  canExportIds: string[]
}
