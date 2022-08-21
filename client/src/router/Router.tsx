import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../containers/Layout/Layout';
import { ELayouts } from '../models/ELayouts';

const Router = () => {
  return (
    <Routes>
      <Route path='recent/*' element={<Layout type={ELayouts.recent} />} />
      <Route path='files/*' element={<Layout type={ELayouts.files} />} />
      <Route path='trash/*' element={<Layout type={ELayouts.trash} />} />
      <Route path='*' element={<Navigate to='recent/' />} />
    </Routes>
  );
};

const ContainerRouter = () => {
  return <Router />;
};
export default ContainerRouter;
