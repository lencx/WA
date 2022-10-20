import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WebviewWindow } from '@tauri-apps/api/window';

import useSetting from '@/hooks/useSetting';
import {tauriLink, waShortcut } from '@/utils';
import Routes from './routes';
import './style.css';

const App = () => {
  useSetting(async (data) => {
    const title = data?.title || 'WA+';
    WebviewWindow.getByLabel('main')?.setTitle(title);
    waShortcut('setting', () => {
      new WebviewWindow('wa_setting', {
        title: `${title} Setting`,
        url: tauriLink('/setting?mode=shortcut'),
      })
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
