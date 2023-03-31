import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Clients, GetClientResponse, GetClientsRequest } from 'src/modules/clients/clients/adapters/out/client.types';
import { GET_CLIENTS } from 'src/modules/clients/clients/adapters/out/ClientQueries';
import { useQuery } from '@apollo/client';
import { ProfessionalIdContext } from 'src/App';
import ManageClientGroup from 'src/modules/clients/clients/adapters/in/components/ClientList/ManageClientGroup';
import SearcherBar from 'src/shared/components/SearcherBar';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';

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
  // console.log('---------------------clientListCalled');
  const input = {
    professional: professionalIdContext.professional,
    offset: 0,
    limit: 10,
    state: 'inactive',
  };
  const { data, loading, refetch } = useQuery<GetClientResponse, GetClientsRequest>(GET_CLIENTS, {
    variables: {
      input,
    },
  });

  const [clients, setClients] = useState<Clients[]>([]);

  useEffect(() => {
    const _input = searchWords.length > 0 ? { ...input, search: searchWords } : input;
    const getClients = async () => {
      const res = await refetch({ input: _input });
      setClients(res.data.getClients.data);
    };

    const getClientsForSearcher = async () => {
      const res = await refetch({ input: _input });
      setMatchedRecords(res.data.getClients.data.map((client) => client.user.firstName + ' ' + client.user.lastName));
    };

    const verifyOnlyReload = () => {
      if (reloadRecordListContext.reloadRecordList) {
        void getClients();
        reloadRecordListContext.setReloadRecordList(false);
      }
    };

    const verifyNewWordToSearch = () => {
      if (searchWords.length === 1 && recentlyTypedWord) {
        void getClientsForSearcher();
        setRecentlyTypedWord(false);
      }
    };
    const verifyChosedWordsFromSearcher = () => {
      if (searchWords.length >= 0 && choosedWord) {
        void getClients();
        setChoosedWord(false);
      }
    };

    const vefifyFirstDataCallToServer = () => {
      if (data && !choosedWord && searchWords.length === 0) {
        setClients(data.getClients.data);
      }
    };
    verifyOnlyReload();
    verifyNewWordToSearch();
    verifyChosedWordsFromSearcher();
    vefifyFirstDataCallToServer();
  }, [reloadRecordListContext.reloadRecordList, searchWords, choosedWord, recentlyTypedWord, data]);

  if (loading) return <div>loading...</div>;
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
              <TableCell>Name</TableCell>
              <TableCell>Group</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.length > 0 &&
              clients.map((client) => (
                <TableRow key={client._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {client.user.firstName} {client.user.lastName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ManageClientGroup client={client._id} assignedGroups={client.groups} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ClientList;
