// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import ImageStyled from 'src/shared/components/CalendarStyled/ImageStyled';
import { MenuOrientation } from 'src/shared/types/config';
import useConfig from 'src/shared/hooks/useConfig';
import LetterAvatar from 'src/modules/patients/patient-console/patient-sidebar/components/PatientAvatar/LetterAvatar';

const PatientAvatar = ({ open }: { open: boolean }) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  return (
    <ImageStyled
      theme={theme}
      forDrawer={open}
      sx={{
        minHeight: isHorizontal ? 'unset' : '60px',
        width: isHorizontal ? { xs: '100%', lg: '424px' } : 'inherit',
        paddingTop: isHorizontal ? { xs: '10px', lg: '0' } : '8px',
        paddingBottom: isHorizontal ? { xs: '18px', lg: '0' } : '8px',
        paddingLeft: isHorizontal ? { xs: '24px', lg: '0' } : open ? '24px' : 0,
      }}
    >
      <LetterAvatar open={open} />
    </ImageStyled>
  );
};

export default PatientAvatar;
