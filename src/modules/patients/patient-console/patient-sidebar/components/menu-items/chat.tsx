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

const chat: NavItemType = {
  id: 'chat',
  title: <FormattedMessage id="chat" />,
  icon: icons.ChatIcon,
  type: 'item',
};

export default chat;
