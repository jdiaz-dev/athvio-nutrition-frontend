import { useTheme } from '@mui/material/styles';

import ImageStyled from 'src/shared/components/CalendarStyled/ImageStyled';
import LogoSection from 'src/core/components/logo/LogoSection';

const NavbarLogo = () => {
  const theme = useTheme();

  return (
    <ImageStyled theme={theme} forDrawer={false}>
      <LogoSection isIcon={true} sx={{ width: 35, height: 35 }} />
    </ImageStyled>
  );
};

export default NavbarLogo;
