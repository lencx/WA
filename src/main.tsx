import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WebviewWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';

import useHotkey from '@/hooks/useHotkey';
import useSetting from '@/hooks/useSetting';
import useInit from '@/hooks/useInit';
import { waSettingShortcut } from '@/utils';
import Routes from './routes';
import './style.css';

const App = () => {
  useHotkey();

  useInit(() => {
    listen("WA_EVENT", (e) => {
      switch (e.payload) {
        case 'SETTING_RELOAD': { // setting reload
          window.location.reload();
          break;
        }
        case 'MENU_SETTING': { // menu setting
          invoke('setting_window');
          break;
        }
        case 'SEARCH': { // search
          invoke('search_window');
          break;
        }
        default:
          break;
      }
    })
  })

  useSetting(async (data) => {
    const title = data?.title || 'WA+';
    WebviewWindow.getByLabel('main')?.setTitle(title);

    waSettingShortcut(() => {
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
