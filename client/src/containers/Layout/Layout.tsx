import React, { FC } from 'react';
import './Layout.scss';
import { ELayouts } from '../../models/ELayouts';
import fileAPI from '../../api/FileService';
import { useAppSelector } from '../../hooks/redux';
import { IUser } from '../../models/IUser';
import File from '../../components/UI/File/File';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  user: IUser;
}

const Layout: FC<LayoutProps> = ({ user }) => {
  const location = useLocation();
  const path = location.pathname.split('/').shift();
  const {
    data: files,
    error,
    isLoading,
    refetch,
  } = fileAPI.useGetFilesQuery({
    parentId: 0,
    sort: 'def',
    token: user.token,
  });

  return (
    <section className='layout'>
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>Произошла ошибка при загрузке</h1>}
      {files && files.map((file) => <File key={file.id} file={file} />)}
    </section>
  );
};

const ContainerLayout: FC<{ type: ELayouts }> = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  return <Layout user={user} />;
};

export default ContainerLayout;
