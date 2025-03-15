// DataTable.tsx
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  pageIndex?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<T>({
  data,
  columns,
  pageSize = 10,
  pageIndex = 0,
  totalCount,
  onPageChange,
}: TableProps<T>) {
  const [pagination, setPagination] = React.useState({
    pageIndex,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: totalCount !== undefined,
    pageCount: totalCount ? Math.ceil(totalCount / pageSize) : undefined,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    table.setPageIndex(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    table.setPageSize(newPageSize);
    setPagination({
      pageIndex: 0,
      pageSize: newPageSize,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          '& .MuiTableHead-root': {
            backgroundColor: '#333',
            '& .MuiTableCell-root': {
              color: '#fff',
              fontWeight: 'bold',
            },
          },
          '& .MuiTableRow-root:nth-of-type(odd)': {
            backgroundColor: '#2a2a2a',
          },
          '& .MuiTableRow-root:nth-of-type(even)': {
            backgroundColor: '#1e1e1e',
          },
          '& .MuiTableCell-root': {
            color: '#fff',
            borderBottom: '1px solid #444',
          },
        }}
        aria-label="data table"
      >
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(totalCount || data.length > pageSize) && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalCount || data.length}
          rowsPerPage={pagination.pageSize}
          page={pagination.pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: '#fff',
            backgroundColor: '#333',
            '& .MuiIconButton-root': {
              color: '#fff',
            },
          }}
        />
      )}
    </TableContainer>
  );
}