import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import IconButton from 'src/modules/Lab/Lab3/components/extended/IconButton';
import useConfig from 'src/modules/Lab/hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'src/modules/Lab/api/menu';
import { MenuOrientation, ThemeMode } from 'src/shared/types/config';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import { SidebarContext } from 'src/modules/Lab/Lab3/SidebarContext';

function ExpansorPatientSidebar() {
  const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

  const theme = useTheme();
  // const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { mode /* menuOrientation */ } = useConfig();

  const { menuMaster } = useGetMenuMaster();

  // const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // header content
  // const headerContent = useMemo(() => <HeaderContent />, []);
  const iconBackColor = mode === ThemeMode.DARK ? 'background.default' : 'grey.100';
  return (
    <IconButton
      aria-label="open drawer"
      onClick={() => {
        console.log('---------called');
        setOpenSidebar(!openSidebar);
      }}
      edge="start"
      color="secondary"
      variant="light"
      sx={{ color: 'text.primary', bgcolor: openSidebar ? 'transparent' : iconBackColor, ml: { xs: 0, lg: -2 } }}
    >
      {/* here: button to open menu */}
      {!openSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </IconButton>
  );
}

export default ExpansorPatientSidebar;
