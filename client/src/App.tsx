import React from 'react';
import Header from './containers/Header/Header';
import Sidebar from './containers/Sidebar/Sidebar';
import Router from './router/Router';

const App = () => {
  return (
    <>
      <Header />
      <main className='flex'>
        <Sidebar />
        <Router/>
      </main>
    </>
  );
};

const ContainerApp = () => {
  return (
    <App />
  );
};
export default ContainerApp;
