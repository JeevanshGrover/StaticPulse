import fs from "fs/promises"

export async function cleanupRepo(repoPath){
    await fs.rm(repoPath, {
        recursive: true,
        force: true
    }).catch((err) => {
        console.error(`failed to cleanup ${repoPath}:`, err.message)
    })
}