import React, { ReactNode, useContext, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import Card from '@mui/material/Card';
import Button from '@mui/material//Button';
import TextField from '@mui/material/TextField';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountryCodeSelect from 'src/shared/components/CountryCodeSelect';
import { MessagesUserForm } from 'src/shared/Consts';
import { useDispatch } from 'react-redux';
import { resetUser } from 'src/modules/authentication/authentication/adapters/in/UserSlice';
import { SetUserInfo, SignUpProfessionalModel } from '../out/authentication.types';
import { useAuthentication } from '../out/authenticationActions';
import { Navigate } from 'react-router-dom';
import { saveDataUser } from 'src/shared/helpers/LocalStorage';
import { AuthContext } from './context/AuthContext';

function SignUpProfessional() {
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();

  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [countryName, setCountryName] = useState<string | undefined>('');

  const { signUpProfessional } = useAuthentication();

  const signUpRequest = async ({ company, ...rest }: SetUserInfo) => {
    let _user: SignUpProfessionalModel = { ...rest };
    if (company) _user.professionalInfo = { company };
    if (countryName) _user.country = countryName;
    if (countryCode) _user.countryCode = countryCode;
    const { data } = await signUpProfessional(_user);

    if (data) {
      dispatch(resetUser());
      saveDataUser(data.signUpProfessional);
      /* authContext.setProfessional(data.signUpProfessional._id);
      authContext.setIsAuthenticated(true); */
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { classes } = styles();

  if (authContext.isAuthenticated) {
    return <Navigate replace to="/coach/patients" />;
  }

  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <form className={classes.form} onSubmit={handleSubmit(signUpRequest as any as SubmitHandler<FieldValues>)}>
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
          <TextField
            className={classes.textField}
            id="outlined-basic"
            variant="outlined"
            label="Password"
            type="password"
            {...register('password', { required: MessagesUserForm.PASSWORD_MANDATORY })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message as ReactNode}
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            variant="outlined"
            label="Enter First Name"
            type="text"
            {...register('firstname', { required: MessagesUserForm.FIRSTNAME_MANDATORY })}
            error={Boolean(errors.firstname)}
            helperText={errors.firstname?.message as ReactNode}
          />
          <TextField
            className={classes.textField}
            id="filled-basic"
            label="Enter Last Name"
            variant="outlined"
            type="text"
            {...register('lastname', { required: MessagesUserForm.LASTNAME_MANDATORY })}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname?.message as ReactNode}
          />
          <TextField
            className={classes.textField}
            id="filled-basic"
            label="Enter Bussines Name"
            variant="outlined"
            type="text"
            {...register('company', { required: false })}
            error={Boolean(errors.company)}
            helperText={errors.company?.message as ReactNode}
          />
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
          <Button className={classes.signInButton} size="small" type="submit">
            Start your free trial
          </Button>
        </form>
      </Card>
    </div>
  );
}

const styles = makeStyles()(() => {
  return {
    container: {
      margin: '0px',
    },
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
    signInButton: {
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

export default SignUpProfessional;
