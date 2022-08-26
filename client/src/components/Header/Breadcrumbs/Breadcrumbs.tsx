import React from 'react';
import { Breadcrumbs } from '@mui/material';
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const HeaderBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [usePath] = useSearchParams();
  const path = usePath.get('path');
  const splitPath = path && path.split('\\');

  const handleClick = (index: number) => {
    return () => {
      if (splitPath) {
        navigate({
          pathname: '/recent',
          search: `?${createSearchParams({
            path: `${splitPath.slice(0, index + 1).join('\\')}`,
          })}`,
        });
      }
    };
  };

  const parent = location.pathname.split('/').splice(1, 1)[0].split('');
  parent.splice(0, 1, parent[0].toUpperCase()).join('');
  return (
    <div className='header__breadcrumbs'>
      <Breadcrumbs maxItems={4} aria-label='breadcrumb'>
        <Link
          to={`${location.pathname.split('/').splice(0, 2).join('/')}`}
          className='header__breadcrumb'
        >
          {parent}
        </Link>
        {splitPath &&
          splitPath.map((item, index) => (
            <div
              className={`header__breadcrumb ${
                index + 1 === splitPath.length
                  ? 'header__breadcrumb-active'
                  : ''
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
