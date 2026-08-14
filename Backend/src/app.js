import express from 'express'
import cors from 'cors'
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express()

app.use(cors({
    origin: process.env.NODE_ENV === "development" 
            ? "process.env.CORS_ORIGIN"  //replace this with your local frontend URL
            : "https://staticpulse-v1.vercel.app/", 
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