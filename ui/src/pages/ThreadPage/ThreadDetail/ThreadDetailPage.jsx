import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import {
    AwaitConnectionIndicator,
    RmsButton as Button,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
} from "../../../components";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useQuery } from "@tanstack/react-query";
import threadService from "../../../services/ThreadService";
import moment from "moment";
import { AuthContext } from "../../../contexts";
import constants from "../../../shared/constants";
import OwnerSelect from "./components/OwnerSelect.jsx";
import Assessment from "./components/Assessment.jsx";
import SidePanel from "./components/SidePanel.jsx";
import ActionPlanDrawer from "./components/ActionPlanDrawer.jsx";

const MainPanel = ({ threadId }) => {
    const navigate = useNavigate();

    const {
        userAuthentication: { user },
    } = useContext(AuthContext);

    const { isLoading, isError, isPaused, data } = useQuery({
        queryKey: ["threads", threadId],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await threadService.getSingleThread(threadId);
            return response.data;
        },
        meta: {
            errorMessage: "There is an error while loading thread data.",
        },
    });

    const handleBackNavigation = () => navigate(-1);

    return (
        <Box
            id={"detail-container"}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                position: "relative",
            }}
        >
            <Panel
                sx={{
                    p: 2,
                    flex: "1 1 0",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}
            >
                {isPaused ? (
                    <AwaitConnectionIndicator />
                ) : isLoading ? (
                    <LoadingIndicator />
                ) : isError ? (
                    <ErrorIndicator />
                ) : (
                    <>
                        {data?.status === "IDENTIFIED" && (
                            <Box
                                sx={{
                                    width: "100%",
                                    p: 2,
                                    bgcolor: "warning.light",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <Typography>
                                    This Thread is being reviewed.
                                </Typography>
                            </Box>
                        )}
                        <Stack
                            spacing={2}
                            sx={{
                                pt: data?.status === "IDENTIFIED" ? 6 : 0,
                                pb: 6,
                            }}
                        >
                            <Grid container>
                                <Button
                                    variant="text"
                                    size="small"
                                    startIcon={<ChevronLeftIcon />}
                                    onClick={handleBackNavigation}
                                >
                                    Back to list
                                </Button>
                            </Grid>
                            <Grid container justifyContent={"space-between"}>
                                <Typography variant="dimmed">
                                    #{data?.id} by {data?.author?.fullName} on{" "}
                                    {moment(data?.createdAt).format(
                                        "DD/MM/YYYY, HH:mm"
                                    )}
                                </Typography>
                                <Typography variant="dimmed">
                                    Status:{" "}
                                    <Typography
                                        component={"span"}
                                        color={() => {
                                            const value = data?.status;
                                            switch (value) {
                                                case constants.status
                                                    .IDENTIFIED:
                                                    return "warning.main";
                                                case constants.status.ACTIVE:
                                                    return "primary.main";
                                                case constants.status.REJECTED:
                                                    return "error.main";
                                                case constants.status.RESOLVED:
                                                    return "success.main";
                                                default:
                                                    return "";
                                            }
                                        }}
                                    >
                                        {data?.status}
                                    </Typography>
                                </Typography>
                            </Grid>

                            <Typography variant="h5">{data?.title}</Typography>

                            <Typography>
                                Category: {data?.category?.name}
                            </Typography>

                            {user?.role === "ROLE_MANAGER" ? (
                                <OwnerSelect
                                    currentThreadId={data?.id}
                                    currentOwnerId={data?.riskOwner?.id}
                                />
                            ) : (
                                <Typography>
                                    Risk Owner: {data?.riskOwner?.fullName}
                                </Typography>
                            )}

                            <Assessment
                                threadId={threadId}
                                user={user}
                                ownerId={data?.riskOwner?.id}
                            />

                            <Typography variant="h6">Detail</Typography>
                            <Typography variant="body1">
                                {data?.description}
                            </Typography>
                        </Stack>
                        <ActionPlanDrawer
                            threadId={data?.id}
                            ownerId={data?.riskOwner?.id}
                        />
                    </>
                )}
            </Panel>
        </Box>
    );
};

const ThreadDetailPage = () => {
    const { id } = useParams();

    return (
        <Grid container spacing={2} sx={{ height: "100%" }}>
            <Grid container direction={"column"} flex={3}>
                <Grid flex={1}>
                    <MainPanel threadId={id} />
                </Grid>
            </Grid>
            <Grid container direction={"column"} flex={1}>
                <Grid flex={1}>
                    <SidePanel threadId={id} />
                </Grid>
            </Grid>
        </Grid>
    );
};

MainPanel.propTypes = {
    threadId: PropTypes.string.isRequired,
};

Assessment.propTypes = {
    threadId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};

export default ThreadDetailPage;
