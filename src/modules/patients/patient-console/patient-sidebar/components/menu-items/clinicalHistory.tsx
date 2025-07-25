// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { LineChartOutlined } from '@ant-design/icons';//todo: remove
import ChatIcon from '@mui/icons-material/Chat';
// type
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';
import EditNoteIcon from '@mui/icons-material/EditNote';
import QuizIcon from '@mui/icons-material/Quiz';

const icons = {
  QuizIcon,
  EditNoteIcon,
};

//todo: rename it file accoding to client options
const clinicalHistory: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id="Historia clínica" />,
  icon: icons.QuizIcon,
  type: 'group',
  children: [
    {
      id: 'Goals',
      title: <FormattedMessage id="Notas clínicas" />,
      type: 'item',
      url: 'notes',
      icon: icons.EditNoteIcon,
      toolTipTitle: 'Notas clínicas',
      slide: AvailableSlides.CLINICAL_NOTES,
    },
    {
      id: 'Analytics',
      title: <FormattedMessage id="Questionario" />,
      type: 'item',
      url: 'questionary',
      icon: icons.QuizIcon,
      toolTipTitle: 'Questionario',
      slide: AvailableSlides.PATIENT_QUESTIONARY,
    },
  ],
};

export default clinicalHistory;
