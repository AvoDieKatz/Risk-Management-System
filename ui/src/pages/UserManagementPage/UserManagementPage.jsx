import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    AwaitConnectionIndicator,
    DataDisplay,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
    RmsButton,
} from "../../components";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import accountService from "../../services/AccountService";
import { Avatar, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAge, upFirstChar } from "../../utils/utils";
import moment from "moment";

const DataSidePanel = ({ data }) => {
    return (
        <Panel>
            <Stack spacing={3}>
                <Stack spacing={2} alignItems={"center"}>
                    <Grid>
                        <Avatar
                            alt={data.fullName}
                            sx={{ width: 112, height: 112 }}
                        />
                    </Grid>
                    <Grid textAlign={"center"}>
                        <Typography
                            sx={{ fontSize: "1.5rem", fontWeight: 500 }}
                        >
                            {data.fullName}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{ fontStyle: "italic" }}
                        >
                            # {data.username}
                        </Typography>
                        <Typography variant="subtitle2">{data.role}</Typography>
                    </Grid>
                </Stack>
                <Stack spacing={1}>
                    <Typography
                        textAlign={"center"}
                        sx={{
                            fontWeight: "600",
                            backgroundColor: "primary.light",
                            color: "primary.contrastText",
                            fontSize: "1.2rem",
                        }}
                    >
                        Demography
                    </Typography>
                    <Typography>
                        Date of Birth: {moment(data.dob).format("DD/MM/YYYY")}{" "}
                        (Age: {getAge(data.dob)})
                    </Typography>
                    <Typography>Gender: {upFirstChar(data.gender)}</Typography>
                </Stack>
                <Stack spacing={1}>
                    <Typography
                        textAlign={"center"}
                        sx={{
                            fontWeight: "600",
                            backgroundColor: "primary.light",
                            color: "primary.contrastText",
                            fontSize: "1.2rem",
                        }}
                    >
                        Contact
                    </Typography>
                    <Typography>Phone: {data.phone}</Typography>
                    <Typography>Email: {data.email}</Typography>
                </Stack>

                <Stack spacing={1}>
                    <RmsButton
                        variant="outlined"
                        color="info"
                        sx={{ width: "100%" }}
                        startIcon={<EditIcon />}
                    >
                        Modify
                    </RmsButton>
                    <RmsButton
                        variant="outlined"
                        color="error"
                        sx={{ width: "100%" }}
                        startIcon={<DeleteIcon />}
                    >
                        Remove
                    </RmsButton>
                </Stack>
            </Stack>
        </Panel>
    );
};

const UserManagementPage = () => {
    const [selectedData, setSelectedData] = useState(null);

    const handleItemClick = (e, value) => {
        if (value !== null) {
            setSelectedData(value);
        }
    };

    const {
        isLoading,
        isError,
        isPaused,
        data: fetchedData,
    } = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await accountService.getAccounts();
            return response.data;
        },
        meta: {
            errorMessage: "There is an error while loading accounts data.",
        },
    });

    const tableColumnHelper = createColumnHelper();

    const columns = [
        tableColumnHelper.accessor("id", {
            header: () => "ID",
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("fullName", {
            header: () => <span>Name</span>,
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("gender", {
            header: () => <span>Gender</span>,
            cell: (info) => info.getValue().substring(0, 1),
        }),
        tableColumnHelper.accessor("dob", {
            header: () => <span>Date of Birth</span>,
            cell: (info) => info.getValue(),
            enableGlobalFilter: false,
        }),
        tableColumnHelper.accessor("username", {
            header: () => "Username",
            cell: (info) => info.renderValue(),
        }),
        tableColumnHelper.accessor("phone", {
            header: () => <span>Phone</span>,
        }),
        tableColumnHelper.accessor("role", {
            header: () => "Role",
            cell: (info) => info.getValue(),
        }),
    ];

    return (
        <Grid container disableEqualOverflow spacing={1}>
            <Grid flex={3}>
                <Panel>
                    {isPaused ? (
                        <AwaitConnectionIndicator />
                    ) : isLoading ? (
                        <LoadingIndicator />
                    ) : isError ? (
                        <ErrorIndicator />
                    ) : (
                        <>
                            <RmsButton
                                component={Link}
                                to={"add"}
                                size={"small"}
                                startIcon={<AddIcon />}
                                sx={{
                                    position: "absolute",
                                }}
                            >
                                Add User
                            </RmsButton>
                            <DataDisplay
                                data={fetchedData}
                                columns={columns}
                                handleItemClick={handleItemClick}
                            />
                        </>
                    )}
                </Panel>
            </Grid>

            {selectedData && (
                <Grid flex={1}>
                    <DataSidePanel data={selectedData} />
                </Grid>
            )}
        </Grid>
    );
};

export default UserManagementPage;

DataSidePanel.propTypes = {
    data: PropTypes.object,
};
