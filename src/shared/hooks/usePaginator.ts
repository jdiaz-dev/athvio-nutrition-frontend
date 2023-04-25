import { useState } from 'react';

export const usePaginator = (rows: number) => {
  const [length, setLength] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(rows);
  const [currentPage, setCurrentPage] = useState<number>(0);

  return { length, setLength, offset, setOffset, rowsPerPage, setRowsPerPage, currentPage, setCurrentPage };
};
