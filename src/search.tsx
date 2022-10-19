import React from 'react';
import ReactDOM from 'react-dom/client';
import { isRegistered, register } from '@tauri-apps/api/globalShortcut';
import { WebviewWindow } from '@tauri-apps/api/window';

import useInit from '@/hooks/useInit';
import Search from '@/components/Search';
import './style.css';

const App = () => {
  useInit(async () => {
    const _isRegistered = await isRegistered('CommandOrControl+W');
    if (!_isRegistered) {
      await register('CommandOrControl+W', async () => {
        WebviewWindow.getByLabel('search')?.show();
      });
    }
  });

  return null;
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Search />
  </React.StrictMode>
);
