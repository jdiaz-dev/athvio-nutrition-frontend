import React from 'react';
import { makeStyles } from 'tss-react/mui';
import ZoomOutMapTwoToneIcon from '@mui/icons-material/ZoomOutMapTwoTone';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'src/shared/components/IconButton';
import { useTranslation } from 'react-i18next';

const styles = makeStyles()(() => {
  return {
    icon: {
      width: '100%',
      marginRight: '3px',
      rotate: '45deg',
      cursor: 'grab',
    },
  };
});

function CustomDraggable() {
  const { t } = useTranslation();
  const { classes } = styles();

  return (
    <Tooltip title={t('toolTips.drag')} placement="top">
      <IconButton>
        <ZoomOutMapTwoToneIcon className={classes.icon} />
      </IconButton>
    </Tooltip>
  );
}

export default CustomDraggable;
