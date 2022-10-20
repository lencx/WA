import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { WebviewWindow } from '@tauri-apps/api/window';

import useSetting from '@/hooks/useSetting';
import AppItem, { type AppData } from '@/components/AppItem';
import './index.scss';

export default function Search() {
  const data = useSetting();
  const [inputVal, setInput] = useState('');
  const [searchData, setSearchData] = useState<AppData & { type: string } | null>(null);
  const appList = data?.app?.reduce((a: any, b: any) => {
    const items = b.items.map((i: any) => ({ ...i, type: b.type }));
    return [...a, ...items];
  }, []);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await WebviewWindow.getByLabel('search')?.hide();
      setInput('');
      setSearchData(null);
      if (searchData) {
        await invoke('new_wa', {
          label: Date.now().toString(16),
          title: `${searchData.type} / ${searchData.name}`,
          url: searchData.url,
        });
        return;
      }
      await WebviewWindow.getByLabel('main')?.show();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (!val) {
      setSearchData(null);
      return;
    }
    const findData = appList?.find((i: AppData) => new RegExp(val, 'ig').test(i.name));
    setSearchData(findData);
  };

  return (
    <div className="wa-search">
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
        value={inputVal}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      {searchData && <AppItem size="sm" type={searchData.type} app={searchData} />}
    </div>
  )
}