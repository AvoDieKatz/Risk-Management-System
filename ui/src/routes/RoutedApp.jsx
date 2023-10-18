import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import {
    ContactPage,
    HomePage,
    LoginPage,
    MeetingPage,
    NotFoundPage,
    PolicyPage,
    TestPage,
    ThreadPage,
    UserManagementPage,
} from "../pages";
import { PrivateRoute, ProtectedRoute, PublicRoute } from "./";
import constants from "../shared/constants";

const RoutedApp = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route index element={<HomePage />} />
                <Route path="/test" element={<TestPage />} />

                <Route path="/" element={<HomePage />} />
                <Route path="/thread" element={<ThreadPage />} />
                <Route path="/meeting" element={<MeetingPage />} />
                <Route path="/policy" element={<PolicyPage />} />

                {/* ADMIN ROUTES */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={[constants.roles.ROLE_ADMIN]}
                        />
                    }
                >
                    <Route path="admin">
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="user" element={<UserManagementPage />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />

            {/* <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<HomePage />} />
                <Route path="/thread" element={<ThreadPage />} />
                <Route path="/meeting" element={<MeetingPage />} />
                <Route path="/policy" element={<PolicyPage />} />

                <Route path="admin">
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="user" element={<UserManagementPage />} />
                </Route>
            </Route> */}
        </Routes>
    );
};

export default RoutedApp;
