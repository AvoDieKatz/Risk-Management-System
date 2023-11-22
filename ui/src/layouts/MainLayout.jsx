import { Unstable_Grid2 as Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidenav } from "../components";

const MainLayout = () => {
    return (
        // <Grid container disableEqualOverflow sx={{ height: "100vh" }}>
        <Grid container disableEqualOverflow>
            <Grid sx={{ display: { xs: "none", md: "block" }, minWidth: 220 }}>
                <Sidenav />
            </Grid>
            {/* <Grid
                container
                disableEqualOverflow
                direction={"column"}
                sx={{ flex: 1, height: "100%" }}
            >
                <Grid flexGrow={1} sx={{ m: 2 }}>
                    <Outlet />
                </Grid>
            </Grid> */}

            <Grid flex={1} sx={{ m: 2 }}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default MainLayout;
