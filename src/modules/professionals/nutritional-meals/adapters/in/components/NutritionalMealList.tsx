import React, { useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { useNutritionalMeal } from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealActions';
import { useSelector } from 'react-redux';
import NutritionalMealItem from 'src/modules/professionals/nutritional-meals/adapters/in/components/NutritionalMealItem';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import SearcherBar from 'src/shared/components/SearcherBar';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { GraphQLInput, ReduxStates } from 'src/shared/types/types';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import Paginator from 'src/shared/components/Paginator';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function NutritionalMealList() {
  const nutritionalMealList = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMeals);

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

  const { getNutritionalMeals } = useNutritionalMeal();
  const input: GraphQLInput = {
    professional: authContext.professional,
    offset: searchWords.length == 1 ? 0 : offset,
    limit: rowsPerPage,
  };
  if (searchWords.length > 0) input.search = searchWords;

  useEffect(() => {
    const getNutritionalMealsHelper = async () => {
      const res = await getNutritionalMeals(input);

      //todo : fix this
      setLength(res.data.getNutritionalMeals.meta.total);
      if (choosedWord && res.data.getNutritionalMeals.meta.total <= rowsPerPage) {
        setCurrentPage(0);
      }
    };

    const getNutritionalMealsFn = () => {
      if (authContext.professional || reloadRecordListContext.reloadRecordList || choosedWord) {
        void getNutritionalMealsHelper();
        setChoosedWord(false);
        reloadRecordListContext.setReloadRecordList(false);
      }
    };
    getNutritionalMealsFn();
  }, [authContext.professional, reloadRecordListContext.reloadRecordList, choosedWord, offset]);

  useEffect(() => {
    const getPatientsForSearcher = async () => {
      const res = await getNutritionalMeals(input);
      //todo : fix this
      setMatchedRecords(res.data.getNutritionalMeals.data.map((meal) => meal.name));
      setRecentlyTypedWord(false);
    };

    if (searchWords.length === 1 && recentlyTypedWord) {
      getPatientsForSearcher();
    }

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
              <StyledTableCell width={'15%'}>Meal name </StyledTableCell>
              <StyledTableCell align="right">Total Protein&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Total Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Total Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Total Calories&nbsp;(kcal)</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nutritionalMealList &&
              nutritionalMealList?.data.map((meal, index) => (
                <React.Fragment key={index}>
                  <NutritionalMealItem {...meal} />
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

export default NutritionalMealList;
