import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.secondary,
    color: colors.textLight,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: colors.secondary,
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {},
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
