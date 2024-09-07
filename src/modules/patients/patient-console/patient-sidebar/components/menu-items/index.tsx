// project import
import chat from 'src/modules/patients/patient-console/patient-sidebar/components/menu-items/chat';
import panels from './panels';

// types
import { NavItemType } from 'src/shared/types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [chat, panels],
};

export default menuItems;
