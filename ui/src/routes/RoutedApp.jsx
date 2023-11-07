import React from "react";
import { Route, Routes } from "react-router-dom";
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
    UserAddPage,
    CategoryManagementPage,
    PersonalAssignmentsPage,
} from "../pages";

/**
 *
 * Different ways to import
 *
 * import { HomePage, LoginPage, NotFoundPage, TestPage } from "../pages/AppPage";
 * import { LoginPage, NotFoundPage, TestPage } from "../pages";
 * import HomePage from "../pages/AppPage/HomePage.jsx";
 *
 *
 */

import { PrivateRoute, ProtectedRoute, PublicRoute } from "./";
import constants from "../shared/constants";

const { ROLE_ANALYST, ROLE_MANAGER, ROLE_ADMIN, ROLE_CRO } = constants.roles;

const RoutedApp = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route index element={<HomePage />} />
                <Route path="/test" element={<TestPage />} />

                <Route path="/thread">
                    <Route index element={<ThreadPage />} />

                    <Route path="assignments" element={<PersonalAssignmentsPage />} />

                    {/* <Route element={<ProtectedRoute allowedRoles={[ROLE_MANAGER]} />}>
                        <Route path="proposal" element={<} />
                    </Route> */}

                </Route>


                <Route path="/meeting" element={<MeetingPage />} />
                <Route path="/policy" element={<PolicyPage />} />

                    <Route path="/management">

                        <Route
                            element={
                                <ProtectedRoute allowedRoles={[ROLE_ADMIN]} />
                            }
                        >
                            <Route path="contact" element={<ContactPage />} />
                            <Route path="user">
                                <Route index element={<UserManagementPage />} />
                                <Route path="add" element={<UserAddPage />} />
                            </Route>
                        </Route>

                        <Route
                            element={
                                <ProtectedRoute allowedRoles={[ROLE_ADMIN, ROLE_MANAGER]} />
                            }
                        >
                            <Route
                                path="category"
                                element={<CategoryManagementPage />}
                            />
                        </Route>

                    </Route>
                </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default RoutedApp;
