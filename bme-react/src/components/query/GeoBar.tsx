import { useState } from 'react'
import clsx from 'clsx'
import { useQueryStore } from '../../store/useQueryStore'
import GeoFilterModal from '../geo/GeoFilterModal'
import { GEO_LEVELS } from '../../data/geo'
import type { GeoLevel } from '../../types'

const DEFAULT_LEVEL: GeoLevel = 'PAIS'

export default function GeoBar() {
  const geoFilter = useQueryStore(s => s.geoFilter)
  const setGeoFilter = useQueryStore(s => s.setGeoFilter)
  const [open, setOpen] = useState(false)

  const isDefault = geoFilter.level === DEFAULT_LEVEL && geoFilter.items.length === 0
  const activeLevel = GEO_LEVELS.find(l => l.value === geoFilter.level)
  const itemLabel = geoFilter.items.length === 0
    ? `${activeLevel?.label ?? geoFilter.level} · Todos`
    : `${activeLevel?.label ?? geoFilter.level} · ${geoFilter.items.length} selecionado${geoFilter.items.length > 1 ? 's' : ''}`

  return (
    <>
      <div className="bg-surface border-b border-[rgba(0,0,0,.07)] px-4 py-[6px] flex items-center gap-2 flex-shrink-0">
        <span className="text-[10.5px] font-bold text-warm-3 uppercase tracking-wider flex-shrink-0">⊙ Abrangência</span>

        {GEO_LEVELS.map(lvl => (
          <button
            key={lvl.value}
            onClick={() => setGeoFilter({ level: lvl.value, items: [] })}
            className={clsx(
              'px-2 py-[3px] rounded text-[11.5px] border transition-all cursor-pointer',
              geoFilter.level === lvl.value
                ? 'bg-blue text-white border-blue font-semibold'
                : 'bg-transparent text-warm-2 border-[rgba(0,0,0,.1)] hover:border-blue hover:text-blue'
            )}
          >
            {lvl.label}
          </button>
        ))}

        {geoFilter.level !== DEFAULT_LEVEL && (
          <button
            onClick={() => setOpen(true)}
            className="ml-1 px-2 py-[3px] rounded text-[11.5px] border border-blue text-blue hover:bg-blue-lt transition-colors cursor-pointer"
          >
            {itemLabel} ▾
          </button>
        )}

        {!isDefault && (
          <button
            onClick={() => setGeoFilter({ level: DEFAULT_LEVEL, items: [] })}
            className="ml-auto text-[11px] text-warm-3 hover:text-warm-1 cursor-pointer bg-transparent border-none"
            title="Voltar para Brasil"
          >
            ✕ remover
          </button>
        )}
      </div>

      {open && (
        <GeoFilterModal
          level={geoFilter.level}
          selected={geoFilter.items}
          onConfirm={items => { setGeoFilter({ level: geoFilter.level, items }); setOpen(false) }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
