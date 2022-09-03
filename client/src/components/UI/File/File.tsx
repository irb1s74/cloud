import React, { FC, memo } from 'react';
import { IFile } from '../../../models/IFile';
import './Files.scss';
import { getFileIcon } from '../../../helpers/getFileIcons';
import { IconButton, MenuItem } from '@mui/material';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import DropList from '../DropList/DropList';

interface FileProps {
  file: IFile;
  active: boolean;
}

const File: FC<FileProps> = ({ file, active }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenActions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div className={`file ${active ? 'file-active' : ''}`}>
        <div className='file__icon'>{getFileIcon(file.type)}</div>
        <div className='file__name'>{file.name}</div>
      </div>
      <DropList anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <MenuItem>aboba</MenuItem>
      </DropList>
    </React.Fragment>
  );
};

export default memo(File);
