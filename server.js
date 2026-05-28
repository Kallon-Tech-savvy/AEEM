import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

const app = express()
app.set('trust proxy', true)
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '1kb' }))

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataFile = path.join(__dirname, 'subscriptions.json')

const readSubscriptions = async () => {
  try {
    const file = await fs.readFile(dataFile, 'utf8')
    return JSON.parse(file)
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    console.error('Failed to read subscriptions file:', error)
    throw new Error('Unable to read subscriptions storage.')
  }
}

const saveSubscriptions = async (subscriptions) => {
  await fs.writeFile(dataFile, JSON.stringify(subscriptions, null, 2), 'utf8')
}

const rateLimitWindowMs = 15 * 60 * 1000
const maxRequests = 10
const requestLog = new Map()

const subscriptionSchema = z.object({
  email: z.string().trim().email(),
  website: z.string().max(0).optional(),
})

const sanitizeEmail = (value) => value.replace(/<[^>]*>/g, '').trim().toLowerCase()

const isRateLimited = (ip) => {
  const now = Date.now()
  const entry = requestLog.get(ip) || { count: 0, firstRequest: now }
  if (now - entry.firstRequest > rateLimitWindowMs) {
    requestLog.set(ip, { count: 1, firstRequest: now })
    return false
  }

  entry.count += 1
  requestLog.set(ip, entry)
  return entry.count > maxRequests
}

app.post('/api/subscribe', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.ip || 'unknown'
  if (isRateLimited(String(ip))) {
    return res.status(429).json({ error: 'Too many subscription attempts. Please wait and try again later.' })
  }

  const safeParse = subscriptionSchema.safeParse(req.body)
  if (!safeParse.success) {
    return res.status(400).json({ error: safeParse.error.errors[0]?.message || 'Invalid submission.' })
  }

  const { email, website } = safeParse.data
  if (website && website.length > 0) {
    return res.status(400).json({ error: 'Spam detected.' })
  }

  const cleanedEmail = sanitizeEmail(email)
  if (!cleanedEmail) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  try {
    const subscriptions = await readSubscriptions()
    const existing = subscriptions.find((entry) => entry.email === cleanedEmail)

    if (existing) {
      return res.status(200).json({ message: 'This email is already subscribed.' })
    }

    subscriptions.push({
      email: cleanedEmail,
      createdAt: new Date().toISOString(),
    })

    await saveSubscriptions(subscriptions)
    return res.status(200).json({ message: 'Thanks! You are now signed up for AEEM updates.' })
  } catch (error) {
    console.error('Subscription save failed:', error)
    return res.status(500).json({ error: 'Could not complete subscription. Please try again later.' })
  }
})

const port = Number(process.env.PORT || 5174)
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

// Optional static file serving for simple production deployments.
// Set SERVE_STATIC=true and build the app into a `dist` folder.
if (process.env.SERVE_STATIC === 'true') {
  const staticRoot = path.join(__dirname, 'dist')
  app.use(
    express.static(staticRoot, {
      setHeaders: (res, filePath) => {
        // Long-term caching for hashed assets
        if (filePath.match(/\.[a-f0-9]{8,}\.\w+$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        } else if (filePath.endsWith('.html')) {
          // HTML must be revalidated more frequently
          res.setHeader('Cache-Control', 'no-cache')
        } else {
          // Default static asset caching
          res.setHeader('Cache-Control', 'public, max-age=86400')
        }
      },
    })
  )
}

app.listen(port, () => {
  console.log(`Subscription API listening on http://localhost:${port}`)
})
