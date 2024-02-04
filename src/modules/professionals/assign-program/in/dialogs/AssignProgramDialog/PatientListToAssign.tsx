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
import { GET_CLIENTS } from 'src/modules/patients/patients/adapters/out/PatientQueries';
import { PatientBody, GetPatientResponse, GetPatientsRequest } from 'src/modules/patients/patients/adapters/out/patient.types';
import { useQuery } from '@apollo/client';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import Paginator from 'src/shared/components/Paginator';
import { PatientStates } from 'src/shared/Consts';
import PatientItem from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/PatientItem';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function PatientList() {
  const authContext = useContext(AuthContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);

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

  const input = {
    professional: authContext.professional,
    offset: offset,
    limit: rowsPerPage,
    state: PatientStates.ACTIVE,
  };

  useEffect(() => {
    const _input = searchWords.length > 0 ? { ...input, search: searchWords } : input;
    const getPatientsHelper = async () => {
      const res = await refetchPatients({ input: _input });
      setPatients(res.data.getPatients.data);
      setLength(res.data.getPatients.meta.total);
    };
    const getPatients = () => {
      if (authContext.professional || reloadRecordListContext.reloadRecordList || choosedWord) {
        void getPatientsHelper();
        setChoosedWord(false);
        reloadRecordListContext.setReloadRecordList(false);
      }
    };
    getPatients();
  }, [authContext.professional, reloadRecordListContext.reloadRecordList, choosedWord, offset]);

  useEffect(() => {
    const getPatientsForSearcher = async () => {
      if (searchWords.length === 1 && recentlyTypedWord) {
        const _input = searchWords.length > 0 ? { ...input, search: searchWords } : input;
        const res = await refetchPatients({ input: _input });

        setMatchedRecords(res.data.getPatients.data.map((patient) => patient.user.firstName + ' ' + patient.user.lastName));
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
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{patients.length > 0 && patients.map((patient, index) => <PatientItem key={index} patient={patient} />)}</TableBody>
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
