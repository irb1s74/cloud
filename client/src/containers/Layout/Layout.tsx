import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { IUser } from '../../models/IUser';
import { ELayouts } from '../../models/ELayouts';
import './Layout.scss';
import Files from '../../components/Layout/Files/Files';

interface LayoutProps {
  user: IUser;
  type: ELayouts;
}

const Layout: FC<LayoutProps> = ({ user, type }) => {
  switch (type) {
    case ELayouts.files:
      return <Files user={user} />;
    case ELayouts.recent:
      return <Files user={user} />;
    case ELayouts.bookmarks:
      return <Files user={user} />;
    default:
      return <Files user={user} />;
  }
};

const ContainerLayout: FC<{ type: ELayouts }> = ({ type }) => {
  const user = useAppSelector((state) => state.authReducer.user);

  return <Layout type={type} user={user} />;
};

export default ContainerLayout;
