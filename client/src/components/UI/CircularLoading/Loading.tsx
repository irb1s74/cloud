import React from 'react';
import './Loading.scss';
import { Box, CircularProgress, circularProgressClasses } from '@mui/material';

const CircularLoading = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: '#00C2FFFF',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
      />
    </Box>
  );
};

export default CircularLoading;
