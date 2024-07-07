import { NavItemType } from 'src/shared/types/menu';

export type NavItemProps = {
  item: NavItemType;
  level: number;
  isParents?: boolean;
  isSelected?: boolean;
  onClickHandler?: () => void;
};
