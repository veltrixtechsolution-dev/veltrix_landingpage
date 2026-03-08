/**
 * Copies all HTML from src/templates to public/templates.
 * Use folder name "franchising" in public (src has "francising").
 * Run: node scripts/sync-templates.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcRoot = path.join(__dirname, '..', 'src', 'templates')
const pubRoot = path.join(__dirname, '..', 'public', 'templates')

function copyDir(srcDir, pubDir) {
  if (!fs.existsSync(srcDir)) return
  const entries = fs.readdirSync(srcDir, { withFileTypes: true })
  for (const e of entries) {
    const srcPath = path.join(srcDir, e.name)
    const pubName = e.name === 'francising' ? 'franchising' : e.name
    const pubPath = path.join(pubDir, pubName)
    if (e.isDirectory()) {
      fs.mkdirSync(pubPath, { recursive: true })
      copyDir(srcPath, pubPath)
    } else if (e.name.endsWith('.html')) {
      fs.copyFileSync(srcPath, pubPath)
      console.log('  ', path.relative(srcRoot, srcPath), '->', path.relative(pubRoot, pubPath))
    }
  }
}

if (!fs.existsSync(srcRoot)) {
  console.log('No src/templates folder found.')
  process.exit(0)
}

fs.mkdirSync(pubRoot, { recursive: true })
console.log('Syncing src/templates -> public/templates\n')
copyDir(srcRoot, pubRoot)
console.log('\nDone.')
