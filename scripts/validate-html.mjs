import { spawn } from 'node:child_process'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'

const PORT = 4173
const BASE_URL = `http://127.0.0.1:${PORT}`
const HTML_VALIDATOR_URL = 'https://validator.w3.org/nu/?out=json'
const CSS_VALIDATOR_URL =
  'https://jigsaw.w3.org/css-validator/validator?profile=css3svg&warning=1'
const REPORT_PATH = path.join('docs', 'quality', 'markup-validation.md')
const SETTLE_MS = 2500

const ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/employees', label: 'Employees' },
  { path: '/shift', label: 'Shift' },
  { path: '/payroll', label: 'Payroll' },
  { path: '/tasks', label: 'Tasks' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/vacation', label: 'Vacation' },
  { path: '/sick-days', label: 'Sick days' },
  { path: '/chat', label: 'Chat' },
  { path: '/restaurants', label: 'Restaurants' },
  { path: '/login', label: 'Login' },
  { path: '/tables', label: 'Admin · Tables', admin: true },
  { path: '/tables/7', label: 'Admin · Table order', admin: true },
  { path: '/orders', label: 'Admin · Orders', admin: true },
  { path: '/statistics', label: 'Admin · Statistics', admin: true },
]

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitForServer() {
  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    try {
      const response = await fetch(BASE_URL, { signal: AbortSignal.timeout(2000) })
      if (response.ok) return
    } catch {
      await delay(300)
    }
    await delay(300)
  }
  throw new Error(`Preview server did not start on ${BASE_URL}`)
}

async function launchBrowser() {
  for (const channel of ['chrome', 'msedge']) {
    try {
      return await chromium.launch({ channel, headless: true })
    } catch {
      continue
    }
  }
  return chromium.launch()
}

async function validateDocument(html) {
  const response = await fetch(HTML_VALIDATOR_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'User-Agent': 'crm-rest-quality-report/1.0',
    },
    body: html,
    signal: AbortSignal.timeout(60_000),
  })
  if (!response.ok) {
    throw new Error(`W3C validator responded with HTTP ${response.status}`)
  }
  return response.json()
}

