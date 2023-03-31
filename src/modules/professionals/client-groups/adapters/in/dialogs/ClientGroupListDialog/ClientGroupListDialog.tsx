import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Dialog, DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {
  GetClientGroupsRequest,
  GetClientGroupsResponse,
} from 'src/modules/professionals/client-groups/adapters/out/ClientGroup.types';
import { GET_CLIENT_GROUPS } from 'src/modules/professionals/client-groups/adapters/out/ClientGroupQueries';
import { ProfessionalIdContext } from 'src/App';
import DeleteClientGroup from 'src/modules/professionals/client-groups/adapters/in/dialogs/ClientGroupListDialog/DeleteClientGroup';
import EditClientGroup from 'src/modules/professionals/client-groups/adapters/in/dialogs/ClientGroupListDialog/EditClientGroup';
import { ClientGroupsContext } from 'src/modules/clients/clients/adapters/in/components/ClientsContainer';

function ClientGroupList({
  openClientGroupListDialog,
  setOpenClientGroupListDialog,
  reloadClientGroupList,
  setReloadClientGroupList,
}: {
  openClientGroupListDialog: boolean;
  setOpenClientGroupListDialog: (openDialog: boolean) => void;
  reloadClientGroupList: boolean;
  setReloadClientGroupList: (reload: boolean) => void;
}) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const clientGroupContext = useContext(ClientGroupsContext);

  const [editGroup, setEditGroup] = useState(false);
  const [_reloadClientGroupList, _setReloadClientGroupList] = useState(false);
  const input = {
    professional: professionalIdContext.professional,
  };
  const { data, refetch } = useQuery<GetClientGroupsResponse, GetClientGroupsRequest>(GET_CLIENT_GROUPS, {
    variables: {
      input,
    },
  });
  if (data) clientGroupContext.setClientGroupList(data.getClientGroups);

  useEffect(() => {
    const getClientsHelper = async () => {
      const res = await refetch({ input });
      // console.log('---------res', res);
      clientGroupContext.setClientGroupList(res.data.getClientGroups);
    };
    if (reloadClientGroupList || reloadClientGroupList) {
      void getClientsHelper();
      _setReloadClientGroupList(false);
      setReloadClientGroupList(false);
    }
  }, [_reloadClientGroupList, reloadClientGroupList]);

  return (
    <>
      <Dialog
        open={openClientGroupListDialog}
        onClose={() => setOpenClientGroupListDialog(false)}
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
                  {data?.getClientGroups.map((group) => (
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
                          <EditClientGroup
                            _id={group._id}
                            groupName={group.groupName}
                            setEditGroup={setEditGroup}
                            setReloadClientGroupList={setReloadClientGroupList}
                          />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <DeleteClientGroup clientGroup={group._id} setReloadClientGroupList={setReloadClientGroupList} />
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

export default ClientGroupList;
