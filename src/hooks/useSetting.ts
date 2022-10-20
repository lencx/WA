import { useState } from 'react';

import useInit from '@/hooks/useInit';
import { settingJSON } from '@/utils';

export default function useSetting<T extends Record<string, any>>(callback?: (data: T) => void) {
  const [data, setData] = useState<T>();
  useInit(async () => {
    const settingData = await settingJSON();
    setData(settingData);
    callback && callback(settingData);
  });
  return data;
}
