import React, { FC, memo, useState } from 'react';
import { Backdrop, Stack } from '@mui/material';
import { GiFiles } from 'react-icons/gi';
import { useSearchParams } from 'react-router-dom';
import fileAPI from '../../../api/FileService';
import { IUser } from '../../../models/IUser';
import { IFile } from '../../../models/IFile';
import Setting from './widget/Setting/Setting';
import DiskGrid from './widget/Grid/Grid';
import DiskList from './widget/List/List';

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
  const [alignment, setAlignment] = useState('grid');
  const [dragEnter, setDragEnter] = useState(false);
  const [usePath] = useSearchParams();
  const [uploadFile] = fileAPI.useUploadFileMutation();

  const handleChangeAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

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
    <Stack direction='column' sx={{ overflowY: 'auto' }} alignItems='flex-end'>
      <Setting alignment={alignment} handleChange={handleChangeAlignment} />
      <div className='layout__scroll'>
        {alignment === 'grid' ? (
          <DiskGrid
            files={files}
            selectFile={selectFile}
            handleSelectFile={handleSelectFile}
            handleOpenActions={handleOpenActions}
            dragOver={dragOver}
            dragLeave={dragLeave}
            dragEnterFunc={dragEnterFunc}
          />
        ) : (
          <DiskList
            files={files}
            selectFile={selectFile}
            handleSelectFile={handleSelectFile}
            handleOpenActions={handleOpenActions}
            dragOver={dragOver}
            dragLeave={dragLeave}
            dragEnterFunc={dragEnterFunc}
          />
        )}
      </div>
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
    </Stack>
  );
};

export default memo(Disk);
