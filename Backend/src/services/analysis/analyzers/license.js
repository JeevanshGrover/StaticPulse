import fs from "fs/promises";

async function checkLicense(repoPath) {
  const entries = await fs.readdir(repoPath);
  return entries.some((name) => /^license/i.test(name));
}

export { checkLicense };