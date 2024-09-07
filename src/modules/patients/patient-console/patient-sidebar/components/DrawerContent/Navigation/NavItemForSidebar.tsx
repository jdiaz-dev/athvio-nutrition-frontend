import React, { useContext, useEffect, useState } from 'react';
import NavItem from 'src/modules/patients/patient-console/patient-sidebar/components/DrawerContent/Navigation/NavItem';
import { SelelecteṔanelContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SelectedPanelContext';
import { NavItemProps } from 'src/modules/patients/patient-console/patient-sidebar/types/patient-sidebar';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

function itemForSidebar(WrappedNavItemComponent: any) {
  return function (props: NavItemProps) {
    const { selectedPanel, setSelectedPanel } = useContext(SelelecteṔanelContext);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      setIsSelected(selectedPanel == props.item.slide ? true : false);
    }, [selectedPanel]);

    const onClickHandler = () => {
      setSelectedPanel(props.item.slide as AvailableSlides);
    };

    const params: NavItemProps = { isSelected, onClickHandler, ...props };
    return <WrappedNavItemComponent {...params} />;
  };
}

const NavItemForSidebar = itemForSidebar(NavItem);
export default NavItemForSidebar;
