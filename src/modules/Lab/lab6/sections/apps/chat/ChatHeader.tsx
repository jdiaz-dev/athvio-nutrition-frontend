import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-import
import UserAvatar from './CommenterAvatar';

// assets
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';
import AudioMutedOutlined from '@ant-design/icons/AudioMutedOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import VideoCameraOutlined from '@ant-design/icons/VideoCameraOutlined';

// types
import IconButton from 'src/shared/components/IconButton';
import { AcceptNewPatient } from 'src/modules/patients/patient-console/patient/adapters/out/patient';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

interface Props {
  loading: boolean;
  openChatDrawer: boolean;
  emailDetails: boolean;
  handleDrawerOpen: () => void;
  handleUserChange: () => void;
}

// ==============================|| CHAT HEADER ||============================== //

export default function ChatHeader({ loading, openChatDrawer, emailDetails, handleDrawerOpen, handleUserChange }: Props) {
  const patientState = useSelector((state: ReduxStates) => state.patient);
  
  const [anchorEl, setAnchorEl] = useState<Element | (() => Element) | null | undefined>(null);

  const handleClickSort = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container justifyContent="space-between" spacing={1.5}>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={handleDrawerOpen} color="secondary" size="large">
            {openChatDrawer ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </IconButton>

          {/* todo: what is doing with length? */}
          {loading && Object.keys(patientState.user).length === 0 ? (
            <List disablePadding>
              <ListItem disablePadding disableGutters>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ my: 0 }}
                  primary={<Skeleton animation="wave" height={24} width={50} />}
                  secondary={<Skeleton animation="wave" height={16} width={80} />}
                />
              </ListItem>
            </List>
          ) : (
            <>
              <UserAvatar patient={patientState} />
              <Stack>
                <Typography variant="subtitle1">{patientState.user.firstname}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {/* todo: implement last message? */}
                  {/* Active {patient.user.lastMessage} ago */}
                  Active ... ago
                </Typography>
              </Stack>
            </>
          )}
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
          <IconButton size="large" color="secondary">
            <PhoneOutlined />
          </IconButton>
          <IconButton size="large" color="secondary">
            <VideoCameraOutlined />
          </IconButton>
          <IconButton onClick={handleUserChange} size="large" color={emailDetails ? 'error' : 'secondary'}>
            {emailDetails ? <CloseOutlined /> : <InfoCircleOutlined />}
          </IconButton>
          <IconButton onClick={handleClickSort} size="large" color="secondary">
            <MoreOutlined />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseSort}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              'p': 0,
              '& .MuiMenu-list': {
                p: 0,
              },
            }}
          >
            <MenuItem onClick={handleCloseSort}>
              <ListItemIcon>
                <DownloadOutlined />
              </ListItemIcon>
              <Typography>Archive</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseSort}>
              <ListItemIcon>
                <AudioMutedOutlined />
              </ListItemIcon>
              <Typography>Muted</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseSort}>
              <ListItemIcon>
                <DeleteOutlined />
              </ListItemIcon>
              <Typography>Delete</Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </Grid>
    </Grid>
  );
}
