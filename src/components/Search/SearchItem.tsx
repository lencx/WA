import { FC } from 'react';
import clsx from 'clsx';

import SearchIcon from './SearchIcon';
import type { AppData } from '@/components/AppItem';

interface SearchItemProps {
  isActive: boolean;
  data: AppData;
}

const SearchItem: FC<SearchItemProps> = ({ data, isActive }) => {
  return (
    <div className={clsx('search-item', { active: isActive })}>
      <SearchIcon className="item-ico" icon={data.icon} />
      <div>{data.name}</div>
    </div>
  )
}

export default SearchItem;