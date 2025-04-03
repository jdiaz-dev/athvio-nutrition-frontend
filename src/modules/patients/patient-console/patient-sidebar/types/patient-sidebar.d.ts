import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';

export type NavItemProps = {
  item: NavItemType;
  level: number;
  isParents?: boolean;
  isSelected?: boolean;
  onClickHandler?: () => void;
};
