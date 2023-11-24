import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import threadService from "../../services/ThreadService";
import { createColumnHelper } from "@tanstack/react-table";
import {
    AwaitConnectionIndicator,
    DataDisplay,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
    RmsButton as Button,
} from "../../components";
import {
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    ButtonGroup,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Stack,
    Unstable_Grid2 as Grid,
    TextField,
    Typography,
    CircularProgress,
    Divider,
    IconButton,
    Skeleton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { RatingBar } from "./ThreadDetail/components/Assessment.jsx";
import { useAlert } from "../../contexts";
import constants from "../../shared/constants";
import { useNavigate } from "react-router-dom";

const feedbackOptions = ["Comment & Accept", "Comment & Reject"];

const SubmitButton = ({ handleOptionSelected, isSubmitting }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        if (index == 0) {
            handleOptionSelected(true);
        } else if (index == 1) {
            handleOptionSelected(false);
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="split button"
                color={selectedIndex == 1 ? "error" : "success"}
            >
                <Button type="submit">{feedbackOptions[selectedIndex]}</Button>
                <Button
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <CircularProgress
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        <ArrowDropDownIcon />
                    )}
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {feedbackOptions.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) =>
                                                handleMenuItemClick(
                                                    event,
                                                    index
                                                )
                                            }
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

const ThreadDetail = ({ data }) => {
    const {
        isLoading,
        isError,
        data: assessmentData,
    } = useQuery({
        queryKey: ["threads", data.id, "assessment"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await threadService.getThreadAssessment(data.id);
            return response.data;
        },
        meta: {
            errorMessage: "There is an error while loading assessment data.",
        },
    });

    return (
        <Stack spacing={2}>
            <Grid container justifyContent={"space-between"}>
                <Typography variant="dimmed">
                    #{data?.id} by {data?.author?.fullName} on{" "}
                    {moment(data?.createdAt).format("DD/MM/YYYY, HH:mm")}
                </Typography>
            </Grid>

            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {data?.title}
            </Typography>
            <Grid container justifyContent={"space-between"}>
                <Typography sx={{ fontWeight: "bold" }}>
                    Category:{" "}
                    <Typography component={"span"}>
                        {data?.category?.name}
                    </Typography>
                </Typography>
            </Grid>

            <Grid container>
                <Grid flex={1}>
                    <Typography variant="h6">Likelihood</Typography>
                    {isLoading ? (
                        <Skeleton variant="rounded" height={20} />
                    ) : isError ? (
                        <ErrorIndicator />
                    ) : (
                        <RatingBar data={assessmentData.likelihoodList} />
                    )}
                </Grid>
                <Grid flex={1}>
                    <Typography variant="h6">Severity</Typography>
                    {isLoading ? (
                        <Skeleton variant="rounded" height={20} />
                    ) : isError ? (
                        <ErrorIndicator />
                    ) : (
                        <RatingBar data={assessmentData.severityList} />
                    )}
                </Grid>
            </Grid>

            <Typography variant="h6">Detail</Typography>
            <Typography variant="body1">{data?.description}</Typography>
        </Stack>
    );
};

const ReviewDialog = ({ open, handleClose, selectedData }) => {
    const approval = useRef(true);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            content: "",
            approval: approval.current,
        },
    });

    const handleOptionSelected = (option) => setValue("approval", option);

    const navigate = useNavigate();

    const { setOpen, setMessage, setSeverity } = useAlert();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (request) =>
            threadService.reviewThread(selectedData.id, request),
        onSuccess: (res) => {
            queryClient.invalidateQueries(["threads"]);
            queryClient.invalidateQueries(["threads", selectedData.id]);
            queryClient.invalidateQueries(["threads", "proposals"]);
            setMessage(res?.response?.data?.message ?? "Feedback Provided!");
            setSeverity(constants.notification.SUCCESS);
        },
        onError: (err) => {
            setMessage(err?.response?.data?.message ?? err.message);
            setSeverity(constants.notification.ERROR);
        },
        onSettled: () => {
            reset();
            handleClose();
            setOpen(true);
            navigate(`/thread/${selectedData.id}`);
        },
    });

    const onSubmit = async (data) => {
        const request = { ...data };
        return mutation.mutateAsync(request);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
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
            <DialogContent sx={{ minHeight: 540, mb: 4 }}>
                <ThreadDetail data={selectedData} />
            </DialogContent>
            <Divider sx={{ my: 2 }} />
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogActions sx={{ paddingBottom: 12 }}>
                    <Stack
                        spacing={2}
                        sx={{ width: "100%", alignItems: "end" }}
                    >
                        <Controller
                            control={control}
                            name="content"
                            rules={{ required: "Please provide some comment!" }}
                            render={({
                                field,
                                fieldState: { error, invalid },
                            }) => (
                                <TextField
                                    {...field}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={invalid}
                                    helperText={error?.message}
                                    margin="dense"
                                    id="reviewContent"
                                    label="Comment"
                                    fullWidth
                                    multiline
                                    rows={3}
                                />
                            )}
                        />
                        <SubmitButton
                            handleOptionSelected={handleOptionSelected}
                            isSubmitting={isSubmitting}
                        />
                    </Stack>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

const MainPanel = ({ ...props }) => {
    const [selectedData, setSelectedData] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const handleItemClick = (e, item) => {
        if (item !== null) {
            setSelectedData(item);
            setShowDialog(true);
        }
    };

    const handleDialogClose = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        setShowDialog(false);
    };

    return (
        <>
            <Panel>
                <DataDisplay {...props} handleItemClick={handleItemClick} />
            </Panel>

            {showDialog && (
                <ReviewDialog
                    open={showDialog}
                    handleClose={handleDialogClose}
                    selectedData={selectedData}
                />
            )}
        </>
    );
};

const ProposalsPage = () => {
    const {
        isLoading,
        isError,
        isPaused,
        data: fetchedData,
    } = useQuery({
        queryKey: ["threads", "proposals"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await threadService.getThreads("IDENTIFIED");
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

export default ProposalsPage;

ThreadDetail.propTypes = {
    data: PropTypes.object.isRequired,
};

ReviewDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedData: PropTypes.object.isRequired,
};

SubmitButton.propTypes = {
    handleOptionSelected: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
};
