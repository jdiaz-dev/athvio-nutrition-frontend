import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell } from 'src/shared/components/CustomizedTable';
import { useSelector } from 'react-redux';
import { useSearcher } from 'src/shared/hooks/useSearcher';
import SearcherBar from 'src/shared/components/SearcherAndSelector/SearcherBar';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { GraphQLInput, ReduxStates } from 'src/shared/types/types';
import Program from 'src/modules/professionals/programs/adapters/in/components/Program';
import { useProgram } from 'src/modules/professionals/programs/adapters/out/ProgramActions';
import Paginator from 'src/shared/components/Paginator';
import { usePaginator } from 'src/shared/hooks/usePaginator';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

// eslint-disable-next-line prettier/prettier
function ProgramList() {
  const programs = useSelector((state: ReduxStates) => state.programs.programs);
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
  const { getPrograms } = useProgram();
  const { length, setLength, offset, setOffset, rowsPerPage, currentPage, setCurrentPage } = usePaginator(5);

  const input: GraphQLInput = {
    professional: authContext.professional,
    offset: searchWords.length == 1 ? 0 : offset,
    limit: rowsPerPage,
  };
  if (searchWords.length > 0) input.search = searchWords;

  useEffect(() => {
    const getProgramsHelper = async () => {
      const res = await getPrograms(input);
      setLength(res.data.getPrograms.meta.total);
      if (choosedWord && res.data.getPrograms.meta.total <= rowsPerPage) {
        setCurrentPage(0);
      }
    };

    const getProgramsFn = () => {
      if (authContext.professional || reloadRecordListContext.reloadRecordList || choosedWord) {
        void getProgramsHelper();
        setChoosedWord(false);
        reloadRecordListContext.setReloadRecordList(false);
      }
    };
    getProgramsFn();
  }, [authContext.professional, reloadRecordListContext.reloadRecordList, choosedWord, offset]);

  useEffect(() => {
    const getPatientsForSearcher = async () => {
      if (searchWords.length === 1 && recentlyTypedWord) {
        const res = await getPrograms(input);

        setMatchedRecords(res.data.getPrograms.data.map((program) => program.name));
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
      <TableContainer component={Paper} style={{ marginTop: '15px' }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={'20%'} align="center">
                Name{' '}
              </StyledTableCell>
              <StyledTableCell width={'55%'} align="center">Description</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell width={'5%'} align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs !== null &&
              programs.data.map((program, index) => (
                <React.Fragment key={index}>
                  <Program {...program} />
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

export default ProgramList;
