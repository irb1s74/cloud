import React, { FC, memo } from 'react';
import Search from './widget/Search';
import Avatar from '../../UI/Avatar/Avatar';
import DropList from '../../UI/DropList/DropList';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import Logout from '../../UI/GoogleButton/Logout';
import { useGoogleLogout } from 'react-google-login';
import { googleSetting } from '../../../helpers/googleSetting';
import { IUser } from '../../../models/IUser';

interface HeaderActionsProps {
  handleLogout: () => void;
  user: IUser;
}

const HeaderActions: FC<HeaderActionsProps> = ({ handleLogout, user }) => {
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
          <Avatar user={user} />
        </div>
      </div>
      <DropList anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Выйти</ListItemText>
        </MenuItem>
      </DropList>
    </React.Fragment>
  );
};

export default memo(HeaderActions);
