import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from 'tss-react/mui';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'src/shared/components/IconButton';
import { useTranslation } from 'react-i18next';

const styles = makeStyles()((theme) => {
  return {
    trash: {
      'marginLeft': '80%',
      'marginBottom': '2px',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  };
});

function CustomTrashIcon({ handler }: { handler: () => void }) {
  const { t } = useTranslation();
  const { classes } = styles();

  return (
    <Tooltip title={t('toolTips.delete')} placement="right" onClick={handler}>
      <IconButton>
        <DeleteIcon className={classes.trash} />
      </IconButton>
    </Tooltip>
  );
}

export default CustomTrashIcon;
