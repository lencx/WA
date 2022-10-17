import { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
// import { Allotment } from 'allotment';
// import 'allotment/dist/style.css';

import './index.scss';

interface EditorProps {
  lang?: string;
  defaultValue?: string;
  onChange?: (content?: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  lang = 'json',
  defaultValue = '',
  onChange,
}) => {
  const [content, setContent] = useState('');
  useEffect(() => {
    setContent(defaultValue);
    onChange && onChange(defaultValue);
  }, [defaultValue]);

  const handleMonaco = (val: string = '') => {
    onChange && onChange(val);
    setContent(val);
  };

  return (
    <div className="wa-editor-container">
      <MonacoEditor
        defaultLanguage={lang}
        value={content}
        onChange={handleMonaco}
      />
    </div>
  );
};

export default Editor;
