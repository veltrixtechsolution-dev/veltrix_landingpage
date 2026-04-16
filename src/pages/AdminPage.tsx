import { Fragment, useEffect, useMemo, useState } from 'react'
import {
  listProjectRequests,
  type ProjectRequestRow,
  type TemplateQuestionnaireAnswers,
} from '../api/projectRequests'

const ADMIN_USERNAME = (import.meta.env.VITE_ADMIN_USERNAME as string | undefined) ?? ''
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? ''

const PACKAGE_FULL: Record<TemplateQuestionnaireAnswers['packageInterest'], string> = {
  professional: '₱5,999 — Basic Starter (1 page)',
  starter: '₱7,999 — Starter Plus (2–4 pages)',
  standard: '₱10,000 — Standard (5–8 pages)',
  ultimate: '₱15,000 — Premium (unlimited pages)',
}

function displayText(value: string | null | undefined): string {
  if (value == null || value.trim() === '') return '—'
  return value.trim()
}

function formatDomainSetup(v: TemplateQuestionnaireAnswers['domainSetup'] | undefined): string {
  if (v === 'already-have') return 'Yes, I already own one.'
  if (v === 'need-provided') return 'No — provide it (included in package).'
  return '—'
}

function formatHostingSetup(v: TemplateQuestionnaireAnswers['hostingSetup'] | undefined): string {
  if (v === 'own-hosting') return 'Yes — I have my own hosting account.'
  if (v === 'included-hosting') return 'No — use free hosting included in package.'
  return '—'
}

function formatBusinessEmailSetup(
  v: TemplateQuestionnaireAnswers['businessEmailSetup'] | undefined
): string {
  if (v === 'need-veltrix') return 'Veltrix creates professional emails.'
  if (v === 'will-provide') return 'I will provide my own email accounts.'
  if (v === 'not-needed') return 'No business emails for now.'
  return '—'
}

function formatUpdatesPreference(
  v: TemplateQuestionnaireAnswers['updatesPreference'] | undefined
): string {
  if (v === 'managed-by-veltrix') return 'Managed by Veltrix (maintenance fee).'
  if (v === 'self-managed') return 'Self-managed — I handle updates.'
  return '—'
}

function formatLogoBranding(v: TemplateQuestionnaireAnswers['logoBrandingReady'] | undefined): string {
  if (v === 'ready') return 'Yes — logo and colors ready.'
  if (v === 'need-help') return 'No — need help with logo.'
  return '—'
}

function formatBudgetRange(code: string | null): string {
  if (!code) return '—'
  const map: Record<string, string> = {
    'under-2k': 'Under $2,000',
    '2k-5k': '$2,000 – $5,000',
    '5k-10k': '$5,000 – $10,000',
    '10k-plus': '$10,000+',
  }
  return map[code] ?? code
}

function formatTimeline(code: string | null): string {
  if (!code) return '—'
  const map: Record<string, string> = {
    asap: 'ASAP',
    '1-2mo': '1–2 months',
    '3-6mo': '3–6 months',
    '6mo-plus': '6+ months',
  }
  return map[code] ?? code
}

function formatPackageInterest(
  v: TemplateQuestionnaireAnswers['packageInterest'] | undefined
): string {
  if (!v) return '—'
  return PACKAGE_FULL[v] ?? v
}

type DetailLineProps = { label: string; value: string }

function DetailLine({ label, value }: DetailLineProps) {
  return (
    <>
      <dt className="admin-detail-dt">{label}</dt>
      <dd className="admin-detail-dd">{value}</dd>
    </>
  )
}

