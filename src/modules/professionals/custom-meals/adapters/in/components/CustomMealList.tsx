import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ProfessionalIdContext } from 'src/App';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { useCustomMeal } from 'src/modules/professionals/custom-meals/adapters/out/CustomMealActions';
import { useSelector } from 'react-redux';
import CustomMeal from 'src/modules/professionals/custom-meals/adapters/in/components/CustomMeal';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import SearcherBar from 'src/shared/components/SearcherBar';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';

// eslint-disable-next-line prettier/prettier
function CustomMealList() {
  const customMealList = useSelector((state: ReduxStates) => state.customMeals.customMealList);
  const professionalIdContext = useContext(ProfessionalIdContext);
  const reloadRecordListContext = useContext(ReloadRecordListContext);
  const [firstCall, setFirstCall] = useState(true);
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
  const { getCustomMeals } = useCustomMeal();

  useEffect(() => {
    const getCustomMealHelper = async () => {
      const _input = {
        professional: professionalIdContext.professional,
        offset: 0,
        limit: 10,
      };

      await getCustomMeals(_input);
    };
    if (professionalIdContext.professional && reloadRecordListContext.reloadRecordList) {
      void getCustomMealHelper();
      reloadRecordListContext.setReloadRecordList(false);
    }

    if (professionalIdContext.professional && firstCall) {
      void getCustomMealHelper();
      setFirstCall(false);
    }
  }, [professionalIdContext.professional, reloadRecordListContext.reloadRecordList]);

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
            {customMealList &&
              customMealList?.data.map((customMeal, index) => (
                <React.Fragment key={index}>
                  <CustomMeal {...customMeal} />
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CustomMealList;
