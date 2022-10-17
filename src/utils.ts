import { homeDir } from '@tauri-apps/api/path';
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

export async function settingPath() {
  const home = await homeDir();
  return `${home}.wa/setting.json`;
}

export async function readSetting() {
  return await readTextFile('.wa/setting.json', { dir: BaseDirectory.Home });
}
export async function writeSetting(content: string) {
  await writeTextFile('.wa/setting.json', content, { dir: BaseDirectory.Home });
}