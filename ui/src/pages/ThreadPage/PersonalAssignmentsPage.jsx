import React, { useState } from "react";
import {
    AwaitConnectionIndicator,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
    RmsButton as Button,
    DataDisplay,
} from "../../components";
import { useQuery } from "@tanstack/react-query";
import threadService from "../../services/ThreadService";
import { createColumnHelper } from "@tanstack/react-table";
import { Unstable_Grid2 as Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddThreadDialog } from "./";
import { useNavigate } from "react-router-dom";

const MainPanel = ({ ...props }) => {
    const [viewStyle, setViewStyle] = useState("list");
    const [viewType, setViewType] = useState("assigned");
    const [openDialog, setOpenDialog] = useState(false);

    const handleViewStyleChange = (e, style) => {
        if (style !== null) {
            setViewStyle(style);
        }
    };

    const handleViewType = (e, type) => {
        if (type != null) {
            setViewType(type);
        }
    };

    const handleClick = () => setOpenDialog(true);

    const handleDialogClose = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        setOpenDialog(false);
    };

    return (
        <>
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
                            size={"small"}
                            startIcon={<AddIcon />}
                            onClick={handleClick}
                        >
                            New Thread
                        </Button>
                    </Grid>
                </Grid>

                <DataDisplay
                    {...props}
                    viewStyle={viewStyle}
                    onViewStyleChange={handleViewStyleChange}
                />
            </Panel>

            {openDialog && (
                <AddThreadDialog
                    open={openDialog}
                    handleClose={handleDialogClose}
                />
            )}
        </>
    );
};

const PersonalAssignmentsPage = () => {
    const {
        isLoading,
        isError,
        isPaused,
        data: fetchedData,
    } = useQuery({
        queryKey: ["threads", "personal"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await threadService.getPersonalThreads();
            return response.data;
        },
        meta: {
            errorMessage: "There is an error while loading threads data.",
        },
    });

    const tableColumnHelper = createColumnHelper();

    const navigate = useNavigate();

    const handleItemClick = (event, item) => {
        navigate(`/thread/${item.id}`);
    };

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
        <MainPanel
            data={fetchedData}
            columns={columns}
            handleItemClick={handleItemClick}
        />
    );
};

export default PersonalAssignmentsPage;
