import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThemeMode } from 'src/shared/types/config';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.common.black : theme.palette.grey[600],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
