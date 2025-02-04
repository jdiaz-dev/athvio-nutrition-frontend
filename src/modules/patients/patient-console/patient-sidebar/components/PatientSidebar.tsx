import { useContext, useEffect, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import PatientAvatar from './PatientAvatar/PatientAvatar';
import DrawerContent from './DrawerContent';
import PatientDrawerStyled from './PatientDrawerStyled';

//todo: move config?
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import { ThemeEnum } from 'src/shared/Consts';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

interface Props {
  window?: () => Window;
}

const PatientSidebar = ({ window }: Props) => {
  const theme = useTheme();
  const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const patientAvatar = useMemo(() => <PatientAvatar open={openSidebar} />, [openSidebar]);
  const drawerContent = useMemo(() => <DrawerContent />, []);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <PatientDrawerStyled
          sx={{
            '& .MuiDrawer-paper': {
              position: 'absolute',
            },
          }}
          variant="permanent"
          open={openSidebar}
        >
          {patientAvatar}
          {drawerContent}
        </PatientDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="permanent"
          open={openSidebar}
          onClose={() => {
            setOpenSidebar(!openSidebar);
          }}
          ModalProps={{ keepMounted: true }}
          sx={{
            'display': { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: ThemeEnum.DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit',
              position: 'relative',
            },
          }}
        >
          {patientAvatar}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default PatientSidebar;
