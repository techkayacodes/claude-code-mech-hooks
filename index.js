/**
 * claude-code-mech-hooks
 * Generates Claude Code (~/.claude/settings.json) hook configurations
 * for task completion acoustic cues (thock/clack/bell) and desktop notifications.
 */

export const SOUND_PROFILES = {
  thock: { freqHz: 180, durationMs: 90, description: "Deep PBT linear bottom-out tone" },
  clack: { freqHz: 520, durationMs: 65, description: "Crisp ABS tactile return tone" },
  clicky: { freqHz: 1200, durationMs: 45, description: "High-pitched click-jacket cue" },
  chime: { freqHz: 880, durationMs: 140, description: "Clean completion chime" }
};

/**
 * Generates a cross-platform terminal command for playing an acoustic hook cue.
 * @param {"windows" | "mac" | "linux"} [platform="windows"]
 * @param {string} [profile="thock"]
 * @returns {string}
 */
export function buildSoundCommand(platform = "windows", profile = "thock") {
  const preset = SOUND_PROFILES[profile] || SOUND_PROFILES.thock;
  if (platform === "windows") {
    return `powershell -NoProfile -Command "[console]::beep(${preset.freqHz},${preset.durationMs})"`;
  }
  if (platform === "mac") {
    return `afplay /System/Library/Sounds/Tink.aiff`;
  }
  return `printf '\\a'`;
}

/**
 * Generates a ready-to-merge `~/.claude/settings.json` hooks object.
 * @param {object} [options]
 * @param {"windows" | "mac" | "linux"} [options.platform="windows"]
 * @param {string} [options.stopProfile="thock"]
 * @param {string} [options.notifyProfile="clicky"]
 * @returns {object}
 */
export function generateClaudeSettingsHooks(options = {}) {
  const platform = options.platform || "windows";
  const stopProfile = options.stopProfile || "thock";
  const notifyProfile = options.notifyProfile || "clicky";

  return {
    hooks: {
      Stop: [
        {
          matcher: "",
          hooks: [
            {
              type: "command",
              command: buildSoundCommand(platform, stopProfile)
            }
          ]
        }
      ],
      Notification: [
        {
          matcher: "",
          hooks: [
            {
              type: "command",
              command: buildSoundCommand(platform, notifyProfile)
            }
          ]
        }
      ]
    }
  };
}
