import React from 'react';
import Search from './widget/Search';
import Avatar from '../../UI/Avatar/Avatar';

const HeaderActions = () => {
  return (
    <div className='header__actions'>
      <div className='header__search'>
        <Search />
      </div>
      <div className='header__user'>
        <Avatar />
      </div>
    </div>
  );
};

export default HeaderActions;
