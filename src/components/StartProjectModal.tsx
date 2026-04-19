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
  const [contactNumber, setContactNumber] = useState('')
  const [existingWebsite, setExistingWebsite] = useState('')
  const [domainSetup, setDomainSetup] = useState<'already-have' | 'need-provided'>('already-have')
  const [hostingSetup, setHostingSetup] = useState<'own-hosting' | 'included-hosting'>('own-hosting')
  const [businessEmailSetup, setBusinessEmailSetup] = useState<'need-veltrix' | 'will-provide' | 'not-needed'>('need-veltrix')
  const [updatesPreference, setUpdatesPreference] = useState<'managed-by-veltrix' | 'self-managed'>('managed-by-veltrix')
  const [packageInterest, setPackageInterest] = useState<'professional' | 'starter' | 'standard' | 'ultimate'>('professional')
  const [logoBrandingReady, setLogoBrandingReady] = useState<'ready' | 'need-help'>('ready')
  const [brandAssetsNote, setBrandAssetsNote] = useState('')
  const [briefBusinessDescription, setBriefBusinessDescription] = useState('')
  const [referenceWebsites, setReferenceWebsites] = useState('')
  const [additionalRequests, setAdditionalRequests] = useState('')
  const [timeline, setTimeline] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [stepError, setStepError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSent(false)
      setSubmitting(false)
      setSubmitError(null)
      setStepError(null)
      return
    }
    if (template) {
      setBusinessType(template.categoryName)
      setSent(false)
      setSubmitting(false)
      setSubmitError(null)
      setName('')
      setEmail('')
      setContactNumber('')
      setExistingWebsite('')
      setDomainSetup('already-have')
      setHostingSetup('own-hosting')
      setBusinessEmailSetup('need-veltrix')
      setUpdatesPreference('managed-by-veltrix')
      setPackageInterest('professional')
      setLogoBrandingReady('ready')
      setBrandAssetsNote('')
      setBriefBusinessDescription('')
      setReferenceWebsites('')
      setAdditionalRequests('')
      setTimeline('')
      setCurrentStep(1)
      setStepError(null)
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

  const stepCount = 5
  const stepTitles = [
    'Client Information',
    'Technical Setup',
    'Project Scope',
    'Content & Design',
    'Final Confirmation',
  ]
  const stepProgress = Math.round((currentStep / stepCount) * 100)

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!name.trim() || !email.trim() || !businessType.trim() || !contactNumber.trim()) {
        return 'Please complete all required client information fields.'
      }
    }
    if (step === 4 && !briefBusinessDescription.trim()) {
      return 'Please add a brief business description before continuing.'
    }
    if (step === 5 && !additionalRequests.trim()) {
      return 'Please add your final notes or requests.'
    }
    return null
  }

  const goNextStep = () => {
    const error = validateStep(currentStep)
    if (error) {
      setStepError(error)
      return
    }
    setStepError(null)
    setCurrentStep((prev) => Math.min(prev + 1, stepCount))
  }

  const goPrevStep = () => {
    setStepError(null)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!template) return
    const error = validateStep(currentStep)
    if (error) {
      setStepError(error)
      return
    }

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
        timeline: timeline ? timeline : null,
        projectDescription: briefBusinessDescription,
        questionnaireAnswers: {
          contactNumber,
          existingWebsite: existingWebsite.trim() ? existingWebsite.trim() : null,
          domainSetup,
          hostingSetup,
          businessEmailSetup,
          updatesPreference,
          packageInterest,
          logoBrandingReady,
          brandAssetsNote: brandAssetsNote.trim() ? brandAssetsNote.trim() : null,
          briefBusinessDescription,
          referenceWebsites: referenceWebsites.trim() ? referenceWebsites.trim() : null,
          additionalRequests,
        },
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
            Complete this short step-by-step form and we&apos;ll craft your proposal.
          </p>
          <div className="project-modal__stepper" aria-label="Form progress">
            <div className="project-modal__stepper-meta">
              <span>
                Step {currentStep} of {stepCount}
              </span>
              <span>{stepTitles[currentStep - 1]}</span>
            </div>
            <div className="project-modal__stepper-track" aria-hidden>
              <span className="project-modal__stepper-fill" style={{ width: `${stepProgress}%` }} />
            </div>
          </div>
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
              {currentStep === 1 ? (
                <>
                  <h3 className="project-modal__section-title">Section 1: Client Information</h3>
                  <div className="project-modal__row">
                    <div className="project-modal__field">
                      <label className="project-modal__label" htmlFor={`${titleId}-name`}>
                        <FieldIconUser />
                        <span>
                          Full Name <span className="project-modal__req">*</span>
                        </span>
                      </label>
                      <input
                        id={`${titleId}-name`}
                        name="project-name"
                        type="text"
                        className="project-modal__input"
                        placeholder="Your full name"
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
                          Email Address <span className="project-modal__req">*</span>
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

                  <div className="project-modal__row">
                    <div className="project-modal__field">
                      <label className="project-modal__label" htmlFor={`${titleId}-biz`}>
                        <FieldIconBriefcase />
                        <span>
                          Business Name <span className="project-modal__req">*</span>
                        </span>
                      </label>
                      <input
                        id={`${titleId}-biz`}
                        name="project-business"
                        type="text"
                        className="project-modal__input"
                        placeholder="Your business name"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        required
                      />
                    </div>
                    <div className="project-modal__field">
                      <label className="project-modal__label" htmlFor={`${titleId}-contact`}>
                        <FieldIconMail />
                        <span>
                          WhatsApp / Viber / Contact Number <span className="project-modal__req">*</span>
                        </span>
                      </label>
                      <input
                        id={`${titleId}-contact`}
                        name="project-contact"
                        type="text"
                        className="project-modal__input"
                        placeholder="+63 9XX XXX XXXX"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="project-modal__field">
                    <label className="project-modal__label" htmlFor={`${titleId}-existing-site`}>
                      <FieldIconFlag />
                      <span>Existing Website Link (if meron)</span>
                    </label>
                    <input
                      id={`${titleId}-existing-site`}
                      name="project-existing-site"
                      type="url"
                      className="project-modal__input"
                      placeholder="https://yourwebsite.com"
                      value={existingWebsite}
                      onChange={(e) => setExistingWebsite(e.target.value)}
                    />
                  </div>
                </>
              ) : null}

              {currentStep === 2 ? (
                <>
                  <h3 className="project-modal__section-title">Section 2: Technical Setup & Assets</h3>
                  <div className="project-modal__field">
                    <label className="project-modal__label">
                      Do you already have a Domain Name? <span className="project-modal__req">*</span>
                    </label>
                    <div className="project-modal__options">
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="domain-setup"
                          checked={domainSetup === 'already-have'}
                          onChange={() => setDomainSetup('already-have')}
                        />
                        <span>Yes, I already own one.</span>
                      </label>
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="domain-setup"
                          checked={domainSetup === 'need-provided'}
                          onChange={() => setDomainSetup('need-provided')}
                        />
                        <span>No, I want you to provide it (included in the package).</span>
                      </label>
                    </div>
                  </div>

                  <div className="project-modal__field">
                    <label className="project-modal__label">
                      Do you have existing Web Hosting? <span className="project-modal__req">*</span>
                    </label>
                    <div className="project-modal__options">
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="hosting-setup"
                          checked={hostingSetup === 'own-hosting'}
                          onChange={() => setHostingSetup('own-hosting')}
                        />
                        <span>Yes, I have my own hosting account.</span>
                      </label>
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="hosting-setup"
                          checked={hostingSetup === 'included-hosting'}
                          onChange={() => setHostingSetup('included-hosting')}
                        />
                        <span>No, I will use the free hosting included in the package.</span>
                      </label>
                    </div>
                  </div>

                  <div className="project-modal__field">
                    <label className="project-modal__label">
                      Business Email Setup <span className="project-modal__req">*</span>
                    </label>
                    <div className="project-modal__options">
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="email-setup"
                          checked={businessEmailSetup === 'need-veltrix'}
                          onChange={() => setBusinessEmailSetup('need-veltrix')}
                        />
                        <span>I want Veltrix to create my professional emails.</span>
                      </label>
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="email-setup"
                          checked={businessEmailSetup === 'will-provide'}
                          onChange={() => setBusinessEmailSetup('will-provide')}
                        />
                        <span>I will provide my own email accounts.</span>
                      </label>
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="email-setup"
                          checked={businessEmailSetup === 'not-needed'}
                          onChange={() => setBusinessEmailSetup('not-needed')}
                        />
                        <span>I don&apos;t need business emails for now.</span>
                      </label>
                    </div>
                  </div>
                </>
              ) : null}

              {currentStep === 3 ? (
                <>
                  <h3 className="project-modal__section-title">Section 3: Project Scope & Maintenance</h3>
                  <div className="project-modal__field">
                    <label className="project-modal__label">
                      Future Updates & Upgrades <span className="project-modal__req">*</span>
                    </label>
                    <div className="project-modal__options">
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="updates"
                          checked={updatesPreference === 'managed-by-veltrix'}
                          onChange={() => setUpdatesPreference('managed-by-veltrix')}
                        />
                        <span>Managed by Veltrix (with maintenance fee).</span>
                      </label>
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="updates"
                          checked={updatesPreference === 'self-managed'}
                          onChange={() => setUpdatesPreference('self-managed')}
                        />
                        <span>Self-managed updates.</span>
                      </label>
                    </div>
                  </div>

                  <div className="project-modal__row">
                    <div className="project-modal__field">
                      <label className="project-modal__label">
                        Which package are you interested in? <span className="project-modal__req">*</span>
                      </label>
                      <div className="project-modal__select-wrap">
                        <select
                          name="package-interest"
                          className="project-modal__input project-modal__select"
                          value={packageInterest}
                          onChange={(e) =>
                            setPackageInterest(e.target.value as 'professional' | 'starter' | 'standard' | 'ultimate')
                          }
                        >
                          <option value="professional">₱5,999 — Basic Starter (1 page)</option>
                          <option value="starter">₱7,999 — Starter Plus (2–4 pages)</option>
                          <option value="standard">₱10,000 — Standard (5–8 pages)</option>
                          <option value="ultimate">₱15,000 — Premium (unlimited pages)</option>
                        </select>
                      </div>
                    </div>
                    <div className="project-modal__field">
                      <label className="project-modal__label" htmlFor={`${titleId}-timeline`}>
                        <FieldIconFlag />
                        <span>Timeline (optional)</span>
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
                          <option value="1-2mo">1-2 months</option>
                          <option value="3-6mo">3-6 months</option>
                          <option value="6mo-plus">6+ months</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {currentStep === 4 ? (
                <>
                  <h3 className="project-modal__section-title">Section 4: Content & Design</h3>
                  <div className="project-modal__field">
                    <label className="project-modal__label">
                      Do you have a logo and branding colors? <span className="project-modal__req">*</span>
                    </label>
                    <div className="project-modal__options">
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="logo-ready"
                          checked={logoBrandingReady === 'ready'}
                          onChange={() => setLogoBrandingReady('ready')}
                        />
                        <span>Yes, I have them ready.</span>
                      </label>
                      <label className="project-modal__option">
                        <input
                          type="radio"
                          name="logo-ready"
                          checked={logoBrandingReady === 'need-help'}
                          onChange={() => setLogoBrandingReady('need-help')}
                        />
                        <span>No, I need help with my logo.</span>
                      </label>
                    </div>
                  </div>

                  <div className="project-modal__field">
                    <label className="project-modal__label" htmlFor={`${titleId}-assets-note`}>
                      <FieldIconMessage />
                      <span>Brand assets note (optional)</span>
                    </label>
                    <input
                      id={`${titleId}-assets-note`}
                      name="assets-note"
                      type="text"
                      className="project-modal__input"
                      placeholder="Add a Drive link / mention files you will share"
                      value={brandAssetsNote}
                      onChange={(e) => setBrandAssetsNote(e.target.value)}
                    />
                  </div>

                  <div className="project-modal__field">
                    <label className="project-modal__label" htmlFor={`${titleId}-business-brief`}>
                      <FieldIconMessage />
                      <span>
                        Brief Business Description <span className="project-modal__req">*</span>
                      </span>
                    </label>
                    <textarea
                      id={`${titleId}-business-brief`}
                      name="project-business-brief"
                      className="project-modal__input project-modal__textarea"
                      rows={5}
                      placeholder="Nature of business, target customers, and your goals"
                      value={briefBusinessDescription}
                      onChange={(e) => setBriefBusinessDescription(e.target.value)}
                      required={currentStep === 4}
                    />
                  </div>

                  <div className="project-modal__field">
                    <label className="project-modal__label" htmlFor={`${titleId}-reference-websites`}>
                      <FieldIconBriefcase />
                      <span>Reference websites (optional)</span>
                    </label>
                    <input
                      id={`${titleId}-reference-websites`}
                      name="project-reference-websites"
                      type="text"
                      className="project-modal__input"
                      placeholder="web1.com, web2.com"
                      value={referenceWebsites}
                      onChange={(e) => setReferenceWebsites(e.target.value)}
                    />
                  </div>
                </>
              ) : null}

              {currentStep === 5 ? (
                <>
                  <h3 className="project-modal__section-title">Section 5: Final Confirmation</h3>
                  <div className="project-modal__field">
                    <label className="project-modal__label" htmlFor={`${titleId}-additional`}>
                      <FieldIconMessage />
                      <span>
                        Additional Requests or Notes <span className="project-modal__req">*</span>
                      </span>
                    </label>
                    <textarea
                      id={`${titleId}-additional`}
                      name="project-additional"
                      className="project-modal__input project-modal__textarea"
                      rows={4}
                      placeholder="Tell us anything else we should know before building your website"
                      value={additionalRequests}
                      onChange={(e) => setAdditionalRequests(e.target.value)}
                      required={currentStep === 5}
                    />
                  </div>
                </>
              ) : null}

              <p className="project-modal__template-note">
                Template: <strong>{template.templateName}</strong>
              </p>

              {stepError ? (
                <p className="project-modal__error" role="alert">
                  {stepError}
                </p>
              ) : null}
              {submitError ? (
                <p className="project-modal__error" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="project-modal__actions">
                {currentStep > 1 ? (
                  <button type="button" className="project-modal__secondary" onClick={goPrevStep}>
                    Back
                  </button>
                ) : (
                  <span />
                )}
                {currentStep < stepCount ? (
                  <button type="button" className="project-modal__submit" onClick={goNextStep}>
                    Next step
                  </button>
                ) : (
                  <button type="submit" className="project-modal__submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit project'}
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
