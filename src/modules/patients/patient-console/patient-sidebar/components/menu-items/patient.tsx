import { FormattedMessage } from 'react-intl';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const icons = {
  AccountCircleIcon,
};

const patient: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id="Patient" />,
  icon: icons.AccountCircleIcon,
  type: 'group',
  children: [
    {
      id: 'Goals',
      title: <FormattedMessage id="Profile" />,
      type: 'item',
      url: 'profile',
      icon: icons.AccountCircleIcon,
      toolTipTitle: 'Profile',
      slide: AvailableSlides.PATIENT_PROFILE,
    },
  ],
};

export default patient;
