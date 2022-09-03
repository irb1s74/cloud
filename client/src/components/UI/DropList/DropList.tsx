import React, { FC, memo } from 'react';
import { Menu } from '@mui/material';

interface DropListProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const DropList: FC<DropListProps> = ({
  anchorEl,
  open,
  handleClose,
  children,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {children}
    </Menu>
  );
};

export default memo(DropList);
