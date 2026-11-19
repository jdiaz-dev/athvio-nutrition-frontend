import { useContext, useMemo } from 'react';

// material-ui
import { Box } from '@mui/material';

// project import
import PatientAvatar from './PatientAvatar/PatientAvatar';
import DrawerContent from './DrawerContent';
import PatientDrawerStyled from './PatientDrawerStyled';
import ExpansorPatientSidebar from './ExpansorPatientSidebar';

//todo: move config?
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

interface Props {
  window?: () => Window;
}

const PatientSidebar = ({ window }: Props) => {
  const { openSidebar } = useContext(SidebarContext);

  const patientAvatar = useMemo(() => <PatientAvatar open={openSidebar} />, [openSidebar]);
  const drawerContent = useMemo(() => <DrawerContent />, []);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200, position: 'relative' }} aria-label="mailbox folders">
      <PatientDrawerStyled
        sx={{
          '& .MuiDrawer-paper': {
            position: 'absolute',
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
          },
        }}
        variant="permanent"
        open={openSidebar}
      >
        {patientAvatar}
        <Box
          sx={{
            'flex': 1,
            'minHeight': 0,
            'overflowY': 'auto',
            'overflowX': 'hidden',
            'scrollbarWidth': 'none',
            'msOverflowStyle': 'none',
            '&::-webkit-scrollbar': {
              //to hidde scroller
              display: 'none',
            },
          }}
        >
          {drawerContent}
        </Box>
      </PatientDrawerStyled>
      <Box
        sx={{
          position: 'absolute',
          top: 30, // vertical center of the 60px avatar row
          right: 0,
          transform: 'translate(50%, -50%)',
          zIndex: 1201,
          display: 'flex',
        }}
      >
        <ExpansorPatientSidebar />
      </Box>
    </Box>
  );
};

export default PatientSidebar;
