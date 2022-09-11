import React, { FC, memo } from 'react';
import { IFile } from '../../../../../models/IFile';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { getFileIcon } from '../../../../../helpers/getFileIcons';
import { sizeFormatter } from '../../../../../helpers/sizeFormatter';
import dayjs from 'dayjs';

interface DiskListProps {
  files: IFile[];
  handleSelectFile: (index: number) => () => void;
  selectFile: number | null;
  handleOpenActions: (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => void;
}

const DiskList: FC<DiskListProps> = ({
  files,
  handleSelectFile,
  handleOpenActions,
  selectFile,
}) => {
  return (
    <div className=''>
      <List sx={{ width: '100%', height: '100%' }}>
        {files.map((file, index) => (
          <ListItemButton
            key={file.id}
            onClick={handleSelectFile(index)}
            onContextMenu={(event) => handleOpenActions(event, index)}
            selected={selectFile === index}
          >
            <ListItemIcon>{getFileIcon(file.type)}</ListItemIcon>
            <ListItemText primary={file.name} />
            {file.type !== 'dir' && (
              <ListItemText
                sx={{ textAlign: 'end' }}
                primary={dayjs(file.createdAt).format('DD.MM.YYYY')}
                secondary={sizeFormatter(file.size)}
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default memo(DiskList);
