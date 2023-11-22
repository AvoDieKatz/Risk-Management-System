import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import threadService from "../../services/ThreadService";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import {
    AwaitConnectionIndicator,
    DataDisplay,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
    RmsButton as Button,
} from "../../components";
import { AddThreadDialog } from ".";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import constants from "../../shared/constants";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Link,
    Skeleton,
    Typography,
} from "@mui/material";
import moment from "moment";

const ThreadFeedbackDialog = ({ open, handleClose, threadId }) => {
    console.log("THREAD ID FEEDBACK = ", threadId);
    const {
        isError,
        isLoading,
        data: fetchedData,
    } = useQuery({
        queryKey: ["threads", threadId, "feedback"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await threadService.getThreadReview(threadId);
            return response.data;
        },
    });

    return (
        <Dialog
            fullWidth
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
            scroll={"paper"}
        >
            {isLoading ? (
                <Skeleton variant="rounded" height={64} />
            ) : fetchedData?.approval ? (
                <DialogTitle
                    textAlign={"center"}
                    bgcolor={"success.main"}
                    color={"success.contrastText"}
                >
                    THREAD ACCEPTED
                </DialogTitle>
            ) : (
                <DialogTitle
                    textAlign={"center"}
                    bgcolor={"error.main"}
                    color={"error.contrastText"}
                >
                    THREAD REJECTED
                </DialogTitle>
            )}
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent
                sx={{
                    minHeight: 400,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {isLoading ? (
                    <Skeleton variant={"rounded"} height={120} width={"100%"} />
                ) : isError ? (
                    <ErrorIndicator />
                ) : (
                    <>
                        <DialogContentText paragraph mb={4}>
                            {fetchedData.content}
                        </DialogContentText>
                        <DialogContentText variant="body2">
                            Reviewed By: {fetchedData.reviewer?.fullName} on{" "}
                            {moment(fetchedData?.createdAt).format("lll")}
                        </DialogContentText>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

const MainPanel = ({ ...props }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClick = () => setOpenDialog(true);

    const handleDialogClose = (e, reason) => {
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

                <DataDisplay {...props} />
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

const SubmissionsPage = () => {
    const [showFeedback, setShowFeedback] = useState(false);
    const selectedThreadId = useRef(-1);

    const handleShowFeedback = () => setShowFeedback(true);

    const handleCloseFeedback = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        selectedThreadId.current = -1;
        setShowFeedback(false);
    };

    const {
        isLoading,
        isError,
        isPaused,
        data: fetchedData,
    } = useQuery({
        queryKey: ["threads", "submissions"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await threadService.getPersonalThreads(
                "submissions"
            );
            return response.data;
        },
    });

    const tableColumnHelper = createColumnHelper();

    const navigate = useNavigate();

    const handleItemClick = (event, item) => {
        if (event.target.name !== "feedbackLink") {
            navigate(`/thread/${item.id}`);
        } else {
            event.stopPropagation();
            console.log("FEEDBACK CLIKDE");
        }
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
        tableColumnHelper.accessor("category.name", {
            header: () => <span>Category</span>,
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("author.fullName", {
            header: () => "Author",
            cell: (info) => info.renderValue(),
        }),
        tableColumnHelper.accessor("status", {
            header: () => <span>Status</span>,
            cell: (info) => {
                const value = info.getValue();
                let color = "success.main";
                switch (value) {
                    case constants.status.IDENTIFIED:
                        color = "warning.main";
                        break;
                    case constants.status.ACTIVE:
                        color = "primary.main";
                        break;
                    case constants.status.REJECTED:
                        color = "error.main";
                        break;
                    case constants.status.RESOLVED:
                        color = "success.main";
                        break;
                }
                return value === constants.status.IDENTIFIED ? (
                    <>
                        <Typography color={color}>{value}</Typography>
                        <Typography variant="dimmed">In Review</Typography>
                    </>
                ) : (
                    <>
                        <Typography color={color}>{value}</Typography>
                        <Link
                            component="button"
                            variant="body2"
                            color="inherit"
                            underline="hover"
                            name="feedbackLink"
                            onClick={() => {
                                selectedThreadId.current = info.row.original.id;
                                handleShowFeedback();
                            }}
                        >
                            See feedback
                        </Link>
                    </>
                );
            },
        }),
    ];

    return isPaused ? (
        <AwaitConnectionIndicator />
    ) : isLoading ? (
        <LoadingIndicator />
    ) : isError ? (
        <ErrorIndicator />
    ) : (
        <>
            <MainPanel
                data={fetchedData}
                columns={columns}
                handleItemClick={handleItemClick}
            />
            {showFeedback && (
                <ThreadFeedbackDialog
                    open={showFeedback}
                    handleClose={handleCloseFeedback}
                    threadId={selectedThreadId.current}
                />
            )}
        </>
    );
};

ThreadFeedbackDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    threadId: PropTypes.number.isRequired,
};

export default SubmissionsPage;
