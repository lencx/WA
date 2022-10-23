import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WebviewWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';

import useShortcut from '@/hooks/useShortcut';
import useHotkey from '@/hooks/useHotkey';
import useSetting from '@/hooks/useSetting';
import { waSettingShortcut } from '@/utils';
import Routes from './routes';
import './style.css';

const App = () => {
  useHotkey();

  useShortcut('CmdOrCtrl+Shift+S', () => {
    invoke('search_window');
  });

  useSetting(async (data) => {
    const title = data?.title || 'WA+';
    WebviewWindow.getByLabel('main')?.setTitle(title);
    waSettingShortcut(async () => {
      invoke('setting_window');
    });
  });

  return null;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
