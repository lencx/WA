import { useState } from 'react';

import useInit from '@/hooks/useInit';
import { settingJSON } from '@/utils';

export default function useSetting<T extends Record<string, any>>(callback?: (data: T) => void, isInit = true) {
  const [data, setData] = useState<T>();
  useInit(async () => {
    const settingData = await settingJSON(isInit);
    setData(settingData);
    callback && callback(settingData);
  });
  return data;
}
