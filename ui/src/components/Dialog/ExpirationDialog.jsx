import React, { useContext } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import { AuthContext, useAlert } from "../../contexts";

const ExpirationDialog = () => {
    const { openModal, setOpenModal } = useAlert();
    const { handleDeauth } = useContext(AuthContext);
    const handleClick = () => {
        setOpenModal(false);
        handleDeauth()
    };

    const handleClose = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        setOpenModal(false);
    };

    return (
        <Dialog
            open={openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Session Expired</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Your session has been expired, please login again.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClick} autoFocus>
                    Return to login
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExpirationDialog;
