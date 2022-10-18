import { FC } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

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
  const isSvg = /<\s*svg[^>]*>(.*?)<\/\s*svg>/g.test(app?.icon);
  const handleClick = async () => {
    if (!app.url) return;
    await invoke('new_wa', { label: Date.now().toString(16), title: `${type} / ${app.name}`, url: app.url });
  };

  return (
    <div className="wa-app-item" onClick={handleClick} title={app.name}>
      {isSvg
        ? <i className="app-icon" dangerouslySetInnerHTML={{ __html: app.icon }} />
        : <img className="app-icon" src={app.icon ? app.icon : waIcon} /> }
      <div className="app-name">{app.name}</div>
    </div>
  )
}

export default AppItem;
