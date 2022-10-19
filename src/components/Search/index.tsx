import { WebviewWindow } from '@tauri-apps/api/window';

import './index.scss';

export default function Search() {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      WebviewWindow.getByLabel('search')?.hide();
    }
  };

  return (
    <div className="wa-search">
      <input type="text" onKeyDown={handleKeyDown} />
    </div>
  )
}