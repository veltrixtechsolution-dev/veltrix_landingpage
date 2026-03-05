export function TestimonialsSection() {
  return (
    <section className="section section--testimonials">
      <div className="section__inner section__inner--center">
        <p className="section__eyebrow">CLIENT FEEDBACK</p>
        <h2 className="section__title">What Clients Say</h2>

        <div className="testimonials-grid">
          <article className="testimonial-card reveal">
            <div className="testimonial-card__stars">★★★★★</div>
            <p className="testimonial-card__text">
              Veltrix completely transformed our online presence. The team was professional, on time, and delivered far
              beyond our expectations.
            </p>
            <div className="testimonial-card__footer">
              <div className="avatar">JM</div>
              <div>
                <div className="avatar__name">James Morrison</div>
                <div className="avatar__role">CEO, NexaRetail</div>
              </div>
            </div>
          </article>

          <article className="testimonial-card reveal">
            <div className="testimonial-card__stars">★★★★★</div>
            <p className="testimonial-card__text">
              Their mobile app development team is exceptional. We launched on both platforms in record time with zero
              critical bugs post-launch.
            </p>
            <div className="testimonial-card__footer">
              <div className="avatar">SA</div>
              <div>
                <div className="avatar__name">Sara Al‑Farsi</div>
                <div className="avatar__role">CTO, Lumio Ventures</div>
              </div>
            </div>
          </article>

          <article className="testimonial-card reveal">
            <div className="testimonial-card__stars">★★★★★</div>
            <p className="testimonial-card__text">
              From strategy to execution, Veltrix was a true partner. Our ecommerce revenue grew 40% in the first quarter
              after launch.
            </p>
            <div className="testimonial-card__footer">
              <div className="avatar">KP</div>
              <div>
                <div className="avatar__name">Kevin Park</div>
                <div className="avatar__role">Founder, UrbanKraft</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

