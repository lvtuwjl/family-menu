import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const standaloneRoot = path.join(projectRoot, ".next", "standalone");

if (!existsSync(standaloneRoot)) {
  throw new Error("没有找到 .next/standalone，请先运行 npm run build");
}

const staticTarget = path.join(standaloneRoot, ".next", "static");
mkdirSync(path.dirname(staticTarget), { recursive: true });
cpSync(path.join(projectRoot, ".next", "static"), staticTarget, { recursive: true, force: true });

const publicSource = path.join(projectRoot, "public");
if (existsSync(publicSource)) {
  cpSync(publicSource, path.join(standaloneRoot, "public"), { recursive: true, force: true });
}

console.log("Standalone 静态资源已准备完成");
