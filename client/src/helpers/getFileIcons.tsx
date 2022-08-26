import React, { ReactElement } from 'react';
import { FcDocument, FcFile, FcFolder, FcImageFile } from 'react-icons/fc';

const getFileIcon = (icon: string): ReactElement | null => {
  switch (icon) {
    case 'dir':
      return <FcFolder size='50' />;
    case 'txt' || 'doc':
      return <FcDocument size='50' />;
    case 'png' || 'jpg':
      return <FcImageFile size='50' />;
    default:
      return <FcFile size='50' />;
  }
};

export { getFileIcon };
