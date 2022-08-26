import React, { FC, memo } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useGoogleLogout } from 'react-google-login';
import { googleSetting } from '../../../helpers/googleSetting';
import './AuthBtn.scss';

interface LogoutProps {
  handleLogout: () => void;
}

const Logout: FC<LogoutProps> = ({ handleLogout }) => {
  const onLogoutSuccess = () => {
    handleLogout();
  };

  const { signOut } = useGoogleLogout({
    clientId: googleSetting.clientId,
    onLogoutSuccess,
  });
  return (
    <div className='logout-btn' onClick={signOut}>
      <BiLogOut size={28} />
    </div>
  );
};

export default memo(Logout);
