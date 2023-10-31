import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@mui/material";

const Panel = ({ children, ...props}) => {
    return (
        <Paper {...props} elevation={4} sx={{ p: 3 }}>
            {children}
        </Paper>
    );
};

Panel.propTypes = {
    data: PropTypes.array,
    children: PropTypes.node,
};

export default Panel;
