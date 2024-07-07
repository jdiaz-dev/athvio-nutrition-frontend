// project import
import chat from 'src/modules/patients/patient-console/patient-sidebar/components/menu-items/chat';
import widget from './widget';

// types
import { NavItemType } from 'src/shared/types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [chat, widget],
};

export default menuItems;
