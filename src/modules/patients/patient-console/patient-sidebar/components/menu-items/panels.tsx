// third-party
import { FormattedMessage } from 'react-intl';
import i18n from 'src/internationalization/i18n';

// assets
// import { LineChartOutlined } from '@ant-design/icons';//todo: remove
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ChatIcon from '@mui/icons-material/Chat';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import CalculateIcon from '@mui/icons-material/Calculate';
// type
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';

const icons = {
  ChatIcon,
  AdsClickIcon,
  LocalDiningIcon,
  CalculateIcon,
};

//todo: rename it file accoding to client options
const widget = (): NavItemType => ({
  id: 'group-panels',
  title: <FormattedMessage id="Nutrition" />,
  icon: icons.ChatIcon,
  type: 'group',
  children: [
    {
      id: 'Plans',
      title: <FormattedMessage id="Plans" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.LocalDiningIcon,
      toolTipTitle: i18n.t('toolTips.plans'),
      slide: AvailableSlides.PLANS,
    },
    {
      id: 'Calories',
      title: <FormattedMessage id="Calories" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.CalculateIcon,
      toolTipTitle: i18n.t('toolTips.calories'),
      slide: AvailableSlides.CALORIES,
    },
    /* {
      id: 'Analytics',
      title: <FormattedMessage id="Analytics" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.AdsClickIcon,
      slide: AvailableSlides.ANALITYCS,
    }, */
  ],
});

export default widget;
