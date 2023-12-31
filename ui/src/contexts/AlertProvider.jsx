import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import constants from "../shared/constants";

const AlertContext = createContext();
AlertContext.displayName = "AlertContext";

// Expose an object instead of hook because the states are going to be used outside Components
export const CustomAlertContext = {}

export const useAlert = () => {
    return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState(constants.notification.INFO);

    const [openModal, setOpenModal] = useState(false)

    CustomAlertContext.setOpen = setOpen;
    CustomAlertContext.setOpenModal = setOpenModal;
    CustomAlertContext.setMessage = setMessage;
    CustomAlertContext.setSeverity = setSeverity;

    return (
        <AlertContext.Provider
            value={{
                open,
                message,
                severity,
                openModal,
                setOpen,
                setMessage,
                setSeverity,
                setOpenModal
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

AlertProvider.propTypes = {
    children: PropTypes.node,
};
