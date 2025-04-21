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
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Logo from 'src/core/components/logo/Logo';
import { useTranslation } from 'react-i18next';

type page = {
  pageKey: string | any; // for internationalization
  url: string;
};

const navBarPages: page[] = [
  { pageKey: 'navbar.patients', url: '/professional/patients' },
  { pageKey: 'navbar.meals', url: '/professional/meals' },
  { pageKey: 'navbar.programs', url: '/professional/programs' },
];

const professionalPages: page[] = [{ pageKey: 'navbar.preferences', url: '/professional/professional/preferences' }];
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
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { signOut } = React.useContext(AuthContext);
  const { t } = useTranslation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '90%' }}>
            <ToolbarItems style={{ width: '14%', textAlign: 'center' }} />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {professionalPages.map((page, index) => (
                <MenuItem disableGutters key={index} onClick={handleCloseUserMenu}>
                  <ListItem disablePadding disableGutters>
                    <ListItemButton selected={false} component={Link} alignItems="center" to={page.url}>
                      <ListItemText primary={t(page.pageKey)} />
                    </ListItemButton>
                  </ListItem>
                </MenuItem>
              ))}

              <MenuItem onClick={signOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NabBar;
