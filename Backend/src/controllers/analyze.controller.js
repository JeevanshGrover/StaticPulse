import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validateRepo } from "../services/github/validateRepo.js";
import { cloneRepo } from "../services/github/cloneRepo.js";
import { scanRepo } from "../services/analysis/analyzers/fileScanner.js";
import { cleanupRepo } from "../utils/tempManager.js";
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

        const scanResult = await scanRepo(repoPath);

        if(!scanResult){
            throw new ApiError(500, "Internal server Error")
        }

        return res
            .status(200)
            .json(new ApiResponse(200, scanResult, "repository analyzed successfully"))
    } finally {
        if(repoPath){
            await cleanupRepo(repoPath)
        }
    }
})

export { analyzeRepo };