import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({}));

const RmsButton = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

RmsButton.propTypes = {
    children: PropTypes.node,
};

export default RmsButton;
