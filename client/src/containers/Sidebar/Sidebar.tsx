import React, { FC, memo, useCallback } from 'react';
import './Sidebar.scss';
import Nav from '../../components/Sidebar/Nav/Nav';
import Buttons from '../../components/Sidebar/Buttons/Buttons';
import Usage from '../../components/Sidebar/Usage/Usage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { modalSlice } from '../../store/reducers/modalReducer';
import { IModal } from '../../models/IModal';
import { IUser } from '../../models/IUser';

interface SidebarProps {
  user: IUser;
  setModal: (payload: IModal) => void;
}

const Sidebar: FC<SidebarProps> = memo(({ user, setModal }) => {
  return (
    <div className='sidebar'>
      <Buttons user={user} setModal={setModal} />
      <Nav />
      <Usage user={user} />
    </div>
  );
});

const SidebarContainer = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);

  const setModal = useCallback(
    (payload: IModal) => dispatch(modalSlice.actions.setModal(payload)),
    []
  );
  return <Sidebar setModal={setModal} user={user} />;
};

export default SidebarContainer;
