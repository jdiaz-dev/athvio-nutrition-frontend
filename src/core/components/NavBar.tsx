import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Logo from 'src/core/components/logo/Logo';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import i18n from 'src/internationalization/i18n';

type page = {
  pageKey: string | any; // for internationalization
  url: string;
};

const navBarPages: page[] = [
  { pageKey: 'global.navbar.patients', url: '/professional/patients' },
  { pageKey: 'global.navbar.meals', url: '/professional/meals' },
  { pageKey: 'global.navbar.programs', url: '/professional/programs' },
];

const professionalPages: page[] = [{ pageKey: 'global.navbar.preferences', url: '/professional/professional/preferences' }];
function ToolbarItems({ style }: { style?: React.CSSProperties }) {
  const { t } = useTranslation();

  return (
    <>
      {navBarPages.map((page, index) => (
        <ListItem style={style} key={index} disablePadding disableGutters>
          <ListItemButton selected={false} component={Link} alignItems="center" to={page.url}>
            <ListItemText style={{ textAlign: 'center' }} primary={t(page.pageKey)} />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}

function NabBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElAvatar, setAnchorElAvatar] = React.useState<null | HTMLElement>(null);
  const [anchorElSettingsIcon, setAnchorElSettingsIcon] = React.useState<null | HTMLElement>(null);
  const { signOut } = React.useContext(AuthContext);
  const { t } = useTranslation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenSettingsIconMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSettingsIcon(event.currentTarget);
  };
  const handleOpenAvatarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAvatar(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseSettingsIconMenu = () => {
    setAnchorElSettingsIcon(null);
  };
  const handleCloseAvatarMenu = () => {
    setAnchorElAvatar(null);
  };
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // this saves it in localStorage too
  };

  return (
    <AppBar position="sticky" style={{ height: '9vh' }}>
      <Container maxWidth="xl" style={{ position: 'absolute', height: 'inherit' }}>
        <Toolbar disableGutters style={{ height: 'inherit' }}>
          {/* todo: refactor to remove open parameter */}
          <Logo />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <ToolbarItems />
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '85%' }}>
            <ToolbarItems style={{ width: '14%', textAlign: 'center' }} />
          </Box>
          {/* <Box sx={{ width: '9%' }}>
            <IconButton onClick={handleOpenSettingsIconMenu} sx={{ p: 0, cursor: 'pointer' }}>
              <SettingsIcon />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElSettingsIcon}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElSettingsIcon)}
              onClose={handleCloseSettingsIconMenu}
            >
              <MenuItem disableGutters onClick={handleCloseSettingsIconMenu}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton selected={false} alignItems="center">
                    <ListItemText primary={t('global.navbar.spanishLanguage')} onClick={() => changeLanguage('es')} />
                  </ListItemButton>
                </ListItem>
              </MenuItem>
              <MenuItem disableGutters onClick={handleCloseSettingsIconMenu}>
                <ListItem disablePadding disableGutters>
                  <ListItemButton selected={false} alignItems="center">
                    <ListItemText primary={t('global.navbar.englishLanguage')} onClick={() => changeLanguage('en')} />
                  </ListItemButton>
                </ListItem>
              </MenuItem>
            </Menu>
          </Box> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenAvatarMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElAvatar}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElAvatar)}
              onClose={handleCloseAvatarMenu}
            >
              {professionalPages.map((page, index) => (
                <MenuItem disableGutters key={index} onClick={handleCloseAvatarMenu}>
                  <ListItem disablePadding disableGutters>
                    <ListItemButton selected={false} component={Link} alignItems="center" to={page.url}>
                      <ListItemText primary={t(page.pageKey)} />
                    </ListItemButton>
                  </ListItem>
                </MenuItem>
              ))}

              <MenuItem onClick={signOut}>
                <Typography textAlign="center">{t('global.navbar.logout')}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NabBar;
