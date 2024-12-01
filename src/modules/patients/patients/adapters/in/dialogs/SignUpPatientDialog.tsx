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
import { SIGN_UP_PATIENT } from 'src/modules/patients/patients/adapters/out/PatientQueries';
import { makeStyles } from 'tss-react/mui';
import {
  BodyPatient,
  PatientData,
  SignUpPatientRequest,
  SignUpPatientResponse,
  UserInfoForPatient,
} from 'src/modules/patients/patients/adapters/out/patient.types';
import CountryCodeSelect from 'src/shared/components/CountryCodeSelect';
import { Dayjs } from 'dayjs';
import { ApolloError, useMutation } from '@apollo/client';
import MessageDialog from 'src/shared/dialogs/MessageDialog';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useMessageDialog } from 'src/shared/hooks/useMessageDialog';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      padding: '0px',
    },
    form: {
      width: '90%',
      margin: '0 auto',
    },
    accordion: {
      marginTop: '10px',
    },
    textField: {
      width: '100%',
      margin: '0px auto',
      marginTop: '15px',
    },
    button: {
      width: '100%',
      height: '45px',
      marginTop: '15px',
      marginBottom: '15px',
      /* '&:hover': {
        backgroundColor: 'blue',
      }, */
    },
  };
});

function SignUpPatientDialog({
  openCreatePatientDialog,
  setOpenCreatePatientDialog,
}: {
  openCreatePatientDialog: boolean;
  setOpenCreatePatientDialog: (openDialog: boolean) => void;
}) {
  const { classes } = cardStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const authContext = useContext(AuthContext);
  const reloadRecordList = useContext(ReloadRecordListContext);

  const [createPatientHandler] = useMutation<SignUpPatientResponse, SignUpPatientRequest>(SIGN_UP_PATIENT);
  const { openDialog, setOpenDialog, message, setMessage } = useMessageDialog();

  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [countryName, setCountryName] = useState<string | undefined>();
  const [birthday, setBirthday] = React.useState<Dayjs | null | string>(null);
  const [gender, setGender] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfoForPatient>({ email: '', firstname: '', lastname: '' });

  const handleChangeAditionalInfo = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };

  const handleChangeGender = (event: React.MouseEvent<HTMLElement>, gender: string) => {
    setGender(gender);
  };

  const onSubmit = async ({ firstname, lastname, email, ...rest }: PatientData): Promise<void> => {
    // eslint-disable-next-line prefer-const
    let input: BodyPatient = {
      professional: authContext.professional,
      userInfo: {
        firstname,
        lastname,
        email,
      },
      additionalInfo: {
        ...rest,
      },
    };

    if (countryCode) input.additionalInfo.countryCode = countryCode;
    if (countryName) input.additionalInfo.country = countryName;
    if (birthday !== null && birthday !== '') input.additionalInfo.birthday = birthday;
    if (gender !== '') input.additionalInfo.gender = gender;

    try {
      const patient = await createPatientHandler({
        variables: {
          input,
        },
      });
      const _patient = patient.data?.signUpPatient.userInfo as UserInfoForPatient;
      setUserInfo({
        email: _patient.email,
        firstname: _patient.firstname,
        lastname: _patient.lastname,
      });

      const patientReset = {
        firstname: '',
        lastname: '',
        email: '',
        location: '',
        timezone: '',
        height: null,
        weight: null,
        profilePicture: '',
        phone: '',
      };
      setOpenDialog(true);
      setOpenCreatePatientDialog(false);
      reset(patientReset);
      reloadRecordList.setReloadRecordList(true);
      setMessage(`You added ${firstname} ${lastname} to your patients sucessfully`);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
    }
  };

  return (
    <>
      <Dialog
        open={openCreatePatientDialog}
        onClose={() => setOpenCreatePatientDialog(false)}
        scroll="paper"
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent dividers={true}>
          <Card className={classes.card} variant="outlined">
            <form className={classes.form} onSubmit={handleSubmit(onSubmit as unknown as SubmitHandler<FieldValues>)}>
              <TextField
                className={classes.textField}
                id="outlined-basic"
                variant="outlined"
                label="First name"
                type="text"
                {...register('firstname', {
                  required: MessagesUserForm.FIRSTNAME_MANDATORY,
                })}
                error={Boolean(errors.firstname)}
                helperText={errors.firstname?.message as ReactNode}
              />
              <TextField
                className={classes.textField}
                id="outlined-basic"
                variant="outlined"
                label="Enter First Name"
                type="text"
                {...register('lastname', { required: MessagesUserForm.LASTNAME_MANDATORY })}
                error={Boolean(errors.lastname)}
                helperText={errors.lastname?.message as ReactNode}
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

              <div className={classes.accordion}>
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
                        className={classes.textField}
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
                      <DatePicker className={classes.textField} value={birthday} onChange={(newValue) => setBirthday(newValue)} />
                    </LocalizationProvider>

                    <CountryCodeSelect countryCode={countryCode} setCountryCode={setCountryCode} setCountryName={setCountryName} />
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

              <Button className={classes.button} variant="contained" type="submit">
                Add patient
              </Button>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
      <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} />
    </>
  );
}

export default SignUpPatientDialog;
