import { homeDir, join } from '@tauri-apps/api/path';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';

export async function settingPath() {
  const home = await homeDir();
  return join(home, ".wa", "setting.json");
}

export async function readSetting() {
  return await readTextFile(await settingPath());
}

export async function writeSetting(content: string) {
  const setting = await settingPath();
  await writeTextFile(await join(setting), content);
}

export async function scriptPath() {
  const home = await homeDir();
  return join(home, ".wa", "scripts");
}

// https://vitejs.dev/guide/env-and-mode.html#env-variables
export function tauriLink(path: string) {
  return import.meta.env.DEV ? `http://localhost:3681${path}` : `tauri://localhost${path}`;
}
