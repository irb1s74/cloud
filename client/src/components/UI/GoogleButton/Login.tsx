import React, { FC, memo } from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { googleSetting } from '../../../helpers/googleSetting';
import './AuthBtn.scss';

interface LoginProps {
  handleAuth: (token: string) => void;
  setAuthLoading: (payload: boolean) => void;
}

const Login: FC<LoginProps> = ({ handleAuth, setAuthLoading }) => {
  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in res) {
      handleAuth(res.tokenId);
    }
  };
  const onFailure = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    setAuthLoading(false);
  };

  return (
    <GoogleLogin
      clientId={googleSetting.clientId}
      buttonText='Login'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default memo(Login);
