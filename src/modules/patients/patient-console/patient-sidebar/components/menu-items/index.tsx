// project import
import chat from 'src/modules/patients/patient-console/patient-sidebar/components/menu-items/chat';
import panels from './panels';
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';
import clinicalHistory from 'src/modules/patients/patient-console/patient-sidebar/components/menu-items/clinicalHistory';

// types

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [chat, panels(), clinicalHistory],
};

export default menuItems;
