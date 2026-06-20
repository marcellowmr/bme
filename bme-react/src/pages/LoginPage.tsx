import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useQueryStore } from '../store/useQueryStore'
import type { AuthType } from '../types'

type Tab = 'AD' | 'GOVBR' | 'BME'

const DEMO_USERS: Record<Tab, import('../types').User> = {
  AD:    { id: '1', username: 'joao.silva',  fullName: 'João Silva',    email: 'joao.silva@ibge.gov.br',   authType: 'AD',    profileCode: 'RESEARCHER', allowedResearchIds: ['CD2010','CD2022','PNAD2019','POF2018'], canExportIds: ['CD2010','CD2022'] },
  GOVBR: { id: '2', username: 'cpf12345678', fullName: 'Maria Souza',   email: 'maria@email.com',          authType: 'GOVBR', profileCode: 'PUBLIC',     allowedResearchIds: ['CD2010','CD2022'],                     canExportIds: []               },
  BME:   { id: '3', username: 'admin',       fullName: 'Administrador', email: 'admin@ibge.gov.br',        authType: 'BME',   profileCode: 'ADMIN',      allowedResearchIds: ['CD2010','CD2022','PNAD2019','POF2018'], canExportIds: ['CD2010','CD2022','PNAD2019','POF2018'] },
}

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('AD')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const setUser = useQueryStore(s => s.setUser)
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setUser(DEMO_USERS[tab])
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Gov bar */}
      <div className="bg-blue-dk text-white text-[11px] px-4 py-[5px] flex items-center gap-3">
        <span>🇧🇷</span>
        <strong>BRASIL</strong>
        <span className="opacity-30">|</span>
        <span className="opacity-60">Acesso à informação</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[400px]">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="bg-blue text-white font-extrabold text-[14px] px-[10px] py-[5px] rounded-[8px] tracking-widest">BME</span>
            </div>
            <div className="text-[22px] font-bold text-warm-1">Banco Multidimensional</div>
            <div className="text-[14px] text-warm-3 mt-1">de Estatísticas · IBGE</div>
          </div>

          <div className="bg-surface rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,.08)] overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-[rgba(0,0,0,.07)]">
              {([['AD', 'Usuário de Rede'], ['GOVBR', 'gov.br'], ['BME', 'Conta BME']] as [Tab, string][]).map(([t, label]) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError('') }}
                  className={clsx(
                    'flex-1 py-3 text-[12.5px] font-medium border-none cursor-pointer transition-all font-[inherit]',
                    tab === t
                      ? 'bg-surface text-blue border-b-2 border-blue -mb-px'
                      : 'bg-bg text-warm-3 hover:text-warm-2'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {error && (
                <div className="bg-[#fef2f2] text-[#b91c1c] text-[12.5px] px-3 py-2 rounded-lg mb-4 border border-[#fecaca]">
                  {error}
                </div>
              )}

              {tab === 'GOVBR' ? (
                <GovBrTab onLogin={handleLogin} loading={loading} />
              ) : tab === 'AD' ? (
                <ADTab onLogin={handleLogin} loading={loading} />
              ) : (
                <BMETab onLogin={handleLogin} loading={loading} showPwd={showPwd} setShowPwd={setShowPwd} />
              )}
            </div>
          </div>

          <p className="text-center text-[11.5px] text-warm-3 mt-4">
            Acesso público disponível sem login ·{' '}
            <button onClick={() => navigate('/')} className="text-blue hover:underline bg-transparent border-none cursor-pointer font-[inherit]">
              Continuar sem entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

function ADTab({ onLogin, loading }: { onLogin: (e: React.FormEvent) => void; loading: boolean }) {
  return (
    <form onSubmit={onLogin} className="flex flex-col gap-4">
      <div>
        <label className="block text-[12px] font-semibold text-warm-2 mb-1">Usuário de rede</label>
        <div className="flex rounded-lg border border-[rgba(0,0,0,.12)] overflow-hidden focus-within:border-blue transition-colors">
          <span className="px-3 bg-bg text-warm-3 text-[12.5px] flex items-center border-r border-[rgba(0,0,0,.1)] flex-shrink-0">IBGE\</span>
          <input
            defaultValue="joao.silva"
            placeholder="usuario"
            className="flex-1 px-3 py-[9px] text-[13px] bg-transparent outline-none font-[inherit]"
          />
        </div>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-warm-2 mb-1">Senha</label>
        <input
          type="password"
          defaultValue="demo"
          placeholder="Senha de rede"
          className="w-full px-3 py-[9px] border border-[rgba(0,0,0,.12)] rounded-lg text-[13px] bg-bg outline-none focus:border-blue transition-colors font-[inherit]"
        />
      </div>
      <SubmitBtn loading={loading}>Entrar com AD</SubmitBtn>
      <p className="text-[11px] text-warm-3 text-center -mt-1">Autenticação via Active Directory (Kerberos/LDAP)</p>
    </form>
  )
}

function GovBrTab({ onLogin, loading }: { onLogin: (e: React.FormEvent) => void; loading: boolean }) {
  return (
    <form onSubmit={onLogin} className="flex flex-col gap-4 items-center py-2">
      <div className="w-16 h-16 rounded-full bg-[#1351b4] flex items-center justify-center text-3xl">🇧🇷</div>
      <div className="text-center">
        <div className="font-semibold text-warm-1">Entrar com gov.br</div>
        <div className="text-[12px] text-warm-3 mt-1">Utilize seu CPF e senha cadastrados no portal do governo federal</div>
      </div>
      <SubmitBtn loading={loading} className="w-full bg-[#1351b4]">
        Acessar gov.br
      </SubmitBtn>
      <p className="text-[11px] text-warm-3 text-center">Você será redirecionado para o portal gov.br</p>
    </form>
  )
}

function BMETab({ onLogin, loading, showPwd, setShowPwd }: {
  onLogin: (e: React.FormEvent) => void
  loading: boolean
  showPwd: boolean
  setShowPwd: (v: boolean) => void
}) {
  return (
    <form onSubmit={onLogin} className="flex flex-col gap-4">
      <div>
        <label className="block text-[12px] font-semibold text-warm-2 mb-1">E-mail ou usuário</label>
        <input
          defaultValue="admin"
          placeholder="usuario@ibge.gov.br"
          className="w-full px-3 py-[9px] border border-[rgba(0,0,0,.12)] rounded-lg text-[13px] bg-bg outline-none focus:border-blue transition-colors font-[inherit]"
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[12px] font-semibold text-warm-2">Senha</label>
          <button type="button" className="text-[11.5px] text-blue hover:underline bg-transparent border-none cursor-pointer font-[inherit]">Esqueci a senha</button>
        </div>
        <div className="flex rounded-lg border border-[rgba(0,0,0,.12)] overflow-hidden focus-within:border-blue transition-colors">
          <input
            type={showPwd ? 'text' : 'password'}
            defaultValue="demo"
            placeholder="Senha"
            className="flex-1 px-3 py-[9px] text-[13px] bg-transparent outline-none font-[inherit]"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="px-3 text-warm-3 hover:text-warm-1 bg-transparent border-none cursor-pointer text-[13px]"
          >
            {showPwd ? '🙈' : '👁'}
          </button>
        </div>
      </div>
      <SubmitBtn loading={loading}>Entrar no BME</SubmitBtn>
    </form>
  )
}

function SubmitBtn({ children, loading, className }: { children: React.ReactNode; loading: boolean; className?: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={clsx(
        'w-full py-[10px] rounded-lg text-[13.5px] font-semibold text-white border-none cursor-pointer transition-all',
        loading ? 'bg-warm-3 cursor-not-allowed' : 'bg-blue hover:brightness-110',
        className
      )}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
          Autenticando…
        </span>
      ) : children}
    </button>
  )
}
