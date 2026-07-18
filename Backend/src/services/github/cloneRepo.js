import { simpleGit } from 'simple-git'
import fs from "fs/promises"
import path from 'path'
import { randomUUID } from 'crypto'
import { ApiError } from '../../utils/ApiError.js'
import { asyncHandler } from "../../utils/asyncHandler.js"

const TEMP_DIR = path.resolve("temp/repos")

const cloneRepo = async (repoUrl) => {
    await fs.mkdir(TEMP_DIR, { recursive: true })

    const repoId = randomUUID();
    const targetPath = path.join(TEMP_DIR, repoId);
    const git = simpleGit();

    const clonePromise = git.clone(repoUrl, targetPath, ["--depth", "1"]);

    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("CLONE_TIMEOUT")), 20000)
    );

    try{
        await Promise.race([clonePromise, timeoutPromise])
        return{
            repoId,
            path: targetPath
        }
    } catch(err){
        await fs.rm(targetPath, { recursive: true, force: true}).catch(()=>{});

        if(err.message === "CLONE_TIMEOUT"){
            throw new ApiError(422, "Repository took too long to clone (may be too large)")
        }
        throw new ApiError(422, "Repository not found or inaccessible")
    }
}

export { cloneRepo };