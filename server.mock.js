import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app = express()
const origin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
const port = Number(process.env.PORT || 5175)

app.use(helmet())
app.use(cors({ origin }))
app.use(express.json({ limit: '1kb' }))

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

app.post('/api/subscribe', async (req, res) => {
  const shouldFail = req.headers['x-simulate-failure'] === 'true'
  const responseDelay = Number(req.headers['x-simulate-delay'] || 500)
  await delay(Math.min(Math.max(responseDelay, 0), 2500))

  if (shouldFail) {
    return res.status(500).json({ error: 'Simulated server failure. Please try again later.' })
  }

  if (!req.body || typeof req.body.email !== 'string') {
    return res.status(400).json({ error: 'Invalid request payload.' })
  }

  const email = req.body.email.trim()
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' })
  }

  return res.status(200).json({ message: `Simulated subscription received for ${email}.` })
})

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', mode: 'mock' })
})

app.listen(port, () => {
  console.log(`Mock subscription API listening on http://localhost:${port}`)
  console.log('Use X-Simulate-Failure: true or X-Simulate-Delay headers to test error and slow responses.')
})
