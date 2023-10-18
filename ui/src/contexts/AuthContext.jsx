import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import constants from "../shared/constants";

const AuthContext = createContext();

const getUserAuthentication = () => {
    return { name: "Tung", role: constants.roles.CRO };
    // return null;
};

const AuthProvider = ({ children }) => {
    const [userAuthentication, setUserAuthentication] = useState(
        getUserAuthentication()
    );

    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     // const token = localStorage.getItem("token");
    //     // Validate token with the server and set isAuthenticated accordingly

    //     const token = "JWT Token";

    //     setIsAuthenticated(!!token);
    // }, []);

    return (
        <AuthContext.Provider
            value={{ userAuthentication, setUserAuthentication }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
