// DataTable.tsx
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  VisibilityState,
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
  useTheme,
  useMediaQuery,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [pagination, setPagination] = React.useState({
    pageIndex,
    pageSize,
  });

  // Update column visibility based on screen size
  React.useEffect(() => {
    const newVisibility: VisibilityState = {};
    columns.forEach((col: any, index) => {
      if (isMobile) {
        // On mobile, show only first 2 columns
        newVisibility[col.accessorKey as string] = index < 2;
      } else if (isTablet) {
        // On tablet, show only first 3 columns
        newVisibility[col.accessorKey as string] = index < 3;
      } else {
        // On desktop, show all columns
        newVisibility[col.accessorKey as string] = true;
      }
    });
    setColumnVisibility(newVisibility);
  }, [isMobile, isTablet, columns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: totalCount !== undefined,
    pageCount: totalCount ? Math.ceil(totalCount / pageSize) : undefined,
    state: {
      pagination,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
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
    <TableContainer 
      component={Paper}
      sx={{
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#1e1e1e',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#444',
          borderRadius: '4px',
        },
      }}
    >
      <Table
        sx={{
          width: '100%',
          minWidth: isMobile ? 'unset' : 650,
          tableLayout: 'fixed',
          '& .MuiTableHead-root': {
            backgroundColor: '#333',
            '& .MuiTableCell-root': {
              color: '#fff',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              padding: isMobile ? '8px' : '16px',
              fontSize: isMobile ? '0.875rem' : '1rem',
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
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: isMobile ? '8px' : '16px',
            fontSize: isMobile ? '0.875rem' : '1rem',
          },
        }}
        aria-label="data table"
      >
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell 
                  key={header.id}
                  sx={{
                    width: isMobile ? 'auto' : `${100 / headerGroup.headers.length}%`,
                  }}
                >
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
                <TableCell 
                  key={cell.id}
                  sx={{
                    width: isMobile ? 'auto' : `${100 / row.getVisibleCells().length}%`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(totalCount || data.length > pageSize) && (
        <TablePagination
          rowsPerPageOptions={isMobile ? [5, 10] : [5, 10, 25, 50]}
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
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            },
          }}
        />
      )}
    </TableContainer>
  );
}