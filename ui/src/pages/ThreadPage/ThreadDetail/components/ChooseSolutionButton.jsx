import React, { useState } from "react";
import PropTypes from "prop-types";
import { RmsButton as Button } from "../../../../components";
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { PlanDetail } from "./ActionPlanDrawer.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import threadService from "../../../../services/ThreadService.js";
import { useAlert } from "../../../../contexts/AlertProvider.jsx";
import constants from "../../../../shared/constants.js";

const ConfirmButton = ({ handleCloseDialog, threadId, solutionId }) => {
    const { setOpen, setMessage, setSeverity } = useAlert();

    const queryClient = useQueryClient();
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: () =>
            threadService.chooseThreadSolution(threadId, solutionId),
        onSuccess: () => {
            queryClient.invalidateQueries(["threads", threadId, "solutions"]);
            setMessage("Solution plan chosen for thread!");
            setSeverity(constants.notification.SUCCESS);
        },
        onError: (err) => {
            setMessage(err.response?.data?.message ?? err.message);
            setSeverity(constants.notification.ERROR);
        },
        onSettled: () => {
            handleCloseDialog();
            setOpen(true);
        },
    });

    const handleClick = () => mutateAsync();

    return (
        <Button
            variant={"contained"}
            color={"success"}
            onClick={handleClick}
            disabled={isLoading}
        >
            Confirm {isLoading && <CircularProgress size={24} />}
        </Button>
    );
};

const ChooseSolutionButton = ({ selectedSolution, ...props }) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleClick = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = (e, reason) => {
        if ((reason == "backdropClick") | (reason == "escapeKeyDown")) return;
        setShowDialog(false);
    };

    return (
        <>
            <Button variant={"contained"} onClick={handleClick}>
                Choose solution
            </Button>
            <Dialog
                fullWidth
                maxWidth={"md"}
                open={showDialog}
                onClose={handleCloseDialog}
                scroll={"paper"}
                PaperProps={{
                    sx: {
                        height: 600,
                    },
                }}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    Confirm{" "}
                    <Typography
                        color={"secondary"}
                        fontStyle={"italic"}
                        fontSize={"1.5rem"}
                        component={"span"}
                    >
                        {selectedSolution?.type}
                    </Typography>{" "}
                    plan to be the resolution for this thread
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <PlanDetail
                        solution={selectedSolution}
                        sx={{ height: "100%" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color={"inherit"} onClick={handleCloseDialog}>
                        Close
                    </Button>
                    <ConfirmButton
                        handleCloseDialog={handleCloseDialog}
                        solutionId={selectedSolution?.id}
                        {...props}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
};

ConfirmButton.propTypes = {
    handleCloseDialog: PropTypes.func.isRequired,
    threadId: PropTypes.number.isRequired,
    solutionId: PropTypes.number.isRequired,
};

ChooseSolutionButton.propTypes = {
    selectedSolution: PropTypes.object.isRequired,
};

export default ChooseSolutionButton;
