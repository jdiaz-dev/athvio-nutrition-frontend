// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project import
// import NavUser from './NavUser';
// import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'src/shared/components/third-party/SimpleBar';
import { useContext } from 'react';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import ExpansorPatientSidebar from 'src/modules/patients/patient-console/patient-sidebar/components/DrawerContent/ExpansorPatientSidebar';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const { openSidebar } = useContext(SidebarContext);

  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <SimpleBar
        sx={{
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Navigation />
        {/* {openSidebar && !matchDownMD && <NavCard />} */} {/* //x */}
      </SimpleBar>
      <ExpansorPatientSidebar />
    </>
  );
};

export default DrawerContent;
