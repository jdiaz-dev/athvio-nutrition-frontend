import { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
} from '@mui/material';

// third-party
import { FormattedMessage } from 'react-intl';

// project import
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import SimpleBar from 'src/shared/components/third-party/SimpleBar';
import Transitions from 'src/shared/components/extended/Transitions';

//todo: delete it
import { handlerHorizontalActiveItem, useGetMenuMaster } from '../../../api/menu';

// assets
import { DownOutlined, GroupOutlined, RightOutlined } from '@ant-design/icons';

// types
import { NavItemType } from 'src/modules/patients/patient-console/patient-sidebar/types/menu';
import { MenuOrientation, ThemeMode } from 'src/shared/types/config';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import useConfig from 'src/shared/hooks/useConfig';
import NavItemForSidebar from 'src/modules/patients/patient-console/patient-sidebar/components/DrawerContent/Navigation/NavItemForSidebar';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

interface Props {
  item: NavItemType;
  lastItem: number;
  remItems: NavItemType[];
  lastItemId: string;
  setSelectedItems: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedItems: string | undefined;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
  selectedLevel: number;
}

type VirtualElement = {
  getBoundingClientRect: () => ClientRect | DOMRect;
  contextElement?: Element;
};

const PopperStyled = styled(Popper)(({ theme }) => ({
  'overflow': 'visible',
  'zIndex': 1202,
  'minWidth': 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 5,
    left: 32,
    width: 12,
    height: 12,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderWidth: '6px',
    borderStyle: 'solid',
    borderColor: `${theme.palette.background.paper}  transparent transparent ${theme.palette.background.paper}`,
  },
}));

const NavGroup = ({ item, lastItem, remItems, lastItemId, setSelectedItems, selectedItems, setSelectedLevel, selectedLevel }: Props) => {
  const { openSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const { pathname } = useLocation();

  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const selectedID = true; // menuMaster.openedHorizontalItem;

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);
  const [currentItem, setCurrentItem] = useState(item);

  const openMini = Boolean(anchorEl);

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem: any = { ...item };
        const elements = remItems.map((ele: NavItemType) => ele.elements);
        localItem.children = elements.flat(1);
        setCurrentItem(localItem);
      } else {
        setCurrentItem(item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, lastItem, downLG]);

  const checkOpenForParent = (child: NavItemType[], id: string) => {
    child.forEach((ele: NavItemType) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id!);
      }
      if (ele.url === pathname) {
        handlerHorizontalActiveItem(id);
      }
    });
  };
  const checkSelectedOnload = (data: NavItemType) => {
    const childrens = data.children ? data.children : [];
    childrens.forEach((itemCheck: NavItemType) => {
      if (itemCheck?.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id!);
      }
      if (itemCheck?.url === pathname) {
        handlerHorizontalActiveItem(currentItem.id!);
      }
    });
  };

  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
    if (!openMini) {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = currentItem?.icon!;
  const itemIcon = currentItem?.icon ? (
    <Icon
      style={{
        fontSize: 20,
        stroke: '1.5',
        color: selectedID === currentItem.id ? theme.palette.primary.main : theme.palette.secondary.dark,
      }}
    />
  ) : null;

  //here: sidebar item
  const navItems = item.children?.map((menuItem, index) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={index}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id!}
          />
        );
      case 'item':
        return <NavItemForSidebar key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });
  const navCollapse = [...navItems];

  const moreItems = remItems.map((itemRem: NavItemType, i) => (
    <Fragment key={i}>
      {itemRem.url ? (
        <NavItem item={itemRem} level={1} />
      ) : (
        itemRem.title && (
          <Typography variant="caption" sx={{ pl: 2 }}>
            {itemRem.title} {itemRem.url}
          </Typography>
        )
      )}

      {itemRem?.elements?.map((menu, index) => {
        switch (menu.type) {
          case 'collapse':
            return (
              <NavCollapse
                key={index}
                menu={menu}
                level={1}
                parentId={currentItem.id!}
                setSelectedItems={setSelectedItems}
                setSelectedLevel={setSelectedLevel}
                selectedLevel={selectedLevel}
                selectedItems={selectedItems}
              />
            );
          case 'item':
            return <NavItem key={menu.id} item={menu} level={1} />;
          default:
            return (
              <Typography key={menu.id} variant="h6" color="error" align="center">
                Menu Items Error
              </Typography>
            );
        }
      })}
    </Fragment>
  ));

  // menu list collapse & items
  const items = currentItem.children?.map((menu, index) => {
    switch (menu?.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={index}
            menu={menu}
            level={1}
            parentId={currentItem.id!}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
          />
        );
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu?.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const popperId = openMini ? `group-pop-${item.id}` : undefined;

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <List
          subheader={
            <>
              {item.title ? (
                openSidebar && (
                  <Box sx={{ pl: 3, mb: 1.5 }}>
                    <Typography variant="subtitle2" color={theme.palette.mode === ThemeMode.DARK ? 'textSecondary' : 'text.secondary'}>
                      {item.title}
                    </Typography>
                    {item.caption && (
                      <Typography variant="caption" color="secondary">
                        {item.caption}
                      </Typography>
                    )}
                  </Box>
                )
              ) : (
                <Divider sx={{ my: 0.5 }} />
              )}
            </>
          }
          sx={{ mt: openSidebar && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
          {navCollapse}
        </List>
      ) : (
        <List>
          <ListItemButton
            selected={selectedID === currentItem.id}
            sx={{
              'p': 1,
              'my': 0.5,
              'mr': 1,
              'display': 'flex',
              'alignItems': 'center',
              'backgroundColor': 'inherit',
              '&.Mui-selected': {
                bgcolor: 'transparent',
              },
            }}
            onMouseEnter={handleClick}
            onClick={handleClick}
            onMouseLeave={handleClose}
            aria-describedby={popperId}
          >
            {itemIcon && (
              <ListItemIcon sx={{ minWidth: 28 }}>
                {currentItem.id === lastItemId ? <GroupOutlined style={{ fontSize: 20, stroke: '1.5' }} /> : itemIcon}
              </ListItemIcon>
            )}
            <ListItemText
              sx={{ mr: 1 }}
              primary={
                <Typography
                  variant="body1"
                  color={selectedID === currentItem.id ? theme.palette.primary.main : theme.palette.secondary.dark}
                >
                  {currentItem.id === lastItemId ? <FormattedMessage id="more-items" /> : currentItem.title}
                </Typography>
              }
            />
            {openMini ? (
              <DownOutlined style={{ fontSize: 16, stroke: '1.5' }} />
            ) : (
              <RightOutlined style={{ fontSize: 16, stroke: '1.5' }} />
            )}
            {anchorEl && (
              <PopperStyled
                id={popperId}
                open={openMini}
                anchorEl={anchorEl}
                placement="bottom-start"
                style={{
                  zIndex: 2001,
                }}
              >
                {({ TransitionProps }) => (
                  <Transitions in={openMini} {...TransitionProps}>
                    <Paper
                      sx={{
                        mt: 0.5,
                        py: 1.25,
                        boxShadow: theme.shadows[8],
                        backgroundImage: 'none',
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <>
                          <SimpleBar
                            sx={{
                              minWidth: 200,
                              overflowX: 'hidden',
                              overflowY: 'auto',
                              maxHeight: 'calc(100vh - 170px)',
                            }}
                          >
                            {currentItem.id !== lastItemId ? items : moreItems}
                          </SimpleBar>
                        </>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
        </List>
      )}
    </>
  );
};

export default NavGroup;

/* 
  array for original state (only for display data)
  array for modified state (manage push and pull operations)

*/
