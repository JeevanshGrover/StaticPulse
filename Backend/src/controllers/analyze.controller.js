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
        console.log(`repo validated`)

        const cloned = await cloneRepo(repoUrl)
        console.log("repo cloned: clonedPath= ", cloned)
        repoPath = cloned.path;
        console.log("repo cloned: ", repoPath)

        const metrics = await runAnalyzers(repoPath);
        console.log("metrics: ", metrics)
        if(!metrics){
            throw new ApiError(500, "Internal server Error: Unable to fetch metrics")
        }
        
        const aiAnalysis = await getAIAnalysis(metrics)
        console.log("aiAnalysis result: ", aiAnalysis)
        const report = {
            metrics,
            ...aiAnalysis,
        }

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