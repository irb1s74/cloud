import React, { FC, memo } from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from 'react-google-login';
import { googleSetting } from '../../../helpers/googleSetting';
import './AuthBtn.scss';

interface LoginProps {
  handleAuth: (token: string) => void;
  // handleSetAuthLoading: (payload: boolean) => void;
}

const Login: FC<LoginProps> = ({ handleAuth }) => {
  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in res) {
      handleAuth(res.tokenId);
    }
  };
  const onFailure = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    // handleSetAuthLoading(false);
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: googleSetting.clientId,
    isSignedIn: true,
    cookiePolicy: 'single_host_origin',
  });

  return (
    <button
      onClick={signIn}
      className='btn-reset auth-btn w-full text-white text-lg rounded-md bg-indigo-500 p-3'
    >
      Войти
    </button>
  );
};

export default memo(Login);
