import React from "react";
import StyledContainer from "..";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import constants from "../../shared/constants";

const ErrorIndicator = () => {
    return (
        <StyledContainer variant={"dimmed"} sx={{ height: "100%" }}>
            <StyledContainer variant={"centered"}>
                <ErrorIcon
                    sx={{
                        fontSize: 80,
                    }}
                />
                <Typography variant="body1" ml={2}>
                    {constants.messages.ERROR}
                </Typography>
            </StyledContainer>
        </StyledContainer>
    );
};

export default ErrorIndicator;
