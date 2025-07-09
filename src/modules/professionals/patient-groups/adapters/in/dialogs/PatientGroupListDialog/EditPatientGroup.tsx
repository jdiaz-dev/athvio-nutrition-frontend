import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  UpdatePatientGroupsRequest,
  UpdatePatientGroupsResponse,
} from 'src/modules/professionals/patient-groups/adapters/out/PatientGroup.types';
import { useMutation } from '@apollo/client';
import { UPDATE_CLIENT_GROUP } from 'src/modules/professionals/patient-groups/adapters/out/PatientGroupQueries';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function EditPatientGroup({
  uuid,
  groupName,
  setEditGroup,
  setReloadPatientGroupList,
}: {
  uuid: string;
  groupName: string;
  setEditGroup: (edit: boolean) => void;
  setReloadPatientGroupList: (reload: boolean) => void;
}) {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

  const [updatePatientGroupHandler] = useMutation<UpdatePatientGroupsResponse, UpdatePatientGroupsRequest>(UPDATE_CLIENT_GROUP);

  const updatePatientGroup = async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const res = await updatePatientGroupHandler({
      variables: {
        input: {
          professional: authContext.professional,
          patientGroup: uuid,
          groupName: e.target.value,
        },
      },
    });
    res;
    setReloadPatientGroupList(true);
    reloadRecordListContext.setReloadRecordList(true);
    setEditGroup(false);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '90%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          variant="standard"
          defaultValue={groupName}
          onBlur={(e) => {
            void updatePatientGroup(e);
          }}
        />
      </Box>
    </>
  );
}

export default EditPatientGroup;
