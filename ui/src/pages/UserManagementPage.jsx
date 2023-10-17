import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    AwaitConnectionIndicator,
    DataTable,
    ErrorIndicator,
    LoadingIndicator,
} from "../components";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/TestService";
import { createColumnHelper } from "@tanstack/react-table";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

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
        queryKey: ["fetchUsers"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await getUsers();
            return response.data;
        },
    });

    const tableColumnHelper = createColumnHelper();

    const columns = [
        tableColumnHelper.accessor("id", {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        tableColumnHelper.accessor((row) => row.name, {
            id: "name",
            cell: (info) => <i>{info.getValue()}</i>,
            header: () => <span>Name</span>,
            footer: (info) => info.column.id,
        }),
        tableColumnHelper.accessor("username", {
            header: () => "Username",
            cell: (info) => info.renderValue(),
            footer: (info) => info.column.id,
        }),
        tableColumnHelper.accessor("phone", {
            header: () => <span>Phone</span>,
            footer: (info) => info.column.id,
        }),
        tableColumnHelper.accessor("address.city", {
            header: "City",
            footer: (info) => info.column.id,
            enableGlobalFilter: false,
        }),
        tableColumnHelper.accessor("company.name", {
            header: "Company",
            footer: (info) => info.column.id,
        }),
    ];

    return (
        <Grid
            container
            disableEqualOverflow
            spacing={1}
            // sx={{
            //     "&>.MuiGrid2-root": { height: "100%" },
            // }}
        >
            <Grid flex={3}>
                <Paper elevation={4} sx={{ p: 3 }}>
                    {isPaused ? (
                        <AwaitConnectionIndicator />
                    ) : isLoading ? (
                        <LoadingIndicator />
                    ) : isError ? (
                        <ErrorIndicator />
                    ) : (
                        <DataTable
                            data={fetchedData}
                            columns={columns}
                            setSelectedData={setSelectedData}
                        />
                    )}
                </Paper>
            </Grid>

            {selectedData && (
                <Grid
                    flex={1}
                    // sx={{
                    //     display: `${selectedData != null ? "block" : "none"}`,
                    // }}
                >
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
