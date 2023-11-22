import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { getTokenFromStorage, removeTokenFromStorage } from "../utils/storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const token = getTokenFromStorage();
    const [userAuthentication, setUserAuthentication] = useState(
        token && jwtDecode(token)
    );

    const handleDeauth = () => {
        setUserAuthentication(null);
        removeTokenFromStorage();
    };

    return (
        <AuthContext.Provider
            value={{ userAuthentication, setUserAuthentication, handleDeauth }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
