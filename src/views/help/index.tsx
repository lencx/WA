import { WebviewWindow } from '@tauri-apps/api/window';

import SETTING_DATA from '@/../src-tauri/src/wa/wa.json';
import './index.scss';

export default function HelpView() {
  const handleStart = () => {
    WebviewWindow.getByLabel('help')?.close();
    WebviewWindow.getByLabel('main')?.show();
  };

  return (
    <div className="wa-help">
      <div className="about-wa">
        <p className="wa">🤩 WA+ = W(eb) + A(pp) + more... <code>哇，无限可能！</code></p>
        <p className="desc">Making a web page more like a desktop application is just the beginning, the possibilities are unlimited, up to your imagination!</p>
      </div>
      <div className="feat">
        <h2>Shortcut</h2>
        <div className="tips">Note: CmdOrCtrl - <code>Command(MacOS)</code> or <code>Control(Windows)</code></div>
        <div className="shortcut-wa">
          <h3>WA+ Shortcut</h3>
          <div className="item"><code>CmdOrCtrl + ,</code>: WA+ setting</div>
          <div className="item"><code>CmdOrCtrl + ←</code>: Go Back</div>
          <div className="item"><code>CmdOrCtrl + →</code>: Go Forward</div>
          <div className="item"><code>CmdOrCtrl + ↑</code>: Scroll to Top of Screen</div>
          <div className="item"><code>CmdOrCtrl + ↓</code>: Scroll to Bottom of Screen</div>
          <div className="item"><code>CmdOrCtrl + r</code>: Refresh the Screen</div>
        </div>
        <div className="shortcut-global">
          <h3>Global Shortcut:</h3>
          <div className="item"><code>CmdOrCtrl + Shift + S</code>: Spotlight Search</div>
        </div>
      </div>
      <div className="feat">
        <h2>Custom Setting (Default):</h2>
        <p><code>CmdOrCtrl + ,</code> or <code>{`WA+ -> Menu -> Preferences`}</code></p>
        <p>Edits will be automatically saved in the local <code>~/.wa/setting.json</code>. If the configuration does not take effect, please restart or reload the application.</p>
        <p>This page is displayed if json parsing fails; if json is not set or empty, default data is used.</p>
        <ul>
          <li><code>title</code>: Window Name</li>
          <li><code>shortcut.search</code>: Quick search for apps (global shortcut)</li>
          <li><code>app</code>: Application List</li>
          <ul>
            <li><code className="note">app.type</code>: Web Category</li>
            <li><code className="note">app.items.name</code>: Web Title</li>
            <li><code className="note">app.items.url</code>: Web URL</li>
            <li><code>app.items.icon</code>: Web Icon (square logo: support <code>svg</code>, <code>url</code>, <code>base64</code>)</li>
            <li><code>app.items.script</code>: Custom script, <code>~/.wa/scripts</code> is the script root path, please use a relative path, such as <code>./user.js</code></li>
          </ul>
        </ul>
        <div className="item"><pre>{JSON.stringify(SETTING_DATA, null, 2)}</pre></div>
      </div>
      <div className="get-start" onClick={handleStart}><button>Get started with WA+</button></div>
    </div>
  )
}