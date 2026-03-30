import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

type ProjectRequestRow = {
  id: string
  client_name: string
  client_email: string
  business_type: string
  budget_range: string | null
  timeline: string | null
  project_description: string
  category_name: string
  template_name: string
  created_at: string
}

const ADMIN_USERNAME = (import.meta.env.VITE_ADMIN_USERNAME as string | undefined) ?? ''
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? ''

function maskEmail(email: string) {
  const [u, d] = email.split('@')
  if (!u || !d) return email
  return `${u.slice(0, 2)}***@${d}`
}

export function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState('')
  const [rows, setRows] = useState<ProjectRequestRow[]>([])
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
      const { data, error } = await supabase
        .from('template_project_requests')
        .select(
          [
            'id',
            'client_name',
            'client_email',
            'business_type',
            'budget_range',
            'timeline',
            'project_description',
            'template_name',
            'category_name',
            'created_at',
          ].join(',')
        )
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) throw error
      setRows((data ?? []) as unknown as ProjectRequestRow[])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [query, rows])

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
                <th>Client</th>
                <th>Business</th>
                <th>Template</th>
                <th>Description</th>
                <th>Budget</th>
                <th>Timeline</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="admin-cell-title">{r.client_name}</div>
                    <div className="admin-cell-sub">{maskEmail(r.client_email)}</div>
                  </td>
                  <td>{r.business_type}</td>
                  <td>{r.template_name}</td>
                  <td>
                    <p className="admin-description">{r.project_description}</p>
                  </td>
                  <td>{r.budget_range ?? '—'}</td>
                  <td>{r.timeline ?? '—'}</td>
                  <td>
                    {new Date(r.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
              {!filteredRows.length ? (
                <tr>
                  <td colSpan={7} className="admin-empty">
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

