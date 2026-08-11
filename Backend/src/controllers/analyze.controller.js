import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validateRepo } from "../services/github/validateRepo.js";
import { cloneRepo } from "../services/github/cloneRepo.js";
import { runAnalyzers } from "../services/analysis/analyzerRunner.js"
import { cleanupRepo } from "../utils/tempManager.js";
import { getAIAnalysis } from "../services/ai/gemini.js"
import { ApiError } from "../utils/ApiError.js";

const analyzeRepo = asyncHandler(async(req, res) => {
    const { repoUrl } = req.body;
    if(!repoUrl){
        throw new ApiError(400, "URL is required")
    }

    let repoPath;
    try{
        validateRepo(repoUrl)

        const cloned = await cloneRepo(repoUrl)
        repoPath = cloned.path;

        const metrics = await runAnalyzers(repoPath);
        if(!metrics){
            throw new ApiError(500, "Internal server Error: Unable to fetch metrics")
        }
        
        const aiAnalysis = await getAIAnalysis(metrics)
        const report = {
            metrics,
            ...aiAnalysis,
        }

        console.log("report ->>", report)

        return res
            .status(200)
            .json(new ApiResponse(200, report, "repository analyzed successfully"))
    } finally {
        if(repoPath){
            await cleanupRepo(repoPath)
        }
    }
})

export { analyzeRepo };