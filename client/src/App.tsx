import React, { FC, useCallback, useLayoutEffect } from 'react';
import Header from './containers/Header/Header';
import Sidebar from './containers/Sidebar/Sidebar';
import Router from './router/Router';
import { gapi, loadAuth2 } from 'gapi-script';
import { googleSetting } from './helpers/googleSetting';
import { authSlice } from './store/reducers/authReducer';
import { authLogin } from './store/reducers/authReducer/action';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { IModal } from './models/IModal';
import { getModal } from './helpers/getModal';

interface AppProps {
  setAuthLoading: (payload: boolean) => void;
  handleAuth: (token: string) => void;
  modals: IModal[];
}

const App: FC<AppProps> = ({ handleAuth, setAuthLoading, modals }) => {
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
  const getModals = (modals: IModal[]) => {
    return modals.map((modal, key) => getModal(key, modal.type, modal.option));
  };

  return (
    <>
      <Header />
      <main className='flex'>
        <Sidebar />
        <Router />
      </main>
      {getModals(modals)}
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
  const modals = useAppSelector((state) => state.modalReducer.modals);

  return (
    <App
      modals={modals}
      setAuthLoading={setAuthLoading}
      handleAuth={handleAuth}
    />
  );
};
export default ContainerApp;
