import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

import Card from '@mui/material/Card';
import Button from '@mui/material//Button';
import TextField from '@mui/material/TextField';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { CredentialsSignIn, SignInResponse, SignInRequest } from 'src/modules/authentication/security/adapters/out/security.types';
import { AuthContext, ProfessionalIdContext } from 'src/App';
import { MessagesUserForm } from 'src/shared/Consts';
import { SIGN_IN } from 'src/modules/authentication/security/adapters/out/SecurityQueries';
import { saveDataUser } from 'src/shared/helpers/LocalStorage';
import { ApolloError, useMutation } from '@apollo/client';

function SignIn() {
  const { classes } = styles();

  const authContext = useContext(AuthContext);
  const professionalIdContext = useContext(ProfessionalIdContext);

  const [signInHandler, { data }] = useMutation<SignInResponse, SignInRequest>(SIGN_IN);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (data) {
    saveDataUser(data.signIn);
    professionalIdContext.setProfessional(data.signIn._id);
    authContext.setIsAuthenticated(true);
    return <Navigate replace to="/sidenav/patients" />;
  }

  const onSubmit = async (dataUser: CredentialsSignIn): Promise<void> => {
    try {
      await signInHandler({
        variables: {
          input: {
            ...dataUser,
          },
        },
      });
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
    }
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
          <Button className={classes.signInButton} size="small" type="submit">
            Iniciar sesión
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

export default SignIn;
