import fs from "fs/promises"
import path from 'path'

const IGNORE_DIR = new Set(["node_modules", ".git", "dist", "build", ".next"]);

const languageExtensions = {
    ".js": "JavaScript",
    ".jsx": "JavaScript",
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
    ".css": "CSS",
    ".html": "HTML",
    ".py": "Python",
    ".json": "JSON",
};

async function scanRepo(repoPath) {
    const stats = {
        totalFiles: 0,
        totalFolders: 0,
        languages: new Set(),
        hasReadme: false,
        dependencies: [],
    }

    await walk(repoPath, stats);

    const pkgPath = path.join(repoPath, "package.json");
    try {
        const pkgRaw = await fs.readFile(pkgPath, "utf-8")
        const pkg = JSON.parse(pkgRaw);
        stats.dependencies = Object.keys(pkg.dependencies || {})
    } catch {

    }

    return {
        totalFiles: stats.totalFiles,
        totalFolders: stats.totalFolders,
        languages: Array.from(stats.languages),
        hasReadme: stats.hasReadme,
        dependencies: stats.dependencies,
    }
}

async function walk(dir, stats) {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
        if (IGNORE_DIR.has(entry.name)) continue;

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            stats.totalFolders++;
            await walk(fullPath, stats);
        }
        else {
            stats.totalFiles++;

            const ext = path.extname(entry.name).toLowerCase()
            if (languageExtensions[ext]) {
                stats.languages.add(languageExtensions[ext]);
            }

            if (/^readme/i.test(entry.name)) {
                stats.hasReadme = true;
            }
        }
    }
}

export { scanRepo }