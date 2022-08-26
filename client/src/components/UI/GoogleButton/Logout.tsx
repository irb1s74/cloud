import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import './AuthBtn.scss';

const Logout = () => {
  return (
    <div className='logout-btn'>
      <BiLogOut size={28} />
    </div>
  );
};

export default Logout;
