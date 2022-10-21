import { SETTING_DATA } from '@/utils';
import './index.scss';

export default function WaTip() {
  return (
    <div className="wa-tip">
      <div className="feat">
        <h2>Shortcut</h2>
        <div className="shortcut-wa">
          <h3>WA+ Shortcut:</h3>
          <div className="item">Setting: <code>CmdOrCtrl+Comma</code></div>
        </div>
        <div className="shortcut-global">
          <h3>Global Shortcut:</h3>
          <div className="item">Search: <code>CmdOrCtrl+Shift+S</code></div>
        </div>
      </div>
      <div className="feat">
        <h2>Custom Setting (Default):</h2>
        <p>Click the ⚙️ icon in the upper right corner to enter edit mode. Edits will be automatically saved in the local <code>~/.wa/setting.json</code>. If the configuration does not take effect, please restart or reload the application.</p>
        <p>This page is displayed if json parsing fails; if json is not set or empty, default data is used.</p>
        <ul>
          <li><code>title</code>: Window Name</li>
          <li><code>shortcut.search</code>: Quick search for apps (global shortcut)</li>
          <li><code>app</code>: Application List</li>
          <ul>
            <li><code>app.type</code>: Application Category</li>
            <li><code>app.items.name<i>*</i></code>: Application name</li>
            <li><code>app.items.url<i>*</i></code>: Application URL</li>
            <li><code>app.items.icon</code>: Application icon (Square logo, support <code>svg</code>, <code>url</code>, <code>base64</code>)</li>
            <li><code>app.items.script</code>: Custom script, <code>~/.wa/</code> is the script root path, please use a relative path, such as <code>./scripts/user.js</code></li>
          </ul>
        </ul>
        <div className="item"><pre>{JSON.stringify(SETTING_DATA, null, 2)}</pre></div>
      </div>
    </div>
  )
}