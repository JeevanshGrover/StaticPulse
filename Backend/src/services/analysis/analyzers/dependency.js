import fs from "fs/promises";
import path from "path";

async function analyzeDependencies(repoPath) {
  try {
    const pkgRaw = await fs.readFile(path.join(repoPath, "package.json"), "utf-8");
    const pkg = JSON.parse(pkgRaw);
    const deps = Object.keys(pkg.dependencies || {});
    const devDeps = Object.keys(pkg.devDependencies || {});
    return { dependencies: deps, dependencyCount: deps.length, devDependencyCount: devDeps.length };
  } catch {
    return { dependencies: [], dependencyCount: 0, devDependencyCount: 0 };
  }
}

export { analyzeDependencies };