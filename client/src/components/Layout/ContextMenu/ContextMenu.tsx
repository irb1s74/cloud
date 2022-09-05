import React, { FC, memo } from 'react';
import DropList from '../../UI/DropList/DropList';
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { HiCloudDownload, HiShare, HiTrash } from 'react-icons/hi';
import { CgRename } from 'react-icons/cg';
import fileAPI from '../../../api/FileService';
import { IFile } from '../../../models/IFile';
import { IUser } from '../../../models/IUser';
import { ROOT_URL } from '../../../helpers/ROOT_URL';

interface ContextMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  user: IUser;
  file: IFile | undefined;
}

const ContextMenu: FC<ContextMenuProps> = ({
  anchorEl,
  open,
  handleClose,
  user,
  file,
}) => {
  const [deleteFile] = fileAPI.useDeleteFileMutation();
  const handleDelete = async () => {
    if (file?.id) {
      deleteFile({ token: user.token, fileId: file.id });
    }
  };
  const handleDownload = async () => {
    if (file?.id) {
      const response = await fetch(`${ROOT_URL}file/download/${file.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    }
  };

  return (
    <DropList anchorEl={anchorEl} open={open} handleClose={handleClose}>
      <MenuItem>
        <ListItemIcon>
          <HiShare size={22} />
        </ListItemIcon>
        <ListItemText>Поделиться</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleDownload}>
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
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          <HiTrash size={22} />
        </ListItemIcon>
        <ListItemText>Удалить</ListItemText>
      </MenuItem>
    </DropList>
  );
};

export default memo(ContextMenu);
