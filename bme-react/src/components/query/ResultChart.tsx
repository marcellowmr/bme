import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell
} from 'recharts'
import type { QueryResult } from '../../types'

const PALETTE = ['#1351b4', '#166534', '#92400e', '#7c3aed', '#0891b2', '#be185d']

interface Props { result: QueryResult }

export default function ResultChart({ result }: Props) {
  const catCols  = result.columns.filter(c => !c.isNumeric && !c.isGeo)
  const numCols  = result.columns.filter(c => c.isNumeric)

  if (catCols.length === 0 || numCols.length === 0) {
    return <div className="flex items-center justify-center h-full text-warm-3 text-[13px]">Sem dados para exibir.</div>
  }

  const labelKey = catCols[catCols.length - 1].key

  const data = result.rows.map(row => {
    const obj: Record<string, string | number> = { label: String(row[labelKey] ?? '') }
    numCols.forEach(col => { obj[col.key] = typeof row[col.key] === 'number' ? (row[col.key] as number) : 0 })
    return obj
  })

  const multiSeries = numCols.length > 1

  return (
    <div className="h-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 16, left: 8, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: '#52525b' }}
            angle={-40}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#52525b' }}
            tickFormatter={v => Number(v).toLocaleString('pt-BR')}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid rgba(0,0,0,.1)' }}
            formatter={(v: number) => v.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
          />
          {multiSeries && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {numCols.map((col, i) =>
            multiSeries ? (
              <Bar key={col.key} dataKey={col.key} name={col.header} fill={PALETTE[i % PALETTE.length]} radius={[3, 3, 0, 0]} maxBarSize={48} />
            ) : (
              <Bar key={col.key} dataKey={col.key} name={col.header} radius={[3, 3, 0, 0]} maxBarSize={48}>
                {data.map((_, di) => (
                  <Cell key={di} fill={PALETTE[di % PALETTE.length]} />
                ))}
              </Bar>
            )
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
