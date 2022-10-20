import { useLayoutEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import DashboardView from '@/views/dashboard';
import SettingView from '@/views/setting';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardView />,
  },
  {
    path: '/setting',
    element: <SettingView />,
  },
];

export default () => {
  const location = useLocation();
  const pathname = location.pathname;
  useLayoutEffect(() => {
    const name = pathname.substring(1).replace(/\//gi, '_');
    document.body.className = `${name ? name : 'main'}_screen`
  }, [pathname]);
  return useRoutes(routes);
};
