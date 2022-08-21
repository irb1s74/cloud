import React from 'react';
import { HiSearch } from 'react-icons/hi';

const HeaderSearch = () => {
  return (
    <>
      <HiSearch className='icon-search' size='22' />
      <input className='input-reset input-search' placeholder='Поиск' />
    </>
  );
};

export default HeaderSearch;
