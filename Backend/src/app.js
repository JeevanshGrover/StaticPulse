import express from 'express'
import cors from 'cors'
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express()

const allowedOrigin =
    process.env.CORS_ORIGIN ||
    (process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://staticpulse-v1.vercel.app");

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))

app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true, limit: '20kb' }))

//routes
import healthRoutes from "./routes/health.route.js"
import analyzeRoutes from "./routes/analyze.route.js"

app.use("/api/v1", healthRoutes)
app.use("/api/v1", analyzeRoutes)

app.use(errorHandler);

export { app };