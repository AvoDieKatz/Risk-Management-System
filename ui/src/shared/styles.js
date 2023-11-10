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
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 700,
        fontWeightBold: 900,
        dimmed: {
            color: '#696969'
        }
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
