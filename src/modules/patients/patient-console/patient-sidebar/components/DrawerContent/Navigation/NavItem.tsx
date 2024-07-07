import { useContext } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project import
import Dot from '../../../../../../../shared/components/extended/Dot';
import IconButton from 'src/shared/components/IconButton';

//todo: delete it
import { handlerHorizontalActiveItem, useGetMenuMaster } from '../../../../../../Lab/api/menu';

// types
import { MenuOrientation, ThemeMode } from 'src/shared/types/config';
import { LinkTarget, NavActionType, NavItemType } from 'src/shared/types/menu';
import { SidebarContext } from 'src/modules/patients/patient-console/patient-sidebar/context/SidebarContext';
import useConfig from 'src/shared/hooks/useConfig';
import { NavItemProps } from 'src/modules/patients/patient-console/patient-sidebar/types/patient-sidebar';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level, isParents = false, isSelected, onClickHandler }: NavItemProps) => {
  const { openSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  let itemTarget: LinkTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }
  const Icon = item.icon!;
  const itemIcon = item.icon ? (
    <Icon
      style={{
        fontSize: openSidebar ? '1rem' : '1.25rem',
        ...(menuOrientation === MenuOrientation.HORIZONTAL && isParents && { fontSize: 20, stroke: '1.5' }),
      }}
    />
  ) : (
    false
  );

  const textColor = theme.palette.mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === ThemeMode.DARK && openSidebar ? 'text.primary' : 'primary.main';

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <Box sx={{ position: 'relative' }}>
          <ListItemButton
            {...(isSelected && { selected: isSelected })}
            // selected={isSelected}
            sx={{
              zIndex: 1201,
              pl: openSidebar ? `${level * 28}px` : 1.5,
              py: !openSidebar && level === 1 ? 1.25 : 1,
              ...(openSidebar && {
                '&:hover': {
                  bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter',
                },
                '&.Mui-selected': {
                  'bgcolor': theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter',
                  'borderRight': `2px solid ${theme.palette.primary.main}`,
                  'color': iconSelectedColor,
                  '&:hover': {
                    color: iconSelectedColor,
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter',
                  },
                },
              }),
              ...(!openSidebar && {
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&.Mui-selected': {
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                  'bgcolor': 'transparent',
                },
              }),
            }}
            onClick={onClickHandler}
          >
            {itemIcon && (
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color: isSelected ? iconSelectedColor : textColor,
                  ...(!openSidebar && {
                    'borderRadius': 1.5,
                    'width': 36,
                    'height': 36,
                    'alignItems': 'center',
                    'justifyContent': 'center',
                    '&:hover': {
                      bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter',
                    },
                  }),
                  ...(!openSidebar &&
                    isSelected && {
                      'bgcolor': theme.palette.mode === ThemeMode.DARK ? 'primary.900' : 'primary.lighter',
                      '&:hover': {
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.darker' : 'primary.lighter',
                      },
                    }),
                }}
              >
                {itemIcon}
              </ListItemIcon>
            )}
            {(openSidebar || (!openSidebar && level !== 1)) && (
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                    {item.title}
                  </Typography>
                }
              />
            )}
            {(openSidebar || (!openSidebar && level !== 1)) && item.chip && (
              <Chip
                color={item.chip.color}
                variant={item.chip.variant}
                size={item.chip.size}
                label={item.chip.label}
                avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
              />
            )}
          </ListItemButton>
          {(openSidebar || (!openSidebar && level !== 1)) &&
            item?.actions &&
            item?.actions.map((action, index) => {
              const ActionIcon = action.icon!;
              const callAction = action?.function;
              return (
                <IconButton
                  key={index}
                  {...(action.type === NavActionType.FUNCTION && {
                    onClick: (event) => {
                      event.stopPropagation();
                      callAction();
                    },
                  })}
                  {...(action.type === NavActionType.LINK && {
                    component: Link,
                    to: action.url,
                    target: action.target ? '_blank' : '_self',
                  })}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    'position': 'absolute',
                    'top': 12,
                    'right': 20,
                    'zIndex': 1202,
                    'width': 20,
                    'height': 20,
                    'mr': -1,
                    'ml': 1,
                    'color': 'secondary.dark',
                    'borderColor': isSelected ? 'primary.light' : 'secondary.light',
                    '&:hover': { borderColor: isSelected ? 'primary.main' : 'secondary.main' },
                  }}
                >
                  <ActionIcon style={{ fontSize: '0.625rem' }} />
                </IconButton>
              );
            })}
        </Box>
      ) : (
        <ListItemButton
          component={Link}
          to={item.url!}
          target={itemTarget}
          disabled={item.disabled}
          selected={isSelected}
          {...(isParents && {
            onClick: () => {
              handlerHorizontalActiveItem(item.id!);
            },
          })}
          sx={{
            'zIndex': 1201,
            '&:hover': {
              bgcolor: 'transparent',
            },
            ...(isParents && {
              p: 1,
              mr: 1,
            }),
            '&.Mui-selected': {
              'bgcolor': 'transparent',
              '&:hover': {
                bgcolor: 'transparent',
              },
            },
          }}
        >
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 28,
                ...(!openSidebar && {
                  'borderRadius': 1.5,
                  'width': 28,
                  'height': 28,
                  'alignItems': 'center',
                  'justifyContent': 'flex-start',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                }),
                ...(!openSidebar &&
                  isSelected && {
                    'bgcolor': 'transparent',
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                  }),
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}

          {!itemIcon && (
            <ListItemIcon
              sx={{
                color: isSelected ? 'primary.main' : 'secondary.dark',
                ...(!openSidebar && {
                  'borderRadius': 1.5,
                  'alignItems': 'center',
                  'justifyContent': 'flex-start',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                }),
                ...(!openSidebar &&
                  isSelected && {
                    'bgcolor': 'transparent',
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                  }),
              }}
            >
              <Dot size={4} color={isSelected ? 'primary' : 'secondary'} />
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography variant="h6" color={isSelected ? 'primary.main' : 'secondary.dark'}>
                {item.title}
              </Typography>
            }
          />
          {(openSidebar || (!openSidebar && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      )}
    </>
  );
};

export default NavItem;
