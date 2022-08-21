import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (index: number) => {
    return () => {
      navigate(location.pathname.split('/').splice(0, 2 + index).join('/'));
    };
  };
  const paths = location.pathname.split('/');
  paths.splice(0, 1);


  return (
    <div className='header__breadcrumbs'>
      <Breadcrumbs maxItems={4} aria-label='breadcrumb'>
        <Link className='header__breadcrumb' color='inherit' underline='hover' href='/'>
          Мой диск
        </Link>
        {paths.map((item, index) => (
          <div
            className='header__breadcrumb'
            key={index}
            onClick={handleClick(index)}
          >
            {item}
          </div>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default HeaderBreadcrumbs;
