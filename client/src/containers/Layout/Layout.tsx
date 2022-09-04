import React, { FC, useRef, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import fileAPI from '../../api/FileService';
import File from '../../components/UI/File/File';
import ContextMenu from '../../components/Layout/ContextMenu/ContextMenu';
import { useAppSelector } from '../../hooks/redux';
import { IUser } from '../../models/IUser';
import { ELayouts } from '../../models/ELayouts';
import './Layout.scss';
import { IFile } from '../../models/IFile';

interface LayoutProps {
  user: IUser;
}

const Layout: FC<LayoutProps> = ({ user }) => {
  const navigate = useNavigate();
  const [usePath] = useSearchParams();
  const path = usePath.get('path');
  const file = useRef<IFile>();
  const [selectFile, setFile] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenActions = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.preventDefault();
    setFile(index);
    file.current = files && files[index];
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data: files,
    error,
    isLoading,
  } = fileAPI.useGetFilesByPathQuery({
    path: path ? path : '',
    token: user.token,
  });

  const handleSelectFile = (index: number) => {
    return () => {
      if (selectFile === index && files && files[index].type === 'dir') {
        navigate({
          pathname: '/recent',
          search: `?${createSearchParams({
            path: `${files[index].path}`,
          })}`,
        });
        setFile(null);
      } else if (files) {
        setFile(index);
        file.current = files[index];
      }
    };
  };

  return (
    <React.Fragment>
      <section className='layout'>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        <div className='layout__grid'>
          {files &&
            files.map((file, index) => (
              <div
                key={file.id}
                onClick={handleSelectFile(index)}
                onContextMenu={(event) => handleOpenActions(event, index)}
                className='layout__grid-item'
              >
                <File active={selectFile === index} file={file} />
              </div>
            ))}
        </div>
      </section>
      <ContextMenu
        file={file.current}
        user={user}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    </React.Fragment>
  );
};

const ContainerLayout: FC<{ type: ELayouts }> = () => {
  const user = useAppSelector((state) => state.authReducer.user);

  return <Layout user={user} />;
};

export default ContainerLayout;
