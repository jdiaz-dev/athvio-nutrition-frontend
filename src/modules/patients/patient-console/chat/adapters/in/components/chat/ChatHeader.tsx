import { useContext } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import UserAvatar from './CommenterAvatar';

import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';

// types
import IconButton from 'src/shared/components/IconButton';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { ChatContext } from 'src/modules/patients/patient-console/patient-sidebar/context/ChatContext';

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
  const chatContext = useContext(ChatContext);
  const handleChat = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    chatContext.setOpenChat(false);
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
              {/* //todo: fix it */}
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
          <IconButton onClick={handleChat} size="large" color="secondary">
            <CloseIcon />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
}
