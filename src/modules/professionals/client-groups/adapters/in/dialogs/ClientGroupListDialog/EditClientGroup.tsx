import React, { BaseSyntheticEvent, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  UpdateClientGroupsRequest,
  UpdateClientGroupsResponse,
} from 'src/modules/professionals/client-groups/adapters/out/ClientGroup.types';
import { useMutation } from '@apollo/client';
import { UPDATE_CLIENT_GROUP } from 'src/modules/professionals/client-groups/adapters/out/ClientGroupQueries';
import { ProfessionalIdContext } from 'src/App';

function EditClientGroup({
  _id,
  groupName,
  setEditGroup,
  setReloadClientGroupList,
}: {
  _id: string;
  groupName: string;
  setEditGroup: (edit: boolean) => void;
  setReloadClientGroupList: (reload: boolean) => void;
}) {
  const professionalIdContext = useContext(ProfessionalIdContext);

  const [updateClientGroupHandler] = useMutation<UpdateClientGroupsResponse, UpdateClientGroupsRequest>(UPDATE_CLIENT_GROUP);

  const updateClientGroup = async (e: BaseSyntheticEvent) => {
    const res = await updateClientGroupHandler({
      variables: {
        input: {
          professional: professionalIdContext.professional,
          clientGroup: _id,
          groupName: e.target.value,
        },
      },
    });
    res;
    setReloadClientGroupList(true);
    setEditGroup(false);
    // console.log('--------res', res);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          variant="standard"
          defaultValue={groupName}
          onBlur={(e) => {
            void updateClientGroup(e);
          }}
        />
      </Box>
    </>
  );
}

export default EditClientGroup;
