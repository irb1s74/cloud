import React, { FC, memo, useCallback, useRef, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import fileAPI from '../../../api/FileService';
import { IUser } from '../../../models/IUser';
import { IFile } from '../../../models/IFile';
import Disk from '../../UI/Disk/Disk';
import ContextMenu from '../../UI/ContextMenu/ContextMenu';
import { SelectChangeEvent } from '@mui/material';

interface FilesProps {
  user: IUser;
}

const Files: FC<FilesProps> = ({ user }) => {
  const navigate = useNavigate();
  const [usePath] = useSearchParams();
  const path = usePath.get('path');
  const file = useRef<IFile>();
  const [selectFile, setFile] = useState<number | null>(null);
  const [sort, setSort] = useState<string>('time');
  const [optionSort, setOptionSort] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    data: files,
    error,
    isLoading,
  } = fileAPI.useGetFilesByPathQuery({
    path: path ? path : '',
    sort,
    option: optionSort,
    token: user.token,
  });

  const handleSelectSort = useCallback((event: SelectChangeEvent) => {
    if (event.target.value === 'ascending') {
      setOptionSort(true);
    } else if (event.target.value === 'descending') {
      setOptionSort(false);
    } else {
      setSort(event.target.value);
    }
  }, []);

  const handleSelectFile = useCallback(
    (index: number) => () => {
      if (selectFile === index && files && files[index].type === 'dir') {
        navigate({
          pathname: '',
          search: `?${createSearchParams({
            path: `${files[index].path}`,
          })}`,
        });
        setFile(null);
      } else if (files) {
        setFile(index);
        file.current = files[index];
      }
    },
    [files, selectFile]
  );

  const handleOpenActions = useCallback(
    (event: React.MouseEvent<HTMLElement>, index: number) => {
      event.preventDefault();
      setFile(index);
      file.current = files && files[index];
      setAnchorEl(event.currentTarget);
    },
    [files]
  );
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <section className='layout'>
      <div className='layout__name'>Файлы</div>
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>Произошла ошибка при загрузке</h1>}
      {files && (
        <Disk
          user={user}
          sort={sort}
          optionSort={optionSort}
          files={files}
          selectFile={selectFile}
          handleSelectFile={handleSelectFile}
          handleSelectSort={handleSelectSort}
          handleOpenActions={handleOpenActions}
        />
      )}
      <ContextMenu
        file={file.current}
        user={user}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    </section>
  );
};

export default memo(Files);
