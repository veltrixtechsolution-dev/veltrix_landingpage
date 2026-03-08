export function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg-grid" />
      <div className="hero__gradient" />

      <div className="hero__content">
        <div className="hero__badge reveal">
          <span className="hero__badge-dot" />
          <span>* Innovating Tomorrow, Today</span>
        </div>

        <h1 className="hero__title reveal">
          VELTRIX
          <br />
          <span>TECH</span>
          <br />
          SOLUTIONS
        </h1>

        <p className="hero__subtitle reveal">
          We build powerful digital products — from custom web apps and mobile solutions to
          enterprise software that scales with your ambitions.
        </p>

        <div className="hero__actions reveal">
          <a href="#services" className="btn btn--primary">
            View Packages →
          </a>
          <a href="#contact" className="btn btn--outline">
            Start a Project
          </a>
        </div>
      </div>

      <div className="stats-band reveal">
        <div className="stat">
          <span className="stat__value">
            250<span className="accent">+</span>
          </span>
          <span className="stat__label">Projects Delivered</span>
        </div>
        <div className="stat">
          <span className="stat__value">
            98<span className="accent">%</span>
          </span>
          <span className="stat__label">Client Satisfaction</span>
        </div>
        <div className="stat">
          <span className="stat__value">
            12<span className="accent">+</span>
          </span>
          <span className="stat__label">Years Experience</span>
        </div>
        <div className="stat">
          <span className="stat__value">
            40<span className="accent">+</span>
          </span>
          <span className="stat__label">Team Experts</span>
        </div>
      </div>
    </section>
  )
}

