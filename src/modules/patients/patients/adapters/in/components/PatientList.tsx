import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import SearcherBar from 'src/shared/components/SearcherBar';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import PatientDetail from 'src/modules/patients/patients/adapters/in/components/PatientDetail';
import { GET_CLIENTS } from 'src/modules/patients/patients/adapters/out/PatientQueries';
import {
  GetPatientResponse,
  GetPatientsRequest,
  GraphQLPatientInput,
} from 'src/modules/patients/patients/adapters/out/patient.types';
import { useQuery } from '@apollo/client';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import Paginator from 'src/shared/components/Paginator';
import { PatientStates } from 'src/shared/Consts';
import { PatientStateContext } from 'src/modules/patients/patients/adapters/in/components/PatientStateContext';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { PatientBody } from 'src/modules/patients/patient-console/patient/out/patient';

function PatientList() {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const patientStateContext = useContext(PatientStateContext);

  const {
    searchWords,
    setSearchWords,
    matchedRecords,
    setMatchedRecords,
    choosedWord,
    setChoosedWord,
    recentlyTypedWord,
    setRecentlyTypedWord,
  } = useSearcher();
  const { length, setLength, offset, setOffset, rowsPerPage, currentPage, setCurrentPage } = usePaginator(5);

  const { loading: loadingPatients, refetch: refetchPatients } = useQuery<GetPatientResponse, GetPatientsRequest>(GET_CLIENTS, {
    skip: true,
  });
  const [patients, setPatients] = useState<PatientBody[]>([]);

  const input: GraphQLPatientInput = {
    professional: authContext.professional,
    offset: searchWords.length == 1 ? 0 : offset,
    limit: rowsPerPage,
    state: Object.entries(PatientStates)[patientStateContext.indexState][1],
  };
  if (searchWords.length > 0) input.search = searchWords;

  useEffect(() => {
    setOffset(0);
    setCurrentPage(0);
  }, [patientStateContext.indexState]);

  useEffect(() => {
    const getPatientsHelper = async () => {
      // TODO: fix double call to server
      const res = await refetchPatients({ input });
      setPatients(res.data.getPatients.data);
      setLength(res.data.getPatients.meta.total);

      if (choosedWord && res.data.getPatients.meta.total <= rowsPerPage) {
        setCurrentPage(0);
      }
    };
    const getPatients = () => {
      if (authContext.professional || reloadRecordListContext.reloadRecordList || choosedWord) {
        void getPatientsHelper();
        setChoosedWord(false);
        reloadRecordListContext.setReloadRecordList(false);
      }
    };
    getPatients();
  }, [authContext.professional, reloadRecordListContext.reloadRecordList, choosedWord, offset, patientStateContext.indexState]);

  useEffect(() => {
    const getPatientsForSearcher = async () => {
      if (searchWords.length === 1 && recentlyTypedWord) {
        const res = await refetchPatients({ input });

        setMatchedRecords(res.data.getPatients.data.map((patient) => patient.user.firstname + ' ' + patient.user.lastname));
        setRecentlyTypedWord(false);
      }
    };

    void getPatientsForSearcher();
  }, [searchWords, recentlyTypedWord]);

  if (loadingPatients) return <div>loading...</div>;
  return (
    <>
      <SearcherBar
        setSearchWords={setSearchWords}
        matchedRecords={matchedRecords}
        setChoosedWord={setChoosedWord}
        setRecentlyTypedWord={setRecentlyTypedWord}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>State</StyledTableCell>
              <StyledTableCell>Group</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{patients.length > 0 && patients.map((patient, index) => <PatientDetail key={index} patient={patient} />)}</TableBody>
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

export default PatientList;
