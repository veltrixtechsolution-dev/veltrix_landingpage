export function ProcessSection() {
  return (
    <section id="process" className="section section--process">
      <div className="section__inner section__inner--center">
        <p className="section__eyebrow">HOW WE WORK</p>
        <h2 className="section__title">Our Process</h2>
        <p className="section__lead section__lead--center">
          A proven four-step framework that takes your project from idea to a live, polished product.
        </p>

        <div className="process-steps">
          <div className="process-step reveal">
            <div className="process-step__badge">01</div>
            <h3>Discovery &amp; Strategy</h3>
            <p>
              We dive deep into your business goals, audience, and competitive landscape to build a solid project
              foundation.
            </p>
          </div>

          <div className="process-step reveal">
            <div className="process-step__badge">02</div>
            <h3>Design &amp; Prototyping</h3>
            <p>
              Our designers craft wireframes and high-fidelity mockups that align with your brand before a single line is
              coded.
            </p>
          </div>

          <div className="process-step reveal">
            <div className="process-step__badge">03</div>
            <h3>Development &amp; Testing</h3>
            <p>
              Engineers build your solution with clean code and rigorous QA testing across all devices and environments.
            </p>
          </div>

          <div className="process-step reveal">
            <div className="process-step__badge">04</div>
            <h3>Launch &amp; Support</h3>
            <p>
              We deploy your product, monitor performance, and provide ongoing maintenance to keep everything running
              smoothly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

