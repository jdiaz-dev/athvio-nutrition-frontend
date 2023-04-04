import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ProfessionalIdContext } from 'src/App';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { useCustomRecipe } from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeActions';
import { useSelector } from 'react-redux';
import CustomRecipe from 'src/modules/professionals/custom-recipes/adapters/in/components/CustomRecipe';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import SearcherBar from 'src/shared/components/SearcherBar';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { ReduxStates } from 'src/shared/types/types';

// eslint-disable-next-line prettier/prettier
function CustomRecipeList() {
  const customRecipeList = useSelector((state: ReduxStates) => state.customRecipes.customRecipes);
  console.log('----------customRecipeList', customRecipeList);

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
  const { getCustomRecipes } = useCustomRecipe();

  useEffect(() => {
    const getCustomRecipeHelper = async () => {
      const _input = {
        professional: professionalIdContext.professional,
        offset: 0,
        limit: 10,
      };

      await getCustomRecipes(_input);
    };
    if (professionalIdContext.professional && reloadRecordListContext.reloadRecordList) {
      void getCustomRecipeHelper();
      reloadRecordListContext.setReloadRecordList(false);
    }

    if (professionalIdContext.professional && firstCall) {
      void getCustomRecipeHelper();
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
    </>
  );
}

export default CustomRecipeList;
