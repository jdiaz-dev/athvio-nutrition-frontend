import { Box, Button, Stack } from '@mui/material';
import { RefObject } from 'react';
import { FormikProps } from 'formik';

type SaveButtonProps = {
  form1Ref: RefObject<FormikProps<any>>;
  form2Ref: RefObject<FormikProps<any>>;
};

function SaveTabPersonalButton({ form1Ref, form2Ref }: SaveButtonProps) {
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
      console.log('✅ Both forms submitted');
    } else {
      console.warn('❌ Validation failed');
    }
  };
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
