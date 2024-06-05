// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project import
// import NavUser from './NavUser';
// import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from '../../../../../Lab/components/third-party/SimpleBar';
import { useGetMenuMaster } from '../../../../../Lab/api/menu';
import { useContext } from 'react';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import ExpansorPatientSidebar from 'src/modules/patients/patient-console/patient-sidebar/components/DrawerContent/ExpansorPatientSidebar';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const { openSidebar } = useContext(SidebarContext);

  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
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
        {/* here */}
        <Navigation />
        {/* {openSidebar && !matchDownMD && <NavCard />} */} {/* //x */}
      </SimpleBar>
      <ExpansorPatientSidebar />
    </>
  );
};

export default DrawerContent;
