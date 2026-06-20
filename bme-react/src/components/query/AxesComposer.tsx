import clsx from 'clsx'
import { useQueryStore } from '../../store/useQueryStore'

export default function AxesComposer() {
  const rows        = useQueryStore(s => s.rows)
  const columns     = useQueryStore(s => s.columns)
  const measures    = useQueryStore(s => s.measures)
  const removeFromRows    = useQueryStore(s => s.removeFromRows)
  const removeFromColumns = useQueryStore(s => s.removeFromColumns)
  const removeMeasure     = useQueryStore(s => s.removeMeasure)
  const executeQuery      = useQueryStore(s => s.executeQuery)
  const isRunning         = useQueryStore(s => s.isRunning)

  const canRun = (rows.length > 0 || columns.length > 0) && measures.length > 0

  return (
    <div className="bg-surface border-b border-[rgba(0,0,0,.07)] px-4 py-3 flex flex-col gap-3 flex-shrink-0">

      {/* Axes row */}
      <div className="flex gap-2">
        {/* Rows */}
        <AxisBox label="↕ Linhas · categóricas" className="flex-1">
          {rows.length === 0
            ? <span className="text-[12px] text-warm-3 italic">Clique em uma variável categórica na árvore</span>
            : rows.map(v => (
                <Chip key={v.id} label={v.label} color="amb" onRemove={() => removeFromRows(v.id)} />
              ))
          }
        </AxisBox>

        {/* Columns (optional) */}
        <AxisBox label="↔ Colunas · opcional" className="w-40 flex-shrink-0">
          {columns.length === 0
            ? <span className="text-[12px] text-warm-3 italic">Opcional</span>
            : columns.map(v => (
                <Chip key={v.id} label={v.label} color="amb" onRemove={() => removeFromColumns(v.id)} />
              ))
          }
        </AxisBox>
      </div>

      {/* Measures + run */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10.5px] font-bold text-warm-3 uppercase tracking-wider">∑ Medidas</span>
        {measures.length === 0
          ? <span className="text-[12px] text-warm-3 italic">Clique em uma variável numérica</span>
          : measures.map(m => (
              <Chip
                key={m.variable.id}
                label={`${m.variable.label} · ${m.aggregation}`}
                color="grn"
                onRemove={() => removeMeasure(m.variable.id)}
              />
            ))
        }
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[12px] text-warm-3">
            {rows.length} categ. · {measures.length} medidas
          </span>
          <button
            onClick={executeQuery}
            disabled={!canRun || isRunning}
            className={clsx(
              'flex items-center gap-2 px-4 py-[7px] rounded-lg text-[13px] font-semibold text-white border-none cursor-pointer transition-all',
              canRun && !isRunning ? 'bg-grn hover:brightness-110' : 'bg-warm-3 cursor-not-allowed'
            )}
          >
            {isRunning ? (
              <>
                <span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                Executando…
              </>
            ) : '▶ Executar'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AxisBox({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('bg-bg rounded-[10px] p-[10px] min-h-[62px] transition-colors hover:bg-blue-lt group', className)}>
      <div className="text-[10.5px] font-bold text-warm-3 uppercase tracking-wider mb-[6px]">{label}</div>
      <div className="flex flex-wrap gap-[5px]">{children}</div>
    </div>
  )
}

type ChipColor = 'amb' | 'grn' | 'blue'

function Chip({ label, color, onRemove }: { label: string; color: ChipColor; onRemove: () => void }) {
  const colors: Record<ChipColor, string> = {
    amb:  'bg-amb-lt text-amb border-amb-mid',
    grn:  'bg-grn-lt text-grn border-grn-mid',
    blue: 'bg-blue-lt text-blue border-blue-mid',
  }
  return (
    <span className={clsx('inline-flex items-center gap-1 px-2 py-1 rounded-full text-[12px] font-medium border', colors[color])}>
      <span className="max-w-[160px] truncate">{label}</span>
      <button onClick={onRemove} className="bg-transparent border-none cursor-pointer text-inherit opacity-50 hover:opacity-100 text-[13px] leading-none p-0">×</button>
    </span>
  )
}
