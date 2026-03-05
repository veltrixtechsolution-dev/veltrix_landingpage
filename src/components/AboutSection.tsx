export function AboutSection() {
  return (
    <section id="about" className="section section--about">
      <div className="section__inner">
        <div className="section__left">
          <p className="section__eyebrow">ABOUT US</p>
          <h2 className="section__title">Built to Drive Results</h2>
          <p className="section__lead">
            Veltrix Tech Solutions is a full-service technology partner helping businesses of all
            sizes build, scale, and innovate through smart digital strategies.
          </p>

          <ul className="bullets">
            <li>Dedicated team of senior engineers &amp; designers</li>
            <li>End-to-end development from concept to launch</li>
            <li>Agile methodology with transparent communication</li>
            <li>Post-launch support &amp; continuous optimization</li>
            <li>Proven track record across 15+ industries</li>
          </ul>

          <a href="#contact" className="btn btn--primary section__cta">
            Work With Us →
          </a>
        </div>

        <div className="section__right about-cards">
          <article className="about-card reveal">
            <div className="about-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <h3>Performance-First Development</h3>
            <p>
              Every solution we build is optimized for speed, scalability, and real business
              impact — cutting corners is not in our vocabulary.
            </p>
          </article>

          <article className="about-card reveal">
            <div className="about-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Security &amp; Reliability</h3>
            <p>
              Enterprise-grade security practices baked into every layer of our architecture, so
              your data stays protected and your uptime stays high.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

