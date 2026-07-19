import fs from "fs/promises";
import path from "path";

const IGNORE_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next"]);
const MAX_DEPTH = 2;

async function analyzeDependencies(repoPath) {
  const pkgFiles = await findPackage(repoPath);

  if (pkgFiles.length === 0) {
    return { dependencies: [], dependencyCount: 0, devDependencyCount: 0, packageJsonLocations: [] };
  }

  const allDeps = new Set();
  const allDevDeps = new Set();

  for (const pkgPath of pkgFiles) {
    try {
      const pkgRaw = await fs.readFile(pkgPath, "utf-8");
      const pkg = JSON.parse(pkgRaw);

      Object.keys(pkg.dependencies || {}).forEach((d) => allDeps.add(d));
      Object.keys(pkg.devDependencies || {}).forEach((d) => allDevDeps.add(d));
    } catch {
      // skip malformed package.json, don't kill the whole analyzer
    }
  }

  return {
    dependencies: Array.from(allDeps),
    dependencyCount: allDeps.size,
    devDependencyCount: allDevDeps.size,
    packageJsonLocations: pkgFiles.map((p) => path.relative(repoPath, p)),
  };
}

async function findPackage(repoPath) {
  const found = [];

  async function walk(dir, depth) {
    if (depth > MAX_DEPTH) return;

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath, depth + 1);
      } else if (entry.name === "package.json") {
        found.push(fullPath);
      }
    }
  }

  await walk(repoPath, 0)
  return found;
}

export { analyzeDependencies };