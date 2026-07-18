import fs from "fs/promises";
import path from "path";

async function checkReadme(repoPath) {
  const entries = await fs.readdir(repoPath);
  return entries.some((name) => /^readme/i.test(name));
}

export { checkReadme };