import { useRecoilValue } from 'recoil';

import { waSettingData } from '@/hooks/useWA';
import WaTip from '@/components/WaTip';
import Error from '@/components/Error';
import AppItem, { type AppData } from '@/components/AppItem';
import './index.scss';

export default function DashboardView() {
  const settingJSON = useRecoilValue(waSettingData);
  const hasApps = settingJSON?.app?.length > 0;
  return (
    <div className="dashboard">
      <Error type="WA+ Setting" data={settingJSON} />
      {!hasApps
        ? <WaTip />
        : (settingJSON?.app?.map((group: any) => {
            if (!group?.type) return null;
            return (
              <div className="wa-app" key={group.type}>
                <h3>{group.type}</h3>
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
        )}
    </div>
  )
}