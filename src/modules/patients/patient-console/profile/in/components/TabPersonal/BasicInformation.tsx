import { RefObject, useContext } from 'react';

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
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third party
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { useSelector } from 'react-redux';

import { ReduxStates } from 'src/shared/types/types';
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

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const DAYS = Array.from({ length: 31 }, (_, index) => index + 1);
const FALLBACK_YEAR = 2000;

function getFomattedDate(_date: string) {
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

// Last day of the given month (month is 0-based). Day 0 of next month = last day of this month.
function getDaysInMonth(month: string, year: number | null): number {
  if (month === '') return 31;
  return new Date(year ?? FALLBACK_YEAR, Number(month) + 1, 0).getDate();
}

// Empty inputs give "" which Yup would read as NaN, so convert them to null
const emptyToNull = (value: any, originalValue: any) => (originalValue === '' ? null : value);

export default function BasicInformation({ formRef }: { formRef: RefObject<FormikProps<any>> }) {
  const authContext = useContext(AuthContext);

  const patientState = useSelector((state: ReduxStates) => state.patient);
  const { updatePatientForWeb } = usePatient();

  const savedBirthday = patientState.birthday ? new Date(getFomattedDate(patientState.birthday)) : null;

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
          birthdayDay: savedBirthday ? savedBirthday.getDate().toString() : '',
          birthdayMonth: savedBirthday ? savedBirthday.getMonth().toString() : '',
          birthdayYear: savedBirthday ? savedBirthday.getFullYear() : (null as number | null),
          weight: patientState.weight ?? '',
          height: patientState.height ?? '',
          gender: patientState.gender ?? '',
          occupation: patientState.occupation ?? '',
          abdominalCircumference: patientState.abdominalCircumference ?? '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          birthdayYear: Yup.number()
            .nullable()
            .test('complete-birthday', 'Complete la fecha de nacimiento', function () {
              const { birthdayDay, birthdayMonth, birthdayYear } = this.parent;
              const filled = [birthdayDay, birthdayMonth, birthdayYear].filter((v) => v !== '' && v !== null && v !== undefined).length;
              return filled === 0 || filled === 3;
            }),
          weight: Yup.number().transform(emptyToNull).nullable().optional(),
          height: Yup.number().transform(emptyToNull).nullable().optional(),
          abdominalCircumference: Yup.number().transform(emptyToNull).nullable().optional(),
          gender: Yup.string().nullable().optional(),
          occupation: Yup.string().nullable().optional(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const { birthdayDay, birthdayMonth, birthdayYear } = values;
            const birthday =
              birthdayDay !== '' && birthdayMonth !== '' && birthdayYear !== null
                ? new Date(birthdayYear, Number(birthdayMonth), Number(birthdayDay)).toISOString()
                : undefined;

            await updatePatientForWeb({
              professional: authContext.professional,
              patient: patientState.uuid,
              birthday,
              height: values.height === '' ? undefined : Number(values.height),
              weight: values.weight === '' ? undefined : Number(values.weight),
              gender: values.gender === '' ? undefined : values.gender,
              abdominalCircumference: values.abdominalCircumference === '' ? undefined : values.abdominalCircumference,
              occupation: values.occupation === '' ? undefined : values.occupation,
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
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => {
          const daysInMonth = getDaysInMonth(values.birthdayMonth, values.birthdayYear);

          // If the selected day does not exist in the new month/year, clear it
          const clearDayIfInvalid = (month: string, year: number | null) => {
            if (values.birthdayDay === '' || month === '') return;
            if (Number(values.birthdayDay) > getDaysInMonth(month, year)) {
              setFieldValue('birthdayDay', '');
            }
          };

          return (
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
                          displayEmpty
                          value={values.birthdayMonth}
                          name="birthdayMonth"
                          onChange={(e: SelectChangeEvent<string>) => {
                            setFieldValue('birthdayMonth', e.target.value);
                            clearDayIfInvalid(e.target.value, values.birthdayYear);
                          }}
                        >
                          {MONTHS.map((month, index) => (
                            <MenuItem key={month} value={index.toString()}>
                              {month}
                            </MenuItem>
                          ))}
                        </Select>

                        <Select
                          fullWidth
                          displayEmpty
                          value={values.birthdayDay}
                          name="birthdayDay"
                          onBlur={handleBlur}
                          onChange={(e: SelectChangeEvent<string>) => setFieldValue('birthdayDay', e.target.value)}
                          MenuProps={MenuProps}
                        >
                          {DAYS.map((day) => (
                            <MenuItem key={day} value={day.toString()} disabled={day > daysInMonth}>
                              {day}
                            </MenuItem>
                          ))}
                        </Select>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            sx={{ width: 1 }}
                            views={['year']}
                            value={values.birthdayYear ? new Date(values.birthdayYear, 0, 1) : null}
                            maxDate={maxDate}
                            onChange={(newValue) => {
                              const year = newValue && !isNaN(newValue.getTime()) ? newValue.getFullYear() : null;
                              setFieldValue('birthdayYear', year);
                              clearDayIfInvalid(values.birthdayMonth, year);
                            }}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Stack>
                    {touched.birthdayYear && errors.birthdayYear && (
                      <FormHelperText error id="personal-birthday-helper">
                        {errors.birthdayYear as string}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="gender">Género</InputLabel>
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
                        <ToggleButton value="male">Masculino</ToggleButton>
                        <ToggleButton value="female">Femenino</ToggleButton>
                        <ToggleButton value="prefer not to say">Prefiere no decirlo</ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>
                    {touched.gender && errors.gender && (
                      <FormHelperText error id="gender-helper">
                        {errors.gender as string}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="gender">Ocupación</InputLabel>
                      <TextField
                        fullWidth
                        id="occupation"
                        value={values.occupation}
                        name="occupation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Ingrese la ocupación de la persona"
                      />
                    </Stack>
                    {touched.occupation && errors.occupation && (
                      <FormHelperText error id="occupation-helper">
                        {errors.occupation as string}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="height">Altura (cm.)</InputLabel>
                      <TextField
                        fullWidth
                        type="number"
                        id="height"
                        value={values.height}
                        name="height"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Ingrese la altura en cm."
                      />
                    </Stack>
                    {touched.height && errors.height && (
                      <FormHelperText error id="height-helper">
                        {errors.height as string}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="weight">Peso (kg.)</InputLabel>
                      <TextField
                        fullWidth
                        type="number"
                        id="weight"
                        value={values.weight}
                        name="weight"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Ingrese el peso en kg."
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
                      <InputLabel htmlFor="weight">Circunferencia abdominal (cm.)</InputLabel>
                      <TextField
                        fullWidth
                        type="number"
                        id="abdominalCircumference"
                        value={values.abdominalCircumference}
                        name="abdominalCircumference"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Ingrese la medida en cm."
                      />
                    </Stack>
                    {touched.abdominalCircumference && errors.abdominalCircumference && (
                      <FormHelperText error id="abdominalCircumference-helper">
                        {errors.abdominalCircumference as string}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </form>
          );
        }}
      </Formik>
    </>
  );
}
