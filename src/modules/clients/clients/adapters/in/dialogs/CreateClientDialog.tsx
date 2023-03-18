import React, { ReactNode, useState } from 'react';
import { Button, Card, Dialog, DialogContent, TextField } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { MessagesUserForm, UserType } from 'src/shared/Consts';
import { useMutation } from 'react-apollo';
import { CREATE_CLIENT } from 'src/modules/clients/clients/adapters/out/ClientQueries';
import { makeStyles } from 'tss-react/mui';
import {
  BodyClient,
  ClientData,
  CreateClientRequest,
  CreateClientResponse,
} from 'src/modules/clients/clients/adapters/out/client.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';
import CountryCodeSelect from 'src/shared/components/CountryCodeSelect';
import { Dayjs } from 'dayjs';
import { ApolloError } from '@apollo/client';

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

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    'border': `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  'backgroundColor': theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  'flexDirection': 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function CreateClientDialog({
  openCreateClientDialog,
  setopenCreateClientDialog,
}: {
  openCreateClientDialog: boolean;
  setopenCreateClientDialog: (openDialog: boolean) => void;
}) {
  const { classes } = cardStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createClientHandler] = useMutation<CreateClientResponse, CreateClientRequest>(CREATE_CLIENT);
  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);
  const [countryCode, setCountryCode] = useState('');
  const [birthday, setBirthday] = React.useState<Dayjs | null | string>(null);
  const [gender, setGender] = useState<string>('');

  const handleChangeAditionalInfo = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };

  const handleChangeGender = (event: React.MouseEvent<HTMLElement>, gender: string) => {
    setGender(gender);
  };

  const onSubmit = async ({ firstName, lastName, email, ...rest }: ClientData): Promise<void> => {
    const user = getUserFromLocalStorage();
    // eslint-disable-next-line prefer-const
    let input: BodyClient = {
      professionalId: user.userType === UserType.PROFESSIONAL ? user._id : '',
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
      await createClientHandler({
        variables: {
          input,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: ApolloError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log('-------------error graphQLErrors', err?.graphQLErrors);
    }
  };

  return (
    <Dialog
      open={openCreateClientDialog}
      onClose={() => setopenCreateClientDialog(false)}
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
              {...register('firstName', { required: MessagesUserForm.FIRSTNAME_MANDATORY })}
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
  );
}
