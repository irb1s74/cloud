import React from 'react';
import logo from '../../../assets/img/cloud-logo.png';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to={'/recent'}>
      <div className='header__logo'>
        <img
          loading='lazy'
          src={logo}
          className='image'
          width='30'
          height='30'
          alt='Cloud Logo'
        />
        <div className='name'>
          cloudBox.
        </div>
      </div>
    </Link>
  );
};

export default Logo;
