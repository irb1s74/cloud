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

interface DiskListProps {
  files: IFile[];
  handleSelectFile: (index: number) => () => void;
  selectFile: number | null;
  handleOpenActions: (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => void;
  dragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEnterFunc: (event: React.DragEvent<HTMLDivElement>) => void;
}

const DiskList: FC<DiskListProps> = ({
  files,
  handleSelectFile,
  handleOpenActions,
  selectFile,
  dragOver,
  dragEnterFunc,
  dragLeave,
}) => {
  return (
    <div
      onDragEnter={dragEnterFunc}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      className=''
    >
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
