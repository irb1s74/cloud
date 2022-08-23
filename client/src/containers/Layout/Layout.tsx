import React, { FC } from 'react';
import './Layout.scss';
import { ELayouts } from '../../models/ELayouts';

const Layout = () => {
  return <section className='layout'></section>;
};

const ContainerLayout: FC<{ type: ELayouts }> = () => {
  return <Layout />;
};

export default ContainerLayout;
