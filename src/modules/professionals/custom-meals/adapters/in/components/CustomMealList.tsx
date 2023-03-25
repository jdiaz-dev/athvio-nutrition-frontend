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
import { SearcherBarContext, ProfessionalIdContext, ReloadClientListContext } from 'src/App';

function CustomMealList({
  reloadCustomMealList,
  setReloadCustomMealList,
}: {
  reloadCustomMealList: boolean;
  setReloadCustomMealList: (reload: boolean) => void;
}) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadClientListContext = useContext(ReloadClientListContext);
  const searcherBarContext = useContext(SearcherBarContext);

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
  const [clients, setClients] = useState<Clients[]>([]);
  useEffect(() => {
    const _input =
      searcherBarContext.searchWords.length > 0 ? { ...input, search: searcherBarContext.searchWords } : input;
    const getClients = async () => {
      const res = await refetch({ input: _input });
      setClients(res.data.getClients.data);
    };

    const getClientsForSearcher = async () => {
      const res = await refetch({ input: _input });
      searcherBarContext.setMatchedRecords(
        res.data.getClients.data.map((client) => client.user.firstName + ' ' + client.user.lastName),
      );
    };

    const verifyOnlyReload = () => {
      if (reloadCustomMealList || reloadClientListContext.reloadClientList) {
        void getClients();
        setReloadCustomMealList(false);
        reloadClientListContext.setReloadClientList(false);
      }
    };

    const verifyNewWordToSearch = () => {
      if (searcherBarContext.searchWords.length === 1 && searcherBarContext.recentlyTypedWord) {
        void getClientsForSearcher();
        searcherBarContext.setRecentlyTypedWord(false);
      }
    };
    const verifyChosedWordsFromSearcher = () => {
      if (searcherBarContext.searchWords.length >= 0 && searcherBarContext.choosedWord) {
        void getClients();
        searcherBarContext.setChoosedWord(false);
      }
    };

    const vefifyFirstDataCallToServer = () => {
      if (data && !searcherBarContext.choosedWord && searcherBarContext.searchWords.length === 0) {
        setClients(data.getClients.data);
      }
    };
    verifyOnlyReload();
    verifyNewWordToSearch();
    verifyChosedWordsFromSearcher();
    vefifyFirstDataCallToServer();
  }, [
    reloadCustomMealList,
    reloadClientListContext.reloadClientList,
    searcherBarContext.searchWords,
    searcherBarContext.choosedWord,
    searcherBarContext.recentlyTypedWord,
    data,
  ]);

  if (loading) return <div>loading...</div>;
  return (
    <div>
      {clients.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Group</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {client.user.firstName} {client.user.lastName}
                  </TableCell>
                  {/* <TableCell component="th" scope="row">
                    <ManageClientGroup clientId={client._id} assignedGroups={client.groups} />
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default CustomMealList;
