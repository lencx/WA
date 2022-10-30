import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { invoke } from '@tauri-apps/api/tauri';
import { LogicalSize, WebviewWindow } from '@tauri-apps/api/window';

import { waSettingData } from '@/hooks/useWA';
import { SearchItem, SearchIcon } from '@/components/Search';
import type { AppData } from '@/components/AppItem';
import './index.scss';

export default function SearchView() {
  const searchEl = useRef<HTMLDivElement>(null);
  const settingJSON = useRecoilValue(waSettingData);
  const [index, setIndex] = useState(-1);
  const [height, setHeight] = useState(-1);
  const searchWindow = WebviewWindow.getByLabel('search');
  const [searchList, setSearchList] = useState<Array<AppData & { type: string }>>([]);
  const appList = settingJSON?.app?.reduce((a: any, b: any) => {
    const items = b.items.map((i: any) => ({ ...i, type: b.type }));
    return [...a, ...items];
  }, []);
  const len = searchList.length;
  const currData = searchList[index];

  const setSearchWindow = (h: number) => {
    searchWindow?.setSize(new LogicalSize(560, h));
  }

  useEffect(() => {
    setSearchWindow(60);
  }, [])

  useEffect(() => {
    if (!searchEl.current) return;
    const elList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.search-scroll>div');
    const elHeight = document.querySelector('.search-scroll')?.scrollHeight || 0;

    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        if (len - 1 > index) {
          setIndex(index + 1);
          if (elList[index + 1]?.offsetTop > 315) {
            searchEl.current?.scrollTo({
              top: (index + 1) * 35 - 315,
              behavior: 'smooth',
            })
          }
        }
      }

      if (e.key === 'ArrowUp') {
        if (index > 0) {
          setIndex(index - 1);
          if (elList[index - 1]?.offsetTop < (elHeight - 280)) {
            searchEl.current?.scrollTo({
              top: elList[index - 1]?.offsetTop,
              behavior: 'smooth',
            })
          }
        }
      }
    }
    document.addEventListener('keyup', handle);
    return () => document.removeEventListener('keyup', handle);
  }, [len, index]);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (len) {
        await invoke('wa_window', {
          label: Date.now().toString(16),
          title: `${currData.type} / ${currData.name}`,
          url: currData.url,
        });
        await WebviewWindow.getByLabel('search')?.close();
        return;
      }
      await WebviewWindow.getByLabel('main')?.show();
      await WebviewWindow.getByLabel('search')?.close();
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setIndex(0);
    if (!val) {
      setSearchList([]);
      setSearchWindow(60);
      return;
    }
    const filterList = appList?.filter((i: AppData) => new RegExp(val, 'ig').test(i.name));
    setSearchList(filterList);

    if (filterList.length) {
      const height = filterList.length * 35 + 80;
      const h = height > 450 ? 450 : height;
      setSearchWindow(h);
      setHeight(h - 60);
      return;
    }
    setSearchWindow(60);
  };

  return (
    <div className="wa-search">
      <div className={clsx('search-input', { hasData: len })} data-tauri-drag-region>
        <input
          type="text"
          onKeyDown={handleKeyDown}
          onChange={handleSearch}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          data-tauri-drag-region
          autoFocus
          placeholder="WA+ Search..."
        />
        {currData && <SearchIcon icon={currData.icon} />}
      </div>
      {len ? (
        <div className="search-data" ref={searchEl} style={{ height: height - 16 }}>
          <div className="search-scroll">
            {Array.from({ length: len }).map((_, i) => {
              return <SearchItem isActive={i === index} data={searchList[i]} />
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}