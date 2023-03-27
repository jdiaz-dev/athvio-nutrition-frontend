import React, { useContext } from 'react';
import { TablePagination } from '@mui/material';
import { PaginationContext } from 'src/App';

function Paginator() {
  const paginationContext = useContext(PaginationContext);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (paginationContext.currentPage < newPage) {
      paginationContext.setOffset(paginationContext.offset + paginationContext.rowsPerPage);
    } else {
      paginationContext.setOffset(paginationContext.offset - paginationContext.rowsPerPage);
    }
    paginationContext.setCurrentPage(newPage);
  };

  return (
    <>
      <TablePagination
        component="div"
        count={paginationContext.length}
        page={paginationContext.currentPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[paginationContext.rowsPerPage]}
        rowsPerPage={paginationContext.rowsPerPage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Paginator;
