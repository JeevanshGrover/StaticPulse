import express from 'express'
import cors from 'cors'
import healthRoutes from "./routes/health.route.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true, limit: '20kb' }))

//routes
app.use("/api/v1", healthRoutes)

export { app };