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
const nutrition = (): NavItemType => ({
  id: 'group-panels',
  title: <FormattedMessage id="Nutricion" />,
  icon: icons.ChatIcon,
  type: 'group',
  children: [
    {
      id: 'Planification',
      title: <FormattedMessage id="Planificación" />,
      type: 'item',
      url: 'planification',
      icon: icons.CalculateIcon,
      toolTipTitle: i18n.t('toolTips.planification'),
      slide: AvailableSlides.PLANIFICATION,
    },
    {
      id: 'Plans',
      title: <FormattedMessage id="Planes nutricionales" />,
      type: 'item',
      url: 'plans',
      icon: icons.LocalDiningIcon,
      toolTipTitle: i18n.t('toolTips.plans'),
      slide: AvailableSlides.PLANS,
    },
  ],
});

export default nutrition;
