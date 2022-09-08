import React, { FC, memo } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { HiViewGrid, HiViewList } from 'react-icons/hi';

interface DiskSettingProps {
  alignment: string;
  handleChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => void;
}

const DiskSetting: FC<DiskSettingProps> = ({ alignment, handleChange }) => {
  return (
    <ToggleButtonGroup
      value={alignment}
      onChange={handleChange}
      exclusive
      sx={{ mr: '25px', mb: '25px' }}
      aria-label='Medium sizes'
    >
      <ToggleButton value='grid'>
        <HiViewGrid />
      </ToggleButton>
      <ToggleButton value='list'>
        <HiViewList />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default memo(DiskSetting);
