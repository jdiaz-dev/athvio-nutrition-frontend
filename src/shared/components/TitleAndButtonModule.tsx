import { Stack, Button } from '@mui/material';
import React from 'react';

function TitleAndButtonModule({
  titleModule,
  buttonName,
  buttonHandler,
}: {
  titleModule: string;
  buttonName: string;
  buttonHandler: () => void;
}) {
  return (
    <Stack spacing={2} direction="row" sx={{ width: '100%' }} style={{ marginTop: '15px' }}>
      <div style={{ width: '80%', textAlign: 'left', height: '42px', lineHeight: '42px', fontWeight: 'bold' }}>{titleModule}</div>
      <Button style={{ width: '20%' }} variant="contained" onClick={buttonHandler}>
        {buttonName}
      </Button>
    </Stack>
  );
}

export default TitleAndButtonModule;
