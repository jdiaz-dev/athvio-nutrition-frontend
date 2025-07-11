import { RefObject } from 'react';
import { useOutletContext } from 'react-router';

// material-ui
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third party
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';
import { CardHeader } from '@mui/material';
import useCountries from 'src/shared/components/Country/useCountries';
import { userActions } from 'src/modules/authentication/users/adapters/out/usersActions';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function getFomattedDate(_date: string) {
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formatted = `${year}-${month}-${day}`;
  return formatted;
}
function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

// ==============================|| TAB - PERSONAL ||============================== //

export default function PersonalInformation({ formRef }: { formRef: RefObject<FormikProps<any>> }) {
  const patientState = useSelector((state: ReduxStates) => state.patient);
  const { countries } = useCountries();
  const { updateUser } = userActions();
  const inputRef = useInputRef();

  return (
    <>
      <CardHeader
        title="Personal information"
        sx={{
          textAlign: 'left',
        }}
      />
      <Formik
        enableReinitialize
        innerRef={formRef}
        initialValues={{
          firstname: patientState.user.firstname,
          lastname: patientState.user.lastname,
          email: patientState.user.email,
          countryCode: patientState.user.countryCode,
          phone: patientState.user.phone,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required.'),
          lastname: Yup.string().max(255).required('Last Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          phone: Yup.number().optional(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await updateUser({
              user: patientState.user.uuid,
              email: values.email,
              firstname: values.firstname,
              lastname: values.lastname,
              phone: values.phone,
            });
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-first-name"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                    />
                  </Stack>
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="personal-first-name-helper">
                      {errors.firstname as string}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </Stack>
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="personal-last-name-helper">
                      {errors.lastname as string}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="personal-email"
                      placeholder="Email Address"
                    />
                  </Stack>
                  {touched.email && errors.email && (
                    <FormHelperText error id="personal-email-helper">
                      {errors.email as string}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select value={values.countryCode} name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                        {/* <MenuItem value="+91">+91</MenuItem>
                        <MenuItem value="1-671">1-671</MenuItem>
                        <MenuItem value="+36">+36</MenuItem>
                        <MenuItem value="(225)">(255)</MenuItem>
                        <MenuItem value="+39">+39</MenuItem>
                        <MenuItem value="1-876">1-876</MenuItem>
                        <MenuItem value="+7">+7</MenuItem>
                        <MenuItem value="(254)">(254)</MenuItem>
                        <MenuItem value="(373)">(373)</MenuItem>
                        <MenuItem value="1-664">1-664</MenuItem>
                        <MenuItem value="+95">+95</MenuItem>
                        <MenuItem value="(264)">(264)</MenuItem> */}
                        <MenuItem value="1-664">1-664</MenuItem>
                      </Select>
                      <TextField
                        fullWidth
                        id="phone"
                        value={values.phone}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Phone"
                      />
                    </Stack>
                  </Stack>
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="phone-helper">
                      {errors.phone as string}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
