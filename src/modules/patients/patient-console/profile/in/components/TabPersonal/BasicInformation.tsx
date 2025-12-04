import { RefObject, useContext } from 'react';
import { useOutletContext } from 'react-router';

// material-ui
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
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
import { Formik, FormikProps } from 'formik';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { usePatient } from 'src/modules/patients/patients/adapters/out/PatientActions';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';

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

export default function BasicInformation({ formRef }: { formRef: RefObject<FormikProps<any>> }) {
  const authContext = useContext(AuthContext);

  const patientState = useSelector((state: ReduxStates) => state.patient);
  const { updatePatientForWeb } = usePatient();
  const handleChangeDay = (event: SelectChangeEvent<string>, date: Date, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('birthday', new Date(date.setDate(parseInt(event.target.value, 10))));
  };

  const handleChangeMonth = (event: SelectChangeEvent<string>, date: Date, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('birthday', new Date(date.setMonth(parseInt(event.target.value, 10))));
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  return (
    <>
      <CardHeader
        title="Información básica"
        sx={{
          textAlign: 'left',
        }}
      />
      <Formik
        enableReinitialize
        innerRef={formRef}
        initialValues={{
          birthday: patientState.birthday ? new Date(getFomattedDate(patientState.birthday)) : new Date('2000-01-01'),
          weight: patientState.weight,
          height: patientState.height,
          gender: patientState.gender,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          birthday: Yup.date().optional(),
          weight: Yup.number().optional(),
          height: Yup.number().optional(),
          gender: Yup.string().optional(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await updatePatientForWeb({
              professional: authContext.professional,
              patient: patientState.uuid,
              birthday: values.birthday.toISOString(),
              height: values.height,
              weight: values.weight,
              gender: values.gender,
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
                    {/* todo: fix to allow any age and not only +18  */}
                    <InputLabel htmlFor="personal-date">Fecha de nacimiento</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select
                        fullWidth
                        value={values.birthday.getMonth().toString()}
                        name="birthday-month"
                        onChange={(e: SelectChangeEvent<string>) => handleChangeMonth(e, values.birthday, setFieldValue)}
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
                        value={values.birthday.getDate().toString()}
                        name="birthday-date"
                        onBlur={handleBlur}
                        onChange={(e: SelectChangeEvent<string>) => handleChangeDay(e, values.birthday, setFieldValue)}
                        MenuProps={MenuProps}
                      >
                        {[
                          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                        ].map((i) => (
                          <MenuItem
                            key={i}
                            value={i}
                            disabled={
                              (values.birthday.getMonth() === 1 && i > (values.birthday.getFullYear() % 4 === 0 ? 29 : 28)) ||
                              (values.birthday.getMonth() % 2 !== 0 && values.birthday.getMonth() < 7 && i > 30) ||
                              (values.birthday.getMonth() % 2 === 0 && values.birthday.getMonth() > 7 && i > 30)
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
                          value={values.birthday}
                          maxDate={maxDate}
                          onChange={(newValue) => {
                            setFieldValue('birthday', newValue);
                          }}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </Stack>
                  {touched.birthday && errors.birthday && (
                    <FormHelperText error id="personal-birthday-helper">
                      {errors.birthday as String}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="weight">Altura</InputLabel>
                    <TextField
                      fullWidth
                      type="number"
                      id="height"
                      value={values.height}
                      name="height"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Height"
                    />
                  </Stack>
                  {touched.height && errors.height && (
                    <FormHelperText error id="weight-helper">
                      {errors.height as string}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="weight">Peso</InputLabel>
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
                      {errors.weight as string}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="weight">Género</InputLabel>
                    <ToggleButtonGroup
                      color="primary"
                      value={values.gender}
                      exclusive
                      onChange={(_event, newValue) => {
                        if (newValue !== null) {
                          setFieldValue('gender', newValue);
                        }
                      }}
                    >
                      <ToggleButton value="male">Male</ToggleButton>
                      <ToggleButton value="female">Female</ToggleButton>
                      <ToggleButton value="prefer not to say">Prefer not to say</ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                  {touched.gender && errors.gender && (
                    <FormHelperText error id="gender-helper">
                      {errors.gender as string}
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
