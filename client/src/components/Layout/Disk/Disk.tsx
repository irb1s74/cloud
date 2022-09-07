import React, { FC, memo, useState } from 'react';
import File from '../../UI/File/File';
import { IFile } from '../../../models/IFile';
import { Backdrop, Stack } from '@mui/material';
import { GiFiles } from 'react-icons/gi';
import { useSearchParams } from 'react-router-dom';
import fileAPI from '../../../api/FileService';
import { IUser } from '../../../models/IUser';
import Setting from './widget/Setting/Setting';

interface DiskProps {
  files: IFile[];
  handleSelectFile: (index: number) => () => void;
  handleOpenActions: (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => void;
  selectFile: number | null;
  user: IUser;
}

const Disk: FC<DiskProps> = ({
  files,
  selectFile,
  handleSelectFile,
  user,
  handleOpenActions,
}) => {
  const [usePath] = useSearchParams();
  const [dragEnter, setDragEnter] = useState(false);
  const [uploadFile] = fileAPI.useUploadFileMutation();

  const dragEnterFunc = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  };

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const dragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  };

  const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  };

  const dropFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const dataTransfer = event.dataTransfer;
    const files = dataTransfer.files;
    // files.forEach((file) => dispatch(uploadFile(file, parentId)));
    const path = usePath.get('path');
    if (files && files.length) {
      Array.from(files).forEach(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', path ? path : '');
        await uploadFile({
          token: user.token,
          formData,
        });
      });
    }
    setDragEnter(false);
  };

  return (
    <Stack direction='column' alignItems='flex-end'>
      <Setting />
      <div
        onDragEnter={dragEnterFunc}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        className='layout__grid'
      >
        {files.map((file, index) => (
          <div
            key={file.id}
            onClick={handleSelectFile(index)}
            onContextMenu={(event) => handleOpenActions(event, index)}
            className='layout__grid-item'
          >
            <File active={selectFile === index} file={file} />
          </div>
        ))}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          onDrop={dropFile}
          onDragStart={dragStart}
          onDragOver={dragOver}
          onDragLeave={dragLeave}
          open={dragEnter}
        >
          <GiFiles size={80} color='#FFF' />
        </Backdrop>
      </div>
    </Stack>
  );
};

export default memo(Disk);
