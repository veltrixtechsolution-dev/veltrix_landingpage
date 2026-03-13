export function Hero() {
  return (
    <section id="hero" className="hero hero--veltrix">
      {/* Circuit background */}
      <div className="hero-bg">
        <svg viewBox="150 150 600 500" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff4d1c" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#ff4d1c" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="hero-glow2" cx="70%" cy="30%" r="40%">
              <stop offset="0%" stopColor="#5080ff" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#5080ff" stopOpacity={0} />
            </radialGradient>
          </defs>
          <rect width="800" height="800" fill="url(#hero-glow)" />
          <rect width="800" height="800" fill="url(#hero-glow2)" />
          <path d="M400 20 L400 120 L520 120 L520 240 L680 240 L680 400" fill="none" stroke="#ff4d1c" strokeWidth="1.5" opacity={0.5} className="circuit-path" />
          <path d="M400 20 L400 120 L280 120 L280 240 L120 240 L120 400" fill="none" stroke="#ff4d1c" strokeWidth="1.5" opacity={0.4} className="circuit-path" style={{ animationDelay: '-1.3s' }} />
          <path d="M120 400 L120 560 L280 560 L280 680 L400 680" fill="none" stroke="#ff4d1c" strokeWidth="1.5" opacity={0.45} className="circuit-path" style={{ animationDelay: '-2s' }} />
          <path d="M680 400 L680 560 L520 560 L520 680 L400 680" fill="none" stroke="#ff4d1c" strokeWidth="1.5" opacity={0.4} className="circuit-path" style={{ animationDelay: '-0.7s' }} />
          <path d="M280 240 L400 240 L400 560 L280 560" fill="none" stroke="#5080ff" strokeWidth="1" opacity={0.3} className="circuit-path" style={{ animationDelay: '-1s' }} />
          <path d="M520 240 L400 400 L520 560" fill="none" stroke="#5080ff" strokeWidth="1" opacity={0.25} className="circuit-path" style={{ animationDelay: '-1.7s' }} />
          <path d="M120 240 L20 240 L20 560 L120 560" fill="none" stroke="#ff4d1c" strokeWidth="1" opacity={0.2} className="circuit-path" style={{ animationDelay: '-0.4s' }} />
          <path d="M680 240 L780 240 L780 560 L680 560" fill="none" stroke="#ff4d1c" strokeWidth="1" opacity={0.2} className="circuit-path" style={{ animationDelay: '-2.2s' }} />
          <path d="M280 120 L280 20 L520 20 L520 120" fill="none" stroke="#5080ff" strokeWidth="1" opacity={0.2} className="circuit-path" style={{ animationDelay: '-1.5s' }} />
          <path d="M280 680 L280 780 L520 780 L520 680" fill="none" stroke="#5080ff" strokeWidth="1" opacity={0.2} className="circuit-path" style={{ animationDelay: '-0.9s' }} />
          <circle cx="400" cy="400" r="18" fill="#ff4d1c" opacity={0.9} />
          <circle cx="400" cy="400" r="30" fill="none" stroke="#ff4d1c" strokeWidth="1.5" opacity={0.4} />
          <circle cx="400" cy="400" r="50" fill="none" stroke="#ff4d1c" strokeWidth="0.8" opacity={0.2} />
          <circle cx="400" cy="400" r="80" fill="none" stroke="#ff4d1c" strokeWidth="0.5" opacity={0.1} />
          <circle cx="400" cy="20" r="6" fill="#ff4d1c" className="node-blink" />
          <circle cx="520" cy="120" r="5" fill="#ff4d1c" className="node-blink" style={{ animationDelay: '-0.5s' }} />
          <circle cx="280" cy="120" r="5" fill="#ff4d1c" className="node-blink" style={{ animationDelay: '-1s' }} />
          <circle cx="680" cy="240" r="7" fill="#ff4d1c" className="node-blink" style={{ animationDelay: '-1.5s' }} />
          <circle cx="120" cy="240" r="7" fill="#5080ff" className="node-blink" style={{ animationDelay: '-0.8s' }} />
          <circle cx="680" cy="400" r="6" fill="#ff4d1c" className="node-blink" style={{ animationDelay: '-2.1s' }} />
          <circle cx="120" cy="400" r="6" fill="#5080ff" className="node-blink" style={{ animationDelay: '-0.3s' }} />
          <circle cx="120" cy="560" r="5" fill="#5080ff" className="node-blink" style={{ animationDelay: '-1.6s' }} />
          <circle cx="680" cy="560" r="5" fill="#ff4d1c" className="node-blink" style={{ animationDelay: '-1.2s' }} />
          <circle cx="280" cy="560" r="5" fill="#5080ff" className="node-blink" style={{ animationDelay: '-0.6s' }} />
          <circle cx="520" cy="560" r="5" fill="#ff4d1c" className="node-blink" style={{ animationDelay: '-1.9s' }} />
          <circle cx="400" cy="680" r="6" fill="#ff4d1c" className="node-blink" style={{ animationDelay: '-0.3s' }} />
          <circle cx="20" cy="240" r="4" fill="rgba(255,255,255,0.2)" className="node-blink" style={{ animationDelay: '-2.3s' }} />
          <circle cx="780" cy="240" r="4" fill="rgba(255,255,255,0.2)" className="node-blink" style={{ animationDelay: '-1.1s' }} />
          <circle cx="20" cy="560" r="4" fill="rgba(255,255,255,0.15)" className="node-blink" style={{ animationDelay: '-0.7s' }} />
          <circle cx="780" cy="560" r="4" fill="rgba(255,255,255,0.15)" className="node-blink" style={{ animationDelay: '-1.8s' }} />
          <circle cx="400" cy="120" r="3" fill="rgba(255,255,255,0.25)" />
          <circle cx="400" cy="240" r="3" fill="rgba(255,255,255,0.2)" />
          <circle cx="400" cy="560" r="3" fill="rgba(255,255,255,0.2)" />
          <circle cx="280" cy="400" r="3" fill="rgba(80,128,255,0.4)" />
          <circle cx="520" cy="400" r="3" fill="rgba(80,128,255,0.4)" />
          <circle cx="400" cy="400" r="360" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="6 12" />
        </svg>
      </div>

      <div className="hero__container">
      <div className="hero-left">
        <div className="badge reveal">
          <span className="badge-dot" />
          <span>Innovating Tomorrow, Today</span>
        </div>

        <h1 className="hero-title reveal">
          We Build <span className="accent">Digital</span>
          <br />
          Products That <span className="accent">Scale.</span>
        </h1>

        <p className="hero-subtitle reveal">
          From custom web apps and mobile solutions to enterprise software — Veltrix delivers technology that grows with your ambitions.
        </p>

        <div className="hero-ctas reveal">
          <a href="#services" className="btn btn--primary">View Packages →</a>
          <a href="#contact" className="btn btn--outline">Start a Project</a>
        </div>

        <div className="hero-stats reveal">
          <div>
            <div className="stat-num">150+</div>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div>
            <div className="stat-num">98%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div>
            <div className="stat-num">8yr</div>
            <div className="stat-label">In Business</div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