export function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState('')
  const [rows, setRows] = useState<ProjectRequestRow[]>([])
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [fetchingRows, setFetchingRows] = useState(false)

  useEffect(() => {
    // Basic readiness: credentials must be configured.
    setLoading(false)
  }, [])

  const credsConfigured = useMemo(() => {
    return Boolean(ADMIN_USERNAME && ADMIN_PASSWORD)
  }, [])

  async function loadRows() {
    setFetchingRows(true)
    setFetchError(null)
    try {
      const data = await listProjectRequests()
      setRows(data)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load submissions.'
      setFetchError(msg)
    } finally {
      setFetchingRows(false)
    }
  }

  useEffect(() => {
    if (!authed) return
    loadRows()
  }, [authed])

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => {
      const hay = [
        r.client_name,
        r.client_email,
        r.business_type,
        r.template_name,
        r.category_name,
        r.budget_range ?? '',
        r.timeline ?? '',
        r.project_description,
        r.questionnaire_answers?.contactNumber ?? '',
        r.questionnaire_answers?.existingWebsite ?? '',
        r.questionnaire_answers?.brandAssetsNote ?? '',
        r.questionnaire_answers?.briefBusinessDescription ?? '',
        r.questionnaire_answers?.referenceWebsites ?? '',
        r.questionnaire_answers?.additionalRequests ?? '',
        r.questionnaire_answers?.packageInterest ?? '',
        r.questionnaire_answers?.updatesPreference ?? '',
        r.questionnaire_answers?.domainSetup ?? '',
        r.questionnaire_answers?.hostingSetup ?? '',
        r.questionnaire_answers?.businessEmailSetup ?? '',
        r.questionnaire_answers?.logoBrandingReady ?? '',
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [query, rows])

  const dashboardStats = useMemo(() => {
    const now = new Date()
    const todayKey = now.toDateString()
    let todayCount = 0
    let managedCount = 0
    let selfManagedCount = 0
    const packageCounts: Record<string, number> = {}

    for (const row of rows) {
      if (new Date(row.created_at).toDateString() === todayKey) todayCount += 1
      const updates = row.questionnaire_answers?.updatesPreference
      if (updates === 'managed-by-veltrix') managedCount += 1
      if (updates === 'self-managed') selfManagedCount += 1

      const pkg = row.questionnaire_answers?.packageInterest
      if (pkg) packageCounts[pkg] = (packageCounts[pkg] ?? 0) + 1
    }

    const topPackage =
      Object.entries(packageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'n/a'

    return {
      total: rows.length,
      todayCount,
      managedCount,
      selfManagedCount,
      topPackage,
    }
  }, [rows])

  const packageLabel: Record<string, string> = {
    professional: 'Basic Starter',
    starter: 'Starter Plus',
    standard: 'Standard',
    ultimate: 'Premium',
  }

  function handleLogin() {
    setError(null)
    if (!credsConfigured) {
      setError('Admin credentials not configured. Set VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD.')
      return
    }
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthed(true)
      return
    }
    setError('Invalid credentials.')
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <p className="admin-muted">Loading…</p>
        </div>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="admin-page admin-page--login">
        <div className="admin-login-card">
          <span className="admin-login-badge">Private</span>
          <h1 className="admin-login-title">Admin Dashboard</h1>
          <p className="admin-login-lead">Enter your credentials to view project submissions.</p>

          <div className="admin-form">
            <label className="admin-label">
              Username
              <input
                className="admin-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Enter username"
              />
            </label>

            <label className="admin-label">
              Password
              <input
                className="admin-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter password"
              />
            </label>

            {error ? (
              <p className="admin-error" role="alert">
                {error}
              </p>
            ) : null}

            <button type="button" className="admin-login-submit" onClick={handleLogin}>
              Unlock dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Submissions dashboard</h1>
            <p className="admin-muted">
              Showing <strong>{filteredRows.length}</strong> of <strong>{rows.length}</strong> requests
            </p>
          </div>

          <button type="button" className="btn btn--outline" onClick={() => setAuthed(false)}>
            Logout
          </button>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <p className="admin-stat-label">Total submissions</p>
            <p className="admin-stat-value">{dashboardStats.total}</p>
          </div>
          <div className="admin-stat-card">
            <p className="admin-stat-label">Submitted today</p>
            <p className="admin-stat-value">{dashboardStats.todayCount}</p>
          </div>
          <div className="admin-stat-card">
            <p className="admin-stat-label">Top package</p>
            <p className="admin-stat-value">
              {packageLabel[dashboardStats.topPackage] ?? dashboardStats.topPackage}
            </p>
          </div>
          <div className="admin-stat-card">
            <p className="admin-stat-label">Maintenance preference</p>
            <p className="admin-stat-value">
              {dashboardStats.managedCount} managed / {dashboardStats.selfManagedCount} self
            </p>
          </div>
        </div>

        <div className="admin-toolbar">
          <input
            className="admin-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, template, budget…"
          />

          <button
            type="button"
            className="btn btn--ghost"
            disabled={fetchingRows}
            onClick={() => loadRows()}
          >
            Refresh
          </button>
        </div>

        {fetchError ? (
          <p className="admin-error" role="alert">
            {fetchError}
          </p>
        ) : null}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Template</th>
                <th>Package</th>
                <th>Updates</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r) => {
                const isExpanded = expandedRowId === r.id
                return (
                  <Fragment key={r.id}>
                    <tr key={r.id}>
                      <td>
                        {new Date(r.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                        })}
                      </td>
                      <td>
                        <div className="admin-cell-title">{r.client_name}</div>
                        <div className="admin-cell-sub">{r.client_email}</div>
                      </td>
                      <td>
                        <div className="admin-cell-title">{r.template_name}</div>
                        <div className="admin-cell-sub">{r.business_type}</div>
                      </td>
                      <td>
                        <span className="admin-pill">
                          {packageLabel[r.questionnaire_answers?.packageInterest ?? ''] ??
                            r.questionnaire_answers?.packageInterest ??
                            '—'}
                        </span>
                      </td>
                      <td>
                        <span className="admin-pill admin-pill--muted">
                          {r.questionnaire_answers?.updatesPreference === 'managed-by-veltrix'
                            ? 'Managed'
                            : r.questionnaire_answers?.updatesPreference === 'self-managed'
                              ? 'Self-managed'
                              : '—'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="admin-row-action"
                          onClick={() => setExpandedRowId(isExpanded ? null : r.id)}
                        >
                          {isExpanded ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="admin-details-row">
                        <td colSpan={6}>
                          {(() => {
                            const q = r.questionnaire_answers
                            return (
                              <div className="admin-details-body">
                                <section className="admin-details-section">
                                  <h4 className="admin-details-heading">Submission</h4>
                                  <dl className="admin-details-dl">
                                    <DetailLine
                                      label="Submitted"
                                      value={new Date(r.created_at).toLocaleString()}
                                    />
                                    <DetailLine label="Category" value={displayText(r.category_name)} />
                                    <DetailLine label="Template" value={displayText(r.template_name)} />
                                  </dl>
                                </section>

                                <section className="admin-details-section">
                                  <h4 className="admin-details-heading">Section 1 — Client information</h4>
                                  <dl className="admin-details-dl">
                                    <DetailLine label="Full name" value={displayText(r.client_name)} />
                                    <DetailLine label="Email" value={displayText(r.client_email)} />
                                    <DetailLine label="Business name" value={displayText(r.business_type)} />
                                    <DetailLine
                                      label="WhatsApp / Viber / contact number"
                                      value={displayText(q?.contactNumber)}
                                    />
                                    <DetailLine
                                      label="Existing website (if any)"
                                      value={displayText(q?.existingWebsite)}
                                    />
                                  </dl>
                                </section>

                                <section className="admin-details-section">
                                  <h4 className="admin-details-heading">Section 2 — Technical setup</h4>
                                  <dl className="admin-details-dl">
                                    <DetailLine
                                      label="Domain name"
                                      value={formatDomainSetup(q?.domainSetup)}
                                    />
                                    <DetailLine
                                      label="Web hosting"
                                      value={formatHostingSetup(q?.hostingSetup)}
                                    />
                                    <DetailLine
                                      label="Business email setup"
                                      value={formatBusinessEmailSetup(q?.businessEmailSetup)}
                                    />
                                  </dl>
                                </section>

                                <section className="admin-details-section">
                                  <h4 className="admin-details-heading">Section 3 — Scope & maintenance</h4>
                                  <dl className="admin-details-dl">
                                    <DetailLine
                                      label="Future updates & upgrades"
                                      value={formatUpdatesPreference(q?.updatesPreference)}
                                    />
                                    <DetailLine
                                      label="Package interested in"
                                      value={formatPackageInterest(q?.packageInterest)}
                                    />
                                    <DetailLine label="Timeline" value={formatTimeline(r.timeline)} />
                                    <DetailLine label="Budget (optional)" value={formatBudgetRange(r.budget_range)} />
                                  </dl>
                                </section>

                                <section className="admin-details-section">
                                  <h4 className="admin-details-heading">Section 4 — Content & design</h4>
                                  <dl className="admin-details-dl">
                                    <DetailLine
                                      label="Logo & branding colors"
                                      value={formatLogoBranding(q?.logoBrandingReady)}
                                    />
                                    <DetailLine
                                      label="Brand assets note"
                                      value={displayText(q?.brandAssetsNote)}
                                    />
                                    <DetailLine
                                      label="Brief business description"
                                      value={displayText(q?.briefBusinessDescription || r.project_description)}
                                    />
                                    <DetailLine
                                      label="Reference websites"
                                      value={displayText(q?.referenceWebsites)}
                                    />
                                  </dl>
                                </section>

                                <section className="admin-details-section">
                                  <h4 className="admin-details-heading">Section 5 — Final confirmation</h4>
                                  <dl className="admin-details-dl">
                                    <DetailLine
                                      label="Additional requests / questions"
                                      value={displayText(q?.additionalRequests)}
                                    />
                                  </dl>
                                </section>
                              </div>
                            )
                          })()}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                )
              })}
              {!filteredRows.length ? (
                <tr>
                  <td colSpan={6} className="admin-empty">
                    No submissions found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

