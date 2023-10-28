import React, { useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ProfessionalIdContext } from 'src/App';
import SearcherBar from 'src/shared/components/SearcherBar';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import ClientDetail from 'src/modules/clients/clients/adapters/in/components/ClientList/ClientDetail';
import { useClient } from 'src/shared/hooks/useClient';

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

  /* const { loading, refetch } = useQuery<GetClientResponse, GetClientsRequest>(GET_CLIENTS, {
    skip: true,
  });
  
  const [clients, setClients] = useState<ClientBody[]>([]); */
  const { loadingClients, refetchClients, clients, setClients } = useClient();

  const input = {
    professional: professionalIdContext.professional,
    offset: 0,
    limit: 10,
    state: 'active',
  };

  useEffect(() => {
    const _input = searchWords.length > 0 ? { ...input, search: searchWords } : input;
    const getClientsHelper = async () => {
      const res = await refetchClients({ input: _input });
      setClients(res.data.getClients.data);
    };
    const getClients = () => {
      if (professionalIdContext.professional || reloadRecordListContext.reloadRecordList || choosedWord) {
        void getClientsHelper();
        setChoosedWord(false);
        reloadRecordListContext.setReloadRecordList(false);
      }
    };
    getClients();
  }, [professionalIdContext.professional, reloadRecordListContext.reloadRecordList, choosedWord]);

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
              <TableCell>Name</TableCell>
              <TableCell>Group</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{clients.length > 0 && clients.map((client, index) => <ClientDetail key={index} client={client} />)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ClientList;
