import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Manifest } from './TemplatesPage'

export function DemoPage() {
  const { categoryId, templateId } = useParams<{ categoryId: string; templateId: string }>()
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/templates/manifest.json')
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Not found')))
      .then((data: Manifest) => setManifest(data))
      .catch(() => setManifest(null))
      .finally(() => setLoading(false))
  }, [])

  const category = manifest?.categories.find((c) => c.id === categoryId)
  const template = category?.templates.find((t) => t.id === templateId)
  const iframeSrc = template && categoryId
    ? `/templates/${categoryId}/${template.file}`
    : null

  if (loading) {
    return (
      <div className="demo-page">
        <p className="demo-page__loading">Loading…</p>
      </div>
    )
  }

  if (!iframeSrc || !template || !category) {
    return (
      <div className="demo-page">
        <div className="demo-page__toolbar">
          <Link to="/templates" className="demo-page__back">
            ← Back to templates
          </Link>
        </div>
        <p className="demo-page__error">Template not found.</p>
      </div>
    )
  }

  return (
    <div className="demo-page">
      <div className="demo-page__toolbar">
        <Link to="/templates" className="demo-page__back">
          ← Back to templates
        </Link>
        <span className="demo-page__label">
          {category.name} · {template.name}
        </span>
      </div>
      <iframe
        title={`Demo: ${category.name} – ${template.name}`}
        src={iframeSrc}
        className="demo-page__iframe"
      />
    </div>
  )
}
