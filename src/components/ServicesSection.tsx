export function ServicesSection() {
  return (
    <section id="services" className="section section--services">
      <div className="section__inner section__inner--header">
        <div>
          <p className="section__eyebrow">WHAT WE OFFER</p>
          <h2 className="section__title">Our Services</h2>
          <p className="section__lead">
            A wide variety of technology services to help you kickstart and grow your business.
          </p>
        </div>
        <a href="#contact" className="btn btn--ghost">
          All Services →
        </a>
      </div>

      <div className="services-grid">
        <article className="service-card reveal">
          <span className="service-card__index">01</span>
          <div className="service-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <h3>Web Development</h3>
          <p>
            We create stunning and functional websites designed to engage users and drive
            conversions with clean, maintainable code.
          </p>
        </article>

        <article className="service-card reveal">
          <span className="service-card__index">02</span>
          <div className="service-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72" />
              <path d="M19.13 4.37c-3.72 4.35-8.94 5.66-16.88 5.85" />
              <path d="M22 12.12c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
            </svg>
          </div>
          <h3>Web Designing</h3>
          <p>
            Our designers create visually appealing, user-friendly websites that reflect your
            brand identity and delight visitors.
          </p>
        </article>

        <article className="service-card reveal">
          <span className="service-card__index">03</span>
          <div className="service-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <h3>Software Development</h3>
          <p>
            We develop powerful software solutions that help businesses automate processes,
            increase efficiency, and reduce costs.
          </p>
        </article>

        <article className="service-card reveal">
          <span className="service-card__index">04</span>
          <div className="service-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>
          <h3>Mobile App Development</h3>
          <p>
            We design and develop mobile applications optimized for performance and exceptional
            user experience across iOS and Android.
          </p>
        </article>

        <article className="service-card reveal">
          <span className="service-card__index">05</span>
          <div className="service-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <h3>Digital Marketing</h3>
          <p>
            Data-driven marketing strategies that grow your brand visibility, generate leads, and
            convert audiences into loyal customers.
          </p>
        </article>

        <article className="service-card reveal">
          <span className="service-card__index">06</span>
          <div className="service-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h3>Ecommerce Development</h3>
          <p>
            We build secure and scalable ecommerce websites that drive sales, boost revenue, and
            deliver seamless shopping experiences.
          </p>
        </article>
      </div>
    </section>
  )
}

