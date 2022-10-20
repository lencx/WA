import React from 'react';
import ReactDOM from 'react-dom/client';
import { WebviewWindow } from '@tauri-apps/api/window';

import useShortcut from '@/hooks/useShortcut';
import Search from '@/components/Search';
import './style.css';

const App = () => {
  useShortcut('CmdOrCtrl+Shift+S', () => {
    WebviewWindow.getByLabel('search')?.show();
  });

  return null;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Search />
  </React.StrictMode>
);
