import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <Grid
            container
            disableEqualOverflow
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "primary.main",
            }}
        >
            <Grid>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default PublicLayout;
