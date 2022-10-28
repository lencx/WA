import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import SETTING_DATA from '@/../src-tauri/src/wa/wa.json';
import { readSetting } from '@/utils';

export const waSettingFile = atom({
  key: 'WA_SETTING',
  default: JSON.stringify(SETTING_DATA, null, 4),
});

export const waSettingData = selector({
  key: 'WA_SETTING_DATA',
  get: async ({ get }) => {
    try {
      return JSON.parse(await readSetting());
    } catch(e: any) {
      // return JSON.parse(get(waSettingFile));
      return e.toString();
    }
  },
});

// export const useSettingData = () => {
//   const [, setSettingJSON] = useRecoilState(waSettingFile);
//   return { settingJSON: '', setSettingJSON };
// }