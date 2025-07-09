import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Dialog, DialogContent, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import {
  GetPatientGroupsRequest,
  GetPatientGroupsResponse,
} from 'src/modules/professionals/patient-groups/adapters/out/PatientGroup.types';
import { GET_CLIENT_GROUPS } from 'src/modules/professionals/patient-groups/adapters/out/PatientGroupQueries';
import DeletePatientGroup from 'src/modules/professionals/patient-groups/adapters/in/dialogs/PatientGroupListDialog/DeletePatientGroup';
import EditPatientGroup from 'src/modules/professionals/patient-groups/adapters/in/dialogs/PatientGroupListDialog/EditPatientGroup';
import { PatientGroupsContext } from 'src/modules/patients/patients/adapters/in/components/PatientsContainer';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';

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
  const authContext = useContext(AuthContext);
  const patientGroupContext = useContext(PatientGroupsContext);

  const [editGroup, setEditGroup] = useState(false);
  const [_reloadPatientGroupList, _setReloadPatientGroupList] = useState(false);
  const input = {
    professional: authContext.professional,
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
                  <StyledTableRow>
                    <StyledTableCell width={'90%'}>Group</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {data?.getPatientGroups.map((group) => (
                    <StyledTableRow key={group.uuid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <StyledTableCell component="th" scope="row">
                        {!editGroup ? (
                          <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setEditGroup(true);
                            }}
                          >
                            {group.groupName}
                          </div>
                        ) : (
                          <EditPatientGroup
                            uuid={group.uuid}
                            groupName={group.groupName}
                            setEditGroup={setEditGroup}
                            setReloadPatientGroupList={setReloadPatientGroupList}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row" align="right">
                        <DeletePatientGroup patientGroup={group.uuid} setReloadPatientGroupList={setReloadPatientGroupList} />
                      </StyledTableCell>
                    </StyledTableRow>
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
