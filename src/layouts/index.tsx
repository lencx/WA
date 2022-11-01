import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import AppIcon from '@/icons/App';
import SettingIcon from '@/icons/Setting';
import PluginIcon from '@/icons/Plugin';
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
        <div className="wa-side">
          <AppIcon onClick={() => {
            navigate('/');
            if (type === 'setting') {
              window.location.reload();
            }
          }} />
          <PluginIcon onClick={() => navigate('/plugins')} />
          <SettingIcon onClick={() => navigate('/setting')} />
        </div>
      )}
      <div className="wa-content">
        {children}
      </div>
    </div>
  )
}

export default Layout;