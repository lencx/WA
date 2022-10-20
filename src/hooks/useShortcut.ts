import { isRegistered, register } from '@tauri-apps/api/globalShortcut';
import useInit from "@/hooks/useInit";

export default function useShortcut(cmd: string, callback: () => void) {
  useInit(async () => {
    const _isRegistered = await isRegistered(cmd);
    if (!_isRegistered) {
      await register(cmd, async () => {
        callback();
      });
    }
  });
}
