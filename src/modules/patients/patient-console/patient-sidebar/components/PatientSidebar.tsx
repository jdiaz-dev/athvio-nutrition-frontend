import { useContext, useMemo } from 'react';

// material-ui
import { Box } from '@mui/material';

// project import
import PatientAvatar from './PatientAvatar/PatientAvatar';
import DrawerContent from './DrawerContent';
import PatientDrawerStyled from './PatientDrawerStyled';

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
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
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
    </Box>
  );
};

export default PatientSidebar;
