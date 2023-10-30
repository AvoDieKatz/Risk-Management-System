import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    AwaitConnectionIndicator,
    DataTable,
    ErrorIndicator,
    LoadingIndicator,
    RmsButton,
} from "../../components";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/TestService";
import { getAccounts } from "../../services/AccountService";
import accountService from "../../services/AccountService";

const DataSidePanel = ({ data }) => {
    return (
        <Paper elevation={4} sx={{ p: 3 }}>
            {JSON.stringify(data, null, 2)}
        </Paper>
    );
};

const UserManagementPage = () => {
    const [selectedData, setSelectedData] = useState(null);

    const {
        isLoading,
        isError,
        isPaused,
        data: fetchedData,
    } = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            // const response = await getUsers();
            const response = await accountService.getAccounts();
            return response.data;
        },
        meta: {
            errorMessage: "There is an error while loading accounts data.",
        },
    });

    const tableColumnHelper = createColumnHelper();

    const columns = [
        tableColumnHelper.accessor("id", {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        tableColumnHelper.accessor("fullName", {
            cell: (info) => <i>{info.getValue()}</i>,
            header: () => <span>Name</span>,
        }),
        tableColumnHelper.accessor("gender", {
            cell: (info) => <i>{info.getValue().substring(0, 1)}</i>,
            header: () => <span>Gender</span>,
        }),
        tableColumnHelper.accessor("dob", {
            cell: (info) => <i>{info.getValue()}</i>,
            header: () => <span>Date of Birth</span>,
        }),
        tableColumnHelper.accessor("username", {
            header: () => "Username",
            cell: (info) => info.renderValue(),
        }),
        tableColumnHelper.accessor("phone", {
            header: () => <span>Phone</span>,
        }),
        tableColumnHelper.accessor("role", {
            header: () => "Role",
            cell: (info) => info.getValue(),
        }),
    ];

    // const columns = [
    //     tableColumnHelper.accessor("id", {
    //         cell: (info) => info.getValue(),
    //         footer: (info) => info.column.id,
    //     }),
    //     tableColumnHelper.accessor((row) => row.name, {
    //         id: "name",
    //         cell: (info) => <i>{info.getValue()}</i>,
    //         header: () => <span>Name</span>,
    //         footer: (info) => info.column.id,
    //     }),
    //     tableColumnHelper.accessor("username", {
    //         header: () => "Username",
    //         cell: (info) => info.renderValue(),
    //         footer: (info) => info.column.id,
    //     }),
    //     tableColumnHelper.accessor("phone", {
    //         header: () => <span>Phone</span>,
    //         footer: (info) => info.column.id,
    //     }),
    //     tableColumnHelper.accessor("address.city", {
    //         header: "City",
    //         footer: (info) => info.column.id,
    //         enableGlobalFilter: false,
    //     }),
    //     tableColumnHelper.accessor("company.name", {
    //         header: "Company",
    //         footer: (info) => info.column.id,
    //     }),
    // ];

    return (
        <Grid container disableEqualOverflow spacing={1}>
            <Grid flex={3}>
                {/* <Paper elevation={4} sx={{ p: 3 }}> */}
                {isPaused ? (
                    <AwaitConnectionIndicator />
                ) : isLoading ? (
                    <LoadingIndicator />
                ) : isError ? (
                    <ErrorIndicator />
                ) : (
                    <>
                        <RmsButton
                            component={Link}
                            to={"add"}
                            size={"small"}
                            startIcon={<AddIcon />}
                            sx={{
                                position: "absolute",
                            }}
                        >
                            Add User
                        </RmsButton>
                        <DataTable
                            data={fetchedData}
                            columns={columns}
                            setSelectedData={setSelectedData}
                        />
                    </>
                )}
                {/* </Paper> */}
            </Grid>

            {selectedData && (
                <Grid flex={1}>
                    <DataSidePanel data={selectedData} />
                </Grid>
            )}
        </Grid>
    );
};

export default UserManagementPage;

DataSidePanel.propTypes = {
    data: PropTypes.object,
};
