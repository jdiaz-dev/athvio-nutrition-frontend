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
import Program from 'src/modules/professionals/programs/adapters/in/components/Program';
import { useProgram } from 'src/modules/professionals/programs/adapters/out/ProgramActions';

// eslint-disable-next-line prettier/prettier
function ProgramList() {
  const programList = useSelector((state: ReduxStates) => state.programs.programList);
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
  const { getPrograms } = useProgram();

  useEffect(() => {
    const getProgramHelper = async () => {
      const _input = {
        professional: professionalIdContext.professional,
        offset: 0,
        limit: 10,
      };

      await getPrograms(_input);
    };
    if (professionalIdContext.professional && reloadRecordListContext.reloadRecordList) {
      void getProgramHelper();
      reloadRecordListContext.setReloadRecordList(false);
    }

    if (professionalIdContext.professional && firstCall) {
      void getProgramHelper();
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
              <StyledTableCell width={'15%'}>Name </StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programList &&
              programList?.data.map((program, index) => (
                <React.Fragment key={index}>
                  <Program {...program} />
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProgramList;
