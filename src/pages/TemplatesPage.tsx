import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export type TemplateItem = { id: string; name: string; file: string }
export type CategoryItem = { id: string; name: string; templates: TemplateItem[] }
export type Manifest = { categories: CategoryItem[] }

type TemplateMeta = {
  displayName: string
  description: string
  styleLabel: string
  tags: string[]
}

type TemplateWithCategory = TemplateItem & { categoryId: string; categoryName: string }

const CATEGORY_FILTERS: { id: string; label: string; icon: string }[] = [
  { id: '', label: 'All', icon: '' },
  { id: 'ticketing', label: 'Ticketing', icon: '🎟' },
  { id: 'construction', label: 'Construction', icon: '🏗' },
  { id: 'aircon-cleaning', label: 'Aircon', icon: '❄️' },
  { id: 'car-rental', label: 'Car Rental', icon: '🚗' },
  { id: 'real-estate', label: 'Real Estate', icon: '🏡' },
  { id: 'hotel', label: 'Hotel', icon: '🏨' },
  { id: 'plumbing', label: 'Plumbing', icon: '🔧' },
  { id: 'event-organizer', label: 'Events', icon: '🎉' },
  { id: 'franchising', label: 'Franchise', icon: '📈' },
]

function shuffleAndSpread(list: TemplateWithCategory[]): TemplateWithCategory[] {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].categoryId === arr[i + 1].categoryId) {
      for (let j = i + 2; j < arr.length; j++) {
        if (arr[j].categoryId !== arr[i].categoryId) {
          ;[arr[i + 1], arr[j]] = [arr[j], arr[i + 1]]
          break
        }
      }
    }
  }
  return arr
}

function sanitizeSvgIds(svgInner: string, templateId: string): string {
  const prefix = `thumb-${templateId.replace(/[^a-z0-9-]/gi, '-')}-`
  return svgInner
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
}

export function TemplatesPage() {
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [templateMeta, setTemplateMeta] = useState<Record<string, TemplateMeta> | null>(null)
  const [thumbnails, setThumbnails] = useState<Record<string, string> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [businessTypeFilter, setBusinessTypeFilter] = useState<string>('')

  useEffect(() => {
    Promise.all([
      fetch('/templates/manifest.json').then((res) => {
        if (!res.ok) throw new Error('Failed to load templates')
        return res.json() as Promise<Manifest>
      }),
      fetch('/templates/template-meta.json').then((res) =>
        res.ok ? res.json() as Promise<Record<string, TemplateMeta>> : Promise.resolve({})
      ),
      fetch('/templates/thumbnails.json').then((res) =>
        res.ok ? res.json() as Promise<Record<string, string>> : Promise.resolve({})
      ),
    ])
      .then(([manifestData, metaData, thumbData]) => {
        setManifest(manifestData)
        setTemplateMeta(metaData)
        setThumbnails(thumbData)
        setError(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const allTemplates = useMemo((): TemplateWithCategory[] => {
    if (!manifest) return []
    return manifest.categories.flatMap((cat) =>
      cat.templates.map((t) => ({
        ...t,
        categoryId: cat.id,
        categoryName: cat.name,
      }))
    )
  }, [manifest])

  const filteredTemplates = useMemo(() => {
    if (!businessTypeFilter) return allTemplates
    return allTemplates.filter((t) => t.categoryId === businessTypeFilter)
  }, [allTemplates, businessTypeFilter])

  const randomizedTemplates = useMemo(
    () => shuffleAndSpread(filteredTemplates),
    [filteredTemplates]
  )

  const visibleFilters = useMemo(() => {
    if (!manifest) return CATEGORY_FILTERS
    const ids = new Set(manifest.categories.map((c) => c.id))
    return CATEGORY_FILTERS.filter((f) => !f.id || ids.has(f.id))
  }, [manifest])

  if (loading) {
    return (
      <div className="templates-page">
        <div className="templates-page__inner">
          <div className="templates-loader">
            <div className="templates-loader__spinner" aria-hidden />
            <p className="templates-page__loading">Loading templates…</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !manifest) {
    return (
      <div className="templates-page">
        <div className="templates-page__inner">
          <p className="templates-page__error">{error ?? 'Templates not found.'}</p>
          <Link to="/" className="btn btn--primary" style={{ marginTop: 16 }}>
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="templates-page">
      <div className="templates-page__inner">
        <header className="templates-page__header">
          <Link to="/" className="templates-page__back">
            ← Back to home
          </Link>
          <h1 className="templates-page__title">Templates</h1>
          <p className="templates-page__lead">
            Click a template to demo. Use the back button in the demo to try another.
          </p>

          <div className="templates-page__filter filter-bar">
            <span className="filter-bar__label">FILTER:</span>
            <div className="filter-bar__chips">
              {visibleFilters.map((f) => (
                <button
                  key={f.id || 'all'}
                  type="button"
                  className={`filter-bar__btn ${businessTypeFilter === f.id ? 'active' : ''}`}
                  onClick={() => setBusinessTypeFilter(f.id)}
                >
                  {f.icon && <span className="filter-bar__icon">{f.icon}</span>}
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="templates-page__grid templates-grid">
          {randomizedTemplates.map((template) => {
            const meta = templateMeta?.[template.id]
            const svgInner = thumbnails?.[template.id]
            const displayName = meta?.displayName ?? template.name
            const description = meta?.description ?? `Landing page template for ${template.categoryName.toLowerCase()}.`
            const styleLabel = meta?.styleLabel ?? template.categoryName
            const tags = meta?.tags ?? [template.categoryName, 'Landing']
            const sanitizedSvg = svgInner ? sanitizeSvgIds(svgInner, template.id) : null

            return (
              <Link
                key={`${template.categoryId}-${template.id}`}
                to={`/demo/${template.categoryId}/${template.id}`}
                className="tpl-card"
              >
                <div className="tpl-card__thumb">
                  {sanitizedSvg ? (
                    <svg
                      viewBox="0 0 400 190"
                      xmlns="http://www.w3.org/2000/svg"
                      className="tpl-card__thumb-svg"
                      dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
                    />
                  ) : (
                    <div
                      className={`tpl-card__thumb-placeholder tpl-card__thumb--${template.categoryId}`}
                    />
                  )}
                </div>
                <div className="tpl-card__body">
                  <div className="tpl-card__meta">
                    <span className={`tpl-card__style tpl-card__style--${template.categoryId}`}>
                      {styleLabel}
                    </span>
                  </div>
                  <h3 className="tpl-card__name">{displayName}</h3>
                  <p className="tpl-card__desc">{description}</p>
                  <div className="tpl-card__tags">
                    {tags.map((tag) => (
                      <span key={tag} className="tpl-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="tpl-card__cta">
                    <span className="tpl-card__open">Open →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
