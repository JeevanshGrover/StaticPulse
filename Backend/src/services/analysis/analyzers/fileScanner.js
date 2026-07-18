import fs from "fs/promises";
import path from "path";

const IGNORE_DIR = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
]);

async function scanRepo(repoPath) {
  const stats = {
    totalFiles: 0,
    totalFolders: 0,
  };

  await walk(repoPath, stats);

  return {
    totalFiles: stats.totalFiles,
    totalFolders: stats.totalFolders,
  };
}

async function walk(dir, stats) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORE_DIR.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      stats.totalFolders++;
      await walk(fullPath, stats);
    } else {
      stats.totalFiles++;
    }
  }
}

export { scanRepo };