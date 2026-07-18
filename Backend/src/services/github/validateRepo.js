import { ApiError } from "../../utils/ApiError.js"

function validateRepo(repoUrl){
    if(!repoUrl || typeof repoURL !== "string"){
        throw new ApiError(400, "Repo URL is required") 
    }

    const githubPattern = /^https?:\/\/github\.com\/[\w.-]+\/[\w.-]+(\.git)?\/?$/;

    if(!githubPattern.test(repoUrl.trim())){
        throw new ApiError(400, "must be a valid public repository URL")
    }
}

export { validateRepo }