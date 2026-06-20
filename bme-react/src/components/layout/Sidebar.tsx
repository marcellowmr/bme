import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const items = [
  { to: '/',        icon: '⌂',  title: 'Início'            },
  { to: '/builder', icon: '⊞',  title: 'Construtor'        },
  { to: '/ai',      icon: '✦',  title: 'Busca com IA'      },
]

const bottom = [
  { to: '#', icon: '☆', title: 'Favoritos'            },
  { to: '#', icon: '⊟', title: 'Minhas consultas'     },
  { to: '#', icon: '⊛', title: 'Consultas oficiais'   },
]

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <nav className="w-[52px] flex-shrink-0 bg-surface border-r border-[rgba(0,0,0,.07)] flex flex-col items-center py-2 gap-[2px] overflow-hidden">
      <Link
        to="/builder"
        className="w-9 h-9 rounded-[9px] bg-blue text-white flex items-center justify-center text-xl font-bold mb-1 shadow-sm hover:bg-blue-dk transition-colors"
        title="Nova consulta"
      >+</Link>

      {items.map(item => (
        <SideIcon key={item.to} {...item} active={pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to))} />
      ))}

      <div className="w-6 h-px bg-[rgba(0,0,0,.07)] my-1" />

      {bottom.map(item => (
        <SideIcon key={item.title} {...item} active={false} />
      ))}
    </nav>
  )
}

function SideIcon({ to, icon, title, active }: { to: string; icon: string; title: string; active: boolean }) {
  return (
    <Link
      to={to}
      title={title}
      className={clsx(
        'w-9 h-9 rounded-lg flex items-center justify-center text-[17px] transition-all no-underline relative group',
        active ? 'bg-blue-lt text-blue' : 'text-warm-g hover:bg-bg hover:text-warm-1'
      )}
    >
      {icon}
      <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-warm-1 text-white text-[11px] whitespace-nowrap px-2 py-1 rounded-[5px] opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
        {title}
      </span>
    </Link>
  )
}
