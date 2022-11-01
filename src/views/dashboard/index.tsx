import { useRecoilValue } from 'recoil';

import { waSettingData } from '@/hooks/useWA';
import Error from '@/components/Error';
import Layout from '@/layouts';
import AppItem, { type AppData } from '@/components/AppItem';
import './index.scss';

export default function DashboardView() {
  const settingJSON = useRecoilValue(waSettingData);
  return (
    <Layout className="dashboard">
      <Error type="WA+ Setting" data={settingJSON} shortcut="CmdOrCtrl + ," />
      {settingJSON?.app?.map((group: any, idx: number) => {
          return (
            <div className="wa-app" key={`${group.type}_${idx}`}>
              {group.type && <h3>{group.type}</h3>}
              <div className="wa-app-group">
                {group?.items?.map((app: AppData) => (
                  <AppItem
                    key={app.name}
                    data={app}
                    type={group.type}
                  />
                ))}
              </div>
            </div>
          )
        })
      }
    </Layout>
  )
}