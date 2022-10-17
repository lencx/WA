import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SettingIcon from '@/icons/Setting';
import AppItem, { type AppData } from '@/components/AppItem';
import { readSetting } from '@/utils';

export default function DashboardView() {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);

  useEffect(() => {
    (async () => {
      setContent(JSON.parse(await readSetting()));
    })();
  }, [])

  return (
    <div>
      Dashboard
      <SettingIcon onClick={() => navigate('/setting')} />
      {content.map((group: any) => {
        return (
          <div key={group.type}>
            <h3>{group.type}</h3>
            <div>{group.items.map((app: AppData) => (
              <AppItem
                key={app.name}
                app={app}
                type={group.type}
              />
            ))}</div>
          </div>
        )
      })}
    </div>
  )
}