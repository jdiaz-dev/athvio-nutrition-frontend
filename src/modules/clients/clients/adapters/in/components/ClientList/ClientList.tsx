import React, { useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetClientResponse, GetClientsRequest } from 'src/modules/clients/clients/adapters/out/client.types';
import { GET_CLIENTS } from 'src/modules/clients/clients/adapters/out/ClientQueries';
import { useQuery } from '@apollo/client';
import { ProfessionalIdContext, ReloadClientListContext } from 'src/App';
import ManageClientGroup from 'src/modules/clients/clients/adapters/in/components/ClientList/ManageClientGroup';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function ClientList({
  reloadClientList,
  setReloadClientList,
}: {
  reloadClientList: boolean;
  setReloadClientList: (reload: boolean) => void;
}) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadClientListContext = useContext(ReloadClientListContext);
  const input = {
    professionalId: professionalIdContext.professionalId,
    offset: 0,
    limit: 10,
    state: 'inactive',
  };
  const { data, loading, refetch } = useQuery<GetClientResponse, GetClientsRequest>(GET_CLIENTS, {
    variables: {
      input,
    },
  });
  // console.log('-------data', data);
  useEffect(() => {
    const reloadClients = async () => {
      await refetch({ input });
    };
    if (reloadClientList || reloadClientListContext.reloadClientList) {
      void reloadClients();
      setReloadClientList(false);
      reloadClientListContext.setReloadClientList(false);
    }
  }, [reloadClientList, reloadClientListContext.reloadClientList]);

  if (loading) return <div>loading...</div>;
  return (
    <div>
      {data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Group</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.getClients.map((client) => (
                <TableRow key={client._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {client.user.firstName} {client.user.lastName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ManageClientGroup clientId={client._id} assignedGroups={client.groups} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ClientList;
