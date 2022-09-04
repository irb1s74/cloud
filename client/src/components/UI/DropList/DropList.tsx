import React, { FC, memo } from 'react';
import { Menu, MenuList } from '@mui/material';

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
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MenuList sx={{ p: 0 }}>{children}</MenuList>
    </Menu>
  );
};

export default memo(DropList);
