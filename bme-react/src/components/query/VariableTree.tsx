import { useState } from 'react'
import clsx from 'clsx'
import type { Variable, VariableGroup } from '../../types'
import { isVariable } from '../../types'
import { useQueryStore } from '../../store/useQueryStore'

function InfoBtn({ item, className }: { item: Variable | VariableGroup; className?: string }) {
  const metaItem = useQueryStore(s => s.metaItem)
  const setMetaItem = useQueryStore(s => s.setMetaItem)
  const isActive = metaItem?.id === item.id

  if (!item.description && !item.notes && !(isVariable(item) && (item.source || item.categories?.length || item.aggregations?.length))) {
    return null
  }

  return (
    <button
      onClick={e => { e.stopPropagation(); setMetaItem(isActive ? null : item) }}
      title="Ver metainformação"
      className={clsx(
        'w-5 h-5 rounded flex items-center justify-center text-[11px] leading-none border-none cursor-pointer transition-all flex-shrink-0',
        isActive
          ? 'bg-blue text-white'
          : 'bg-transparent text-warm-3 hover:bg-blue-lt hover:text-blue opacity-0 group-hover:opacity-100',
        className
      )}
    >
      ⓘ
    </button>
  )
}

interface Props { groups: VariableGroup[] }

export default function VariableTree({ groups }: Props) {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'tree'|'ai'>('tree')

  const filtered = search.trim()
    ? filterTree(groups, search.toLowerCase())
    : groups

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* tabs */}
      <div className="flex bg-bg rounded-[8px] p-[3px] gap-[2px] mx-3 mt-3 mb-2 flex-shrink-0">
        {(['tree','ai'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              'flex-1 py-[5px] text-[12px] rounded-[6px] border-none cursor-pointer font-[inherit] transition-all',
              tab === t ? 'bg-surface text-warm-1 font-semibold shadow-sm' : 'bg-transparent text-warm-3'
            )}
          >
            {t === 'tree' ? 'Árvore' : '✦ Busca IA'}
          </button>
        ))}
      </div>

      {/* search */}
      <div className="relative px-3 mb-2 flex-shrink-0">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-3 text-[13px]">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filtrar variáveis…"
          className="w-full pl-7 pr-3 py-[6px] border border-[rgba(0,0,0,.1)] rounded-lg text-[12.5px] bg-bg outline-none focus:border-blue focus:bg-surface transition-colors font-[inherit]"
        />
      </div>

      {/* tree */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filtered.map(g => <GroupNode key={g.id} group={g} depth={0} expandByDefault={!!search} />)}
      </div>
    </div>
  )
}

function GroupNode({ group, depth, expandByDefault }: { group: VariableGroup; depth: number; expandByDefault: boolean }) {
  const [open, setOpen] = useState(depth === 0 || expandByDefault)
  return (
    <div className="group">
      <div
        className="flex items-center gap-[5px] pr-2 text-[12.5px] text-warm-2 hover:bg-bg transition-colors"
        style={{ paddingLeft: 12 + depth * 14 }}
      >
        <button
          onClick={() => setOpen(o => !o)}
          className="flex-1 flex items-center gap-[5px] py-[5px] cursor-pointer border-none bg-transparent font-[inherit] text-left text-inherit min-w-0"
        >
          <span className="text-[9px] text-warm-3 w-3 flex-shrink-0">{open ? '▼' : '▶'}</span>
          <span className="text-[13px]">📁</span>
          <span className="flex-1 text-left truncate">{group.label}</span>
        </button>
        <InfoBtn item={group} />
      </div>
      {open && (
        <div>
          {group.children.map(child =>
            isVariable(child)
              ? <VariableLeaf key={child.id} variable={child} depth={depth + 1} />
              : <GroupNode key={child.id} group={child} depth={depth + 1} expandByDefault={expandByDefault} />
          )}
        </div>
      )}
    </div>
  )
}

function VariableLeaf({ variable, depth }: { variable: Variable; depth: number }) {
  const addToRows = useQueryStore(s => s.addToRows)
  const addMeasure = useQueryStore(s => s.addMeasure)
  const rows = useQueryStore(s => s.rows)
  const measures = useQueryStore(s => s.measures)

  const inRows     = rows.some(r => r.id === variable.id)
  const inMeasures = measures.some(m => m.variable.id === variable.id)
  const selected   = inRows || inMeasures

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation()
    if (variable.type === 'categorical') {
      addToRows(variable)
    } else {
      addMeasure({ variable, aggregation: variable.aggregations?.[0] ?? 'Média' })
    }
  }

  return (
    <div
      className={clsx(
        'flex items-center gap-[5px] py-[5px] pr-2 text-[12.5px] group transition-colors cursor-pointer',
        selected ? 'bg-blue-lt text-blue' : 'text-warm-2 hover:bg-bg'
      )}
      style={{ paddingLeft: 12 + depth * 14 }}
      onClick={handleAdd}
    >
      <span className="w-3 flex-shrink-0" />
      <span className="text-[13px]">📄</span>
      <span className="flex-1 leading-tight min-w-0 truncate">{variable.label}</span>
      <span className={clsx(
        'text-[10px] font-semibold px-[5px] py-[1px] rounded flex-shrink-0',
        variable.type === 'categorical' ? 'bg-amb-lt text-amb' : 'bg-blue-lt text-blue'
      )}>
        {variable.type === 'categorical' ? 'Cat' : 'Num'}
      </span>
      <InfoBtn item={variable} />
      {!selected && (
        <button
          onClick={handleAdd}
          className="w-5 h-5 rounded bg-blue-lt text-blue text-[14px] border-none cursor-pointer hidden group-hover:flex items-center justify-center leading-none flex-shrink-0"
        >+</button>
      )}
    </div>
  )
}

// ── Filter helpers ───────────────────────────────────────────────────────────

function filterTree(groups: VariableGroup[], q: string): VariableGroup[] {
  return groups.flatMap(g => {
    const filtered = filterChildren(g.children, q)
    if (!filtered.length) return []
    return [{ ...g, children: filtered }]
  })
}

function filterChildren(children: (Variable | VariableGroup)[], q: string): (Variable | VariableGroup)[] {
  const result: (Variable | VariableGroup)[] = []
  for (const child of children) {
    if (isVariable(child)) {
      if (child.label.toLowerCase().includes(q) || child.code.toLowerCase().includes(q)) result.push(child)
    } else {
      const filtered = filterChildren(child.children, q)
      if (!filtered.length && !child.label.toLowerCase().includes(q)) continue
      result.push({ ...child, children: filtered.length ? filtered : child.children })
    }
  }
  return result
}
