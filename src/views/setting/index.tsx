import { useEffect, useState } from 'react';
import GoBack from '@/components/GoBack';
import JsonEditor from '@/components/JsonEditor';
import debounce from 'lodash/debounce';

import { settingPath, readSetting, writeSetting } from '@/utils';

const data = JSON.stringify([
  {
    type: 'Docs',
    items: [
      { name: 'Vite', url: 'https://vitejs.dev/', icon: '' },
      { name: 'Tauri', url: 'https://tauri.app/', icon: '' },
    ],
  },
], null, 2);

readSetting();

export default function SettingView() {
  const [content, setContent] = useState('');
  const [filePath, setFilePath] = useState('');
  useEffect(() => {
    (async () => {
      setFilePath(await settingPath());
      const _content = await readSetting();
      if (!_content) {
        writeContent(data);
        setContent(data);
        return;
      }
      setContent(_content);
    })()
  }, []);

  const writeContent = (val?: string) => {
    writeSetting(val || data);
  };

  const handleEdit = debounce(writeContent, 500);

  return (
    <div>
      <GoBack />
      <div>{filePath}</div>
      <JsonEditor
        defaultValue={content}
        onChange={handleEdit}
      />
    </div>
  )
}