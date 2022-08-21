import { LinearProgress, linearProgressClasses, styled } from '@mui/material';

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#4CD3FF'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    backgroundColor: '#FFF'
  }
}));
