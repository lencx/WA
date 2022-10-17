import { FC } from 'react';
import { WebviewWindow } from '@tauri-apps/api/window';

import waIcon from '@/assets/logo.svg';
import './index.scss';

export interface AppData {
  name: string;
  icon: string;
  url: string;
}

interface AppItemProps {
  type: string;
  app: AppData;
}

const AppItem: FC<AppItemProps> = ({ type, app }) => {
  const handleClick = () => {
    if (!app.url) return;
    const webview = new WebviewWindow(app.name, {
      url: app.url,
      title: `${type} / ${app.name}`,
    });
    webview.once('tauri://created', () => {
      // TODO:
    })
  };

  return (
    <div className="wa-app-item" onClick={handleClick}>
      <div className="app-icon" style={{ backgroundImage: `url(${waIcon})`}} />
      <div>{app.name}</div>
    </div>
  )
}

export default AppItem;
