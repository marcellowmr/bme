import { useState } from 'react'
import clsx from 'clsx'
import type { QueryResult } from '../../types'

const PAGE_SIZE = 20

interface Props { result: QueryResult }

export default function ResultTable({ result }: Props) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(result.rows.length / PAGE_SIZE)
  const slice = result.rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const totalMs = result.timings.reduce((s, t) => s + t.ms, 0)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[12.5px] border-collapse">
          <thead className="sticky top-0 bg-surface z-10">
            <tr>
              {result.columns.map((col, i) => (
                <th
                  key={col.key}
                  className={clsx(
                    'px-3 py-[7px] text-left font-semibold text-warm-2 border-b border-[rgba(0,0,0,.08)] whitespace-nowrap bg-surface',
                    (col.isNumeric || i > 0) && !col.isGeo && 'text-right'
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((row, ri) => (
              <tr
                key={ri}
                className={clsx(
                  'border-b border-[rgba(0,0,0,.04)] transition-colors',
                  ri % 2 === 0 ? 'bg-transparent' : 'bg-bg',
                  'hover:bg-blue-lt'
                )}
              >
                {result.columns.map((col, ci) => {
                  const val = row[col.key]
                  const numeric = col.isNumeric && typeof val === 'number'
                  return (
                    <td
                      key={col.key}
                      className={clsx(
                        'px-3 py-[6px] text-warm-1',
                        (numeric || (ci > 0 && !col.isGeo)) && 'text-right tabular-nums'
                      )}
                    >
                      {numeric
                        ? (val as number).toLocaleString('pt-BR', { maximumFractionDigits: 2 })
                        : String(val ?? '')}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-[rgba(0,0,0,.07)] flex-shrink-0 bg-surface">
        <span className="text-[11.5px] text-warm-3">
          {result.totalRows.toLocaleString('pt-BR')} linhas · {totalMs}ms · {result.period}
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <PagBtn onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>‹</PagBtn>
            <span className="text-[11.5px] text-warm-2 px-2">{page + 1} / {totalPages}</span>
            <PagBtn onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}>›</PagBtn>
          </div>
        )}
      </div>
    </div>
  )
}

function PagBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-7 h-7 rounded border border-[rgba(0,0,0,.1)] text-warm-2 text-[15px] leading-none flex items-center justify-center cursor-pointer bg-transparent hover:bg-bg disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}
