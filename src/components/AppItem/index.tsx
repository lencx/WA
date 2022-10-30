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
  data: AppData;
  size?: 'lg' | 'sm';
  disabled?: boolean;
}

const AppItem: FC<AppItemProps> = ({ type, data, size = 'lg', disabled = false }) => {
  const isSvg = /<\s*svg[^>]*>(.*?)<\/\s*svg>/g.test(data?.icon);

  const handleWaWindow = async () => {
    if (disabled) return;
    if (!data.url) return;
    await invoke('wa_window', {
      label: Date.now().toString(16),
      title: `${type} / ${data.name}`,
      url: data.url,
      script: data?.script,
    });
  };

  return (
    <div className={clsx('wa-app-item', size)} onClick={handleWaWindow} title={data.name}>
      {isSvg
        ? <i className="app-icon" dangerouslySetInnerHTML={{ __html: data.icon }} />
        : <img className="app-icon" src={data.icon ? data.icon : waIcon} /> }
      <div className="app-name">{data.name}</div>
    </div>
  )
}

export default AppItem;
