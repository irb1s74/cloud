import React from 'react';
import './Sidebar.scss';
import Nav from '../../components/Sidebar/Nav/Nav';
import Buttons from '../../components/Sidebar/Buttons/Buttons';
import Usage from '../../components/Sidebar/Usage/Usage';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Buttons />
      <Nav />
      <Usage />
    </div>
  );
};

const SidebarContainer = () => {
  return (
    <Sidebar />
  );
};

export default SidebarContainer;
