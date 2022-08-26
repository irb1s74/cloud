import React, { FC, useCallback, useLayoutEffect } from 'react';
import Header from './containers/Header/Header';
import Sidebar from './containers/Sidebar/Sidebar';
import Router from './router/Router';
import { gapi, loadAuth2 } from 'gapi-script';
import { googleSetting } from './helpers/googleSetting';
import { authSlice } from './store/reducers/authReducer';
import { authLogin } from './store/reducers/authReducer/action';
import { useAppDispatch } from './hooks/redux';

interface AppProps {
  setAuthLoading: (payload: boolean) => void;
  handleAuth: (token: string) => void;
}

const App: FC<AppProps> = ({ handleAuth, setAuthLoading }) => {
  useLayoutEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(gapi, googleSetting.clientId, 'email');
      if (auth2.isSignedIn.get()) {
        handleAuth(auth2.currentUser.get().xc.id_token);
      } else {
        setAuthLoading(false);
      }
    };
    setAuth2();
  }, []);

  return (
    <>
      <Header />
      <main className='flex'>
        <Sidebar />
        <Router />
      </main>
    </>
  );
};

const ContainerApp = () => {
  const dispatch = useAppDispatch();
  const setAuthLoading = useCallback(
    (payload: boolean) => dispatch(authSlice.actions.setAuthLoading(payload)),
    []
  );
  const handleAuth = useCallback(
    (token: string) => dispatch(authLogin(token)),
    []
  );
  return <App setAuthLoading={setAuthLoading} handleAuth={handleAuth} />;
};
export default ContainerApp;
