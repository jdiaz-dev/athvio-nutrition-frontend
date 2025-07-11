import { Box, Button, Stack } from '@mui/material';
import { RefObject, useEffect } from 'react';
import { FormikProps } from 'formik';
import { openSnackbar } from 'src/shared/components/Snackbar/snackbar';
import { SnackbarProps } from 'src/shared/types/snackbar';
import * as PatientSlice from 'src/modules/patients/patients/adapters/in/slicers/PatientSlice';
import { useDispatch } from 'react-redux';

type SaveButtonProps = {
  form1Ref: RefObject<FormikProps<any>>;
  form2Ref: RefObject<FormikProps<any>>;
};

function SaveTabPersonalButton({ form1Ref, form2Ref }: SaveButtonProps) {
  const dispatch = useDispatch();
  const handleSave = async () => {
    if (!form1Ref.current || !form2Ref.current) {
      return;
    }

    const form1Errors = await form1Ref.current.validateForm();
    const form2Errors = await form2Ref.current.validateForm();

    form1Ref.current.setTouched(
      Object.keys(form1Errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      true,
    );
    form2Ref.current.setTouched(
      Object.keys(form2Errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      true,
    );

    const isForm1Valid = Object.keys(form1Errors).length === 0;
    const isForm2Valid = Object.keys(form2Errors).length === 0;

    if (isForm1Valid && isForm2Valid) {
      await form1Ref.current.submitForm();
      await form2Ref.current.submitForm();
      openSnackbar({
        open: true,
        message: 'Personal profile updated successfully.',
        variant: 'alert',
        alert: {
          color: 'success',
        },
      } as SnackbarProps);
    } else {
      console.warn('❌ Validation failed');
    }
  };
  useEffect(() => {
    return () => {
      form1Ref?.current?.resetForm();
      form2Ref?.current?.resetForm();
      dispatch(PatientSlice.resetPatient());
    };
  }, []);

  return (
    <>
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
          <Button type="button" variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
}
export default SaveTabPersonalButton;
