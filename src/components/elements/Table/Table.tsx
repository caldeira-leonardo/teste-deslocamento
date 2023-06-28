import React, { useEffect, useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from './styleTable';
import { TablePagination, Tooltip } from '@mui/material';
import _ from 'lodash';

interface CustomizedTableProps {
  rows: any;
  columns: { key: string; label: string; }[];
  onSelect(id: string): void;
  minWidth?: number;
}

const CustomizedTable = ({
  columns,
  rows,
  onSelect,
  minWidth,
}: CustomizedTableProps) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const visibleRows = useMemo(
    () => rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, rows],
  );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer component={Paper} data-testid="main-table">
        <Table sx={{ minWidth: minWidth || 700 }}>
          <TableHead>
            <TableRow>
              {columns?.map((column, i: number) => (
                <StyledTableCell key={i} align={i !== 0 ? 'right' : 'left'}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows?.map((row: any, index: number) => {
              return (
                <StyledTableRow key={index}>
                  {columns.map((column, i: number) => {
                    return (
                      <Tooltip
                        title={
                          column.key !== 'actions' ? row[`${column.key}`] : ''
                        }
                        key={i}
                        placement="right"
                      >
                        <StyledTableCell
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          align={i !== 0 ? 'right' : 'left'}
                          key={i}
                          onClick={() => onSelect(row.id)}
                        >
                          {row[`${column.key}`]?.length > 50
                            ? `${row[`${column.key}`].substr(0, 50)}...`
                            : row[`${column.key}`]}
                        </StyledTableCell>
                      </Tooltip>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CustomizedTable;
