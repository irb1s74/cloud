import React, { ReactElement } from 'react';
import { HiClock, HiFolder, HiTrash } from 'react-icons/hi';

const getIcon = (type: string): ReactElement | null => {
  switch (type) {
    case 'trash':
      return <HiTrash size='30' className='icon' />;
    case 'cloc':
      return <HiClock size='30' className='icon' />;
    case 'folder':
      return <HiFolder size='30' className='icon' />;
    default:
      return null;
  }
};

export { getIcon };
