import { createTheme } from "@mui/material";

export const appTheme = createTheme({
    palette: {
        rms: {
            main: "#9db2bf",
            light: "#526d82",
            dark: "#dde6ed",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: "Poppins",
        fontWeightLight: 200,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
    },

    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: "1rem",
                },
            },
        },
    },
});
