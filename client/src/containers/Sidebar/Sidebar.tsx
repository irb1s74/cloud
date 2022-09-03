import React, { FC, memo, useCallback } from 'react';
import './Sidebar.scss';
import Nav from '../../components/Sidebar/Nav/Nav';
import Buttons from '../../components/Sidebar/Buttons/Buttons';
import Usage from '../../components/Sidebar/Usage/Usage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { modalSlice } from '../../store/reducers/modalReducer';
import { IModal } from '../../models/IModal';

interface SidebarProps {
  userDiskSpace: number;
  userUsedSpace: number;
  setModal: (payload: IModal) => void;
}

const Sidebar: FC<SidebarProps> = memo(
  ({ userDiskSpace, userUsedSpace, setModal }) => {
    return (
      <div className='sidebar'>
        <Buttons setModal={setModal} />
        <Nav />
        <Usage userDiskSpace={userDiskSpace} userUsedSpace={userUsedSpace} />
      </div>
    );
  }
);

const SidebarContainer = () => {
  const dispatch = useAppDispatch();
  const userUsedSpace = useAppSelector(
    (state) => state.authReducer.user.usedSpace
  );
  const userDiskSpace = useAppSelector(
    (state) => state.authReducer.user.diskSpace
  );
  const setModal = useCallback(
    (payload: IModal) => dispatch(modalSlice.actions.setModal(payload)),
    []
  );
  return (
    <Sidebar
      setModal={setModal}
      userUsedSpace={userUsedSpace}
      userDiskSpace={userDiskSpace}
    />
  );
};

export default SidebarContainer;
