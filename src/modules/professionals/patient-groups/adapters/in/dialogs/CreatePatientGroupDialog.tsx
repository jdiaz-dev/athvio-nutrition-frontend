import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Card, Dialog, DialogContent, TextField } from '@mui/material';
import {
  CreatePatientGroupRequest,
  CreatePatientGroupResponse,
} from 'src/modules/professionals/patient-groups/adapters/out/PatientGroup.types';
import { CREATE_CLIENT_GROUP } from 'src/modules/professionals/patient-groups/adapters/out/PatientGroupQueries';
import { makeStyles } from 'tss-react/mui';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';

function CreatePatientGroupDialog({
  openCreatePatientGroupDialog,
  setOpenCreatePatientGroupDialog,
  setReloadPatientGroupList,
}: {
  openCreatePatientGroupDialog: boolean;
  setOpenCreatePatientGroupDialog: (openDialog: boolean) => void;
  setReloadPatientGroupList: (reload: boolean) => void;
}) {
  const { classes } = cardStyles();
  const authContext = useContext(AuthContext);

  const [createPatientHandler] = useMutation<CreatePatientGroupResponse, CreatePatientGroupRequest>(CREATE_CLIENT_GROUP);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();

  const createPatientGroup = async (data: { groupName: string }) => {
    const input = {
      professional: authContext.professional,
      ...data,
    };
    const res = await createPatientHandler({
      variables: {
        input,
      },
    });
    setOpenCreatePatientGroupDialog(false);
    setReloadPatientGroupList(true);
    reset({
      groupName: '',
    });
    res;
  };

  return (
    <>
      <Dialog
        open={openCreatePatientGroupDialog}
        onClose={() => setOpenCreatePatientGroupDialog(false)}
        scroll="paper"
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent dividers={true}>
          <Card className={classes.card} variant="outlined">
            <form className={classes.form} onSubmit={handleSubmit(createPatientGroup as any as SubmitHandler<FieldValues>)}>
              <TextField
                className={classes.textField}
                id="outlined-basic"
                variant="outlined"
                label="Group name"
                type="text"
                {...register('groupName', { required: true })}
              />

              <Button className={classes.button} variant="contained" type="submit" disabled={!isValid}>
                Create group
              </Button>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreatePatientGroupDialog;

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      padding: '0px',
    },
    form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column', // Align items vertically
      alignItems: 'center', // Center items horizontally
      justifyContent: 'center', // Center items vertically
      padding: '20px 0',
    },
    textField: {
      width: '90%',
      marginTop: '15px',
    },
    button: {
      width: '90%',
      color: 'white',
      height: '45px',
      marginTop: '15px',
      marginBottom: '15px',
    },
  };
});
