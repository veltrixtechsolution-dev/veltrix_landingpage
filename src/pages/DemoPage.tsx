import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChooseTemplateIcon } from '../components/ChooseTemplateIcon'
import { StartProjectModal } from '../components/StartProjectModal'
import type { Manifest } from './TemplatesPage'

type TemplateMeta = {
  displayName: string
  description?: string
  styleLabel?: string
  tags?: string[]
}

export function DemoPage() {
  const { categoryId, templateId } = useParams<{ categoryId: string; templateId: string }>()
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [templateMeta, setTemplateMeta] = useState<Record<string, TemplateMeta> | null>(null)
  const [loading, setLoading] = useState(true)
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/templates/manifest.json').then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json() as Promise<Manifest>
      }),
      fetch('/templates/template-meta.json').then((res) => {
        if (!res.ok) return {} as Record<string, TemplateMeta>
        return res.json() as Promise<Record<string, TemplateMeta>>
      }),
    ])
      .then(([manifestData, metaData]) => {
        setManifest(manifestData)
        setTemplateMeta(metaData)
      })
      .catch(() => {
        setManifest(null)
        setTemplateMeta(null)
      })
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
        <div className="demo-page__toolbar-left">
          <Link to="/templates" className="demo-page__back">
            ← Back to templates
          </Link>
          <span className="demo-page__label">
            {category.name} · {template.name}
          </span>
        </div>
        <button
          type="button"
          className="btn btn--primary btn--compact"
          onClick={() => setProjectModalOpen(true)}
        >
          <ChooseTemplateIcon />
          Choose this template
        </button>
      </div>

      {(() => {
        const displayName = templateMeta?.[template.id]?.displayName ?? template.name
        return (
      <StartProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        template={
          projectModalOpen
            ? {
                categoryId: category.id,
                categoryName: category.name,
                templateId: template.id,
                templateName: displayName,
              }
            : null
        }
      />
        )
      })()}

      <iframe
        title={`Demo: ${category.name} – ${template.name}`}
        src={iframeSrc}
        className="demo-page__iframe"
      />
    </div>
  )
}
