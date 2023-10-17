import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import constants from "../../shared/constants";
import StyledContainer from "../";

const LoadingIndicator = () => {
    return (
        <StyledContainer variant={"centered"} sx={{ height: "100%" }}>
            <Stack spacing={3} alignItems={"center"}>
                <CircularProgress />
                <Typography variant="h6" sx={{ opacity: 0.68 }}>
                    {constants.messages.LOADING}
                </Typography>
            </Stack>
        </StyledContainer>
    );
};

export default LoadingIndicator;
