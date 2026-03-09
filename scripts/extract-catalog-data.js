/**
 * Extracts template metadata and SVG thumbnails from catalog.html.
 * Run: node scripts/extract-catalog-data.js
 * Reads from C:\Users\deeb\downloads\catalog.html and writes public/templates/template-meta.json and public/templates/thumbnails.json
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CATALOG_PATH = path.join('C:', 'Users', 'deeb', 'downloads', 'catalog.html')
const OUT_DIR = path.join(__dirname, '..', 'public', 'templates')

const html = fs.readFileSync(CATALOG_PATH, 'utf8')

const cardRegex = /<a class="tpl-card" href="([^"]+)"[^>]*>[\s\S]*?<div class="tpl-thumb">\s*<svg[^>]*>([\s\S]*?)<\/svg>\s*<\/div>[\s\S]*?<span class="tpl-style[^"]*">([^<]+)<\/span>[\s\S]*?<span class="tpl-num">([^<]+)<\/span>[\s\S]*?<div class="tpl-name">([^<]+)<\/div>[\s\S]*?<div class="tpl-desc">([^<]+)<\/div>[\s\S]*?<div class="tpl-tags">([\s\S]*?)<\/div>/g

const meta = {}
const thumbnails = {}
let m
while ((m = cardRegex.exec(html)) !== null) {
  const href = m[1]           // e.g. ticketing-1.html
  const svgContent = m[2]    // inner SVG
  const styleLabel = m[3]
  const num = m[4]           // e.g. ticketing-1
  const displayName = m[5]
  const description = m[6]
  const tagsHtml = m[7]
  const id = href.replace(/\.html$/, '')
  const tags = []
  const tagRegex = /<span class="tpl-tag">([^<]+)<\/span>/g
  let tagM
  while ((tagM = tagRegex.exec(tagsHtml)) !== null) tags.push(tagM[1])
  meta[id] = { displayName, description, styleLabel, tags }
  thumbnails[id] = svgContent
}

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(path.join(OUT_DIR, 'template-meta.json'), JSON.stringify(meta, null, 2))
fs.writeFileSync(path.join(OUT_DIR, 'thumbnails.json'), JSON.stringify(thumbnails, null, 0))
console.log('Wrote template-meta.json and thumbnails.json with', Object.keys(meta).length, 'templates')
console.log('Ids:', Object.keys(meta).join(', '))
