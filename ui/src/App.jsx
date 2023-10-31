import React from "react";
import PropTypes from "prop-types";
import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
} from "@tanstack/react-query";
import {
    AlertProvider,
    CustomAlertContext,
} from "./contexts/AlertProvider.jsx";
import { ExpirationDialog, Notification } from "./components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RoutedApp } from "./routes";
import { MemoryRouter as RouterProvider } from "react-router-dom";
import constants from "./shared/constants";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./shared/styles.js";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1
        },
    },
    queryCache: new QueryCache({
        onSuccess: (data, query) => {
            console.log("QUERY FROM QUERY CACHE = ", query);
            if (query.state.dataUpdateCount == 1) {
                CustomAlertContext.setMessage(
                    query?.meta?.successMessage ?? constants.messages.SUCCESS
                );
                CustomAlertContext.setSeverity(constants.notification.SUCCESS);
                CustomAlertContext.setOpen(true);
            }
        },
        onError: (error, query) => {
            if (error.response.status === 401) {
                // Modal dialog appear
                CustomAlertContext.setOpenModal(true)
            }
            
            if (query.meta?.errorMessage) {
                CustomAlertContext.setMessage(
                    query?.meta?.errorMessage ?? constants.messages.ERROR
                );
            } else {
                CustomAlertContext.setMessage(`${error.response.data.message}`);
            }
            CustomAlertContext.setSeverity(constants.notification.ERROR);
            CustomAlertContext.setOpen(true);
        },
    }),
});

const AppSetup = ({ children }) => {
    console.log("Setup rendered");

    return (
        <ThemeProvider theme={appTheme}>
            <RouterProvider>
                <QueryClientProvider client={queryClient}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <AuthProvider>
                            <AlertProvider>
                                {children}
                                <Notification />
                                <ExpirationDialog />
                                <ReactQueryDevtools
                                    initialIsOpen={false}
                                    position="bottom-right"
                                />
                            </AlertProvider>
                        </AuthProvider>
                    </LocalizationProvider>
                </QueryClientProvider>
            </RouterProvider>
        </ThemeProvider>
    );
};

const App = () => {
    return (
        <AppSetup>
            <RoutedApp />
        </AppSetup>
    );
};

export default App;

AppSetup.propTypes = {
    children: PropTypes.node,
};
