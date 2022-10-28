import SETTING_DATA from '@/../src-tauri/src/wa/wa.json';
import './index.scss';

export default function WaTip() {
  return (
    <div className="wa-tip">
      <div className="feat">
        <h2>Shortcut</h2>
        <div className="shortcut-wa">
          <h3>WA+ Shortcut</h3>
          <div className="item"><code>CmdOrCtrl + ,</code>: WA+ setting</div>
          <div className="item"><code>CmdOrCtrl + [</code>: Previous page</div>
          <div className="item"><code>CmdOrCtrl + ]</code>: Next page</div>
          <div className="item"><code>CmdOrCtrl + ↑</code>: Scroll to top of page</div>
          <div className="item"><code>CmdOrCtrl + ↓</code>: Scroll to bottom of page</div>
          <div className="item"><code>CmdOrCtrl + r</code>: Refresh Page</div>
        </div>
        <div className="shortcut-global">
          <h3>Global Shortcut:</h3>
          <div className="item"><code className="note">CmdOrCtrl+Shift+S</code>: Spotlight Search</div>
        </div>
        <div className="tips">Note: CmdOrCtrl - <code>Command(MacOS)</code> or <code>Control(Windows)</code></div>
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
            <li><code className="note">app.type</code>: Application Category</li>
            <li><code className="note">app.items.name</code>: Application name</li>
            <li><code className="note">app.items.url</code>: Application URL</li>
            <li><code>app.items.icon</code>: Application icon (square logo: support <code>svg</code>, <code>url</code>, <code>base64</code>)</li>
            <li><code>app.items.script</code>: Custom script, <code>~/.wa/scripts</code> is the script root path, please use a relative path, such as <code>./user.js</code></li>
          </ul>
        </ul>
        <div className="item"><pre>{JSON.stringify(SETTING_DATA, null, 2)}</pre></div>
      </div>
    </div>
  )
}