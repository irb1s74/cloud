import React from 'react';
import list from './navRender.json';
import { getIcon } from '../../../helpers/getIcon';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toNavigate = (link: string) => {
    return () => {
      if (location.pathname.split('/')[1] !== link) {
        navigate(link);
      }
    };
  };
  return (
    <nav className='nav' title='Sidebar Nav'>
      <ul className='list-reset nav__list'>
        {list.map((item, index) => (
          <li
            key={index}
            onClick={toNavigate(item.path)}
            className={`nav__item ${location.pathname.split('/')[1] === item.path && 'nav__item-active'}`}>
            <div className='wrapper'>
              {getIcon(item.icon)}
              <div className='name'>{item.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
