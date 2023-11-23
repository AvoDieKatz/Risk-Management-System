import React from "react";
import StyledContainer from "..";
import { Typography } from "@mui/material";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";

const EmptyDataIndicator = () => {
    return (
        <StyledContainer variant={"dimmed"} sx={{ height: "100%" }}>
            <StyledContainer variant={"centered"}>
                <DoDisturbAltIcon />
                <Typography variant="body1" ml={2}>
                    No data
                </Typography>
            </StyledContainer>
        </StyledContainer>
    );
};

export default EmptyDataIndicator;
