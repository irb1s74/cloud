import React, { FC, memo, useCallback } from 'react';
import './Header.scss';
import Breadcrumbs from '../../components/Header/Breadcrumbs/Breadcrumbs';
import Actions from '../../components/Header/actions/Actions';
import Logo from '../../components/Header/Logo/Logo';
import { authSlice } from '../../store/reducers/authReducer';
import { IUser } from '../../models/IUser';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface HeaderProps {
  handleLogout: () => void;
  user: IUser;
}

const Header: FC<HeaderProps> = memo(({ handleLogout, user }) => {
  return (
    <header className='header'>
      <Logo />
      <Breadcrumbs />
      <Actions user={user} handleLogout={handleLogout} />
    </header>
  );
});

const ContainerHeader = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const handleLogout = useCallback(
    () =>
      dispatch(authSlice.actions.setUser({ user: {} as IUser, isAuth: false })),
    []
  );
  return <Header user={user} handleLogout={handleLogout} />;
};
export default ContainerHeader;
