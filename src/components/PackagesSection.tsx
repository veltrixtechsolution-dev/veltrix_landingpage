import { Link } from 'react-router-dom'

export function PackagesSection() {
  const packages = [
    {
      tier: 'Tier 01',
      name: 'Starter Website',
      bestFor: 'Best for: Personal brands, small businesses & startups',
      priceFrom: 300,
      priceTo: 500,
      delivery: '7–10 Days',
      featured: false,
      includes: [
        'Up to 5 pages (Home, About, Services, Blog, Contact)',
        'Mobile responsive design',
        'Basic UI/UX layout',
        'Contact form integration',
        'Basic SEO setup',
        'Speed optimization',
        'Social media integration',
        '2 revisions',
        'Website training / basic guide',
      ],
    },
    {
      tier: 'Tier 02',
      name: 'Professional Business Website',
      bestFor: 'Best for: Growing businesses and service companies',
      priceFrom: 600,
      priceTo: 1000,
      delivery: '10–14 Days',
      featured: true,
      badge: 'Most Popular',
      includes: [
        'Up to 10 pages',
        'Custom website design',
        'Mobile & tablet responsive',
        'Blog setup',
        'Lead capture forms',
        'Google Analytics integration',
        'Basic on-page SEO',
        'Image optimization',
        'Social media integration',
        '3 revisions',
        'Basic security setup',
      ],
    },
    {
      tier: 'Tier 03',
      name: 'Advanced Business Website',
      bestFor: 'Best for: Businesses that need advanced features & integrations',
      priceFrom: 1200,
      priceTo: 2000,
      priceToLabel: '$2,000+',
      delivery: '14–21 Days',
      featured: false,
      includes: [
        'Up to 15+ pages',
        'Fully custom design',
        'Advanced UI/UX structure',
        'CRM / Email marketing integration',
        'Advanced SEO setup',
        'Speed optimization',
        'Analytics & tracking setup',
        'Lead generation system',
        'Security optimization',
        'Unlimited revisions (within scope)',
      ],
    },
  ]

  return (
    <section id="services" className="section section--packages">
      <div className="section__inner">
        <div className="packages-header">
          <p className="section__eyebrow">What We Offer</p>
          <h2 className="section__title">Our Packages</h2>
          <p className="packages-subtitle">
            Transparent pricing for every stage of your business. Pick the plan that fits and let's get building.
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <article
              key={pkg.tier}
              className={`pkg-card reveal ${pkg.featured ? 'pkg-card--featured' : ''}`}
            >
              {pkg.badge && <span className="pkg-badge">{pkg.badge}</span>}
              <div className="pkg-header">
                <div className="pkg-tier">{pkg.tier}</div>
                <h3 className="pkg-name">{pkg.name}</h3>
                <p className="pkg-best-for">{pkg.bestFor}</p>
              </div>
              <div className="pkg-pricing">
                <div className="pkg-price">
                  <span className="price-currency">$</span>
                  <span className="price-amount">{pkg.priceFrom.toLocaleString()}</span>
                  <span className="price-range">
                    {' – '}
                    {pkg.priceToLabel ?? `$${pkg.priceTo.toLocaleString()}`}
                  </span>
                </div>
                <div className="pkg-delivery">
                  <span className="delivery-icon" aria-hidden>⏱</span>
                  {pkg.delivery}
                </div>
              </div>
              <div className="pkg-includes">
                <div className="includes-label">Includes</div>
                <ul className="includes-list">
                  {pkg.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="pkg-footer">
                <Link to="/templates" className={`pkg-cta ${pkg.featured ? 'pkg-cta--filled' : 'pkg-cta--outline'}`}>
                  Get Started →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
