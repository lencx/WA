import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import './index.scss';

interface GoBackProps {
  className?: string;
  to?: string | number;
}

const GoBack: React.FC<GoBackProps> = ({ to = -1, className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRoot = location.pathname === '/';

  if (isRoot) return null;

  const handleBack = () => {
    navigate(to as string);
  };

  return (
    <span className="wa-ico wa-goback" onClick={handleBack}>
      <svg
        className={clsx('ico-arrow', className)}
        viewBox="0 0 1024 1024"
        width="30"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M783.872 542.122667l-0.042667-64.405334-477.610666-0.298666 225.28-225.322667-45.568-45.568L182.506667 509.952l303.829333 303.829333 45.525333-45.504-226.474666-226.453333 478.506666 0.298667z"
          fill="var(--theme-icon)"
        />
      </svg>
    </span>
  );
};

export default GoBack;



// import { FC } from 'react';
// import clsx from 'clsx';

// interface ArrowIconProps {
//   className?: string;
//   color?: string;
//   onClick: () => void;
// }

// const GobackIcon: FC<ArrowIconProps> = ({ className, color = `var(--theme-icon)`, onClick }) => {
//   return (

//   );
// };

// export default ArrowIcon;