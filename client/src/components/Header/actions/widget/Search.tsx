import React from 'react';
import { HiSearch } from 'react-icons/hi';

const HeaderSearch = () => {
  return (
    <div className='header__search'>
      <HiSearch className='icon-search' size='22' />
      <input className='input-reset input-search' placeholder='Поиск' />
    </div>
  );
};

export default HeaderSearch;
