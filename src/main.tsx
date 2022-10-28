import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';

import useHotkey from '@/hooks/useHotkey';
import useInit from '@/hooks/useInit';
import Routes from './routes';
import './style.css';

const App = () => {
  useHotkey();

  const location = useLocation();
  const pathname = location.pathname;

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


  return (
    <Suspense fallback={pathname !== '/search'
      ? (<div className="wa-loading"><span>loading...</span></div>)
      : null}>
      <Routes />
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
