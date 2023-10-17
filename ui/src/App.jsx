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
import { Notification } from "./components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RoutedApp } from "./routes";
import { MemoryRouter as RouterProvider } from "react-router-dom";
import constants from "./shared/constants";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./shared/styles.js";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
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
            if (query.meta.errorMessage) {
                CustomAlertContext.setMessage(
                    query?.meta?.errorMessage ?? constants.messages.ERROR
                );
                CustomAlertContext.setSeverity(constants.notification.ERROR);
                CustomAlertContext.setOpen(true);
            }
        },
    }),
});

const AppSetup = ({ children }) => {
    console.log("Setup rendered");

    return (
        <ThemeProvider theme={appTheme}>
            <RouterProvider>
                <AlertProvider>
                    <QueryClientProvider client={queryClient}>
                        {children}
                        <Notification />
                        <ReactQueryDevtools
                            initialIsOpen={false}
                            position="bottom-right"
                        />
                    </QueryClientProvider>
                </AlertProvider>
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
