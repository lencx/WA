import { FC } from 'react';
import clsx from 'clsx';

import SearchIcon from './SearchIcon';
import type { SearchAppData } from '@/components/AppItem';

interface SearchItemProps {
  isActive: boolean;
  data: SearchAppData;
  onClick?: (data: SearchAppData) => void;
}

const SearchItem: FC<SearchItemProps> = ({ data, isActive, onClick }) => {
  const handleClick = () => {
    onClick && onClick(data);
  };

  return (
    <div className={clsx('search-item', { active: isActive })} onClick={handleClick}>
      <SearchIcon className="item-ico" icon={data.icon} />
      <div>{data.name}</div>
    </div>
  )
}

export default SearchItem;