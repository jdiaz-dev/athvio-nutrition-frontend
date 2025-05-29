import { Box } from '@mui/system';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function CheckAndCloseIcons({
  checkHandler,
  closeHandler,
  styles,
}: {
  checkHandler: () => void;
  closeHandler: () => void;
  styles?: React.CSSProperties;
}) {
  return (
    <Box style={{ display: 'flex' }}>
      <CheckIcon style={{ cursor: 'pointer' }} onClick={checkHandler} />
      <CloseIcon style={{ cursor: 'pointer', marginLeft: '25%', ...styles }} onClick={closeHandler} />
    </Box>
  );
}

export default CheckAndCloseIcons;
