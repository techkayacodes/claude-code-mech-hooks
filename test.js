import test from "node:test";
import assert from "node:assert/strict";
import { buildSoundCommand, generateClaudeSettingsHooks, SOUND_PROFILES } from "./index.js";

test("SOUND_PROFILES includes thock, clack, clicky, and chime", () => {
  assert.ok(SOUND_PROFILES.thock);
  assert.ok(SOUND_PROFILES.clack);
  assert.ok(SOUND_PROFILES.clicky);
});

test("buildSoundCommand generates valid platform command", () => {
  const cmd = buildSoundCommand("windows", "thock");
  assert.ok(cmd.includes("[console]::beep(180,90)"));
});

test("generateClaudeSettingsHooks returns Stop and Notification hook blocks", () => {
  const settings = generateClaudeSettingsHooks({ platform: "windows", stopProfile: "clack" });
  assert.ok(Array.isArray(settings.hooks.Stop));
  assert.ok(Array.isArray(settings.hooks.Notification));
  assert.equal(settings.hooks.Stop[0].hooks[0].type, "command");
});
