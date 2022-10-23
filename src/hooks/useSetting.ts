import { useState } from 'react';

import useInit from '@/hooks/useInit';
import { SETTING_DATA, readSetting } from '@/utils';

export default function useSetting(callback?: (data: any) => void, isInit = true) {
  const [data, setData] = useState<any>();
  useInit(async () => {
    try {
      const settingData = JSON.parse(await readSetting());
      setData(settingData)
      callback && callback(settingData);
    } catch(e) {
      if (isInit) {
        callback && callback(SETTING_DATA);
        setData(SETTING_DATA);
      }
      callback && callback('JSON Parse Error');
    }
  });
  return data;
}
