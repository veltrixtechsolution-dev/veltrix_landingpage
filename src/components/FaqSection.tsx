export function FaqSection() {
  const faqs = [
    {
      question: 'Will my website be mobile-friendly?',
      answer: 'Yes. Every site is fully responsive and tested across mobile, tablet, and desktop before launch.',
    },
    {
      question: 'How long does a website take to build?',
      answer:
        'Most brochure-style packages (Basic Starter through Premium) are ready within about 1–2 weeks, depending on how quickly you provide content and feedback. Larger or custom scopes can take longer — we always agree on a timeline before we start.',
    },
    {
      question: 'Can I edit my website after delivery?',
      answer:
        'Absolutely. We build on user-friendly platforms and CMS setups so you can update text, images, and basic content without technical skills.',
    },
    {
      question: 'Do you redesign existing websites?',
      answer:
        'Yes. Veltrix can redesign, modernize, or improve existing websites, whether they were built on Wix, Elementor, Webflow, or custom stacks.',
    },
    {
      question: 'Who owns the website after completion?',
      answer:
        'You do, 100%. After final delivery, you receive full ownership and admin access, including code, design files, and content.',
    },
    {
      question: 'What if I need changes after launch?',
      answer:
        'Every package includes post-launch support (30-60 days based on tier). After that, we offer affordable monthly maintenance plans.',
    },
    {
      question: "I'm not technical. Can I still work with you?",
      answer:
        "Of course. Most clients are business owners, not developers. We handle the technical work, communicate clearly, and train you to confidently manage your site.",
    },
    {
      question: 'Do you offer payment plans?',
      answer:
        "Yes. Most projects follow a 50% deposit and 50% on delivery. For larger builds, we can set milestone-based payment schedules that fit your needs.",
    },
  ]

  return (
    <section id="faq" className="section section--faq">
      <div className="section__inner faq">
        <div className="faq__header">
          <p className="section__eyebrow">Common Questions</p>
          <h2 className="section__title">FAQ</h2>
          <p className="section__lead">
            Quick answers about timelines, ownership, updates, and what it is like to build with Veltrix.
          </p>
        </div>

        <div className="faq__list">
          {faqs.map((item) => (
            <details key={item.question} className="faq-item reveal">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
