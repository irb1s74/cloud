import React, { FC, useCallback, useRef, useState } from 'react';
import Disk from '../Disk/Disk';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import fileAPI from '../../../api/FileService';
import { IUser } from '../../../models/IUser';
import { IFile } from '../../../models/IFile';
import ContextMenu from '../ContextMenu/ContextMenu';

interface FilesProps {
  user: IUser;
}

const Files: FC<FilesProps> = ({ user }) => {
  const navigate = useNavigate();
  const [usePath] = useSearchParams();
  const path = usePath.get('path');
  const file = useRef<IFile>();
  const [selectFile, setFile] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    data: files,
    error,
    isLoading,
  } = fileAPI.useGetFilesByPathQuery({
    path: path ? path : '',
    token: user.token,
  });

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
          files={files}
          selectFile={selectFile}
          handleSelectFile={handleSelectFile}
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

export default Files;
