import { FC } from 'react';
import clsx from 'clsx';

import waIcon from '@/assets/logo.svg';

interface SearchIconProps {
  icon?: string;
  className?: string
}

const SearchIcon: FC<SearchIconProps> = ({ className, icon = waIcon }) => {
  const isSvg = /<\s*svg[^>]*>(.*?)<\/\s*svg>/g.test(icon);

  return (
    <div className={clsx('search-data-ico', className)}>
      {isSvg
        ? <i className="app-icon" dangerouslySetInnerHTML={{ __html: icon }} />
        : <img className="app-icon" src={icon} /> }
    </div>
  );
}

export default SearchIcon;