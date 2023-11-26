import React from 'react';
import { TablePagination } from '@mui/material';

function Paginator({
  length,
  offset,
  setOffset,
  rowsPerPage,
  currentPage,
  setCurrentPage,
}: {
  length: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (currentPage < newPage) {
      setOffset(offset + rowsPerPage);
    } else {
      setOffset(offset - rowsPerPage);
    }
    setCurrentPage(newPage);
  };

  return (
    <>
      <TablePagination
        component="div"
        count={length}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[rowsPerPage]}
        rowsPerPage={rowsPerPage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Paginator;
