// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { LineChartOutlined } from '@ant-design/icons';//todo: remove
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ChatIcon from '@mui/icons-material/Chat';

// type
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';

const icons = {
  ChatIcon,
  AdsClickIcon,
};

//todo: rename it file accoding to client options
const widget: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id="Panels" />,
  icon: icons.ChatIcon,
  type: 'group',
  children: [
    {
      id: 'Goals',
      title: <FormattedMessage id="calories???" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.AdsClickIcon,
      toolTipTitle: '',
      slide: AvailableSlides.CALORIES,
    },
    {
      id: 'Analytics',
      title: <FormattedMessage id="Analytics" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.AdsClickIcon,
      toolTipTitle: '',
      slide: AvailableSlides.ANALITYCS,
    },
  ],
};

export default widget;
