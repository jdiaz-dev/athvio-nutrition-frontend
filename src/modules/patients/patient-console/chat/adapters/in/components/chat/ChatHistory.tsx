import { useEffect, useRef } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import CommenterAvatar from './CommenterAvatar';
import ChatMessageAction from './ChatMessageAction';
import SimpleBar from 'src/shared/components/third-party/SimpleBar';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';

// types
import IconButton from 'src/shared/components/IconButton';
import CircularWithPath from 'src/modules/patients/patient-console/chat/adapters/in/components/CircularWithPath';
import { ThemeMode } from 'src/shared/types/config';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { Commenter } from 'src/modules/patients/patient-console/chat/adapters/out/chat.enum';
import { CommentBody } from 'src/modules/patients/patient-console/chat/adapters/out/chat.d';
import { useChat } from 'src/modules/patients/patient-console/chat/adapters/out/ChatActions';

interface ChatHistoryProps {
  theme: Theme;
}

export default function ChatHistory({ theme }: ChatHistoryProps) {
  const professionalState = useSelector((state: ReduxStates) => state.professional);
  const patientState = useSelector((state: ReduxStates) => state.patient);
  const { commentAddedSubscription } = useChat();
  const bottomRef = useRef(null);

  //todo: implment chat loading
  const chatLoading = false;
  const chatState = useSelector((state: ReduxStates) => state.chat);

  useEffect(() => {
    // @ts-ignore
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chatState]);
  useEffect(() => {
    if (professionalState._id && patientState._id) {
      commentAddedSubscription({ professional: professionalState._id, patient: patientState._id });
    }
  }, [professionalState, patientState]);

  if (chatLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: 'calc(100vh - 410px)' }}>
        <CircularWithPath />
      </Stack>
    );
  }

  return (
    <SimpleBar
      sx={{
        'overflowX': 'hidden',
        'height': 'calc(100vh - 310px)',
        'minHeight': 320,
        '& .simplebar-content': {
          height: '100%',
        },
      }}
    >
      <Box sx={{ pl: 1, pr: 3, height: '100%' }}>
        <Grid container spacing={2.5}>
          {chatState.comments.map((comment: CommentBody, index: number) => (
            <Grid item xs={12} key={index}>
              {/* for professional */}
              {comment.commenter === Commenter.PROFESSIONAL ? (
                <Stack spacing={1.25} direction="row" alignItems="flex-start">
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={2} md={3} xl={4} />

                    <Grid item xs={10} md={9} xl={8}>
                      <Stack direction="row" justifyContent="flex-end" alignItems="flex-start">
                        <ChatMessageAction index={index} />
                        <IconButton size="small" color="secondary">
                          <EditOutlined />
                        </IconButton>
                        <Card
                          sx={{
                            display: 'inline-block',
                            float: 'right',
                            bgcolor: theme.palette.primary.main,
                            boxShadow: 'none',
                            ml: 1,
                          }}
                        >
                          <CardContent sx={{ p: 1, pb: '8px !important', width: 'fit-content', ml: 'auto' }}>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Typography variant="h6" color={theme.palette.grey[0]} sx={{ overflowWrap: 'anywhere' }}>
                                  {comment.content}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography align="right" variant="subtitle2" color="text.secondary">
                        {comment.createdAt}
                      </Typography>
                    </Grid>
                  </Grid>
                  <CommenterAvatar commenter={comment.commenter} />
                </Stack>
              ) : (
                <Stack direction="row" spacing={1.25} alignItems="flex-start">
                  <CommenterAvatar commenter={comment.commenter} />

                  <Grid container>
                    <Grid item xs={12} sm={7}>
                      <Card
                        sx={{
                          display: 'inline-block',
                          float: 'left',
                          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.background' : 'grey.0',
                          boxShadow: 'none',
                        }}
                      >
                        <CardContent sx={{ p: 1, pb: '8px !important' }}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Typography variant="h6" color="text.primary" sx={{ overflowWrap: 'anywhere' }}>
                                {comment.content}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {comment.createdAt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              )}
            </Grid>
          ))}
          <Grid item ref={bottomRef} />
        </Grid>
      </Box>
    </SimpleBar>
  );
}
