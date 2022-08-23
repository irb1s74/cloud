import React, { useCallback, useEffect } from 'react';
import { googleSetting } from '../../helpers/googleSetting';
import { gapi } from 'gapi-script';
import './Auth.scss';
import Login from '../../components/UI/GoogleButton/Login';
import { authLogin } from '../../store/reducers/authReducer/action';
import { useAppDispatch } from '../../hooks/redux';
import { createPortal } from 'react-dom';

const Auth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        client_id: googleSetting.clientId,
        scope: 'email',
      });
    });
  }, []);

  const handleAuth = useCallback(
    (token: string) => dispatch(authLogin(token)),
    []
  );
  return createPortal(
    <div className='auth'>
      <div className='auth__form'>
        <div className='title'>Вход в аккаунт</div>
        <Login handleAuth={handleAuth} />
      </div>
    </div>,
    document.body
  );
};

export default Auth;
