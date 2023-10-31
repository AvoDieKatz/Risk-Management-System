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
            header: () => "ID",
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("fullName", {
            header: () => <span>Name</span>,
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("gender", {
            header: () => <span>Gender</span>,
            cell: (info) => info.getValue().substring(0, 1),
        }),
        tableColumnHelper.accessor("dob", {
            header: () => <span>Date of Birth</span>,
            cell: (info) => info.getValue(),
            enableGlobalFilter: false,
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
