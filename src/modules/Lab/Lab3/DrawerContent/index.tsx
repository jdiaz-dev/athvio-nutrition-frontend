// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project import
// import NavUser from './NavUser';
// import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from '../../components/third-party/SimpleBar';
import { useGetMenuMaster } from '../../api/menu';
import { useContext } from 'react';
import { SidebarContext } from 'src/modules/Lab/Lab3/SidebarContext';
import ExpansorPatientSidebar from 'src/modules/Lab/Lab3/ExpansorPatientSidebar';

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
