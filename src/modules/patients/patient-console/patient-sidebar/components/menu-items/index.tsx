// project import
import chat from 'src/modules/patients/patient-console/patient-sidebar/components/menu-items/chat';
import panels from './panels';
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';

// types

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [chat, panels()],
};

export default menuItems;
