import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main">
        <Link to="/" className="nav__brand">
          <div className="nav__logo" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M4 10L20 28L36 10" stroke="#0c132a" strokeWidth="0" fill="none" />
              <path d="M5 8L20 24L35 8H29L20 18L11 8H5Z" fill="#0c132a" />
              <path d="M5 16L20 32L35 16H29L20 26L11 16H5Z" fill="#0c132a" />
              <path d="M5 8L20 24L35 8H29L20 18L11 8H5Z" fill="#f5f7ff" />
              <path d="M6 9L20 23L34 9H29L20 17L11 9H6Z" fill="#cfd5e6" />
              <path d="M7 17L20 31L33 17H28L20 25L12 17H7Z" fill="#f5f7ff" />
            </svg>
          </div>
          <div className="nav__brand-text">
            <span className="nav__brand-title">VELTRIX</span>
            <span className="nav__brand-sub">TECH&nbsp;&nbsp;SOLUTIONS</span>
          </div>
        </Link>

        <ul className="nav__links">
          <li>
            <a href={isHome ? '#about' : '/#about'}>About</a>
          </li>
          <li>
            <a href={isHome ? '#services' : '/#services'}>Packages</a>
          </li>
          <li>
            <a href={isHome ? '#process' : '/#process'}>Process</a>
          </li>
          <li>
            <a href={isHome ? '#contact' : '/#contact'}>Contact</a>
          </li>
        </ul>

        <Link to="/templates" className="btn btn--primary nav__cta">
          Get Started
        </Link>
      </nav>
    </header>
  )
}

