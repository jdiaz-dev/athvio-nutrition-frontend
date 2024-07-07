import React, { useContext, useEffect, useState } from 'react';
import NavItem from 'src/modules/patients/patient-console/patient-sidebar/components/DrawerContent/Navigation/NavItem';
import { SelelecteSlideContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SelectedSlideContext';
import { NavItemProps } from 'src/modules/patients/patient-console/patient-sidebar/types/patient-sidebar';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

function itemForSidebar(WrappedNavItemComponent: any) {
  return function (props: NavItemProps) {
    const { selectedSlide, setSelectedSlide } = useContext(SelelecteSlideContext);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      setIsSelected(selectedSlide == props.item.slide ? true : false);
    }, [selectedSlide]);

    const onClickHandler = () => {
      setSelectedSlide(props.item.slide as AvailableSlides);
    };

    const params: NavItemProps = { isSelected, onClickHandler, ...props };
    return <WrappedNavItemComponent {...params} />;
  };
}

const NavItemForSidebar = itemForSidebar(NavItem);
export default NavItemForSidebar;
