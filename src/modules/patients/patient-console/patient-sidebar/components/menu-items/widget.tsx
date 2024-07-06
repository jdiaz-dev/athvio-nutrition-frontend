// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { LineChartOutlined } from '@ant-design/icons';//todo: remove
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ChatIcon from '@mui/icons-material/Chat';

// type
import { NavItemType } from 'src/shared/types/menu';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

const icons = {
  ChatIcon,
  AdsClickIcon,
};

//todo: rename it file accoding to client options
const widget: NavItemType = {
  id: 'group-widget',
  title: <FormattedMessage id="widgets" />,
  icon: icons.ChatIcon,
  type: 'group',
  children: [
    /* {
      id: 'Chat',
      title: <FormattedMessage id="Chat" />,
      type: 'item',
      url: '/widget/statistics',
      icon: icons.ChatIcon,
      slide: AvailableSlides.ANALITYCS,
    }, */
    {
      id: 'Goals',
      title: <FormattedMessage id="Goals" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.AdsClickIcon,
      slide: AvailableSlides.GOALS,
    },
    {
      id: 'Analytics',
      title: <FormattedMessage id="Analytics" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.AdsClickIcon,
      slide: AvailableSlides.ANALITYCS,
    },
  ],
};

export default widget;
