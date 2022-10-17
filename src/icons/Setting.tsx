
import { FC } from 'react';
import clsx from 'clsx';

interface SettingIconProps {
  className?: string;
  color?: string;
  onClick: () => void;
}

const SettingIcon: FC<SettingIconProps> = ({ className, color = `var(--theme-icon)`, onClick }) => {
  return (
    <span className="wa-ico" onClick={onClick}>
      <svg
        className={clsx('ico-setting', className)}
        viewBox="0 0 1024 1024"
        width="30"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M533.162667 225.450667l213.333333 121.898666a42.666667 42.666667 0 0 1 21.504 37.034667v255.232a42.666667 42.666667 0 0 1-21.504 37.034667l-213.333333 121.898666a42.666667 42.666667 0 0 1-42.325334 0l-213.333333-121.898666A42.666667 42.666667 0 0 1 256 639.616V384.426667a42.666667 42.666667 0 0 1 21.504-37.034667l213.333333-121.898667a42.666667 42.666667 0 0 1 42.325334 0zM512 262.485333L298.666667 384.384v255.232l213.333333 121.898667 213.333333-121.898667V384.426667l-213.333333-121.898667zM512 426.666667a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z m0 42.666666a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z"
          fill={color}
        />
      </svg>
    </span>
  );
};

export default SettingIcon;