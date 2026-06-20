import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import AppHeader from '../components/layout/AppHeader'
import GovBar from '../components/layout/GovBar'
import Sidebar from '../components/layout/Sidebar'
import { useQueryStore } from '../store/useQueryStore'

interface Message {
  role: 'user' | 'assistant'
  text: string
  config?: {
    rows: string[]
    measures: string[]
    researchId: string
  }
}

const CANNED: Record<string, Message> = {
  default: {
    role: 'assistant',
    text: 'Encontrei variáveis relevantes no **Censo 2010**. Sugiro cruzar **Cor ou raça** e **Sexo** com o **Rendimento domiciliar médio**. Isso permitirá comparar desigualdades de renda por gênero e raça.',
    config: { researchId: 'CD2010', rows: ['Cor ou raça', 'Sexo'], measures: ['Rendimento domiciliar · Média'] },
  },
  renda: {
    role: 'assistant',
    text: 'Para analisar renda e educação, recomendo cruzar **Nível de instrução** com **Rendimento domiciliar médio** no Censo 2010. Você pode adicionar **Sexo** para uma análise interseccional mais completa.',
    config: { researchId: 'CD2010', rows: ['Nível de instrução', 'Sexo'], measures: ['Rendimento domiciliar · Média'] },
  },
  bens: {
    role: 'assistant',
    text: 'Ótima análise! Vou sugerir **Automóvel**, **Máquina de lavar** e **Microcomputador com internet** como variáveis de bens duráveis, com **Rendimento domiciliar** como medida. Os dados são do **Censo 2010**.',
    config: { researchId: 'CD2010', rows: ['Automóvel, existência', 'Máquina de lavar, existência', 'Microcomp. c/ Internet'], measures: ['Rendimento domiciliar · Média'] },
  },
}

function pickResponse(text: string): Message {
  const lower = text.toLowerCase()
  if (lower.includes('renda') || lower.includes('escolar') || lower.includes('educaç')) return CANNED.renda
  if (lower.includes('bem') || lower.includes('bem durável') || lower.includes('automóvel') || lower.includes('computador')) return CANNED.bens
  return CANNED.default
}

export default function AISearchPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Olá! Descreva a análise que você quer fazer e eu sugerirei as variáveis e pesquisas adequadas. Por exemplo: *"quero ver renda por escolaridade e sexo"*.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const loadConfig = useQueryStore(s => s.loadConfig)
  const navigate = useNavigate()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const userMsg: Message = { role: 'user', text }
    setMessages(m => [...m, userMsg])
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    const reply = pickResponse(text)
    setMessages(m => [...m, reply])
    setLoading(false)
  }

  function useConfig(msg: Message) {
    if (!msg.config) return
    const researchId = msg.config.researchId
    const store = useQueryStore.getState()
    store.setResearchId(researchId)
    navigate('/builder')
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <GovBar />
      <AppHeader breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Busca com IA' }]} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden bg-bg">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 max-w-3xl w-full mx-auto">
            {messages.map((msg, i) => (
              <div key={i} className={clsx('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-ai-lt text-ai flex items-center justify-center text-[13px] flex-shrink-0 mr-2 mt-1">✦</div>
                )}
                <div className={clsx(
                  'max-w-[75%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-blue text-white rounded-tr-sm'
                    : 'bg-surface text-warm-1 rounded-tl-sm border border-[rgba(0,0,0,.07)] shadow-sm'
                )}>
                  <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }} />

                  {msg.config && (
                    <div className="mt-3 pt-3 border-t border-[rgba(0,0,0,.08)]">
                      <div className="text-[11px] font-semibold text-warm-3 uppercase tracking-wider mb-2">Variáveis sugeridas</div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {msg.config.rows.map(v => (
                          <span key={v} className="bg-amb-lt text-amb border border-amb-mid text-[11px] px-2 py-[2px] rounded-full">{v}</span>
                        ))}
                        {msg.config.measures.map(m => (
                          <span key={m} className="bg-grn-lt text-grn border border-grn-mid text-[11px] px-2 py-[2px] rounded-full">{m}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => useConfig(msg)}
                        className="w-full py-[7px] rounded-lg bg-blue text-white text-[12px] font-semibold border-none cursor-pointer hover:brightness-110 transition-all"
                      >
                        Abrir no construtor →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full bg-ai-lt text-ai flex items-center justify-center text-[13px] flex-shrink-0">✦</div>
                <div className="bg-surface border border-[rgba(0,0,0,.07)] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-[6px] h-[6px] rounded-full bg-warm-3 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[rgba(0,0,0,.07)] bg-surface px-4 py-3 flex-shrink-0">
            <div className="max-w-3xl mx-auto flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Descreva a análise desejada…"
                className="flex-1 px-4 py-[10px] border border-[rgba(0,0,0,.12)] rounded-xl text-[13px] bg-bg outline-none focus:border-ai focus:bg-surface transition-colors font-[inherit]"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="px-4 py-[10px] bg-ai text-white rounded-xl text-[13px] font-semibold border-none cursor-pointer hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ✦ Enviar
              </button>
            </div>
            <p className="text-center text-[11px] text-warm-3 mt-2 max-w-3xl mx-auto">
              Sugestões geradas por IA — revise antes de executar a consulta.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
