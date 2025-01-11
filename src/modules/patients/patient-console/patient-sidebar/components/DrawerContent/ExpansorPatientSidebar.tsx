import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';

import { ThemeMode } from 'src/shared/types/config';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import IconButton from 'src/shared/components/IconButton';
import useConfig from 'src/shared/hooks/useConfig';

function ExpansorPatientSidebar() {
  const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

  //todo: check how it is with theme
  const theme = useTheme();
  const { mode } = useConfig();

  const iconBackColor = mode === ThemeMode.DARK ? 'background.default' : 'grey.100';
  return (
    <IconButton
      aria-label="open drawer"
      onClick={() => setOpenSidebar(!openSidebar)}
      edge="start"
      color="secondary"
      variant="light"
      sx={{ color: 'text.primary', bgcolor: openSidebar ? 'transparent' : iconBackColor, ml: { xs: 0, lg: -2 } }}
      style={{ marginLeft: '9px' }}
    >
      {!openSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </IconButton>
  );
}

export default ExpansorPatientSidebar;
