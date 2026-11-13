#!/usr/bin/env node
import { generateClaudeSettingsHooks, SOUND_PROFILES } from "../index.js";

const args = process.argv.slice(2);
const platformArg = args.find((a) => a.startsWith("--platform="))?.split("=")[1] || (process.platform === "win32" ? "windows" : process.platform === "darwin" ? "mac" : "linux");
const stopProfile = args.find((a) => a.startsWith("--profile="))?.split("=")[1] || "thock";

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
claude-mech-hooks — Claude Code Acoustic Hook Generator
Profiles: ${Object.keys(SOUND_PROFILES).join(", ")}

Usage:
  npx claude-code-mech-hooks --profile=thock
  npx claude-code-mech-hooks --platform=windows --profile=clack
`);
  process.exit(0);
}

const config = generateClaudeSettingsHooks({ platform: platformArg, stopProfile });
console.log(JSON.stringify(config, null, 2));
