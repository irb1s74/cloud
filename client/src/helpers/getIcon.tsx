import React, { ReactElement } from 'react';
import { HiClock, HiFolder, HiBookmark } from 'react-icons/hi';

const getIcon = (type: string): ReactElement | null => {
  switch (type) {
    case 'bookmark':
      return <HiBookmark size='30' className='icon' />;
    case 'cloc':
      return <HiClock size='30' className='icon' />;
    case 'folder':
      return <HiFolder size='30' className='icon' />;
    default:
      return null;
  }
};

export { getIcon };
