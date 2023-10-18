import React from "react";
import PropTypes from "prop-types";
import { Box, styled } from "@mui/material";

const CenteredBox = styled(Box)(() => ({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const DimmedBox = styled(Box)(() => ({
    opacity: 0.48,
}));

const variantsMapping = {
    centered: CenteredBox,
    dimmed: DimmedBox,
};

const StyledContainer = ({ children, variant, ...props }) => {
    const StyledBox = variantsMapping[variant] ?? null;
    return <StyledBox {...props}>{children}</StyledBox>;
};

StyledContainer.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(Object.keys(variantsMapping)),
};

export default StyledContainer;
