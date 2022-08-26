import React from 'react';
import { Breadcrumbs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (index: number) => {
    return () => {
      navigate(
        location.pathname
          .split('/')
          .splice(0, 2 + index)
          .join('/')
      );
    };
  };
  const paths = location.pathname.split('/');
  paths.splice(0, 1);
  const parent = paths[0].split('');
  parent.splice(0, 1, parent[0].toUpperCase());
  paths[0] = parent.join('');

  return (
    <div className='header__breadcrumbs'>
      <Breadcrumbs maxItems={4} aria-label='breadcrumb'>
        {paths.map((item, index) => (
          <div
            className={`header__breadcrumb ${
              paths.length === index + 1 ? 'header__breadcrumb-active' : index
            }`}
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
