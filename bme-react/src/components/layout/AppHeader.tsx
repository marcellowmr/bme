import { Link, useNavigate } from 'react-router-dom'
import { useQueryStore } from '../../store/useQueryStore'

interface Props {
  breadcrumb?: { label: string; to?: string }[]
  actions?: React.ReactNode
}

export default function AppHeader({ breadcrumb, actions }: Props) {
  const user = useQueryStore(s => s.user)
  const setUser = useQueryStore(s => s.setUser)
  const navigate = useNavigate()

  return (
    <header className="bg-surface border-b border-[rgba(0,0,0,.07)] h-[52px] px-3 flex items-center gap-3 flex-shrink-0 z-40">
      <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
        <span className="bg-blue text-white font-extrabold text-[12px] px-[7px] py-[3px] rounded-[6px] tracking-widest">BME</span>
      </Link>

      {breadcrumb && (
        <nav className="flex items-center gap-1 text-[13px] text-warm-3 min-w-0">
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1 min-w-0">
              {i > 0 && <span className="text-[rgba(0,0,0,.15)] text-base">›</span>}
              {b.to
                ? <Link to={b.to} className="text-blue hover:underline truncate">{b.label}</Link>
                : <span className="text-warm-2 font-medium truncate">{b.label}</span>
              }
            </span>
          ))}
        </nav>
      )}

      <div className="ml-auto flex items-center gap-2">
        {actions}
        {user ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setUser(null); navigate('/login') }}
              className="text-[12px] text-warm-3 hover:text-warm-2 border border-[rgba(0,0,0,.1)] rounded-lg px-3 py-1"
            >
              Sair
            </button>
            <div
              className="w-[30px] h-[30px] rounded-full bg-blue text-white flex items-center justify-center text-[12px] font-bold cursor-pointer"
              title={user.fullName}
            >
              {user.fullName[0]}
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue text-white text-[12.5px] font-semibold px-3 py-[6px] rounded-lg hover:bg-blue-dk transition-colors"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  )
}
