import fs from "fs/promises";
import path from "path";

async function checkEnvExample(repoPath) {
  const entries = await fs.readdir(repoPath);
  return entries.some((name) => /^\.env\.example$/i.test(name));
}

export { checkEnvExample };