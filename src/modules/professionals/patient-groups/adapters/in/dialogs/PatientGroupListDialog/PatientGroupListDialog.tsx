import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Dialog, DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GetPatientGroupsRequest, GetPatientGroupsResponse } from 'src/modules/professionals/patient-groups/adapters/out/PatientGroup.types';
import { GET_CLIENT_GROUPS } from 'src/modules/professionals/patient-groups/adapters/out/PatientGroupQueries';
import { ProfessionalIdContext } from 'src/App';
import DeletePatientGroup from 'src/modules/professionals/patient-groups/adapters/in/dialogs/PatientGroupListDialog/DeletePatientGroup';
import EditPatientGroup from 'src/modules/professionals/patient-groups/adapters/in/dialogs/PatientGroupListDialog/EditPatientGroup';
import { PatientGroupsContext } from 'src/modules/patients/patients/adapters/in/components/PatientsContainer';

function PatientGroupListDialog({
  openPatientGroupListDialog,
  setOpenPatientGroupListDialog,
  reloadPatientGroupList,
  setReloadPatientGroupList,
}: {
  openPatientGroupListDialog: boolean;
  setOpenPatientGroupListDialog: (openDialog: boolean) => void;
  reloadPatientGroupList: boolean;
  setReloadPatientGroupList: (reload: boolean) => void;
}) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const patientGroupContext = useContext(PatientGroupsContext);

  const [editGroup, setEditGroup] = useState(false);
  const [_reloadPatientGroupList, _setReloadPatientGroupList] = useState(false);
  const input = {
    professional: professionalIdContext.professional,
  };
  const { data, refetch } = useQuery<GetPatientGroupsResponse, GetPatientGroupsRequest>(GET_CLIENT_GROUPS, {
    variables: {
      input,
    },
  });
  if (data) patientGroupContext.setPatientGroupList(data.getPatientGroups);

  useEffect(() => {
    const getPatientsHelper = async () => {
      const res = await refetch({ input });
      patientGroupContext.setPatientGroupList(res.data.getPatientGroups);
    };
    if (reloadPatientGroupList || reloadPatientGroupList) {
      void getPatientsHelper();
      _setReloadPatientGroupList(false);
      setReloadPatientGroupList(false);
    }
  }, [_reloadPatientGroupList, reloadPatientGroupList]);

  return (
    <>
      <Dialog
        open={openPatientGroupListDialog}
        onClose={() => setOpenPatientGroupListDialog(false)}
        scroll="paper"
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent dividers={true}>
          {data && (
            <TableContainer component={Paper}>
              <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Group</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.getPatientGroups.map((group) => (
                    <TableRow key={group._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {!editGroup ? (
                          <div
                            style={{ borderColor: 'red' }}
                            onClick={() => {
                              setEditGroup(true);
                            }}
                          >
                            {group.groupName}
                          </div>
                        ) : (
                          <EditPatientGroup
                            _id={group._id}
                            groupName={group.groupName}
                            setEditGroup={setEditGroup}
                            setReloadPatientGroupList={setReloadPatientGroupList}
                          />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <DeletePatientGroup patientGroup={group._id} setReloadPatientGroupList={setReloadPatientGroupList} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PatientGroupListDialog;
