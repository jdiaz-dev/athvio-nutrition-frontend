// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { LineChartOutlined } from '@ant-design/icons';//todo: remove
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ChatIcon from '@mui/icons-material/Chat';

// type
import { NavItemType } from 'src/shared/types/menu';

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
    {
      id: 'Chat',
      title: <FormattedMessage id="Chat" />,
      type: 'item',
      url: '/widget/statistics',
      icon: icons.ChatIcon,
    },
    {
      id: 'Goals',
      title: <FormattedMessage id="Goals" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.AdsClickIcon,
    },
    
  ],
};

export default widget;
