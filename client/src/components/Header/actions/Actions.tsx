import React, { FC, memo } from 'react';
import Search from './widget/Search';
import Avatar from '../../UI/Avatar/Avatar';
import DropList from '../../UI/DropList/DropList';
import { MenuItem } from '@mui/material';
import Logout from '../../UI/GoogleButton/Logout';
import { useGoogleLogout } from 'react-google-login';
import { googleSetting } from '../../../helpers/googleSetting';

interface HeaderActionsProps {
  handleLogout: () => void;
}

const HeaderActions: FC<HeaderActionsProps> = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogoutSuccess = () => {
    handleLogout();
  };
  const { signOut } = useGoogleLogout({
    clientId: googleSetting.clientId,
    onLogoutSuccess,
  });

  return (
    <React.Fragment>
      <div className='header__actions'>
        <Search />
        <div onClick={handleClick} className='header__user'>
          <Avatar />
        </div>
      </div>
      <DropList anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <MenuItem onClick={signOut}>
          <div className='menu-text'>Выйти</div>
          <Logout />
        </MenuItem>
      </DropList>
    </React.Fragment>
  );
};

export default memo(HeaderActions);
