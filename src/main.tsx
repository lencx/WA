import React, { useRef, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { listen } from '@tauri-apps/api/event';

import useInit from '@/hooks/useInit';
import Routes from './routes';
import './style.css';

const App = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const location = useLocation();
  const pathname = location.pathname;

  useInit(() => {
    listen("WA_EVENT", (e) => {
      switch (e.payload) {
        case 'RELOAD':
        case 'SETTING_RELOAD': {
          window.location.reload(); break;
        }
        case 'GO_BACK': {
          window.history.go(-1); break;
        }
        case 'GO_FORWARD': {
          window.history.go(1); break;
        }
        case 'SCROLL_TOP': {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' }); break;
        }
        case 'SCROLL_BOTTOM': {
          window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' }); break;
        }
        case 'REPORT_BUG': {
          linkRef?.current && linkRef?.current?.click();
        }
        default: break;
      }
    })
  });

  return (
    <Suspense fallback={pathname !== '/search'
      ? (<div className="wa-loading"><span>loading...</span></div>)
      : null}>
      <Routes />
      <a style={{ display: 'none' }} ref={linkRef} href="https://github.com/lencx/WA/issues" target="_blank" />
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
