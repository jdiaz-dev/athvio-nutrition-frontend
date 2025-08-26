import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import Paginator from 'src/shared/components/Paginator';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import PlanificationItem from 'src/modules/patients/patient-console/planifications/adapters/in/components/PlanificationItem';

function PlanificationList() {
  const planificationsState = useSelector((state: ReduxStates) => state.planifications.planifications);
  const { length, setLength, offset, setOffset, rowsPerPage, currentPage, setCurrentPage } = usePaginator(5);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell># de plan</StyledTableCell>
              <StyledTableCell>Fecha de creacion</StyledTableCell>
              <StyledTableCell>Calorias</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planificationsState.length > 0 &&
              planificationsState.map((planification, index) => <PlanificationItem key={index} planification={planification} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginator
        length={length}
        offset={offset}
        setOffset={setOffset}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default PlanificationList;
