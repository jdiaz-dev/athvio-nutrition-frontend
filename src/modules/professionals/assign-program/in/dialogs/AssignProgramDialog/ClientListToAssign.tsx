import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ProfessionalIdContext } from 'src/App';
import SearcherBar from 'src/shared/components/SearcherBar';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { GET_CLIENTS } from 'src/modules/clients/clients/adapters/out/ClientQueries';
import { ClientBody, GetClientResponse, GetClientsRequest } from 'src/modules/clients/clients/adapters/out/client.types';
import { useQuery } from '@apollo/client';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import Paginator from 'src/shared/components/Paginator';
import { UserState } from 'src/shared/Consts';
import ClientItem from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/ClientItem';

function ClientList() {
  const professionalIdContext = useContext(ProfessionalIdContext);
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

  const { loading: loadingClients, refetch: refetchClients } = useQuery<GetClientResponse, GetClientsRequest>(GET_CLIENTS, {
    skip: true,
  });
  const [clients, setClients] = useState<ClientBody[]>([]);

  const input = {
    professional: professionalIdContext.professional,
    offset: offset,
    limit: rowsPerPage,
    state: UserState[0],
  };

  useEffect(() => {
    const _input = searchWords.length > 0 ? { ...input, search: searchWords } : input;
    const getClientsHelper = async () => {
      const res = await refetchClients({ input: _input });
      console.log('-----------res', res);
      setClients(res.data.getClients.data);
      setLength(res.data.getClients.meta.total);
    };
    console.log('-----------offset', offset);
    const getClients = () => {
      if (professionalIdContext.professional || reloadRecordListContext.reloadRecordList || choosedWord) {
        void getClientsHelper();
        setChoosedWord(false);
        reloadRecordListContext.setReloadRecordList(false);
      }
    };
    getClients();
  }, [professionalIdContext.professional, reloadRecordListContext.reloadRecordList, choosedWord, offset]);

  useEffect(() => {
    const getClientsForSearcher = async () => {
      if (searchWords.length === 1 && recentlyTypedWord) {
        const _input = searchWords.length > 0 ? { ...input, search: searchWords } : input;
        const res = await refetchClients({ input: _input });

        setMatchedRecords(res.data.getClients.data.map((client) => client.user.firstName + ' ' + client.user.lastName));
        setRecentlyTypedWord(false);
      }
    };

    void getClientsForSearcher();
  }, [searchWords, recentlyTypedWord]);

  if (loadingClients) return <div>loading...</div>;
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
          <TableBody>{clients.length > 0 && clients.map((client, index) => <ClientItem key={index} client={client} />)}</TableBody>
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

export default ClientList;