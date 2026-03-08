import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export type TemplateItem = { id: string; name: string; file: string }
export type CategoryItem = { id: string; name: string; templates: TemplateItem[] }
export type Manifest = { categories: CategoryItem[] }

type TemplateWithCategory = TemplateItem & { categoryId: string; categoryName: string }

export function TemplatesPage() {
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [businessTypeFilter, setBusinessTypeFilter] = useState<string>('')

  useEffect(() => {
    fetch('/templates/manifest.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load templates')
        return res.json()
      })
      .then((data: Manifest) => {
        setManifest(data)
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

  if (loading) {
    return (
      <div className="templates-page">
        <div className="templates-page__inner">
          <p className="templates-page__loading">Loading templates…</p>
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

          <div className="templates-page__filter">
            <label htmlFor="business-type-filter" className="templates-page__filter-label">
              Business type
            </label>
            <select
              id="business-type-filter"
              className="templates-page__filter-select"
              value={businessTypeFilter}
              onChange={(e) => setBusinessTypeFilter(e.target.value)}
            >
              <option value="">All business types</option>
              {manifest.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        <ul className="templates-page__list templates-list">
          {filteredTemplates.map((template) => (
            <li key={`${template.categoryId}-${template.id}`} className="templates-list__item">
              <Link
                to={`/demo/${template.categoryId}/${template.id}`}
                className="templates-list__link"
              >
                <span className="templates-list__name">{template.file}</span>
                <span className="templates-list__meta">{template.categoryName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
