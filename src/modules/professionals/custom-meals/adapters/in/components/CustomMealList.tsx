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
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import CustomMeal from 'src/modules/professionals/custom-meals/adapters/in/components/CustomMeal';
import { useCustomMeal } from 'src/modules/professionals/custom-meals/adapters/out/CustomMealActions';

async function CustomMealList({
  reloadCustomMealList,
  setReloadCustomMealList,
}: {
  reloadCustomMealList: boolean;
  setReloadCustomMealList: (reload: boolean) => void;
}) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadClientListContext = useContext(ReloadClientListContext);
  const searcherBarContext = useContext(SearcherBarContext);
  const { getCustomMeals } = useCustomMeal();
  const input = {
    professionalId: professionalIdContext.professionalId,
    offset: 0,
    limit: 10,
  };
  const { data: _data } = await getCustomMeals(input);
  console.log('------------_data', _data);
  const { data, loading, refetch } = useQuery<GetClientResponse, GetClientsRequest>(GET_CLIENTS, {
    variables: {
      input,
    },
  });
  const [clients, setClients] = useState<Clients[]>([]);
  useEffect(() => {
    const getCustomMealHelper = async () => {
      await getCustomMeals(input);
    };
    void getCustomMealHelper();
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
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={'15%'}>Amount (g) </StyledTableCell>
              <StyledTableCell align="right">Food</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Calories&nbsp;(kcal)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{/* <CustomMeal /> */}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CustomMealList;
