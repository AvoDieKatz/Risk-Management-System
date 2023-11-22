import React from "react";
import PropTypes from "prop-types";
import { Paper, styled } from "@mui/material";

const StyledPanel = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "elevation",
})(({ elevation, theme }) => ({
    padding: theme.spacing(3),
    boxShadow: theme.shadows[4],
    ...(elevation && { boxShadow: theme.shadows[elevation] }),
}));

const Panel = ({ children, ...props }) => {
    return <StyledPanel {...props}>{children}</StyledPanel>;
};

Panel.propTypes = {
    data: PropTypes.array,
    children: PropTypes.node,
};

export default Panel;
