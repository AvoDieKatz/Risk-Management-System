import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/RmsButton.jsx";
import Panel from "../Panel/Panel.jsx";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import {
    Paper,
    Unstable_Grid2 as Grid,
    TextField,
    TablePagination,
    Typography,
    Avatar,
} from "@mui/material";
import moment from "moment";

const FilterOption = ({ ...props }) => {
    return <Button {...props}>Some filter</Button>;
};

const DataListPagination = ({ table }) => {
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

const DataList = ({ data, columns, setSelectedData }) => {
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

    return (
        <>
            <Grid
                container
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
                columnSpacing={2}
            >
                <Grid>
                    <FilterOption size={"small"} />
                </Grid>
                <Grid>
                    <TextField
                        label="Search"
                        type="search"
                        size="small"
                        variant={"outlined"}
                        value={globalFilter ?? ""}
                        onChange={(event) =>
                            setGlobalFilter(event.target.value)
                        }
                        sx={{ minWidth: 520 }}
                    />
                </Grid>
            </Grid>

            {table.getRowModel().rows.map((row) => (
                <Paper
                    key={row.id}
                    elevation={3}
                    sx={{
                        my: 2,
                        p: 2,
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.04)",
                        },
                    }}
                >
                    <Grid container direction={"column"}>
                        <Grid
                            container
                            justifyContent={"space-between"}
                            sx={{ color: "rgba(0,0,0,0.4)" }}
                        >
                            <Typography>#{row.original.id}</Typography>
                            <Typography>
                                Status: {row.original.status}
                            </Typography>
                        </Grid>
                        <Grid container>
                            <Grid container direction={"column"} flexGrow={5}>
                                <Typography
                                    sx={{ fontWeight: 600, fontSize: "1.5rem" }}
                                >
                                    {row.original.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontStyle: "italic",
                                        color: "rgba(0,0,0,0.6)",
                                    }}
                                >
                                    Category: {row.original.category.name}
                                </Typography>
                            </Grid>
                            <Grid container alignItems={"center"} flexGrow={1}>
                                Owner:{" "}
                                <Avatar alt={row.original.riskOwner.fullName} sx={{ml: 1, mr: 2}}/>
                                <Typography component={"span"}>
                                    {row.original.riskOwner.fullName}
                                </Typography>
                                {/* <Typography>
                                    Identified at:{" "}
                                    {moment(row.original.createdAt).format(
                                        "DD/MM/YYYY, HH:mm"
                                    )}
                                </Typography> */}
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} component="th" scope="row">
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </TableCell>
                    ))} */}
                </Paper>
            ))}

            <Grid
                container
                justifyContent={"flex-end"}
                alignItems={"center"}
                spacing={2}
            >
                <Grid>
                    <DataListPagination table={table} />
                </Grid>
            </Grid>
        </>
    );
};

DataList.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    setSelectedData: PropTypes.func,
};

DataListPagination.propTypes = {
    table: PropTypes.object.isRequired,
};

export default DataList;
