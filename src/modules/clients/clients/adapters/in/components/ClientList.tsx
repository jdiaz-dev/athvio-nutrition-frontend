import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetClientResponse, GetClientsRequest } from 'src/modules/clients/clients/adapters/out/client.types';
import { GET_CLIENTS } from 'src/modules/clients/clients/adapters/out/ClientQueries';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';
import { UserType } from 'src/shared/Consts';
import { useQuery } from '@apollo/client';

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

function ClientList() {
  const user = getUserFromLocalStorage();
  const { data, loading, refetch } = useQuery<GetClientResponse, GetClientsRequest>(GET_CLIENTS, {
    variables: {
      input: {
        professionalId: user.userType === UserType.PROFESSIONAL ? user._id : '',
        offset: 0,
        limit: 10,
        state: 'inactive',
      },
    },
  });
  console.log('-------------data', data);
  /* useEffect(() => {
    console.log('----------refetch', refetch);

    const getClients = () => {
      setTimeout(() => {
        console.log('----------refetch', refetch);

        void refetch({
          input: {
            professionalId: user.userType === UserType.PROFESSIONAL ? user._id : '',
            offset: 0,
            limit: 10,
            state: 'inactive',
          },
        })
          .then((res) => {
            console.log('----------res', res);
          })
          .catch((err) => {
            console.log('----------err', err);
          });
      }, 2000);
    };
    void getClients();

    return () => {};
  }, [refetch]); */

  if (loading) return <div>loading...</div>;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Groups</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClientList;
