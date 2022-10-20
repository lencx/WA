import './index.scss';

export default function WaTip() {
  return (
    <div className="wa-tip">
      <div className="shortcut-global">
        <h3>Global Shortcut (Editable):</h3>
        <div className="item">Search: <code>CmdOrCtrl+Shift+S</code></div>
      </div>
      <div className="shortcut-wa">
        <h3>WA+ Shortcut:</h3>
        <div className="item">Setting: <code>CmdOrCtrl+Comma</code></div>
      </div>
    </div>
  )
}