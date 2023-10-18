import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import StyledContainer from "../components";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import constants from "../shared/constants";

const NotFoundPage = () => {
    return (
        <StyledContainer variant={"centered"} sx={{ height: "100vh" }}>
            <Stack spacing={3}>
                <StyledContainer variant={"dimmed"}>
                    <Stack spacing={2} alignItems={"center"}>
                        <SentimentVeryDissatisfiedIcon
                            sx={{
                                fontSize: 126,
                            }}
                        />
                        <Typography variant="h6" sx={{ opacity: 0.8 }}>
                            {constants.messages.NOT_FOUND}
                        </Typography>
                    </Stack>
                </StyledContainer>
                <Button
                    size="large"
                    variant="outlined"
                    component={Link}
                    to={"/"}
                >
                    Return home
                </Button>
            </Stack>
        </StyledContainer>
    );
};

export default NotFoundPage;
