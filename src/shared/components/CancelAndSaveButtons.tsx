import React from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { buttonStytes } from 'src/shared/styles/styles';

function CancelAndSaveButtons({
  cancelHandler,
  saveHandler,
  styles,
  customSaveNameButton,
}: {
  cancelHandler: () => void;
  saveHandler: () => void;
  styles?: React.CSSProperties;
  customSaveNameButton?: string;
}) {
  const { t } = useTranslation();
  const { classes } = buttonStytes();
  return (
    <div style={{ width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'right', ...styles }}>
      <Button variant="contained" style={{ marginRight: '20px' }} className={classes.yellowButton} onClick={cancelHandler}>
        {t('global.buttons.cancel')}
      </Button>
      <Button variant="contained" onClick={saveHandler}>
        {customSaveNameButton ? customSaveNameButton : t('global.buttons.save')}
      </Button>
    </div>
  );
}

export default CancelAndSaveButtons;
