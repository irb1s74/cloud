import React, { FC, memo } from 'react';
import './Sidebar.scss';
import Nav from '../../components/Sidebar/Nav/Nav';
import Buttons from '../../components/Sidebar/Buttons/Buttons';
import Usage from '../../components/Sidebar/Usage/Usage';
import { useAppSelector } from '../../hooks/redux';

interface SidebarProps {
  userDiskSpace: number;
  userUsedSpace: number;
}

const Sidebar: FC<SidebarProps> = memo(({ userDiskSpace, userUsedSpace }) => {
  return (
    <div className='sidebar'>
      <Buttons />
      <Nav />
      <Usage userDiskSpace={userDiskSpace} userUsedSpace={userUsedSpace} />
    </div>
  );
});

const SidebarContainer = () => {
  const userUsedSpace = useAppSelector(
    (state) => state.authReducer.user.usedSpace
  );
  const userDiskSpace = useAppSelector(
    (state) => state.authReducer.user.diskSpace
  );
  return (
    <Sidebar userUsedSpace={userUsedSpace} userDiskSpace={userDiskSpace} />
  );
};

export default SidebarContainer;
