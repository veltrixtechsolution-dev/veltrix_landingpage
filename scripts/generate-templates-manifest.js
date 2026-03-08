/**
 * Scans public/templates for subfolders and HTML files, then writes manifest.json.
 * Run: node scripts/generate-templates-manifest.js
 * Add new template folders or HTML files and re-run to update the list.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TEMPLATES_DIR = path.join(__dirname, '..', 'public', 'templates')
const MANIFEST_PATH = path.join(TEMPLATES_DIR, 'manifest.json')

function toTitleCase(str) {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function toId(name) {
  return name.replace(/\.[^.]+$/, '') // strip extension
}

if (!fs.existsSync(TEMPLATES_DIR)) {
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true })
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify({ categories: [] }, null, 2))
  console.log('Created', TEMPLATES_DIR, 'and empty manifest.json')
  process.exit(0)
}

const entries = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true })
const categories = []

for (const entry of entries) {
  if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'manifest.json') continue

  const categoryDir = path.join(TEMPLATES_DIR, entry.name)
  const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.html'))

  if (files.length === 0) continue

  const templates = files.map((file) => ({
    id: toId(file),
    name: toTitleCase(toId(file)),
    file,
  }))

  categories.push({
    id: entry.name.toLowerCase().replace(/\s+/g, '-'),
    name: toTitleCase(entry.name),
    templates,
  })
}

const manifest = { categories }
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
console.log('Updated', MANIFEST_PATH, 'with', categories.length, 'categories')
categories.forEach((c) => console.log('  -', c.name, ':', c.templates.length, 'templates'))
