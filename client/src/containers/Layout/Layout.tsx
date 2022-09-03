import React, { FC, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import fileAPI from '../../api/FileService';
import File from '../../components/UI/File/File';
import { useAppSelector } from '../../hooks/redux';
import { IUser } from '../../models/IUser';
import { ELayouts } from '../../models/ELayouts';
import './Layout.scss';

interface LayoutProps {
  user: IUser;
}

const Layout: FC<LayoutProps> = ({ user }) => {
  const navigate = useNavigate();
  const [usePath] = useSearchParams();
  const path = usePath.get('path');
  const [selectFile, setFile] = useState<number | null>(null);
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
                className='layout__grid-item'
              >
                <File active={selectFile === index} file={file} />
              </div>
            ))}
        </div>
      </section>
    </React.Fragment>
  );
};

const ContainerLayout: FC<{ type: ELayouts }> = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  return <Layout user={user} />;
};

export default ContainerLayout;
