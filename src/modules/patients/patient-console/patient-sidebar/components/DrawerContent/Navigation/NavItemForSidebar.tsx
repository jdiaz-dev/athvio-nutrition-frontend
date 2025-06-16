import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavItem from 'src/modules/patients/patient-console/patient-sidebar/components/DrawerContent/Navigation/NavItem';
import { SelelectePanelContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SelectedPanelContext';
import { NavItemProps } from 'src/modules/patients/patient-console/patient-sidebar/types/patient-sidebar';
import { AvailableSlides } from 'src/modules/patients/patient-console/patient-sidebar/utils/sidebar.enum';

function itemForSidebar(WrappedNavItemComponent: any) {
  return function (props: NavItemProps) {
    const { patientId } = useParams();
    const { selectedPanel, setSelectedPanel } = useContext(SelelectePanelContext);
    const [isSelected, setIsSelected] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
      setIsSelected(selectedPanel == props.item.slide ? true : false);
    }, [selectedPanel]);

    const onClickHandler = () => {
      setSelectedPanel(props.item.slide as AvailableSlides);
      navigate(`/professional/patients/${patientId}/${props.item.url}`);
    };

    const params: NavItemProps = { isSelected, onClickHandler, ...props };
    return <WrappedNavItemComponent {...params} />;
  };
}

const NavItemForSidebar = itemForSidebar(NavItem);
export default NavItemForSidebar;
