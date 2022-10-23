import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WebviewWindow } from '@tauri-apps/api/window';

import useSetting from '@/hooks/useSetting';
import WaTip from '@/components/WaTip';
import SettingIcon from '@/icons/Setting';
import AppItem, { type AppData } from '@/components/AppItem';
import './index.scss';
import useInit from '@/hooks/useInit';

export default function DashboardView() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<Record<string, any>>();
  const hasApps = content?.app?.length > 0;

  useSetting(async (data) => {
    setContent(data);
    WebviewWindow.getByLabel('main')?.setTitle(data?.title || 'WA+');
    setLoading(false);
  }, false)

  useInit(async () => {
    WebviewWindow.getByLabel('main')?.listen('reload', () => {
      window.location.reload();
    })
  });

  if (loading) {
    return (
      <div className="wa-loading">
        <span>loading...</span>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <SettingIcon className="wa-setting" onClick={() => navigate('/setting')} />
      {!hasApps
        ? <WaTip />
        : (content?.app?.map((group: any) => {
            if (!group?.type) return null;
            return (
              <div className="wa-app" key={group.type}>
                <h3>{group.type}</h3>
                <div className="wa-app-group">
                  {group?.items?.map((app: AppData) => (
                    <AppItem
                      key={app.name}
                      app={app}
                      type={group.type}
                    />
                  ))}
                </div>
              </div>
            )
          })
        )}
    </div>
  )
}