import { useLayoutEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import DashboardView from '@/views/dashboard';
import SettingView from '@/views/setting';
import SearchView from '@/views/search';
import ScriptsView from '@/views/script';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardView />,
  },
  {
    path: '/setting',
    element: <SettingView />,
  },
  {
    path: '/search',
    element: <SearchView />,
  },
  {
    path: '/script',
    element: <ScriptsView />,
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
