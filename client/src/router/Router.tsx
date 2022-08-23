import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../containers/Layout/Layout';
import { ELayouts } from '../models/ELayouts';
import Auth from '../containers/Auth/Auth';
import { useAppSelector } from '../hooks/redux';

interface RouterProps {
  isAuth: boolean;
}

const Router: FC<RouterProps> = ({ isAuth }) => {
  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path='recent/*' element={<Layout type={ELayouts.recent} />} />
          <Route path='files/*' element={<Layout type={ELayouts.files} />} />
          <Route path='trash/*' element={<Layout type={ELayouts.trash} />} />
          <Route path='*' element={<Navigate to='recent/' />} />
        </>
      ) : (
        <>
          <Route path='/' element={<Auth />} />
          <Route path='*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  );
};

const ContainerRouter = () => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  return <Router isAuth={isAuth} />;
};

export default ContainerRouter;
