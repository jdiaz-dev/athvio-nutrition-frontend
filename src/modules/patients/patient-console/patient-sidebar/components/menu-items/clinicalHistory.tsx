// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { LineChartOutlined } from '@ant-design/icons';//todo: remove
import ChatIcon from '@mui/icons-material/Chat';
// type
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';
import EditNoteIcon from '@mui/icons-material/EditNote';
const icons = {
  ChatIcon,
  EditNoteIcon,
};

//todo: rename it file accoding to client options
const clinicalHistory: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id="Clinical History" />,
  icon: icons.ChatIcon,
  type: 'group',
  children: [
    {
      id: 'Goals',
      title: <FormattedMessage id="Clinical notes" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.EditNoteIcon,
      toolTipTitle: 'Clinical notes',
      slide: AvailableSlides.CLINICAL_NOTES,
    },
    /* {
      id: 'Analytics',
      title: <FormattedMessage id="Analytics" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.EditNoteIcon,
      toolTipTitle: '',
      slide: AvailableSlides.ANALITYCS,
    }, */
  ],
};

export default clinicalHistory;
