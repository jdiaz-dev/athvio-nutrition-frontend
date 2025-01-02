import { useEffect, useState, SyntheticEvent } from 'react';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';

import IconButton from 'src/shared/components/IconButton';
import AnimateButton from '../shared/AnimateButton';
import useScriptRef from '../hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'src/modules/authentication/authentication/adapters/in/shared/password-strength';

// types
import { StringColorProps } from '../types/password';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { ApolloError } from 'apollo-boost';
import { userActions } from 'src/modules/authentication/users/adapters/out/usersActions';
import { User } from 'src/modules/authentication/users/adapters/out/user';
import { useAuthentication } from 'src/modules/authentication/authentication/adapters/out/authenticationActions';

// ============================|| JWT - REGISTER ||============================ //

const ActivatePatientForm = ({ user }: { user: string }) => {
  const scriptedRef = useScriptRef();
  const { getUser } = userActions();
  const { activatePatient } = useAuthentication();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [userActivated, setUserActivated] = useState(false);
  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  useEffect(() => {
    const getUserHelper = async () => {
      const res = await getUser({ user });
      if (res.data) setUserInfo(res.data.getUser);
    };
    getUserHelper();
  }, []);

  if (userActivated) {
    return <Navigate replace to="/congratulations" />;
  }
  return (
    <>
      {userInfo !== null && (
        <>
          <Typography variant="body2" gutterBottom align="left">
            Hi {userInfo.firstname}!
          </Typography>
          <Typography variant="body2" gutterBottom align="left">
            I'm inviting you to log your workouts with me on Athvio – an easy way for us to check your nutritional plans, chat with me
          </Typography>
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string().max(255).required('Password is required'),
              confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .test('confirmPassword', 'Both Password must be match!', (confirmPassword, yup) => yup.parent.password === confirmPassword),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                const res = await activatePatient({ user, password: values.password });
                if (res.data) setUserActivated(true);
              } catch (error: unknown) {
                console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors[0].extensions.response.message[0]);
                // throw error;
                console.log('----------scriptedRef.current', scriptedRef.current);
                if (scriptedRef.current) {
                  console.log('------------entried');
                  setStatus({ success: false });
                  setErrors({ submit: (error as ApolloError).graphQLErrors[0].extensions.response.messsage[0] });
                  setSubmitting(false);
                }
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email" sx={{ textAlign: 'left' }}>
                        Email Address*
                      </InputLabel>
                      <OutlinedInput fullWidth id="email-login" type="email" value={userInfo.email} name="email" disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password-signup" sx={{ textAlign: 'left' }}>
                        Password
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        id="password-signup"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changePassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              color="secondary"
                            >
                              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="******"
                        inputProps={{}}
                      />
                    </Stack>
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" fontSize="0.75rem">
                            {level?.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="confirm-password-reset" sx={{ textAlign: 'left' }}>
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        id="confirm-password-reset"
                        type="password"
                        value={values.confirmPassword}
                        name="confirmPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter confirm password"
                      />
                    </Stack>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <FormHelperText error id="helper-text-confirm-password-reset">
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                  </Grid>

                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Accept invitation
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default ActivatePatientForm;
