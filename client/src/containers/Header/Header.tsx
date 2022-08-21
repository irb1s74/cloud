import React from 'react';
import './Header.scss';
import Breadcrumbs from '../../components/Header/Breadcrumbs/Breadcrumbs';
import Actions from '../../components/Header/actions/Actions';
import Logo from '../../components/Header/Logo/Logo';

const Header = () => {

  return (
    <header className='header'>
      <Logo />
      <Breadcrumbs />
      <Actions />
    </header>
  );
};

const ContainerHeader = () => {
  return (
    <Header />
  );
};
export default ContainerHeader;
