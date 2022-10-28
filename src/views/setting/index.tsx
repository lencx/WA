import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { homeDir, join } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri';
import debounce from 'lodash/debounce';

import useInit from '@/hooks/useInit';
import { waSettingFile } from '@/hooks/useWA';
import GoBack from '@/components/GoBack';
import Editor from '@/components/Editor';
// import ScriptIcon from '@/icons/Script';
import { settingPath, readSetting, writeSetting } from '@/utils';
import SETTING_DATA from '@/../src-tauri/src/wa/wa.json';
import './index.scss';

const SETTING_DATA_STRING = JSON.stringify(SETTING_DATA, null, 4);

export default function SettingView() {
  // const navigate = useNavigate();
  const [params] = useSearchParams();
  const [content, setContent] = useState('');
  const [filePath, setFilePath] = useState('');
  const [, setSetting] = useRecoilState(waSettingFile);
  const isShortcut = params.get('mode') === 'shortcut';

  const writeContent = async (val?: string) => {
    const _data = val || SETTING_DATA_STRING;
    writeSetting(_data);
    setSetting(_data);
  };

  const handleEdit = debounce(writeContent, 500);

  const handleOpenFile = async () => {
    const homePath = await homeDir();
    await invoke('open_file', { path: await join(homePath, '.wa', 'setting.json') })
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

  // const handleScript = () => {
  //   navigate('/script');
  // };

  return (
    <div className="setting">
      <div className="setting-taskbar">
        {!isShortcut && <GoBack to="/" />}
        <div className="file" onClick={handleOpenFile}>{filePath}</div>
        {/* <ScriptIcon onClick={handleScript} /> */}
      </div>
      <Editor
        defaultValue={content}
        onChange={handleEdit}
      />
    </div>
  )
}