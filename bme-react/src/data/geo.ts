import type { GeoItem, GeoLevel } from '../types'

export const GEO_LEVELS: { value: GeoLevel; label: string }[] = [
  { value: 'PAIS',       label: 'Brasil (País)'         },
  { value: 'REGIAO',     label: 'Grande Região'         },
  { value: 'UF',         label: 'Unidade da Federação'  },
  { value: 'MESO',       label: 'Mesorregião'           },
  { value: 'MICRO',      label: 'Microrregião'          },
  { value: 'MUNICIPIO',  label: 'Município'             },
]

export const REGIOES: GeoItem[] = [
  { code:'1', label:'Norte'        },
  { code:'2', label:'Nordeste'     },
  { code:'3', label:'Sudeste'      },
  { code:'4', label:'Sul'          },
  { code:'5', label:'Centro-Oeste' },
]

export const UFS: GeoItem[] = [
  { code:'12', label:'Acre',                parentCode:'1' },
  { code:'27', label:'Alagoas',             parentCode:'2' },
  { code:'16', label:'Amapá',              parentCode:'1' },
  { code:'13', label:'Amazonas',            parentCode:'1' },
  { code:'29', label:'Bahia',               parentCode:'2' },
  { code:'23', label:'Ceará',               parentCode:'2' },
  { code:'53', label:'Distrito Federal',    parentCode:'5' },
  { code:'32', label:'Espírito Santo',      parentCode:'3' },
  { code:'52', label:'Goiás',               parentCode:'5' },
  { code:'21', label:'Maranhão',            parentCode:'2' },
  { code:'51', label:'Mato Grosso',         parentCode:'5' },
  { code:'50', label:'Mato Grosso do Sul',  parentCode:'5' },
  { code:'31', label:'Minas Gerais',        parentCode:'3' },
  { code:'15', label:'Pará',                parentCode:'1' },
  { code:'25', label:'Paraíba',             parentCode:'2' },
  { code:'41', label:'Paraná',              parentCode:'4' },
  { code:'26', label:'Pernambuco',          parentCode:'2' },
  { code:'22', label:'Piauí',               parentCode:'2' },
  { code:'33', label:'Rio de Janeiro',      parentCode:'3' },
  { code:'24', label:'Rio Grande do Norte', parentCode:'2' },
  { code:'43', label:'Rio Grande do Sul',   parentCode:'4' },
  { code:'11', label:'Rondônia',            parentCode:'1' },
  { code:'14', label:'Roraima',             parentCode:'1' },
  { code:'42', label:'Santa Catarina',      parentCode:'4' },
  { code:'35', label:'São Paulo',           parentCode:'3' },
  { code:'28', label:'Sergipe',             parentCode:'2' },
  { code:'17', label:'Tocantins',           parentCode:'1' },
]

export async function fetchGeoItems(level: GeoLevel): Promise<GeoItem[]> {
  await new Promise(r => setTimeout(r, 60))
  if (level === 'REGIAO')     return REGIOES
  if (level === 'UF')         return UFS
  if (level === 'PAIS')       return [{ code:'BR', label:'Brasil (País)' }]
  return []
}
