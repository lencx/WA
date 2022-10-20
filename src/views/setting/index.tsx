import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { homeDir, join } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri';
import { emit } from '@tauri-apps/api/event';
import debounce from 'lodash/debounce';

import useInit from '@/hooks/useInit';
import GoBack from '@/components/GoBack';
import JsonEditor from '@/components/JsonEditor';
import { SETTING_DATA, settingPath, readSetting, writeSetting } from '@/utils';
import './index.scss';

const SETTING_DATA_STRING = JSON.stringify(SETTING_DATA, null, 4);

export default function SettingView() {
  const [params] = useSearchParams();
  const [content, setContent] = useState('');
  const [filePath, setFilePath] = useState('');
  const isShortcut = params.get('mode') === 'shortcut';

  const writeContent = async (val?: string) => {
    const _data = val || SETTING_DATA_STRING;
    writeSetting(_data);
    await emit('setting-update', { date: new Date(), data: JSON.parse(_data) });
  };

  const handleEdit = debounce(writeContent, 500);

  const handleOpenFile = async () => {
    const homePath = await homeDir();
    await invoke('open', { path: await join(homePath, '.wa', 'setting.json') })
  };

  useInit(async () => {
    setFilePath(await settingPath());
    const _content = await readSetting();
    if (!_content) {
      writeContent(SETTING_DATA_STRING);
      setContent(SETTING_DATA_STRING);
      return;
    }
    setContent(_content);
  })

  return (
    <div className="setting">
      <div className="setting-taskbar">
        {!isShortcut && <GoBack to="/" />}
        <div className="file" onClick={handleOpenFile}>{filePath}</div>
      </div>
      <JsonEditor
        defaultValue={content}
        onChange={handleEdit}
      />
    </div>
  )
}