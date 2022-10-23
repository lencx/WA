import { invoke } from '@tauri-apps/api/tauri';

import useShortcut from '@/hooks/useShortcut';
import Search from '@/components/Search';

export default function SearchView() {
  useShortcut('CmdOrCtrl+Shift+S', () => {
    invoke('search_window');
  });
  return <Search />;
}
