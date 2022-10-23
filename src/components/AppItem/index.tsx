import { FC } from 'react';
import clsx from 'clsx';
import { invoke } from '@tauri-apps/api/tauri';

import waIcon from '@/assets/logo.svg';
import './index.scss';

export interface AppData {
  name: string;
  icon: string;
  url: string;
  script?: string;
}

interface AppItemProps {
  type: string;
  app: AppData;
  size?: 'lg' | 'sm';
  disabled?: boolean;
}

const AppItem: FC<AppItemProps> = ({ type, app, size = 'lg', disabled = false }) => {
  const isSvg = /<\s*svg[^>]*>(.*?)<\/\s*svg>/g.test(app?.icon);

  const handleWaWindow = async () => {
    if (disabled) return;
    if (!app.url) return;
    await invoke('wa_window', {
      label: Date.now().toString(16),
      title: `${type} / ${app.name}`,
      url: app.url,
      script: app?.script,
    });
  };

  return (
    <div className={clsx('wa-app-item', size)} onClick={handleWaWindow} title={app.name}>
      {isSvg
        ? <i className="app-icon" dangerouslySetInnerHTML={{ __html: app.icon }} />
        : <img className="app-icon" src={app.icon ? app.icon : waIcon} /> }
      <div className="app-name">{app.name}</div>
    </div>
  )
}

export default AppItem;
