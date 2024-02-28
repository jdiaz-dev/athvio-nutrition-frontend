// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project import
// import NavUser from './NavUser';
// import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from '../../components/third-party/SimpleBar';
import { useGetMenuMaster } from '../../api/menu';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = true// menuMaster.isDashboardDrawerOpened; //here client navbar
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <SimpleBar
        sx={{
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        {/* here */}
        <Navigation />
        {/* {drawerOpen && !matchDownMD && <NavCard />} */} {/* //x */}
      </SimpleBar>
      {/* <NavUser /> */} {/* //x */}
    </>
  );
};

export default DrawerContent;
