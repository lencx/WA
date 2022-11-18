import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { homeDir, join } from '@tauri-apps/api/path';
import debounce from 'lodash/debounce';

import { openFile } from '@/plugins';
import useInit from '@/hooks/useInit';
import { waSettingFile } from '@/hooks/useWA';
import Editor from '@/components/Editor';
import Layout from '@/layouts';
// import GoBack from '@/components/GoBack';
// import ScriptIcon from '@/icons/Script';
import { settingPath, readSetting, writeSetting } from '@/utils';
import SETTING_DATA from '@/../src-tauri/src/wa/wa.json';
import './index.scss';

const SETTING_DATA_STRING = JSON.stringify(SETTING_DATA, null, 4);

export default function SettingView() {
  // const navigate = useNavigate();
  const isInit = useRef(true);
  const [params] = useSearchParams();
  const [content, setContent] = useState('');
  const [filePath, setFilePath] = useState('');
  const [, setSetting] = useRecoilState(waSettingFile);
  const isShortcut = params.get('mode') === 'shortcut';

  useEffect(() => {
    return () => {
      if (isShortcut) return;
      if (!isInit.current) {
        window.location.reload();
        return;
      }
      isInit.current = false;
    }
  }, [])

  const writeContent = async (val?: string) => {
    const _data = val || SETTING_DATA_STRING;
    writeSetting(_data);
    setSetting(_data);
  };

  const handleEdit = debounce(writeContent, 500);

  const handleOpenFile = async () => {
    const homePath = await homeDir();
    openFile(await join(homePath, '.wa', 'setting.json'));
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
    <Layout className="setting" type={isShortcut ? 'shortcut-setting' : 'setting'}>
      <div className="setting-taskbar">
        {/* {!isShortcut && <GoBack to="/" />} */}
        <div className="file" onClick={handleOpenFile}>{filePath}</div>
        {/* <ScriptIcon onClick={handleScript} /> */}
      </div>
      <Editor
        defaultValue={content}
        onChange={handleEdit}
      />
    </Layout>
  )
}