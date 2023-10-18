import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { MainLayout, PublicLayout } from "../layouts";
import { AuthContext } from "../contexts/AuthContext.jsx";

export const PublicRoute = () => {
    const location = useLocation();
    const { userAuthentication } = useContext(AuthContext);

    return !userAuthentication ? (
        <PublicLayout />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export const PrivateRoute = () => {
    const location = useLocation();
    const { userAuthentication } = useContext(AuthContext);

    return userAuthentication ? (
        <MainLayout />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export const ProtectedRoute = ({ allowedRoles }) => {
    const location = useLocation();
    const { userAuthentication } = useContext(AuthContext);

    return allowedRoles?.includes(userAuthentication?.role) ? (
        <MainLayout />
    ) : (
        <Navigate to="/404" state={{ from: location }} replace />
    );
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.array.isRequired,
};
