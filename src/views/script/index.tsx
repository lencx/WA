import { useState } from 'react';
import { homeDir, join } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri';
import debounce from 'lodash/debounce';

import GoBack from '@/components/GoBack';
import Editor from '@/components/Editor';
// import { scriptPath } from '@/utils';

const SCRIPT_DATA_STRING = `// ROOT_PATH: ~/.wa/scripts\n
(function () {
  // code...
})()`;

export default function ScriptView() {
  const [content, setContent] = useState('');
  const [filePath, setFilePath] = useState('');
  const writeContent = async (val?: string) => {
    // const _data = val || SCRIPT_DATA_STRING;
  };

  const handleEdit = debounce(writeContent, 500);

  const handleOpenFile = async () => {
    const homePath = await homeDir();
    await invoke('open_file', { path: await join(homePath, '.wa', 'scripts') })
  };

  return (
    <div>
      <div className="setting-taskbar">
        <GoBack to="/" />
        <div className="file" onClick={handleOpenFile}>{filePath}</div>
      </div>
      <Editor
        lang="javascript"
        defaultValue={content}
        onChange={handleEdit}
      />
    </div>
  )
}