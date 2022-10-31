import { FC } from 'react';

import './index.scss';

interface ErrorProps {
  type?: string;
  shortcut?: string;
  data: any;
}

const Error: FC<ErrorProps> = ({ type, data, shortcut }) => {
  if (typeof data !== 'string') return null;
  return (
    <div className="wa-error">
      {type && <div className="type">{type}</div>}
      <div>{data}</div>
      {shortcut && (
        <div className="shortcut">
          <div className="name">{type} Shortcut: <code>{shortcut}</code></div>
          <ul>
            <li>MacOS: <code>{`Cmd -> Command`}</code></li>
            <li>Windows: <code>{`Ctrl -> Control`}</code></li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Error;
