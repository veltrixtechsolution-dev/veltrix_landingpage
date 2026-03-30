import { type FormEvent, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { addTemplateToCart } from '../utils/templateCart'
import { insertProjectRequest } from '../api/projectRequests'

export type StartProjectTemplateContext = {
  categoryId: string
  categoryName: string
  templateId: string
  templateName: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  template: StartProjectTemplateContext | null
}

function FieldIconUser() {
  return (
    <svg className="project-modal__label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function FieldIconMail() {
  return (
    <svg className="project-modal__label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function FieldIconBriefcase() {
  return (
    <svg className="project-modal__label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  )
}

function FieldIconDollar() {
  return (
    <svg className="project-modal__label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function FieldIconFlag() {
  return (
    <svg className="project-modal__label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  )
}

function FieldIconMessage() {
  return (
    <svg className="project-modal__label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

export function StartProjectModal({ isOpen, onClose, template }: Props) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [description, setDescription] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setSent(false)
      setSubmitting(false)
      setSubmitError(null)
      return
    }
    if (template) {
      setBusinessType(template.categoryName)
      setSent(false)
      setSubmitting(false)
      setSubmitError(null)
      setName('')
      setEmail('')
      setBudget('')
      setTimeline('')
      setDescription('')
    }
  }, [isOpen, template])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLInputElement>('input[name="project-name"]')?.focus()
    }, 50)
    return () => window.clearTimeout(t)
  }, [isOpen])

  if (!isOpen || !template) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!template) return

    setSubmitting(true)
    setSubmitError(null)

    try {
      await insertProjectRequest({
        categoryId: template.categoryId,
        categoryName: template.categoryName,
        templateId: template.templateId,
        templateName: template.templateName,
        clientName: name,
        clientEmail: email,
        businessType,
        budgetRange: budget ? budget : null,
        timeline: timeline ? timeline : null,
        projectDescription: description,
      })

      // Preserve the existing localStorage "cart" behavior too.
      addTemplateToCart({
        categoryId: template.categoryId,
        templateId: template.templateId,
        name: template.templateName,
      })

      setSent(true)
      window.setTimeout(() => onClose(), 1600)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setSubmitError(msg)
      setSubmitting(false)
    }
  }

  const node = (
    <div
      className="project-modal"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        className="project-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="project-modal__close" onClick={onClose} aria-label="Close">
          <span aria-hidden>×</span>
        </button>

        <div className="project-modal__header">
          <span className="project-modal__badge">New Project</span>
          <h2 id={titleId} className="project-modal__title">
            Start Your Project
          </h2>
          <p className="project-modal__lead">
            Fill in your details below — I&apos;ll craft a custom proposal just for you.
          </p>
        </div>

        {sent ? (
          <div className="project-modal__form-scroll project-modal__form-scroll--thanks">
            <p className="project-modal__thanks" role="status">
              Thanks! We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form className="project-modal__form" onSubmit={handleSubmit}>
            <div className="project-modal__form-scroll">
            <div className="project-modal__row">
              <div className="project-modal__field">
                <label className="project-modal__label" htmlFor={`${titleId}-name`}>
                  <FieldIconUser />
                  <span>
                    Your Name <span className="project-modal__req">*</span>
                  </span>
                </label>
                <input
                  id={`${titleId}-name`}
                  name="project-name"
                  type="text"
                  className="project-modal__input"
                  placeholder="Muhammad Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="project-modal__field">
                <label className="project-modal__label" htmlFor={`${titleId}-email`}>
                  <FieldIconMail />
                  <span>
                    Your Email <span className="project-modal__req">*</span>
                  </span>
                </label>
                <input
                  id={`${titleId}-email`}
                  name="project-email"
                  type="email"
                  className="project-modal__input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="project-modal__field">
              <label className="project-modal__label" htmlFor={`${titleId}-biz`}>
                <FieldIconBriefcase />
                <span>
                  Business Type <span className="project-modal__req">*</span>
                </span>
              </label>
              <input
                id={`${titleId}-biz`}
                name="project-business"
                type="text"
                className="project-modal__input"
                placeholder="e.g. Aircon Cleaning, E-commerce, Clinic…"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
              />
            </div>

            <div className="project-modal__row">
              <div className="project-modal__field">
                <label className="project-modal__label" htmlFor={`${titleId}-budget`}>
                  <FieldIconDollar />
                  <span>Budget</span>
                </label>
                <div className="project-modal__select-wrap">
                  <select
                    id={`${titleId}-budget`}
                    name="project-budget"
                    className="project-modal__input project-modal__select"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="">Select range</option>
                    <option value="under-2k">Under $2,000</option>
                    <option value="2k-5k">$2,000 – $5,000</option>
                    <option value="5k-10k">$5,000 – $10,000</option>
                    <option value="10k-plus">$10,000+</option>
                  </select>
                </div>
              </div>
              <div className="project-modal__field">
                <label className="project-modal__label" htmlFor={`${titleId}-timeline`}>
                  <FieldIconFlag />
                  <span>Timeline</span>
                </label>
                <div className="project-modal__select-wrap">
                  <select
                    id={`${titleId}-timeline`}
                    name="project-timeline"
                    className="project-modal__input project-modal__select"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-2mo">1–2 months</option>
                    <option value="3-6mo">3–6 months</option>
                    <option value="6mo-plus">6+ months</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="project-modal__field">
              <label className="project-modal__label" htmlFor={`${titleId}-desc`}>
                <FieldIconMessage />
                <span>
                  Project Description <span className="project-modal__req">*</span>
                </span>
              </label>
              <textarea
                id={`${titleId}-desc`}
                name="project-description"
                className="project-modal__input project-modal__textarea"
                rows={6}
                placeholder="Describe your project – what pages do you need, what's the goal of your website, any specific features…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <p className="project-modal__template-note">
              Template: <strong>{template.templateName}</strong>
            </p>

            {submitError ? (
              <p className="project-modal__error" role="alert">
                {submitError}
              </p>
            ) : null}

            <button type="submit" className="project-modal__submit" disabled={submitting}>
              Submit project
            </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
