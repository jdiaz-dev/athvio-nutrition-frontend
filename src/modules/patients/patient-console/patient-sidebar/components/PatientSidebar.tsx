import { useContext, useEffect, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import PatientDrawerStyled from './PatientDrawerStyled';


//todo: move config?
import { DRAWER_WIDTH } from '../../../../Lab/config';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import { useChat } from 'src/modules/patients/patient-console/chat/adapters/out/ChatActions';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

interface Props {
  window?: () => Window;
}

const PatientSidebar = ({ window }: Props) => {
  const theme = useTheme();
  const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
  const { commentAddedSubscription } = useChat();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={openSidebar} />, [openSidebar]);
  useEffect(() => {
    commentAddedSubscription({});
  }, []);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <PatientDrawerStyled
          sx={{
            '& .MuiDrawer-paper': {
              position: 'relative',
            },
          }}
          variant="permanent"
          open={openSidebar}
        >
          {drawerHeader}
          {/* //here */}
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
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit',
              position: 'relative',
            },
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default PatientSidebar;
