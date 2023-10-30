import React from "react";
import PropTypes from "prop-types";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({}));

const RmsButton = ({ children, ...props }) => {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
};

RmsButton.propTypes = {
    children: PropTypes.node,
};

export default RmsButton;
