import React from 'react';
import Button from '@mui/material/Button';

function CancelAndSaveButtons({
  cancelHandler,
  saveHandler,
  styles,
}: {
  cancelHandler: () => void;
  saveHandler: () => void;
  styles?: Record<string, string>;
}) {
  return (
    <div style={{ width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'right', ...styles }}>
      <Button variant="contained" style={{ marginRight: '20px', background: 'yellow', color: 'black' }} onClick={cancelHandler}>
        Cancelar
      </Button>
      <Button variant="contained" onClick={saveHandler}>
        Guardar
      </Button>
    </div>
  );
}

export default CancelAndSaveButtons;
