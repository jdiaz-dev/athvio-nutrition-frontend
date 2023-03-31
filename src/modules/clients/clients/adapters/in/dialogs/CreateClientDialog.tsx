import React, { ReactNode, useContext, useState } from 'react';
import { Button, Card, Dialog, DialogContent, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Typography from '@mui/material/Typography';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { MessagesUserForm } from 'src/shared/Consts';
import { CREATE_CLIENT } from 'src/modules/clients/clients/adapters/out/ClientQueries';
import { makeStyles } from 'tss-react/mui';
import {
  BodyClient,
  ClientData,
  CreateClientRequest,
  CreateClientResponse,
  UserInfoForClient,
} from 'src/modules/clients/clients/adapters/out/client.types';
import CountryCodeSelect from 'src/shared/components/CountryCodeSelect';
import { Dayjs } from 'dayjs';
import { ApolloError, useMutation } from '@apollo/client';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { ProfessionalIdContext } from 'src/App';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      padding: '0px',
    },
    form: {
      width: '100%',
    },
    textField: {
      width: '90%',
      marginTop: '15px',
    },
    button: {
      'backgroundColor': 'blue',
      'width': '90%',
      'color': 'white',
      'height': '45px',
      'marginTop': '15px',
      'marginBottom': '15px',
      '&:hover': {
        backgroundColor: 'blue',
      },
    },
  };
});

export function CreateClientDialog({
  openCreateClientDialog,
  setOpenCreateClientDialog,
}: {
  openCreateClientDialog: boolean;
  setOpenCreateClientDialog: (openDialog: boolean) => void;
}) {
  const { classes } = cardStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadRecordList = useContext(ReloadRecordListContext);

  const [createClientHandler] = useMutation<CreateClientResponse, CreateClientRequest>(CREATE_CLIENT);
  const { openDialog, setOpenDialog, message, setMessage } = useMessageDialog();

  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const [countryCode, setCountryCode] = useState('');
  const [birthday, setBirthday] = React.useState<Dayjs | null | string>(null);
  const [gender, setGender] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfoForClient>({ email: '', firstName: '', lastName: '' });

  const handleChangeAditionalInfo = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };

  const handleChangeGender = (event: React.MouseEvent<HTMLElement>, gender: string) => {
    setGender(gender);
  };

  const onSubmit = async ({ firstName, lastName, email, ...rest }: ClientData): Promise<void> => {
    // eslint-disable-next-line prefer-const
    let input: BodyClient = {
      professional: professionalIdContext.professional,
      userInfo: {
        firstName,
        lastName,
        email,
      },
      additionalInfo: {
        ...rest,
      },
    };

    if (countryCode) input.additionalInfo.countryCode = countryCode;
    if (birthday !== null && birthday !== '') input.additionalInfo.birthday = birthday;
    if (gender !== '') input.additionalInfo.gender = gender;

    try {
      const client = await createClientHandler({
        variables: {
          input,
        },
      });
      const _client = client.data?.createClient.userInfo as UserInfoForClient;
      setUserInfo({
        email: _client.email,
        firstName: _client.firstName,
        lastName: _client.lastName,
      });

      const clientReset = {
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        timezone: '',
        height: null,
        weight: null,
        profilePicture: '',
        phone: '',
      };
      setOpenDialog(true);
      setOpenCreateClientDialog(false);
      reset(clientReset);
      reloadRecordList.setReloadRecordList(true);
      setMessage(`You added ${firstName} ${lastName} to your clients sucessfully`);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
    }
  };

  return (
    <>
      <Dialog
        open={openCreateClientDialog}
        onClose={() => setOpenCreateClientDialog(false)}
        scroll="paper"
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent dividers={true}>
          <Card className={classes.card} variant="outlined">
            <form className={classes.form} onSubmit={handleSubmit(onSubmit as any as SubmitHandler<FieldValues>)}>
              <TextField
                className={classes.textField}
                id="outlined-basic"
                variant="outlined"
                label="First name"
                type="text"
                {...register('firstName', {
                  required: MessagesUserForm.FIRSTNAME_MANDATORY,
                })}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message as ReactNode}
              />
              <TextField
                className={classes.textField}
                id="outlined-basic"
                variant="outlined"
                label="Enter First Name"
                type="text"
                {...register('lastName', { required: MessagesUserForm.LASTNAME_MANDATORY })}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message as ReactNode}
              />
              <TextField
                className={classes.textField}
                id="outlined-basic"
                variant="outlined"
                label="Email address"
                error={Boolean(errors.email)}
                fullWidth
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                })}
                helperText={(() => {
                  let message: string;
                  if (errors.email?.type === 'pattern') {
                    message = MessagesUserForm.EMAIL_VALID;
                  } else if (errors.email?.type === 'required') {
                    message = MessagesUserForm.EMAIL_MANDATORY;
                  } else {
                    message = '';
                  }
                  return message as ReactNode;
                })()}
              />

              <div>
                <Accordion expanded={panelExpanded === 'panel1'} onChange={handleChangeAditionalInfo('panel1')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Add aditional details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      className={classes.textField}
                      id="outlined-basic"
                      variant="outlined"
                      label="Location"
                      type="text"
                      {...register('location', { required: false })}
                      error={Boolean(errors.location)}
                      helperText={errors.location?.message as ReactNode}
                    />
                    <TextField
                      className={classes.textField}
                      id="outlined-basic"
                      variant="outlined"
                      label="Height"
                      type="number"
                      {...register('height', {
                        required: false,
                        valueAsNumber: true,
                      })}
                      error={Boolean(errors.height)}
                      helperText={errors.height?.message as ReactNode}
                    />
                    <TextField
                      className={classes.textField}
                      id="outlined-basic"
                      variant="outlined"
                      label="Weight"
                      type="number"
                      {...register('weight', {
                        required: false,
                        valueAsNumber: true,
                      })}
                      error={Boolean(errors.weight)}
                      helperText={errors.weight?.message as ReactNode}
                    />
                    <div>
                      <ToggleButtonGroup
                        color="primary"
                        value={gender}
                        exclusive
                        onChange={handleChangeGender}
                        aria-label="Platform"
                      >
                        <ToggleButton value="male">Male</ToggleButton>
                        <ToggleButton value="female">Female</ToggleButton>
                        <ToggleButton value="prefer not to say">Prefer not to say</ToggleButton>
                      </ToggleButtonGroup>
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker value={birthday} onChange={(newValue) => setBirthday(newValue)} />
                    </LocalizationProvider>

                    <CountryCodeSelect countryCode={countryCode} setCountryCode={setCountryCode} />
                    <TextField
                      className={classes.textField}
                      id="filled-basic"
                      label="Phone"
                      variant="outlined"
                      type="text"
                      {...register('phone', { required: false })}
                      error={Boolean(errors.phone)}
                      helperText={errors.phone?.message as ReactNode}
                    />
                  </AccordionDetails>
                </Accordion>
              </div>

              <Button className={classes.button} size="small" type="submit">
                Add client
              </Button>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
      <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} />
    </>
  );
}
