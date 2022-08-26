import React, { FC, memo, useCallback } from 'react';
import Login from '../../components/UI/GoogleButton/Login';
import { authLogin } from '../../store/reducers/authReducer/action';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createPortal } from 'react-dom';
import { authSlice } from '../../store/reducers/authReducer';
import Loading from '../../components/UI/CircularLoading/Loading';
import './Auth.scss';

interface AuthProps {
  setAuthLoading: (payload: boolean) => void;
  handleAuth: (token: string) => void;
  isAuthLoading: boolean;
  isUserLoading: boolean;
}

const Auth: FC<AuthProps> = memo(
  ({ setAuthLoading, handleAuth, isAuthLoading, isUserLoading }) => {
    const loading = isAuthLoading || isUserLoading;
    return createPortal(
      <React.Fragment>
        {loading && (
          <div className='wrapper-loading'>
            <Loading />
          </div>
        )}
        <div className='auth'>
          <div className='auth__form'>
            <div className='title'>Вход в аккаунт</div>
            <Login handleAuth={handleAuth} setAuthLoading={setAuthLoading} />
          </div>
        </div>
      </React.Fragment>,
      document.body
    );
  }
);

const ContainerAuth = () => {
  const dispatch = useAppDispatch();
  const setAuthLoading = useCallback(
    (payload: boolean) => dispatch(authSlice.actions.setAuthLoading(payload)),
    []
  );
  const handleAuth = useCallback(
    (token: string) => dispatch(authLogin(token)),
    []
  );
  const isAuthLoading = useAppSelector(
    (state) => state.authReducer.isAuthLoading
  );
  const isUserLoading = useAppSelector(
    (state) => state.authReducer.isAuthLoading
  );
  return (
    <Auth
      isAuthLoading={isAuthLoading}
      isUserLoading={isUserLoading}
      handleAuth={handleAuth}
      setAuthLoading={setAuthLoading}
    />
  );
};

export default ContainerAuth;
