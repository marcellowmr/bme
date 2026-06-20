import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import AppHeader from '../components/layout/AppHeader'
import GovBar from '../components/layout/GovBar'
import Sidebar from '../components/layout/Sidebar'
import type { OfficialQuery } from '../types'
import { fetchOfficialQueries } from '../data/officialQueries'
import { fetchResearches } from '../data/researches'
import type { Research } from '../types'
import { useQueryStore } from '../store/useQueryStore'

export default function HomePage() {
  const [queries, setQueries] = useState<OfficialQuery[]>([])
  const [researches, setResearches] = useState<Research[]>([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const loadConfig = useQueryStore(s => s.loadConfig)

  useEffect(() => {
    fetchOfficialQueries().then(setQueries)
    fetchResearches().then(setResearches)
  }, [])

  function openQuery(q: OfficialQuery) {
    loadConfig(q.config)
    navigate('/builder')
  }

  const tagColors: Record<string, string> = {
    amb:  'bg-amb-lt text-amb border-amb-mid',
    grn:  'bg-grn-lt text-grn border-grn-mid',
    blue: 'bg-blue-lt text-blue border-blue-mid',
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <GovBar />
      <AppHeader breadcrumb={[{ label: 'Início' }]} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-bg">
          {/* Hero */}
          <div className="bg-surface border-b border-[rgba(0,0,0,.07)] px-8 py-10">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold text-blue uppercase tracking-widest mb-2">IBGE · Banco Multidimensional de Estatísticas</div>
              <h1 className="text-[28px] font-bold text-warm-1 leading-tight mb-3">
                Explore dados censitários e pesquisas do IBGE
              </h1>
              <p className="text-[14px] text-warm-3 mb-5 leading-relaxed">
                Construa tabelas cruzadas, gráficos e mapas com microdados do Censo, PNAD, POF e outras pesquisas. Exporte em CSV, XLSX ou JSON.
              </p>
              {/* AI Search */}
              <div className="flex gap-2 max-w-xl">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ai text-[14px]">✦</span>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && search.trim() && navigate('/ai')}
                    placeholder="Busque com linguagem natural… ex: renda por escolaridade e sexo"
                    className="w-full pl-9 pr-4 py-[10px] border border-[rgba(0,0,0,.12)] rounded-xl text-[13px] bg-bg outline-none focus:border-blue focus:bg-surface transition-colors font-[inherit] shadow-sm"
                  />
                </div>
                <button
                  onClick={() => navigate('/ai')}
                  className="px-4 py-[10px] bg-ai text-white rounded-xl text-[13px] font-semibold border-none cursor-pointer hover:brightness-110 transition-all whitespace-nowrap"
                >
                  ✦ Busca IA
                </button>
                <button
                  onClick={() => navigate('/builder')}
                  className="px-4 py-[10px] bg-blue text-white rounded-xl text-[13px] font-semibold border-none cursor-pointer hover:brightness-110 transition-all whitespace-nowrap"
                >
                  ⊞ Construtor
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 max-w-6xl mx-auto">
            {/* Official queries */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-[16px] font-bold text-warm-1">Consultas oficiais</h2>
                  <p className="text-[12px] text-warm-3 mt-[2px]">Curadas pela equipe do IBGE — clique para abrir e personalizar</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {queries.map(q => (
                  <div
                    key={q.id}
                    onClick={() => openQuery(q)}
                    className="bg-surface rounded-xl p-4 border border-[rgba(0,0,0,.07)] cursor-pointer hover:border-blue hover:shadow-[0_2px_12px_rgba(19,81,180,.1)] transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={clsx('text-[11px] font-semibold px-2 py-[2px] rounded border', tagColors[q.tagColor] ?? tagColors.blue)}>
                        {q.tag}
                      </span>
                      <span className="text-[11px] text-warm-3">{q.varCount} variáveis · {q.geoLabel}</span>
                    </div>
                    <div className="font-semibold text-[14px] text-warm-1 group-hover:text-blue transition-colors mb-1">{q.title}</div>
                    <div className="text-[12px] text-warm-3 leading-relaxed">{q.description}</div>
                    <div className="mt-3 text-[11.5px] text-blue opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      Abrir consulta →
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Research catalog */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-[16px] font-bold text-warm-1">Pesquisas disponíveis</h2>
                  <p className="text-[12px] text-warm-3 mt-[2px]">Acesse o construtor de consultas para qualquer pesquisa</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {researches.map(r => (
                  <div
                    key={r.id}
                    onClick={() => { useQueryStore.getState().setResearchId(r.id); navigate('/builder') }}
                    className="bg-surface rounded-xl p-4 border border-[rgba(0,0,0,.07)] cursor-pointer hover:border-blue hover:shadow-[0_2px_12px_rgba(19,81,180,.1)] transition-all group"
                  >
                    <div className="text-[11px] font-bold text-blue mb-1">{r.code}</div>
                    <div className="font-semibold text-[13px] text-warm-1 leading-tight mb-1 group-hover:text-blue transition-colors">{r.shortName}</div>
                    <div className="text-[11.5px] text-warm-3">{r.year} · {r.varCount} variáveis</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
