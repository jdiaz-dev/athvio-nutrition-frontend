import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
// import { saveDataUser } from '../../../../../../shared/helpers/LocalStorage';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../../../../../../App';

import { makeStyles } from 'tss-react/mui';
import Card from '@mui/material/Card';
import Button from '@mui/material//Button';
import TextField from '@mui/material/TextField';
import { SIGN_UP } from '../out/userQueries';
import { LoginResponse, SignUpRequest } from 'src/modules/security/users/adapters/out/user.types';
// import { SignUpRequest } from 'src/modules/security/users/adapters/out/user.types';

const cardStyles = makeStyles()(() => {
  return {
    container: {
      margin: '0px',
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
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

  // const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [openCreateUserDialog, setopenCreateUserDialog] = useState(false);
  const [loginHandler, { data }] = useMutation<LoginResponse, SignUpRequest>(SIGN_UP);
  data;
  /* if (data) {
    saveDataUser(data.logIn);
    authContext.setIsAuthenticated(true);
    return <Navigate replace to="/sidenav/tickets" />;
  } */

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Correo electrónico"
            value={email}
            variant="outlined"
            onChange={handleEmailChange}
          />
          <TextField
            className={classes.textField}
            id="filled-basic"
            label="Contraseña"
            variant="outlined"
            value={password}
            type="password"
            onChange={handlePasswordChange}
          />
          <Button
            className={classes.loginButton}
            size="small"
            onClick={() =>
              loginHandler({
                variables: {
                  input: {
                    firstName: 'zzzzz',
                    lastName: 'zzzzz',
                    email: 'pro2pro.com',
                    password: 'pro',
                    timezone: 'zzzzz',
                    acceptedTerms: true,
                    professionalInfo: {
                      businessName: 'zzzzz',
                      countryCode: 'zzzzz',
                      phone: 'zzzzz',
                      country: 'zzzzz',
                    },
                  },
                },
              })
            }
          >
            Iniciar sesión
          </Button>
          <Button className={`${classes.registerButton}`} size="small" onClick={() => true}>
            Crear cuenta nueva
          </Button>
        </form>
      </Card>
    </div>
  );
}
