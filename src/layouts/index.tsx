import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import AppIcon from '@/icons/App';
import SettingIcon from '@/icons/Setting';
import ToolsIcon from '@/icons/Tools';
import './index.scss';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  type?: string;
}

const Layout: FC<LayoutProps> = ({ className, children, type = '' }) => {
  const isShortcut = /shortcut-/.test(type);
  const navigate = useNavigate();

  return (
    <div className={clsx('wa-layout', className, { shortcut: isShortcut })}>
      {!isShortcut && (
        <div className="wa-layout-side">
          <AppIcon onClick={() => navigate('/')} />
          <ToolsIcon onClick={() => navigate('/tools')} />
          <SettingIcon className="setting" onClick={() => navigate('/setting')} />
        </div>
      )}
      <div className="wa-layout-content">
        {children}
      </div>
    </div>
  )
}

export default Layout;