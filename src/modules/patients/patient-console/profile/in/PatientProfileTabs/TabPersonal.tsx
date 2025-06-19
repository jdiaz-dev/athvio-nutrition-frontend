import { RefObject, useContext, useEffect } from 'react';
import { useOutletContext } from 'react-router';

// material-ui
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { openSnackbar } from 'src/shared/components/snackbar';
import { SnackbarProps } from 'src/shared/types/snackbar';
import MainCard from 'src/shared/components/MainCard/MainCard';
import countries from 'src/modules/patients/patient-console/profile/in/PatientProfileTabs/countries';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

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

export default function TabPersonal() {
  const patientState = useSelector((state: ReduxStates) => state.patient);

  const handleChangeDay = (event: SelectChangeEvent<string>, date: Date, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('dob', new Date(date.setDate(parseInt(event.target.value, 10))));
  };

  const handleChangeMonth = (event: SelectChangeEvent<string>, date: Date, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('dob', new Date(date.setMonth(parseInt(event.target.value, 10))));
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const inputRef = useInputRef();

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <Formik
        initialValues={{
          firstname: patientState.user.firstname,
          lastname: patientState.user.lastname,
          email: patientState.user.email,
          dob: new Date(getFomattedDate(patientState.birthday)), //
          countryCode: '+91',
          contact: 9652364852,
          weight: patientState.weight,
          height: patientState.height,
          gender: patientState.gender,
          country: 'US',
          state: 'California',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required.'),
          lastname: Yup.string().max(255).required('Last Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          dob: Yup.date().max(maxDate, 'Age should be 18+ years.').required('Date of birth is requird.'),
          contact: Yup.number()
            .test('len', 'Contact should be exactly 10 digit', (val) => val?.toString().length === 10)
            .required('Phone number is required'),
          weight: Yup.string().required('Weight is required'),
          height: Yup.string().required('Height is required'),
          gender: Yup.string().required('Gender is required'),
          country: Yup.string().required('Country is required'),
          state: Yup.string().required('State is required'),
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            openSnackbar({
              open: true,
              message: 'Personal profile updated successfully.',
              variant: 'alert',
              alert: {
                color: 'success',
              },
            } as SnackbarProps);
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
                      {errors.firstname}
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
                      {errors.lastname}
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
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    {/* todo: fix to allow any age and not only +18  */}
                    <InputLabel htmlFor="personal-date">Date of Birth</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select
                        fullWidth
                        value={values.dob.getMonth().toString()}
                        name="dob-month"
                        onChange={(e: SelectChangeEvent<string>) => handleChangeMonth(e, values.dob, setFieldValue)}
                      >
                        <MenuItem value="0">January</MenuItem>
                        <MenuItem value="1">February</MenuItem>
                        <MenuItem value="2">March</MenuItem>
                        <MenuItem value="3">April</MenuItem>
                        <MenuItem value="4">May</MenuItem>
                        <MenuItem value="5">June</MenuItem>
                        <MenuItem value="6">July</MenuItem>
                        <MenuItem value="7">August</MenuItem>
                        <MenuItem value="8">September</MenuItem>
                        <MenuItem value="9">October</MenuItem>
                        <MenuItem value="10">November</MenuItem>
                        <MenuItem value="11">December</MenuItem>
                      </Select>
                      <Select
                        fullWidth
                        value={values.dob.getDate().toString()}
                        name="dob-date"
                        onBlur={handleBlur}
                        onChange={(e: SelectChangeEvent<string>) => handleChangeDay(e, values.dob, setFieldValue)}
                        MenuProps={MenuProps}
                      >
                        {[
                          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                        ].map((i) => (
                          <MenuItem
                            key={i}
                            value={i}
                            disabled={
                              (values.dob.getMonth() === 1 && i > (values.dob.getFullYear() % 4 === 0 ? 29 : 28)) ||
                              (values.dob.getMonth() % 2 !== 0 && values.dob.getMonth() < 7 && i > 30) ||
                              (values.dob.getMonth() % 2 === 0 && values.dob.getMonth() > 7 && i > 30)
                            }
                          >
                            {i}
                          </MenuItem>
                        ))}
                      </Select>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          sx={{ width: 1 }}
                          views={['year']}
                          value={values.dob}
                          maxDate={maxDate}
                          onChange={(newValue) => {
                            setFieldValue('dob', newValue);
                          }}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </Stack>
                  {touched.dob && errors.dob && (
                    <FormHelperText error id="personal-dob-helper">
                      {errors.dob as String}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select value={values.countryCode} name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                        <MenuItem value="+91">+91</MenuItem>
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
                        <MenuItem value="(264)">(264)</MenuItem>
                      </Select>
                      <TextField
                        fullWidth
                        id="personal-contact"
                        value={values.contact}
                        name="contact"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Contact Number"
                      />
                    </Stack>
                  </Stack>
                  {touched.contact && errors.contact && (
                    <FormHelperText error id="personal-contact-helper">
                      {errors.contact}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="weight">Height</InputLabel>
                    <TextField
                      fullWidth
                      type="number"
                      id="weight"
                      value={values.height}
                      name="weight"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Weight"
                    />
                  </Stack>
                  {touched.height && errors.height && (
                    <FormHelperText error id="weight-helper">
                      {errors.height}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="weight">Weight</InputLabel>
                    <TextField
                      fullWidth
                      type="number"
                      id="weight"
                      value={values.weight}
                      name="weight"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Weight"
                    />
                  </Stack>
                  {touched.weight && errors.weight && (
                    <FormHelperText error id="weight-helper">
                      {errors.weight}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="weight">Gender</InputLabel>
                    <ToggleButtonGroup color="primary" value={values.gender} exclusive onChange={handleChange}>
                      <ToggleButton value="male">Male</ToggleButton>
                      <ToggleButton value="female">Female</ToggleButton>
                      <ToggleButton value="prefer not to say">Prefer not to say</ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                  {touched.weight && errors.weight && (
                    <FormHelperText error id="weight-helper">
                      {errors.weight}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
