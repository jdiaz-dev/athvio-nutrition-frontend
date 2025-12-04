import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import UserOutlined from '@ant-design/icons/UserOutlined';

function getPathIndex(pathname: string) {
  let selectedTab = 0;
  switch (pathname) {
    case '/apps/profiles/user/payment':
      selectedTab = 1;
      break;
    case '/apps/profiles/user/password':
      selectedTab = 2;
      break;
    case '/apps/profiles/user/settings':
      selectedTab = 3;
      break;
    case '/apps/profiles/user/personal':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

export default function ProfileTab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index: number, route: string) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ 'p': 0, '& .MuiListItemIcon-root': { minWidth: 32, color: 'grey.500' } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/apps/profiles/user/personal')}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Información del paciente" />
      </ListItemButton>
    </List>
  );
}
