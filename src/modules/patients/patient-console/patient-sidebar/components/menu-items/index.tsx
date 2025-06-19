// project import
import chat from 'src/modules/patients/patient-console/patient-sidebar/components/menu-items/chat';
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';
import clinicalHistory from 'src/modules/patients/patient-console/patient-sidebar/components/menu-items/clinicalHistory';
import nutrition from 'src/modules/patients/patient-console/patient-sidebar/components/menu-items/nutrition';
import patient from 'src/modules/patients/patient-console/patient-sidebar/components/menu-items/patient';

// types

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [chat, nutrition(), clinicalHistory, patient],
};

export default menuItems;
