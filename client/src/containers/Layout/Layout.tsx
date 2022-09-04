import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import fileAPI from '../../api/FileService';
import File from '../../components/UI/File/File';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser } from '../../models/IUser';
import { ELayouts } from '../../models/ELayouts';
import './Layout.scss';
import ContextMenu from '../../components/Layout/ContextMenu/ContextMenu';
import { fileSlice } from '../../store/reducers/fileReducer';

interface LayoutProps {
  user: IUser;
  setParent: (parentId: number) => void;
}

const Layout: FC<LayoutProps> = ({ user, setParent }) => {
  const navigate = useNavigate();
  const [usePath] = useSearchParams();
  const path = usePath.get('path');
  const [selectFile, setFile] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenActions = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.preventDefault();
    setFile(index);
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

  useEffect(() => {
    if (files && files.length) {
      setParent(files[0].parentId);
    }
  }, [files]);

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
      } else {
        setFile(index);
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
      <ContextMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </React.Fragment>
  );
};

const ContainerLayout: FC<{ type: ELayouts }> = () => {
  const disptatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const setParent = useCallback(
    (parentId: number) => disptatch(fileSlice.actions.setParent(parentId)),
    []
  );
  return <Layout setParent={setParent} user={user} />;
};

export default ContainerLayout;
