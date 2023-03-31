import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Card, Dialog, DialogContent, TextField } from '@mui/material';
import {
  CreateClientGroupRequest,
  CreateClientGroupResponse,
} from 'src/modules/professionals/client-groups/adapters/out/ClientGroup.types';
import { CREATE_CLIENT_GROUP } from 'src/modules/professionals/client-groups/adapters/out/ClientGroupQueries';
import { makeStyles } from 'tss-react/mui';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ProfessionalIdContext } from 'src/App';

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
    },
    textField: {
      width: '90%',
      marginTop: '15px',
    },
    button: {
      'backgroundColor': '#0355d8',
      'width': '90%',
      'color': 'white',
      'height': '45px',
      'marginTop': '15px',
      'marginBottom': '15px',
      '&:hover': {
        backgroundColor: 'blue',
      },
    },
    buttonDisabled: {
      backgroundColor: '#629ef7',
      width: '90%',
      color: 'black',
      height: '45px',
      marginTop: '15px',
      marginBottom: '15px',
    },
  };
});

function CreateClientGroupDialog({
  openCreateClientGroupDialog,
  setOpenCreateClientGroupDialog,
  setReloadClientGroupList,
}: {
  openCreateClientGroupDialog: boolean;
  setOpenCreateClientGroupDialog: (openDialog: boolean) => void;
  setReloadClientGroupList: (reload: boolean) => void;
}) {
  const { classes } = cardStyles();
  const professionalIdContext = useContext(ProfessionalIdContext);

  const [createClientHandler] = useMutation<CreateClientGroupResponse, CreateClientGroupRequest>(CREATE_CLIENT_GROUP);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();

  const createClientGroup = async (data: { groupName: string }) => {
    const input = {
      professional: professionalIdContext.professional,
      ...data,
    };
    const res = await createClientHandler({
      variables: {
        input,
      },
    });
    setOpenCreateClientGroupDialog(false);
    setReloadClientGroupList(true);
    reset({
      groupName: '',
    });
    res;
    // console.log('-----res', res);
  };

  return (
    <>
      <Dialog
        open={openCreateClientGroupDialog}
        onClose={() => setOpenCreateClientGroupDialog(false)}
        scroll="paper"
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent dividers={true}>
          <Card className={classes.card} variant="outlined">
            <form className={classes.form} onSubmit={handleSubmit(createClientGroup as any as SubmitHandler<FieldValues>)}>
              <TextField
                className={classes.textField}
                id="outlined-basic"
                variant="outlined"
                label="Group name"
                type="text"
                {...register('groupName', { required: true })}
              />

              <Button
                className={isValid ? classes.button : classes.buttonDisabled}
                size="small"
                type="submit"
                disabled={!isValid}
              >
                Create group
              </Button>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateClientGroupDialog;
