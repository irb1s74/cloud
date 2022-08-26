import React from 'react';
import { HiSearch } from 'react-icons/hi';

const HeaderSearch = () => {
  return (
    <React.Fragment>
      <HiSearch className='icon-search' size='22' />
      <input className='input-reset input-search' placeholder='Поиск' />
    </React.Fragment>
  );
};

export default HeaderSearch;
