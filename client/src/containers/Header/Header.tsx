import React, { FC, useCallback } from 'react';
import './Header.scss';
import Breadcrumbs from '../../components/Header/Breadcrumbs/Breadcrumbs';
import Actions from '../../components/Header/actions/Actions';
import Logo from '../../components/Header/Logo/Logo';
import Logout from '../../components/UI/GoogleButton/Logout';
import { authSlice } from '../../store/reducers/authReducer';
import { IUser } from '../../models/IUser';
import { useAppDispatch } from '../../hooks/redux';

interface HeaderProps {
  handleLogout: () => void;
}

const Header: FC<HeaderProps> = ({ handleLogout }) => {
  return (
    <header className='header'>
      <Logo />
      <Breadcrumbs />
      <Actions handleLogout={handleLogout} />
    </header>
  );
};

const ContainerHeader = () => {
  const dispatch = useAppDispatch();
  const handleLogout = useCallback(
    () =>
      dispatch(authSlice.actions.setUser({ user: {} as IUser, isAuth: false })),
    []
  );
  return <Header handleLogout={handleLogout} />;
};
export default ContainerHeader;
