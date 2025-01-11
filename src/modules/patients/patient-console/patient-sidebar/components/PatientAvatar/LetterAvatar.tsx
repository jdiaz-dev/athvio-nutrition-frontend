import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';

function stringAvatar(name: string, color: string) {
  return {
    sx: {
      bgcolor: color,
    },
    children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`,
  };
}

export default function LetterAvatar({ open }: { open: boolean }) {
  const theme = useTheme();
  const patientState = useSelector((state: ReduxStates) => state.patient);
  const fullname = `${patientState.user.firstname} ${patientState.user.lastname}`;

  return (
    <>
      {patientState._id.length > 0 && (
        <Avatar {...stringAvatar(fullname, theme.palette.primary.main)} sx={{ width: 32, height: 32, backgroundColor: '#1E8E98' }} />
      )}
      {open && (
        <Typography variant="h5" align="left" style={{ marginLeft: '6px' }}>
          {fullname}
        </Typography>
      )}
    </>
  );
}
