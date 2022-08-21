import React from 'react';
import { BorderLinearProgress } from './widget/BorderLinearProgress';


const SidebarUsage = () => {
  return (
    <div className='sidebar__usage'>
      <BorderLinearProgress sx={{ width: '100%' }} variant='determinate' value={10} />
      <div className='text'>Свободно 9гб из 10гб</div>
    </div>
  );
};

export default SidebarUsage;
