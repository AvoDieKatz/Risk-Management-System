import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import {
    ContactPage,
    HomePage,
    LoginPage,
    MeetingPage,
    PolicyPage,
    TestPage,
    ThreadPage,
    UserManagementPage,
} from "../pages";

const RoutedApp = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/" element={<HomePage />} />
                <Route path="/thread" element={<ThreadPage />} />
                <Route path="/meeting" element={<MeetingPage />} />
                <Route path="/policy" element={<PolicyPage />} />

                {/* ADMIN ROUTES */}
                <Route path="admin">
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="user" element={<UserManagementPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default RoutedApp;