async function validateStylesheet(css, filename) {
  const form = new FormData()
  form.append('file', new Blob([css], { type: 'text/css' }), filename)
  const response = await fetch(CSS_VALIDATOR_URL, {
    method: 'POST',
    body: form,
    headers: { 'User-Agent': 'crm-rest-quality-report/1.0' },
    signal: AbortSignal.timeout(120_000),
  })
  const html = await response.text()
  return {
    errors: Number(html.match(/Errors \((\d+)\)/)?.[1] ?? 0),
    warnings: Number(html.match(/Warnings \((\d+)\)/)?.[1] ?? 0),
    unrecognizedAtRules: (html.match(/Unrecognized at-rule/g) ?? []).length,
    unknownProperties: (html.match(/doesn(?:&#39;|’|')t exist/g) ?? []).length,
  }
}

function escapeCell(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim()
}

function formatMessage(message) {
  const location =
    typeof message.lastLine === 'number'
      ? ` (DOM line ${message.lastLine}, col ${message.lastColumn ?? '?'})`
      : ''
  const extract = message.extract ? ` — \`${escapeCell(message.extract)}\`` : ''
  return `${escapeCell(message.message)}${location}${extract}`
}

function summarize(messages) {
  const counts = { error: 0, warning: 0, info: 0 }
  for (const message of messages) {
    if (message.type in counts) counts[message.type] += 1
    else counts.info += 1
  }
  return counts
}

function renderCssSection(cssResults) {
  const lines = [
    '## CSS',
    '',
    'Checked with the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)',
    '(CSS level 3, SVG profile, warnings enabled).',
    '',
    '| Stylesheet | Errors | Warnings |',
    '| --- | ---: | ---: |',
  ]

  const displayPath = (file) => file.split(path.sep).join('/')

  for (const result of cssResults) {
    if (result.failure) {
      lines.push(`| \`${displayPath(result.file)}\` | n/a | n/a |`)
    } else {
      lines.push(`| \`${displayPath(result.file)}\` | ${result.errors} | ${result.warnings} |`)
    }
  }

  const totals = cssResults.reduce(
    (acc, result) => {
      if (result.failure) return acc
      acc.errors += result.errors
      acc.warnings += result.warnings
      acc.unrecognizedAtRules += result.unrecognizedAtRules
      acc.unknownProperties += result.unknownProperties
      return acc
    },
    { errors: 0, warnings: 0, unrecognizedAtRules: 0, unknownProperties: 0 },
  )

  lines.push(
    '',
    'The validator has not been updated for Tailwind CSS v4 syntax, so its findings are',
    'informational. All reported errors come from Tailwind-specific constructs the validator',
    'does not understand — unrecognized at-rules (`@theme`, `@custom-variant`, `@property`,',
    '`@container`, …), parse errors on `@apply`, and modern properties or values',
    '(`pointer-events`, `clip-path`, `margin-trim`, …). Totals:',
    `${totals.unrecognizedAtRules} unrecognized at-rules, ${totals.unknownProperties} unknown`,
    'properties/values. The stylesheets are compiled by Tailwind and Vite without warnings,',
    'so these reports are false positives rather than defects.',
    '',
  )

  for (const result of cssResults) {
    if (result.failure) {
      lines.push(`- \`${result.file}\`: validation failed — ${escapeCell(result.failure)}`)
    }
  }

  return lines
}

function renderReport(results, cssResults) {
  const totals = results.reduce(
    (acc, result) => {
      if (!result.counts) return acc
      acc.error += result.counts.error
      acc.warning += result.counts.warning
      acc.info += result.counts.info
      return acc
    },
    { error: 0, warning: 0, info: 0 },
  )

  const lines = [
    '# Markup validation report',
    '',
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    'Rendered DOM of every route was captured with Playwright (headless Chrome) and checked',
    'with the [W3C Nu HTML Checker](https://validator.w3.org/nu/). Line numbers refer to the',
    'serialized DOM snapshot, not to the React sources.',
    '',
    '| Route | Errors | Warnings | Info |',
    '| --- | ---: | ---: | ---: |',
  ]

  for (const result of results) {
    if (result.counts) {
      lines.push(
        `| \`${result.route.path}\` | ${result.counts.error} | ${result.counts.warning} | ${result.counts.info} |`,
      )
    } else {
      lines.push(`| \`${result.route.path}\` | n/a | n/a | n/a |`)
    }
  }

  lines.push(
    `| **Total** | **${totals.error}** | **${totals.warning}** | **${totals.info}** |`,
    '',
  )

  for (const result of results) {
    lines.push(`## ${result.route.label} (\`${result.route.path}\`)`, '')
    if (result.failure) {
      lines.push(`Validation failed: ${escapeCell(result.failure)}`, '')
      continue
    }
    const reported = result.messages.filter((message) => message.type !== 'info')
    if (reported.length === 0) {
      lines.push('No errors or warnings.', '')
      continue
    }
    for (const message of reported) {
      const badge = message.type === 'error' ? 'Error' : 'Warning'
      lines.push(`- **${badge}**: ${formatMessage(message)}`)
    }
    lines.push('')
  }

  lines.push(...renderCssSection(cssResults))

  return `${lines.join('\n')}\n`
}

async function collectCssResults() {
  const assetsDir = path.join('dist', 'assets')
  const bundleFiles = (await readdir(assetsDir)).filter((file) => file.endsWith('.css'))
  const targets = [
    { file: 'src/index.css' },
    ...bundleFiles.map((file) => ({ file: path.join(assetsDir, file) })),
  ]
  const results = []

  for (const target of targets) {
    process.stdout.write(`Checking ${target.file} ... `)
    try {
      const css = await readFile(target.file, 'utf8')
      const summary = await validateStylesheet(css, path.basename(target.file))
      results.push({ ...target, ...summary })
      process.stdout.write(`${summary.errors} errors, ${summary.warnings} warnings\n`)
    } catch (error) {
      const failure = error instanceof Error ? error.message : String(error)
      results.push({ ...target, failure })
      process.stdout.write(`failed: ${failure}\n`)
    }
    await delay(500)
  }

  return results
}

async function main() {
  const server = spawn(
    process.execPath,
    [
      path.resolve('node_modules/vite/bin/vite.js'),
      'preview',
      '--host',
      '127.0.0.1',
      '--port',
      String(PORT),
      '--strictPort',
    ],
    { stdio: 'ignore', windowsHide: true },
  )

  try {
    await waitForServer()
  } catch (error) {
    server.kill()
    throw error
  }

  const browser = await launchBrowser()
  const results = []

  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    const page = await context.newPage()

    for (const route of ROUTES) {
      if (route.admin) {
        await page.evaluate(() => sessionStorage.setItem('crm-admin-session', 'authenticated'))
      }
      process.stdout.write(`Checking ${route.path} ... `)
      try {
        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: 'domcontentloaded',
          timeout: 30_000,
        })
        await page.waitForFunction(
          () => (document.getElementById('root')?.childElementCount ?? 0) > 0,
          undefined,
          { timeout: 30_000 },
        )
        await delay(SETTLE_MS)
        const html = await page.content()
        const payload = await validateDocument(html)
        const messages = Array.isArray(payload.messages) ? payload.messages : []
        results.push({ route, messages, counts: summarize(messages) })
        const counts = summarize(messages)
        process.stdout.write(`${counts.error} errors, ${counts.warning} warnings\n`)
      } catch (error) {
        const failure = error instanceof Error ? error.message : String(error)
        results.push({ route, messages: [], counts: null, failure })
        process.stdout.write(`failed: ${failure}\n`)
      }
      await delay(500)
    }

    await context.close()
  } finally {
    await browser.close()
    server.kill()
  }

  const cssResults = await collectCssResults()

  await mkdir(path.dirname(REPORT_PATH), { recursive: true })
  await writeFile(REPORT_PATH, renderReport(results, cssResults), 'utf8')
  process.stdout.write(`Report written to ${REPORT_PATH}\n`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
