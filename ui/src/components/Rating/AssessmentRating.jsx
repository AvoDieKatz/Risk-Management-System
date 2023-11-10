import React from "react";
import PropTypes from "prop-types";
import { Box, Rating, styled } from "@mui/material";

const StyledRating = styled(Rating)(({ theme }) => ({
    "& span": {
        marginLeft: 4,
    },
    "& .MuiRating-iconEmpty": {
        opacity: 0,
    },
}));

const customIcons = {
    1: {
        icon: (
            <Box
                sx={{
                    width: 80,
                    height: 10,
                    borderRadius: 8,
                    bgcolor: "success.main",
                }}
            />
        ),
        label: "1",
    },
    2: {
        icon: (
            <Box
                sx={{
                    width: 80,
                    height: 10,
                    borderRadius: 8,
                    bgcolor: "success.light",
                }}
            />
        ),
        label: "2",
    },
    3: {
        icon: (
            <Box
                sx={{
                    width: 80,
                    height: 10,
                    borderRadius: 8,
                    bgcolor: "warning.main",
                }}
            />
        ),
        label: "3",
    },
    4: {
        icon: (
            <Box
                sx={{
                    width: 80,
                    height: 10,
                    borderRadius: 8,
                    bgcolor: "error.light",
                }}
            />
        ),
        label: "4",
    },
    5: {
        icon: (
            <Box
                sx={{
                    width: 80,
                    height: 10,
                    borderRadius: 8,
                    bgcolor: "error.main",
                }}
            />
        ),
        label: "5",
    },
};

const IconContainer = (props) => {
    const { value, ...others } = props;
    return <div {...others}>{customIcons[value].icon}</div>;
};

const AssessmentRating = (props) => {
    return (
        <>
            <StyledRating
                {...props}
                name="assessment rating bar"
                readOnly
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
            />
        </>
    );
};

export default AssessmentRating;

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};
