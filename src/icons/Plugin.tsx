{/* <svg t="1667295820060" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6478" width="200" height="200">

</path></svg> */}

import { FC } from 'react';
import clsx from 'clsx';

interface AppIconProps {
  className?: string;
  color?: string;
  onClick: () => void;
}

const AppIcon: FC<AppIconProps> = ({ className, color = 'var(--theme-red)', onClick }) => {
  return (
    <span className={clsx('wa-ico', className)} onClick={onClick} title="Plugins">
      <svg
        className="ico-plugin"
        width="20"
        height="20"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M720 112a192 192 0 1 0 0 384 192 192 0 0 0 0-384z m-128 192a128 128 0 1 1 256 0 128 128 0 0 1-256 0zM128 192a64 64 0 0 1 64-64h224a64 64 0 0 1 64 64v224a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V192z m64 0v224h224V192H192zM128 608a64 64 0 0 1 64-64h224a64 64 0 0 1 64 64V832a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V608z m64 0V832h224V608H192zM544 608a64 64 0 0 1 64-64H832a64 64 0 0 1 64 64V832a64 64 0 0 1-64 64H608a64 64 0 0 1-64-64V608z m64 224H832V608H608V832z"
          fill={color}
        />
      </svg>
    </span>
  );
};

export default AppIcon;