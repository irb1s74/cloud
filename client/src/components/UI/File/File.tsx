import React, { FC, memo } from 'react';
import { IFile } from '../../../models/IFile';
import './Files.scss';
import { getFileIcon } from '../../../helpers/getFileIcons';

interface FileProps {
  file: IFile;
  active: boolean;
}

const File: FC<FileProps> = ({ file, active }) => {
  return (
    <div className={`file ${active ? 'file-active' : ''}`}>
      <div className='file__icon'>{getFileIcon(file.type)}</div>
      <div className='file__name'>{file.name}</div>
    </div>
  );
};

export default memo(File);
