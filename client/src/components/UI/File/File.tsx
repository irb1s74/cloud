import React, { FC, memo } from 'react';
import { IFile } from '../../../models/IFile';
import './Files.scss';
import { getFileIcon } from '../../../helpers/getFileIcons';

interface FileProps {
  file: IFile;
}

const File: FC<FileProps> = ({ file }) => {
  return (
    <div className='file'>
      <div className='file__icon'>{getFileIcon(file.type)}</div>
      <div className='file__name'>{file.name}</div>
    </div>
  );
};

export default memo(File);
