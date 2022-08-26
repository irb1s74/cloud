import React, { FC, memo } from 'react';
import { BorderLinearProgress } from './widget/BorderLinearProgress';
import { sizeFormatter } from '../../../helpers/sizeFormatter';

interface SidebarUsageProps {
  userDiskSpace: number;
  userUsedSpace: number;
}

const SidebarUsage: FC<SidebarUsageProps> = ({
  userDiskSpace,
  userUsedSpace,
}) => {
  const unUsedSpace = userDiskSpace - userUsedSpace;
  const value = (userUsedSpace / userDiskSpace) * 100;
  return (
    <div className='sidebar__usage'>
      <BorderLinearProgress
        sx={{ width: '100%' }}
        variant='determinate'
        value={value}
      />
      <div className='text'>
        Свободно {sizeFormatter(unUsedSpace)} из {sizeFormatter(userDiskSpace)}
      </div>
    </div>
  );
};

export default memo(SidebarUsage);
