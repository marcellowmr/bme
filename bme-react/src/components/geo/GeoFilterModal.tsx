import { useEffect, useState } from 'react'
import clsx from 'clsx'
import type { GeoItem, GeoLevel } from '../../types'
import { fetchGeoItems } from '../../data/geo'

interface Props {
  level: GeoLevel
  selected: GeoItem[]
  onConfirm: (items: GeoItem[]) => void
  onClose: () => void
}

export default function GeoFilterModal({ level, selected, onConfirm, onClose }: Props) {
  const [items, setItems] = useState<GeoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [picked, setPicked] = useState<GeoItem[]>(selected)

  useEffect(() => {
    fetchGeoItems(level).then(data => { setItems(data); setLoading(false) })
  }, [level])

  const filtered = search.trim()
    ? items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()) || i.code.includes(search))
    : items

  const toggle = (item: GeoItem) => {
    setPicked(p =>
      p.some(x => x.code === item.code)
        ? p.filter(x => x.code !== item.code)
        : [...p, item]
    )
  }

  const toggleAll = () => {
    setPicked(p => p.length === items.length ? [] : [...items])
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,.35)]" onClick={onClose}>
      <div
        className="bg-surface rounded-xl shadow-xl w-[560px] max-h-[80vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[rgba(0,0,0,.07)] flex items-center justify-between flex-shrink-0">
          <div>
            <div className="font-semibold text-warm-1">Filtro Geográfico</div>
            <div className="text-[12px] text-warm-3 mt-[2px]">{picked.length === 0 ? 'Todos os itens selecionados' : `${picked.length} selecionado${picked.length > 1 ? 's' : ''}`}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-bg text-warm-2 text-lg border-none cursor-pointer hover:bg-s2 transition-colors">✕</button>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b border-[rgba(0,0,0,.07)] flex-shrink-0">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar…"
            className="w-full px-3 py-[7px] border border-[rgba(0,0,0,.1)] rounded-lg text-[12.5px] bg-bg outline-none focus:border-blue transition-colors font-[inherit]"
          />
        </div>

        {/* Select all */}
        <div className="px-5 py-2 flex items-center gap-2 border-b border-[rgba(0,0,0,.06)] flex-shrink-0">
          <button
            onClick={toggleAll}
            className="text-[12px] text-blue hover:underline cursor-pointer bg-transparent border-none font-[inherit]"
          >
            {picked.length === items.length ? 'Desmarcar todos' : 'Selecionar todos'}
          </button>
          <span className="text-warm-3 text-[12px]">· {items.length} itens</span>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {loading ? (
            <div className="flex items-center justify-center h-24 text-warm-3 text-[13px]">Carregando…</div>
          ) : filtered.map(item => {
            const active = picked.some(x => x.code === item.code)
            return (
              <label
                key={item.code}
                className={clsx(
                  'flex items-center gap-3 px-5 py-[8px] cursor-pointer transition-colors border-b border-[rgba(0,0,0,.04)]',
                  active ? 'bg-blue-lt' : 'hover:bg-bg'
                )}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggle(item)}
                  className="w-[14px] h-[14px] accent-blue flex-shrink-0"
                />
                <span className="text-[12px] text-warm-3 w-10 flex-shrink-0 font-mono">{item.code}</span>
                <span className={clsx('text-[12.5px] flex-1', active ? 'text-blue font-medium' : 'text-warm-1')}>
                  {item.label}
                </span>
              </label>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[rgba(0,0,0,.07)] flex items-center justify-end gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-[7px] rounded-lg text-[13px] text-warm-2 border border-[rgba(0,0,0,.1)] bg-transparent cursor-pointer hover:bg-bg transition-colors font-[inherit]"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(picked)}
            className="px-4 py-[7px] rounded-lg text-[13px] font-semibold text-white bg-blue border-none cursor-pointer hover:brightness-110 transition-all"
          >
            Aplicar filtro
          </button>
        </div>
      </div>
    </div>
  )
}
