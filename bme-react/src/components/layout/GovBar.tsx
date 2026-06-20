export default function GovBar() {
  return (
    <div className="bg-blue-dk text-white text-[11px] px-4 py-[5px] flex items-center gap-3 flex-shrink-0 z-50">
      <span>🇧🇷</span>
      <strong>BRASIL</strong>
      <span className="opacity-30">|</span>
      <a href="#" className="text-blue-mid hover:underline">Acesso à informação</a>
      <a href="#" className="text-blue-mid hover:underline">Participe</a>
      <a href="#" className="text-blue-mid hover:underline">Legislação</a>
    </div>
  )
}
