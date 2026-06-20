import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import type { Variable, VariableGroup } from '../../types'
import { isVariable } from '../../types'

interface Props {
  item: Variable | VariableGroup
  onClose: () => void
}

export default function MetaPanel({ item, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const isVar = isVariable(item)

  return (
    <div
      ref={panelRef}
      className="w-[272px] flex-shrink-0 bg-surface border-r border-[rgba(0,0,0,.07)] flex flex-col overflow-hidden animate-slidein"
      style={{ animation: 'slideIn 0.15s ease-out' }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[rgba(0,0,0,.07)] flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              {isVar ? (
                <>
                  <span className="text-[11px] font-mono text-warm-3 bg-bg px-1.5 py-[1px] rounded">{item.code}</span>
                  <span className={clsx(
                    'text-[10.5px] font-semibold px-1.5 py-[1px] rounded',
                    item.type === 'categorical' ? 'bg-amb-lt text-amb' : 'bg-blue-lt text-blue'
                  )}>
                    {item.type === 'categorical' ? 'Categórica' : 'Numérica'}
                  </span>
                </>
              ) : (
                <span className="text-[11px] font-semibold text-warm-3 uppercase tracking-wider">Tema</span>
              )}
            </div>
            <div className="text-[13.5px] font-semibold text-warm-1 leading-snug">{item.label}</div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-warm-3 hover:text-warm-1 hover:bg-bg transition-colors flex-shrink-0 bg-transparent border-none cursor-pointer text-[16px] leading-none mt-[1px]"
            title="Fechar (Esc)"
          >
            ×
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3 flex flex-col gap-4">

        {/* Description */}
        {item.description && (
          <Section title="Descrição">
            <p className="text-[12.5px] text-warm-1 leading-relaxed">{item.description}</p>
          </Section>
        )}

        {/* Notes */}
        {item.notes && (
          <Section title="Notas metodológicas">
            <p className="text-[12px] text-warm-2 leading-relaxed">{item.notes}</p>
          </Section>
        )}

        {/* Source (variables only) */}
        {isVar && item.source && (
          <Section title="Fonte">
            <p className="text-[12px] text-warm-3 leading-relaxed">{item.source}</p>
          </Section>
        )}

        {/* Categories (categorical variables) */}
        {isVar && item.type === 'categorical' && item.categories && item.categories.length > 0 && (
          <Section title={`Categorias · ${item.categories.length}`}>
            <div className="flex flex-col gap-[3px]">
              {item.categories.map(cat => (
                <div key={cat.value} className="flex items-center gap-2">
                  <span className="text-[10.5px] font-mono text-warm-3 w-5 flex-shrink-0 text-right">{cat.value}</span>
                  <span className="text-[12px] text-warm-1">{cat.label}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Aggregations (quantitative variables) */}
        {isVar && item.type === 'quantitative' && item.aggregations && item.aggregations.length > 0 && (
          <Section title="Agregações disponíveis">
            <div className="flex flex-wrap gap-1">
              {item.aggregations.map(agg => (
                <span key={agg} className="bg-blue-lt text-blue border border-blue-mid text-[11px] font-medium px-2 py-[2px] rounded-full">
                  {agg}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Empty state */}
        {!item.description && !item.notes && !(isVar && item.source) && (
          <div className="text-center py-6">
            <div className="text-[24px] opacity-20 mb-2">📄</div>
            <p className="text-[12px] text-warm-3">Nenhuma metainformação disponível para este item.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10.5px] font-bold text-warm-3 uppercase tracking-wider mb-[6px]">{title}</div>
      {children}
    </div>
  )
}
