import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    AwaitConnectionIndicator,
    DataTable,
    DataList,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
    RmsButton as Button,
} from "../components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import threadService from "../services/ThreadService";
import { createColumnHelper } from "@tanstack/react-table";
import {
    Unstable_Grid2 as Grid,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableViewIcon from "@mui/icons-material/TableView";
import ViewListIcon from "@mui/icons-material/ViewList";

const MainPanel = ({ ...props }) => {
    const [viewStyle, setViewStyle] = useState("list");

    const handleViewStyle = (e, style) => {
        if (style !== null) {
            setViewStyle(style);
        }
    };

    return (
        <Panel>
            <Grid
                container
                spacing={2}
                sx={{
                    position: "absolute",
                }}
            >
                <Grid>
                    <Button
                        component={Link}
                        to={"add"}
                        size={"small"}
                        startIcon={<AddIcon />}
                    >
                        New Thread
                    </Button>
                </Grid>

                <Grid>
                    <ToggleButtonGroup
                        value={viewStyle}
                        exclusive
                        size="small"
                        onChange={handleViewStyle}
                        aria-label="view style"
                        sx={{
                            position: "absolute",
                        }}
                    >
                        <ToggleButton value="list" aria-label="list view">
                            <ViewListIcon />
                        </ToggleButton>
                        <ToggleButton value="table" aria-label="table view">
                            <TableViewIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>

            {/* {viewStyle === "list" ? (
                <DataList {...props} />
            ) : (
                <DataTable {...props} />
            )} */}

            <DataList {...props} />
        </Panel>
    );
};

const ThreadPage = () => {
    const {
        isLoading,
        isError,
        isPaused,
        data: fetchedData,
    } = useQuery({
        queryKey: ["threads"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await threadService.getThreads();
            return response.data;
        },
        meta: {
            errorMessage: "There is an error while loading threads data.",
        },
    });

    const tableColumnHelper = createColumnHelper();

    const columns = [
        tableColumnHelper.accessor("id", {
            header: () => "ID",
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("title", {
            header: () => <span>Title</span>,
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("status", {
            header: () => <span>Status</span>,
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("category.name", {
            header: () => <span>Category</span>,
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("author.fullName", {
            header: () => "Author",
            cell: (info) => info.renderValue(),
        }),
        tableColumnHelper.accessor("riskOwner.fullName", {
            header: () => <span>Risk Owner</span>,
        }),
        tableColumnHelper.accessor("riskOwner.fullName", {
            header: () => <span>Risk Owner</span>,
        }),
        // tableColumnHelper.display({
        //     id: "action",
        //     cell: ({ row }) => (
        //         <Button component={Link} to={`/${row.original.id}`}>
        //             Detail
        //         </Button>
        //     ),
        // }),
    ];

    return isPaused ? (
        <AwaitConnectionIndicator />
    ) : isLoading ? (
        <LoadingIndicator />
    ) : isError ? (
        <ErrorIndicator />
    ) : (
        <MainPanel data={fetchedData} columns={columns} />
    );
};

export default ThreadPage;
