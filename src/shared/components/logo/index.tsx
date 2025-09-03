import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { SxProps } from '@mui/system';

// project import
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
// import { APP_DEFAULT_PATH } from 'config';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { useContext } from 'react';

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: string;
}

const LogoSection = ({ reverse, isIcon, sx, to }: Props) => {
  // const { isLoggedIn } = useAuth();
  const { isAuthenticated } = useContext(AuthContext);
  const APP_DEFAULT_PATH = '/dashboard/patients';
  return (
    <ButtonBase disableRipple {...(isAuthenticated && { component: Link, to: !to ? APP_DEFAULT_PATH : to, sx })}>
      {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
    </ButtonBase>
  );
};

export default LogoSection;
