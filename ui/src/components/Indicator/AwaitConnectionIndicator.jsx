import React from "react";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { Typography } from "@mui/material";
import constants from "../../shared/constants";
import StyledContainer from "..";

const AwaitConnectionIndicator = () => {
    return (
        <StyledContainer variant={"dimmed"} sx={{ height: "100%" }}>
            <StyledContainer variant={"centered"}>
                <WifiOffIcon
                    sx={{
                        fontSize: 80,
                    }}
                />
                <Typography variant="body1" ml={2}>
                    {constants.messages.FAILED_CONN}
                </Typography>
            </StyledContainer>
        </StyledContainer>
    );
};

export default AwaitConnectionIndicator;
