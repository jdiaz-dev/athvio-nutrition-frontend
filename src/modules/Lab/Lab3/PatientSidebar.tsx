import { useContext, useEffect, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';

import { DRAWER_WIDTH } from '../config';
import { SidebarContext } from 'src/modules/Lab/Lab3/SidebarContext';
import { useChat } from 'src/modules/patients/chat/adapters/out/ChatActions';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

interface Props {
  window?: () => Window;
}

const PatientSidebar = ({ window }: Props) => {
  const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
  const {commentAddedSubscription} = useChat()
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={openSidebar} />, [openSidebar]);
  useEffect(() => {
    commentAddedSubscription({})
  },[])

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled
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
        </MiniDrawerStyled>
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