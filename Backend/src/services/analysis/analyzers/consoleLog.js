import fs from "fs/promises";
import path from "path";

const CODE_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx"]);
const IGNORE_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next"]);

async function countConsoleLogs(repoPath) {
  let count = 0;
  await walk(repoPath);
  return count;

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (CODE_EXTENSIONS.has(path.extname(entry.name))) {
        try {
          const content = await fs.readFile(fullPath, "utf-8");
          const matches = content.match(/console\.log\(/g);
          if (matches) count += matches.length;
        } catch {
          // skip unreadable files
        }
      }
    }
  }
}

export { countConsoleLogs };