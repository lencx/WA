import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { WebviewWindow } from '@tauri-apps/api/window';
import { useRecoilValue } from 'recoil';

import { waSettingData } from '@/hooks/useWA';
import AppItem, { type AppData } from '@/components/AppItem';
import './index.scss';

export default function Search() {
  const settingJSON = useRecoilValue(waSettingData);
  const [searchData, setSearchData] = useState<AppData & { type: string } | null>(null);
  const appList = settingJSON?.app?.reduce((a: any, b: any) => {
    const items = b.items.map((i: any) => ({ ...i, type: b.type }));
    return [...a, ...items];
  }, []);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchData) {
        await invoke('wa_window', {
          label: Date.now().toString(16),
          title: `${searchData.type} / ${searchData.name}`,
          url: searchData.url,
        });
        await WebviewWindow.getByLabel('search')?.close();
        return;
      }
      await WebviewWindow.getByLabel('main')?.show();
      await WebviewWindow.getByLabel('search')?.close();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      setSearchData(null);
      return;
    }
    const findData = appList?.find((i: AppData) => new RegExp(val, 'ig').test(i.name));
    setSearchData(findData);
  };

  return (
    <div className="wa-search" data-tauri-drag-region>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        data-tauri-drag-region
        autoFocus
      />
      {searchData && <AppItem size="sm" disabled type={searchData.type} app={searchData} />}
    </div>
  )
}