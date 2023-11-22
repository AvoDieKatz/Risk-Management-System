import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    styled,
} from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
    // fontSize: "52px"
    // padding: 4,
    // backgroundColor: theme.palette.primary.main,
}));

const AppDialog = ({ open, children, ...props }) => {
    // const handleClose = () => handleCloseCb();

    return (
        <StyledDialog open={open} {...props}>
            {children}
        </StyledDialog>
    );
};

export default AppDialog;

AppDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    // handleCloseCb: PropTypes.func.isRequired,
    children: PropTypes.node,
};
