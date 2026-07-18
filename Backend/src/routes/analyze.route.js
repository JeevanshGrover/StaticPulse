import { Router } from "express"
import { analyzeRepo } from "../controllers/analyze.controller.js"

const router = Router();

router.route("/analyze").post(analyzeRepo);

export default router