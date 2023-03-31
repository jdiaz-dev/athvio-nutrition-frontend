import { useState } from 'react';

export const usePaginator = () => {
  const [length, setLength] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  return { length, setLength, offset, setOffset, rowsPerPage, setRowsPerPage, currentPage, setCurrentPage };
};
