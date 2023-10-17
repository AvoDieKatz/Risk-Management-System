import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Unstable_Grid2 as Grid,
    Button,
    TableSortLabel,
    TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
    getCoreRowModel,
    flexRender,
    useReactTable,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

const FilterOption = ({ ...props }) => {
    return <Button {...props}>Some filter</Button>;
};

const AddRecordButton = ({ label, ...props }) => {
    return (
        <Button size={"small"} startIcon={<AddIcon />} {...props}>
            {label}
        </Button>
    );
};

const DataTablePagination = ({ table }) => {
    const { getCoreRowModel, getState, setPageIndex, setPageSize } = table;

    const handleChangePage = (event, newPage) => {
        setPageIndex(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageIndex(0);
    };

    return (
        <TablePagination
            component="div"
            count={getCoreRowModel().rows.length}
            page={getState().pagination.pageIndex}
            labelRowsPerPage={"Rows:"}
            onPageChange={handleChangePage}
            rowsPerPage={getState().pagination.pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
};

const DataTable = ({ data, columns, setSelectedData }) => {
    const [sorting, setSorting] = useState();
    const [globalFilter, setGlobalFilter] = useState("");
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [selectedRow, setSelectedRow] = useState(-1);

    const pagination = useMemo(
        () => ({ pageIndex, pageSize }),
        [pageIndex, pageSize]
    );

    const table = useReactTable({
        data: data,
        columns: columns,
        state: {
            sorting,
            globalFilter,
            pagination,
        },
        enableSorting: true,
        enableSortingRemoval: true,
        enableFilters: true,
        enableGlobalFilter: true,
        autoResetPageIndex: true,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });

    const handleRowClick = (event, row) => {
        if (selectedRow == row.id) {
            setSelectedRow(-1);
            setSelectedData(null);
        } else {
            setSelectedRow(row.id);
            setSelectedData(row.original);
        }
    };

    return (
        <>
            <Grid
                container
                justifyContent={"space-between"}
                alignItems={"flex-end"}
                columnSpacing={2}
            >
                <Grid flexGrow={2}>
                    <AddRecordButton label={"Add User"} />
                </Grid>
                <Grid>
                    <FilterOption size={"small"} />
                </Grid>
                <Grid>
                    <TextField
                        label="Search field"
                        type="search"
                        size="small"
                        variant={"standard"}
                        value={globalFilter ?? ""}
                        onChange={(event) =>
                            setGlobalFilter(event.target.value)
                        }
                        sx={{ minWidth: 520 }}
                    />
                </Grid>
            </Grid>

            <TableContainer component={Paper} elevation={2} sx={{ my: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} align="right">
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id}>
                                        <TableSortLabel
                                            // getIsSorted() return false | enum SortDirection so use sc evaluation to surpress warning
                                            active={
                                                header.column.getIsSorted() &&
                                                true
                                            }
                                            direction={
                                                header.column.getIsSorted()
                                                    ? header.column.getIsSorted()
                                                    : "asc"
                                            }
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                onClick={(event) => handleRowClick(event, row)}
                                selected={selectedRow === row.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                    cursor: "pointer",
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        component="th"
                                        scope="row"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid
                container
                justifyContent={"flex-end"}
                alignItems={"center"}
                spacing={2}
            >
                <Grid>
                    <DataTablePagination table={table} />
                </Grid>
            </Grid>
        </>
    );
};

AddRecordButton.propTypes = {
    label: PropTypes.string,
};

DataTablePagination.propTypes = {
    table: PropTypes.object.isRequired,
};

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    setSelectedData: PropTypes.func,
};

export default DataTable;