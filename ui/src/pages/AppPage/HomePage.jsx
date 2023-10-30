import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const HomePage = () => {
    return (
        <>
            <Typography variant="h1">
                Welcome to your Electron application.
            </Typography>
            <Typography variant="h2" gutterBottom>
                Dashboard
            </Typography>
        </>
    );
};

export default HomePage;