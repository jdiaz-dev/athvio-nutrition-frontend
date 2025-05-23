import { ReactNode } from 'react';

// material-ui
import { ChipProps } from '@mui/material';

import { GenericCardProps } from './root';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

export enum NavActionType {
  FUNCTION = 'function',
  LINK = 'link',
}

// ==============================|| MENU TYPES ||============================== //

export type NavActionProps = {
  type: NavActionType;
  label: string;
  function?: any;
  url?: string;
  target?: boolean;
  icon: GenericCardProps['iconPrimary'] | string;
};

export type NavItemType = {
  breadcrumbs?: boolean;
  caption?: ReactNode | string;
  children?: NavItemType[];
  elements?: NavItemType[];
  chip?: ChipProps;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  disabled?: boolean;
  external?: boolean;
  isDropdown?: boolean;
  icon?: GenericCardProps['iconPrimary'] | string;
  toolTipTitle?: string;
  id?: string;
  search?: string;
  target?: boolean;
  title?: ReactNode | string;
  type?: string;
  url?: string | undefined;
  actions?: NavActionProps[];
  slide?: AvailableSlides;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type MenuProps = {
  openedItem: string;
  openedComponent: string;
  openedHorizontalItem: string | null;

  /**
   * Indicate if dashboard layout menu open or not
   */
  isDashboardDrawerOpened: boolean;

  /**
   * Indicate if component layout menu open or not
   */
  isComponentDrawerOpened: boolean;
};
