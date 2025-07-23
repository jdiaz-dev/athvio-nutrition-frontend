import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

function NutritionalMealOptions({
  setShowAnticancerProperties,
}: {
  setShowAnticancerProperties: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div style={{ display: 'flex', width: '10%', height: '45px', paddingTop: '1%' }}>
      <Tooltip title={'Ingredientes'} placement="top" onClick={() => setShowAnticancerProperties(false)} style={{ marginTop: '-5px' }}>
        <IconButton>
          <FormatListBulletedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={'Propiedades anticancer'} placement="top" onClick={() => setShowAnticancerProperties(true)}>
        <IconButton>
          <AssessmentIcon style={{ marginBottom: '10px', cursor: 'pointer' }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default NutritionalMealOptions;
