import React, { useContext } from 'react';
import NavItem from 'src/modules/patients/patient-console/patient-sidebar/components/DrawerContent/Navigation/NavItem';
import { ChatContext } from 'src/modules/patients/patient-console/patient-sidebar/context/ChatContext';
import { NavItemProps } from 'src/modules/patients/patient-console/patient-sidebar/types/patient-sidebar';

function itemForChat(WrappedNavItemComponent: any) {
  return function (props: NavItemProps) {
    const { setOpenChat } = useContext(ChatContext);

    const onClickHandler = () => {
      setOpenChat(true);
    };

    const params: NavItemProps = { onClickHandler, ...props };
    return <WrappedNavItemComponent {...params} />;
  };
}

const NavItemForChat = itemForChat(NavItem);
export default NavItemForChat;
