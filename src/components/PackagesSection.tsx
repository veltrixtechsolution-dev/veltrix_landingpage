import { Link } from 'react-router-dom'

type PackageCard = {
  id: string
  tier: string
  name: string
  bestFor: string
  pricePhp: number
  featured: boolean
  badge?: string
  includes: string[]
}

export function PackagesSection() {
  const packages: PackageCard[] = [
    {
      id: 'basic-starter-1',
      tier: 'Package 01',
      name: 'Basic Starter',
      bestFor: '1-page business website — perfect for a simple, high-impact presence.',
      pricePhp: 5999,
      featured: false,
      badge: 'Limited offer',
      includes: [
        'Basic 1-page business website',
        'FREE 1-year domain name',
        'FREE 1-year hosting with SSL',
        'CMS — manage your site easily (content management system)',
        '3 business email accounts',
        'User-friendly page builder',
        'Phone / tablet flexible (responsive) design',
      ],
    },
    {
      id: 'basic-starter-2-4',
      tier: 'Package 02',
      name: 'Starter Plus',
      bestFor: '2–4 pages — room to grow with core pages for your business.',
      pricePhp: 7999,
      featured: false,
      includes: [
        '2–4 website pages',
        'FREE 1-year domain name',
        'FREE 1-year hosting with SSL',
        'CMS — manage your site easily (content management system)',
        '3 business email accounts',
        'User-friendly page builder',
        'Phone / tablet flexible (responsive) design',
      ],
    },
    {
      id: 'standard-5-8',
      tier: 'Package 03',
      name: 'Standard',
      bestFor: '5–8 pages — ideal when you need richer content and more sections.',
      pricePhp: 10000,
      featured: true,
      badge: 'Most popular',
      includes: [
        '5–8 website pages',
        'FREE 1-year domain name',
        'FREE 1-year hosting with SSL',
        'CMS — manage your site easily (content management system)',
        'Unlimited email accounts',
        'User-friendly page builder',
        'Phone / tablet flexible (responsive) design',
      ],
    },
    {
      id: 'standard-unlimited',
      tier: 'Package 04',
      name: 'Premium',
      bestFor: 'Unlimited pages — full brochure or content-heavy sites without page caps.',
      pricePhp: 15000,
      featured: false,
      badge: 'Unlimited pages',
      includes: [
        'Unlimited-page website',
        'FREE 1-year domain name',
        'FREE 1-year hosting with SSL',
        'CMS — manage your site easily (content management system)',
        'Unlimited email accounts',
        'User-friendly page builder',
        'Phone / tablet flexible (responsive) design',
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
            Professional websites for your business — transparent PHP pricing with everything you need to launch.
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`pkg-card reveal ${pkg.featured ? 'pkg-card--featured' : ''}`}
            >
              {pkg.badge && <span className="pkg-badge">{pkg.badge}</span>}
              <div className="pkg-header">
                <div className="pkg-tier">{pkg.tier}</div>
                <h3 className="pkg-name">{pkg.name}</h3>
                <p className="pkg-best-for">{pkg.bestFor}</p>
              </div>
              <div className="pkg-pricing pkg-pricing--solo">
                <div className="pkg-price">
                  <span className="price-currency">₱</span>
                  <span className="price-amount">{pkg.pricePhp.toLocaleString('en-PH')}</span>
                  <span className="price-suffix">PHP</span>
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

        <p className="packages-renewal-note">
          After the included first year, hosting and domain renewal is <strong>$60 USD</strong> per year.
        </p>
      </div>
    </section>
  )
}
