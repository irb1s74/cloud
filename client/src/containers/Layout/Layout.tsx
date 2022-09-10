import React, { FC, memo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { IUser } from '../../models/IUser';
import { ELayouts } from '../../models/ELayouts';
import Files from '../../components/Layout/Files/Files';
import Bookmarks from '../../components/Layout/Bookmarks/Bookmarks';
import Recent from '../../components/Layout/Recent/Recent';
import './Layout.scss';

interface LayoutProps {
  user: IUser;
  type: ELayouts;
}

const Layout: FC<LayoutProps> = memo(({ user, type }) => {
  switch (type) {
    case ELayouts.files:
      return <Files user={user} />;
    case ELayouts.recent:
      return <Recent user={user} />;
    case ELayouts.bookmarks:
      return <Bookmarks user={user} />;
    default:
      return <Files user={user} />;
  }
});

const ContainerLayout: FC<{ type: ELayouts }> = ({ type }) => {
  const user = useAppSelector((state) => state.authReducer.user);

  return <Layout type={type} user={user} />;
};

export default ContainerLayout;
