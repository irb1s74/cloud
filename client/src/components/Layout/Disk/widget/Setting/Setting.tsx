import React, { FC, memo } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { HiViewGrid, HiViewList } from 'react-icons/hi';

const DiskSetting: FC = () => {
  const [alignment, setAlignment] = React.useState('grid');
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  return (
    <ToggleButtonGroup
      value={alignment}
      onChange={handleChange}
      exclusive
      sx={{ mt: '25px', mr: '25px' }}
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
