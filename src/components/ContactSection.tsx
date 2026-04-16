import { useState } from 'react'
import type { FormEvent } from 'react'

type ContactFormState = {
  firstName: string
  lastName: string
  email: string
  service: string
  message: string
}

const INITIAL_FORM: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  service: '',
  message: '',
}

export function ContactSection() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(null)
    setIsSubmitting(true)

    const payload = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      service: form.service,
      message: form.message,
      _subject: `New Let’s Talk inquiry: ${form.service || 'General inquiry'}`,
      _template: 'table',
      _captcha: 'false',
      _honey: '',
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/veltrixtechsolution@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Unable to send message')
      }

      setStatus({
        type: 'success',
        text: "Thanks! Your message was sent. We'll get back to you within 24 hours.",
      })
      setForm(INITIAL_FORM)
    } catch {
      setStatus({
        type: 'error',
        text: 'Message could not be sent right now. Please try again or email us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section section--contact">
      <div className="section__inner contact">
        <div className="contact__info">
          <p className="section__eyebrow">GET IN TOUCH</p>
          <h2 className="section__title">Let’s Talk</h2>
          <p className="section__lead">
            Have a project in mind? Fill in the form and our team will get back to you within 24 hours.
          </p>

          <div className="contact__items">
            <div className="contact-item">
              <div className="contact-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 15 16.73l.85-.85a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  />
                </svg>
              </div>
              <div>
                <p className="contact-item__label">Phone</p>
                <p className="contact-item__value">+1 (800) 555 – VLTX</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
              </div>
              <div>
                <p className="contact-item__label">Email</p>
                <p className="contact-item__value">veltrixtechsolution@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="contact-item__label">Location</p>
                <p className="contact-item__value">123 Innovation Drive, Tech Park, CA 94016</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <input type="text" name="_honey" defaultValue="" tabIndex={-1} autoComplete="off" className="contact__trap" />
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                placeholder="John"
                value={form.firstName}
                onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                placeholder="Doe"
                value={form.lastName}
                onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@company.com"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="service">Service Needed</label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={(e) => setForm((prev) => ({ ...prev, service: e.target.value }))}
              required
            >
              <option value="">Select a service...</option>
              <option>Web Development</option>
              <option>Web Designing</option>
              <option>Software Development</option>
              <option>Mobile Apps</option>
              <option>Digital Marketing</option>
              <option>Ecommerce Solutions</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              required
            />
          </div>

          {status && (
            <p className={`contact__status contact__status--${status.type}`} role="status">
              {status.text}
            </p>
          )}

          <button type="submit" className="btn btn--primary btn--full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  )
}

