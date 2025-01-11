import { Link } from 'react-router-dom';

import { ButtonBase } from '@mui/material';
import { SxProps } from '@mui/system';
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: string; //To;
}

const LogoSection = ({ reverse, isIcon, sx, to }: Props) => {
  return (
    <ButtonBase disableRipple {...(true && { component: Link, to: !to ? '/signin' : to, sx })}>
      {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
    </ButtonBase>
  );
};

export default LogoSection;
