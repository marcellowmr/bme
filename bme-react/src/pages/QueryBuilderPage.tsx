import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/layout/AppHeader'
import GovBar from '../components/layout/GovBar'
import Sidebar from '../components/layout/Sidebar'
import VariableTree from '../components/query/VariableTree'
import AxesComposer from '../components/query/AxesComposer'
import GeoBar from '../components/query/GeoBar'
import MetaPanel from '../components/query/MetaPanel'
import ResultTable from '../components/query/ResultTable'
import ResultChart from '../components/query/ResultChart'
import { useQueryStore } from '../store/useQueryStore'
import { fetchResearch } from '../data/researches'
import type { Research } from '../types'

type ViewTab = 'table' | 'chart'

export default function QueryBuilderPage() {
  const researchId = useQueryStore(s => s.researchId)
  const result = useQueryStore(s => s.result)
  const isRunning = useQueryStore(s => s.isRunning)
  const error = useQueryStore(s => s.error)
  const resetQuery = useQueryStore(s => s.resetQuery)
  const metaItem = useQueryStore(s => s.metaItem)
  const setMetaItem = useQueryStore(s => s.setMetaItem)

  const [research, setResearch] = useState<Research | null>(null)
  const [viewTab, setViewTab] = useState<ViewTab>('table')
  const [treeOpen, setTreeOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!researchId) return
    fetchResearch(researchId).then(r => setResearch(r ?? null))
  }, [researchId])

  if (!researchId) {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <GovBar />
        <AppHeader breadcrumb={[{ label: 'Construtor' }]} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center bg-bg flex-col gap-4">
            <div className="text-[40px]">⊞</div>
            <div className="text-[18px] font-semibold text-warm-1">Selecione uma pesquisa</div>
            <p className="text-[13px] text-warm-3 text-center max-w-xs">
              Acesse a página inicial para escolher uma pesquisa ou consulta oficial.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-[9px] bg-blue text-white rounded-lg text-[13px] font-semibold border-none cursor-pointer hover:brightness-110 transition-all"
            >
              Ir para início
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <GovBar />
      <AppHeader
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: research?.shortName ?? researchId },
        ]}
        actions={
          <button
            onClick={resetQuery}
            className="text-[12px] text-warm-3 hover:text-warm-1 border border-[rgba(0,0,0,.1)] rounded-lg px-3 py-1 bg-transparent cursor-pointer font-[inherit] transition-colors"
          >
            ↺ Nova consulta
          </button>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Tree panel */}
        <div className={`flex-shrink-0 bg-surface border-r border-[rgba(0,0,0,.07)] flex flex-col overflow-hidden transition-all duration-200 ${treeOpen ? 'w-[240px]' : 'w-0'}`}>
          {research && <VariableTree groups={research.tree} />}
        </div>

        {/* Toggle strip */}
        <button
          onClick={() => setTreeOpen(o => !o)}
          title={treeOpen ? 'Recolher árvore' : 'Expandir árvore'}
          className="w-4 flex-shrink-0 bg-bg border-r border-[rgba(0,0,0,.07)] flex items-center justify-center text-warm-3 hover:text-warm-1 hover:bg-s2 transition-colors cursor-pointer border-none"
        >
          <span className="text-[9px]">{treeOpen ? '‹' : '›'}</span>
        </button>

        {/* Meta panel */}
        {metaItem && (
          <MetaPanel item={metaItem} onClose={() => setMetaItem(null)} />
        )}

        {/* Main area — click anywhere here closes the meta panel */}
        <div className="flex-1 flex flex-col overflow-hidden" onClick={() => metaItem && setMetaItem(null)}>
          <GeoBar />
          <AxesComposer />

          {/* Results */}
          <div className="flex-1 flex flex-col overflow-hidden bg-bg">
            {!result && !isRunning && !error && (
              <EmptyState />
            )}
            {isRunning && (
              <div className="flex-1 flex items-center justify-center flex-col gap-3">
                <span className="animate-spin inline-block w-8 h-8 border-[3px] border-blue border-t-transparent rounded-full" />
                <span className="text-[13px] text-warm-3">Executando consulta…</span>
              </div>
            )}
            {error && !isRunning && (
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-[#fef2f2] text-[#b91c1c] text-[13px] px-5 py-4 rounded-xl border border-[#fecaca] max-w-md text-center">
                  {error}
                </div>
              </div>
            )}
            {result && !isRunning && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* View tabs */}
                <div className="flex items-center gap-1 px-4 pt-3 flex-shrink-0">
                  {(['table', 'chart'] as ViewTab[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setViewTab(t)}
                      className={`px-3 py-[5px] text-[12px] rounded-lg border-none cursor-pointer font-[inherit] transition-all ${
                        viewTab === t ? 'bg-blue text-white font-semibold' : 'bg-surface text-warm-2 hover:bg-s2'
                      }`}
                    >
                      {t === 'table' ? '⊟ Tabela' : '⊠ Gráfico'}
                    </button>
                  ))}
                  <div className="ml-auto flex items-center gap-2">
                    <ExportMenu />
                  </div>
                </div>

                <div className="flex-1 overflow-hidden p-3">
                  <div className="bg-surface rounded-xl border border-[rgba(0,0,0,.07)] h-full overflow-hidden">
                    {viewTab === 'table'
                      ? <ResultTable result={result} />
                      : <ResultChart result={result} />
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-2 text-center p-8">
      <div className="text-[40px] opacity-30">⊟</div>
      <div className="text-[16px] font-semibold text-warm-2">Nenhum resultado ainda</div>
      <p className="text-[12.5px] text-warm-3 max-w-xs leading-relaxed">
        Selecione variáveis categóricas para as linhas e pelo menos uma medida numérica. Depois clique em <strong>▶ Executar</strong>.
      </p>
    </div>
  )
}

function ExportMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="px-3 py-[5px] text-[12px] rounded-lg border border-[rgba(0,0,0,.1)] text-warm-2 bg-surface hover:bg-bg cursor-pointer font-[inherit] transition-colors"
      >
        ↓ Exportar ▾
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 bg-surface border border-[rgba(0,0,0,.1)] rounded-lg shadow-lg z-20 min-w-[120px] overflow-hidden">
            {['CSV', 'XLSX', 'JSON'].map(fmt => (
              <button
                key={fmt}
                onClick={() => setOpen(false)}
                className="w-full px-4 py-[8px] text-left text-[12.5px] text-warm-1 hover:bg-bg border-none bg-transparent cursor-pointer font-[inherit]"
              >
                {fmt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
