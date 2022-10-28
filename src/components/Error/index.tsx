import { FC } from 'react';

import './index.scss';

interface ErrorProps {
  type?: string;
  data: any;
}

const Error: FC<ErrorProps> = ({ type, data }) => {
  if (typeof data !== 'string') return null;
  return (
    <div className="wa-error">
      {type && <div className="type">{type}</div>}
      <div>{data}</div>
    </div>
  )
}

export default Error;
