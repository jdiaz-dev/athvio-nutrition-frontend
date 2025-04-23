// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { LineChartOutlined } from '@ant-design/icons';//todo: remove
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ChatIcon from '@mui/icons-material/Chat';
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';
import i18n from 'src/internationalization/i18n';

// type

const icons = {
  ChatIcon,
  AdsClickIcon,
};

const chat: NavItemType = {
  id: 'chat',
  title: <FormattedMessage id="chat" />,
  icon: icons.ChatIcon,
  toolTipTitle: i18n.t('toolTips.chat'),
  type: 'item',
};

export default chat;
