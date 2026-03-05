export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="nav__brand">
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
          </div>
          <p>
            Innovating Tomorrow, Today — building powerful digital products that help businesses grow and thrive in a
            connected world.
          </p>
        </div>

        <div className="footer__column">
          <h4>Services</h4>
          <ul>
            <li>
              <a href="#services">Web Development</a>
            </li>
            <li>
              <a href="#services">Web Designing</a>
            </li>
            <li>
              <a href="#services">Software Development</a>
            </li>
            <li>
              <a href="#services">Mobile Apps</a>
            </li>
            <li>
              <a href="#services">Ecommerce Solutions</a>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#process">How We Work</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h4>Connect</h4>
          <ul className="footer__socials">
            <li>
              <a href="#">LinkedIn</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Dribbble</a>
            </li>
            <li>
              <a href="#">Behance</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Veltrix Tech Solutions. All rights reserved.</p>
        <div className="footer__social-icons">
          <a href="#" aria-label="LinkedIn" className="social-icon">
            in
          </a>
          <a href="#" aria-label="Twitter" className="social-icon">
            tw
          </a>
          <a href="#" aria-label="Facebook" className="social-icon">
            fb
          </a>
          <a href="#" aria-label="Instagram" className="social-icon">
            ig
          </a>
        </div>
      </div>
    </footer>
  )
}

