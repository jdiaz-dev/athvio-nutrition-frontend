import React, { useContext } from 'react';

import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
import DoubleLeftOutlined from '@ant-design/icons/DoubleLeftOutlined';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import IconButton from 'src/shared/components/IconButton';
import { Tooltip } from '@mui/material';

function ExpansorPatientSidebar() {
  const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

  return (
    <Tooltip title={openSidebar ? 'contraer' : 'expandir'} placement="right">
      <IconButton
        aria-label={openSidebar ? 'collapse drawer' : 'expand drawer'}
        onClick={() => setOpenSidebar(!openSidebar)}
        color="secondary"
        shape="rounded"
        size="small"
        sx={{
          'width': 24,
          'height': 24,
          'fontSize': '0.625rem',
          'color': 'text.primary',
          'bgcolor': 'background.paper',
          'border': '1px solid',
          'borderColor': 'divider',
          'boxShadow': (theme) => theme.customShadows.z1,
          '&:hover': { bgcolor: 'grey.100' },
        }}
      >
        {openSidebar ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
      </IconButton>
    </Tooltip>
  );
}

export default ExpansorPatientSidebar;
