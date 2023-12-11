module.exports = {
    channels: {
        IPC: "ipc-bridge",
        GET_TODOS: "get-todos",
    },
    notification: {
        SUCCESS: "success",
        ERROR: "error",
        WARN: "warning",
        INFO: "info",
    },
    messages: {
        SUCCESS: "SUCCESS!",
        ERROR: "An error has occured!",
        LOADING: "LOADING...",
        NOT_FOUND: "The resourece you are looking for does not exist.",
        CONTACT_ADMIN:
            "Please contact your administrator if you don't have an account.",
        FAILED_CONN: "There is no internet connection, try to reconnect.",
    },
    roles: {
        ROLE_ADMIN: "Administrator",
        ROLE_OFFICER: "Chief Risk Officer",
        ROLE_MANAGER: "Manager",
        ROLE_ANALYST: "Analyst",
    },
    status: {
        IDENTIFIED: "IDENTIFIED",
        ACTIVE: "ACTIVE",
        REJECTED: "REJECTED",
        RESOLVED: "RESOLVED",
    },
    description: {
        ACCEPT: "Accept is a risk response approach that involves acknowledging and tolerating a risk without taking any specific action to mitigate or transfer it. This approach aims to consciously decide to live with the potential negative consequences of a risk. Organizations may choose to accept a risk when they determine that the potential negative consequences are within acceptable limits, or when the cost of mitigating or transferring the risk outweighs the potential losses. Accepting a risk does not mean ignoring it; it means making an informed decision to allocate resources and focus on other priorities.",
        AVOID: "Avoid is a risk response approach that involves eliminating or bypassing a risk altogether. This approach aims to completely remove the possibility of the risk materializing by avoiding the activities or situations that could lead to the risk. Organizations may choose to avoid a risk when they determine that the potential negative consequences outweigh any potential benefits. This approach is often used when the risk is deemed too significant or when the cost of mitigating the risk is too high.",
        EXPLOIT:
            "Exploit is a risk response approach that involves taking advantage of an opportunity associated with a risk. This approach aims to maximize the potential benefits of a risk by actively pursuing and leveraging it. Organizations may exploit a risk when they believe that the potential rewards outweigh the potential negative consequences. By implementing strategies to capitalize on the risk, organizations can gain a competitive advantage or achieve favorable outcomes.",
        MITIGATE:
            "Mitigate is a risk response approach that involves reducing the likelihood or impact of a risk. This approach aims to lessen the potential negative consequences of a risk by implementing measures to minimize its occurrence or severity. Organizations may choose to mitigate a risk when they believe that the potential negative consequences can be effectively managed through preventive or corrective actions. Mitigation strategies may include implementing control measures, introducing redundancy, or enhancing security measures.",
        TRANSFER:
            "Transfer is a risk response approach that involves shifting the responsibility for a risk to another party. This approach aims to transfer the potential negative consequences of a risk to a third party, such as an insurance company or a contractual agreement. Organizations may choose to transfer a risk when they believe that the cost of transferring the risk is more favorable than the potential losses they would incur if the risk materializes. Transferring a risk does not eliminate the risk but rather transfers the financial burden or liability associated with the risk.",
    },
};
