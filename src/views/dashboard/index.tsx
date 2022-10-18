import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SettingIcon from '@/icons/Setting';
import AppItem, { type AppData } from '@/components/AppItem';
import { readSetting } from '@/utils';
import './index.scss';

export default function DashboardView() {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);

  useEffect(() => {
    (async () => {
      setContent(JSON.parse(await readSetting()));
    })();
  }, [])

  return (
    <div className="dashboard">
      <SettingIcon className="wa-setting" onClick={() => navigate('/setting')} />
      {content.map((group: any) => {
        return (
          <div className="wa-app" key={group.type}>
            <h3>{group.type}</h3>
            <div className="wa-app-group">
              {group.items.map((app: AppData) => (
                <AppItem
                  key={app.name}
                  app={app}
                  type={group.type}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}