import React from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

function CancelAndSaveButtons({
  cancelHandler,
  saveHandler,
  styles,
  customSaveNameButton,
}: {
  cancelHandler: () => void;
  saveHandler: () => void;
  styles?: Record<string, string>;
  customSaveNameButton?: string;
}) {
  const { t } = useTranslation();

  return (
    <div style={{ width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'right', ...styles }}>
      <Button variant="contained" style={{ marginRight: '20px', background: 'yellow', color: 'black' }} onClick={cancelHandler}>
        {t('global.buttons.cancel')}
      </Button>
      <Button variant="contained" onClick={saveHandler}>
        {customSaveNameButton ? customSaveNameButton : t('global.buttons.save')}
      </Button>
    </div>
  );
}

export default CancelAndSaveButtons;
