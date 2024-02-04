import React, { useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { useCustomRecipe } from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeActions';
import { useSelector } from 'react-redux';
import CustomRecipe from 'src/modules/professionals/custom-recipes/adapters/in/components/CustomRecipe';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import SearcherBar from 'src/shared/components/SearcherBar';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { GraphQLInput, ReduxStates } from 'src/shared/types/types';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import Paginator from 'src/shared/components/Paginator';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function CustomRecipeList() {
  const customRecipeList = useSelector((state: ReduxStates) => state.customRecipes.customRecipes);

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

  const { getCustomRecipes } = useCustomRecipe();
  const input: GraphQLInput = {
    professional: authContext.professional,
    offset: searchWords.length == 1 ? 0 : offset,
    limit: rowsPerPage,
  };
  if (searchWords.length > 0) input.search = searchWords;

  useEffect(() => {
    const getCustomRecipesHelper = async () => {
      const res = await getCustomRecipes(input);
      setLength(res.data.getCustomRecipes.meta.total);
      if (choosedWord && res.data.getCustomRecipes.meta.total <= rowsPerPage) {
        setCurrentPage(0);
      }
    };

    const getCustomRecipesFn = () => {
      if (authContext.professional || reloadRecordListContext.reloadRecordList || choosedWord) {
        void getCustomRecipesHelper();
        setChoosedWord(false);
        reloadRecordListContext.setReloadRecordList(false);
      }
    };
    getCustomRecipesFn();
  }, [authContext.professional, reloadRecordListContext.reloadRecordList, choosedWord, offset]);

  useEffect(() => {
    const getPatientsForSearcher = async () => {
      if (searchWords.length === 1 && recentlyTypedWord) {
        const res = await getCustomRecipes(input);

        setMatchedRecords(res.data.getCustomRecipes.data.map((recipe) => recipe.name));
        setRecentlyTypedWord(false);
      }
    };

    void getPatientsForSearcher();
  }, [searchWords, recentlyTypedWord]);

  return (
    <>
      <SearcherBar
        setSearchWords={setSearchWords}
        matchedRecords={matchedRecords}
        setChoosedWord={setChoosedWord}
        setRecentlyTypedWord={setRecentlyTypedWord}
      />
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={'15%'}>Recipe name </StyledTableCell>
              <StyledTableCell align="right">Total Protein&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Total Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Total Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Total Calories&nbsp;(kcal)</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customRecipeList &&
              customRecipeList?.data.map((customRecipe, index) => (
                <React.Fragment key={index}>
                  <CustomRecipe {...customRecipe} />
                </React.Fragment>
              ))}
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

export default CustomRecipeList;
