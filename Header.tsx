import './Header.css'

type HeaderProps = {
  title: string
  subtitle?: string
}

export function HeaderComponent({ title, subtitle }: HeaderProps) {
  return (
    <div className="page-header">
      <h1 className="page-header-title">{title}</h1>
      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
    </div>
  )
}

