import React, { ReactNode, useEffect, useState } from 'react';
// import { saveDataUser } from '../../../../../../shared/helpers/LocalStorage';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../../../../../../App';

import { makeStyles } from 'tss-react/mui';
import Card from '@mui/material/Card';
import Button from '@mui/material//Button';
import TextField from '@mui/material/TextField';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountryCodeSelect from 'src/modules/security/users/adapters/in/CountryCodeSelect';
import { MessagesUserForm } from 'src/shared/Consts';
import { ReduxStates } from 'src/shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from 'src/modules/security/users/adapters/in/UserSlice';
import { SetUserInfo } from 'src/modules/security/users/adapters/out/user.types';
import { useUsers } from 'src/modules/security/users/adapters/out/UserActions';

const cardStyles = makeStyles()(() => {
  return {
    container: {
      margin: '0px',
      // position: 'absolute',
      // top: '40%',
      // left: '50%',
      // transform: 'translate(-50%, -50%)',
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
    loginButton: {
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
    registerButton: {
      'backgroundColor': 'green',
      'width': '90%',
      'color': 'white',
      'height': '45px',
      'marginTop': '15px',
      'marginBottom': '15px',
      '&:hover': {
        backgroundColor: 'green',
      },
    },
    title: {
      fontSize: 14,
      width: '85%',
    },
    pos: {
      marginBottom: 12,
    },
  };
});

export function SignUp() {
  const { classes } = cardStyles();
  const user = useSelector((state: ReduxStates) => state.users);
  const [userUpdated, setUserUpdated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const signUpRequest = async () => {
      await signUp(user);
      setUserUpdated(false);
    };
    if (userUpdated) {
      void signUpRequest();
    }
  }, [userUpdated]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp } = useUsers();

  const onSubmit = (dataUser: SetUserInfo): void => {
    dispatch(setUserInfo(dataUser));
    setUserUpdated(true);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <form className={classes.form} onSubmit={handleSubmit(onSubmit as any as SubmitHandler<FieldValues>)}>
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
            {...register('firstName', { required: MessagesUserForm.FIRSTNAME_MANDATORY })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message as ReactNode}
          />
          <TextField
            className={classes.textField}
            id="filled-basic"
            label="Enter Last Name"
            variant="outlined"
            type="text"
            {...register('lastName', { required: MessagesUserForm.LASTNAME_MANDATORY })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message as ReactNode}
          />
          <TextField
            className={classes.textField}
            id="filled-basic"
            label="Enter Bussines Name"
            variant="outlined"
            type="text"
            {...register('businessName', { required: MessagesUserForm.BUSSINES_NAME_MANDATORY })}
            error={Boolean(errors.businessName)}
            helperText={errors.businessName?.message as ReactNode}
          />
          <CountryCodeSelect />
          <TextField
            className={classes.textField}
            id="filled-basic"
            label="Phone"
            variant="outlined"
            type="text"
            {...register('phone', { required: MessagesUserForm.PHONE_MANDATORY })}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message as ReactNode}
          />

          <TextField
            className={classes.textField}
            id="filled-basic"
            label="What country do you live in?"
            variant="outlined"
            type="text"
            {...register('country', { required: MessagesUserForm.COUNTRY_MANDATORY })}
            error={Boolean(errors.country)}
            helperText={errors.country?.message as ReactNode}
          />
          <Button className={classes.loginButton} size="small" type="submit">
            Start your free trial
          </Button>
        </form>
      </Card>
    </div>
  );
}