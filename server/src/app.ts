import express from 'express'
import cors from 'cors'
import campusesRouter from './routes/campuses'
import studentsRouter from './routes/students'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'

// Build the Express app. Kept separate from server.ts so it can be imported in
// tests or a serverless handler without binding a port.
export function createApp() {
  const app = express()

  const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  app.use(cors({ origin: allowedOrigins }))
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use('/campuses', campusesRouter)
  app.use('/students', studentsRouter)

  // Unmatched route -> JSON 404, then the central error handler (must be last).
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
