import { useContext, useEffect, useState } from 'react';

// material-ui
import { useTheme, styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

//todo: remove it
import MainCard from 'src/shared/components/MainCard/MainCard';

//todo: remove it
// import { PopupTransition } from 'components/@extended/Transitions';
import { PopupTransition } from 'src/shared/components/extended/Transitions';

import ChatHeader from 'src/modules/patients/patient-console/chat/adapters/in/components/chat/ChatHeader';
import ChatHistory from 'src/modules/patients/patient-console/chat/adapters/in/components/chat/ChatHistory';
import ChatMessageSend from 'src/modules/patients/patient-console/chat/adapters/in/components/chat/ChatMessageSend';

//todo: remove it
import { ThemeMode } from 'src/shared/types/config';
import { useChat } from 'src/modules/patients/patient-console/chat/adapters/out/ChatActions';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0,
    },
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter,
      }),
      marginLeft: 0,
    }),
  }),
);

export default function Chat() {
  const authContext = useContext(AuthContext);
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const [emailDetails, setEmailDetails] = useState(false);
  const { patientId } = useParams();
  const { getChat } = useChat();
  const handleUserChange = () => {
    setEmailDetails((prev) => !prev);
  };

  const [openChatDrawer, setOpenChatDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenChatDrawer((prevState) => !prevState);
  };

  // close sidebar when widow size below 'md' breakpoint
  useEffect(() => {
    setOpenChatDrawer(!downLG);
  }, [downLG]);

  useEffect(() => {
    if (patientId && authContext.professional) getChat({ patient: patientId, professional: authContext.professional });
  }, [patientId, authContext.professional]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '50%',
        height: '50px',
        zIndex: 2,
        position: 'absolute',
        top: '1%',
        left: '45%',
        border: '1px solid white',
      }}
    >
      <Main theme={theme} open={openChatDrawer}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={emailDetails ? 8 : 12}
            xl={emailDetails ? 9 : 12}
            sx={{
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter + 200,
              }),
            }}
          >
            <MainCard
              content={false}
              sx={{
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
                pt: 2,
                pl: 2,
                borderRadius: emailDetails ? '0' : '0 4px 4px 0',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.shorter + 200,
                }),
              }}
            >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sx={{ bgcolor: 'background.paper', pr: 2, pb: 2, borderBottom: '1px solid', borderBottomColor: 'divider' }}
                >
                  <ChatHeader
                    {...{
                      //todo: implement loading?
                      loading: false,
                      openChatDrawer,
                      emailDetails,
                      handleDrawerOpen,
                      handleUserChange,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ChatHistory theme={theme} />
                </Grid>
                <Grid item xs={12} sx={{ mt: 3, bgcolor: 'background.paper', borderTop: '1px solid', borderTopColor: 'divider' }}>
                  <ChatMessageSend />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={4} xl={3} sx={{ overflow: 'hidden', display: emailDetails ? 'flex' : 'none' }}>
            <Collapse orientation="horizontal" in={emailDetails && !downMD}>
              {/* todo: enable it */}
              {/* <UserDetails user={user} onClose={handleUserChange} /> */}
            </Collapse>
          </Grid>

          <Dialog TransitionComponent={PopupTransition} onClose={handleUserChange} open={downMD && emailDetails} scroll="body">
            {/* todo: enable it */}
            {/* <UserDetails user={user} onClose={handleUserChange} /> */}
          </Dialog>
        </Grid>
      </Main>
    </Box>
  );
}
