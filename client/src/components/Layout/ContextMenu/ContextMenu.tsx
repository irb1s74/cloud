import React, { FC, memo } from 'react';
import DropList from '../../UI/DropList/DropList';
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { HiCloudDownload, HiTrash, HiShare } from 'react-icons/hi';
import { CgRename } from 'react-icons/cg';

interface ContextMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ anchorEl, open, handleClose }) => {
  return (
    <DropList anchorEl={anchorEl} open={open} handleClose={handleClose}>
      <MenuItem>
        <ListItemIcon>
          <HiShare size={22} />
        </ListItemIcon>
        <ListItemText>Поделиться</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <HiCloudDownload size={22} />
        </ListItemIcon>
        <ListItemText>Скачать</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <CgRename size={22} />
        </ListItemIcon>
        <ListItemText>Переименовать</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <HiTrash size={22} />
        </ListItemIcon>
        <ListItemText>Удалить</ListItemText>
      </MenuItem>
    </DropList>
  );
};

export default memo(ContextMenu);
