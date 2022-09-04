import React, { FC, memo } from 'react';
import { BorderLinearProgress } from './widget/BorderLinearProgress';
import { sizeFormatter } from '../../../helpers/sizeFormatter';
import { IUser } from '../../../models/IUser';

interface SidebarUsageProps {
  user: IUser;
}

const SidebarUsage: FC<SidebarUsageProps> = ({ user }) => {
  const unUsedSpace = user.diskSpace - user.usedSpace;
  const value = (user.usedSpace / user.diskSpace) * 100;
  return (
    <div className='sidebar__usage'>
      <BorderLinearProgress
        sx={{ width: '100%' }}
        variant='determinate'
        value={value}
      />
      <div className='text'>
        Свободно {sizeFormatter(unUsedSpace)} из {sizeFormatter(user.diskSpace)}
      </div>
    </div>
  );
};

export default memo(SidebarUsage);
