import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Stack,
    Box,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
    AwaitConnectionIndicator,
    RmsButton as Button,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
} from "../../../../components";
import { AuthContext } from "../../../../contexts";
import { useQuery } from "@tanstack/react-query";
import threadService from "../../../../services/ThreadService";
import moment from "moment";

const options = ["ACCEPT", "AVOID", "EXPLOIT", "MITIGATE", "TRANSFER"];

const AddSolutionButton = () => {
    return <Button variant="contained">Add Solution</Button>;
};

const PlanDetail = ({ selectedView, solutionList }) => {
    const solution = solutionList.find(
        (solution) => solution.type === selectedView
    );

    return (
        <Stack spacing={0}>
            <Grid flex={1}>
                <Panel variant={"outlined"} sx={{ p: 1 }}>
                    <Typography fontWeight={700} fontSize={20}>
                        Solution Info
                    </Typography>
                    <Box>
                        <Typography>
                            Author:{" "}
                            <Typography component={"span"}>
                                {solution?.author?.firstName}{" "}
                                {solution?.author?.lastName}
                            </Typography>
                        </Typography>
                        <Typography>
                            Created at:{" "}
                            <Typography component={"span"}>
                                {moment(solution?.createdAt).format(
                                    "DD/MM/YYYY, HH:mm"
                                )}
                            </Typography>
                        </Typography>
                        <Typography>
                            Last modefied at:{" "}
                            <Typography component={"span"}>
                                {moment(solution?.updatedAt).format(
                                    "DD/MM/YYYY, HH:mm"
                                )}
                            </Typography>
                        </Typography>
                    </Box>
                </Panel>
            </Grid>
            <Grid flex={3}>
                <Panel
                    variant={"outlined"}
                    sx={{
                        height: "100%",
                        overflowY: "auto",
                        p: 1,
                    }}
                >
                    <Typography fontWeight={700} fontSize={20}>
                        Solution Content
                    </Typography>
                    <Typography paragraph>{solution?.content}</Typography>
                </Panel>
            </Grid>
        </Stack>
    );
};

const PlanChoices = ({ selectedView, handleChangeView, solutionList }) => {
    console.log("losution list = ", solutionList);

    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={selectedView}
            exclusive
            color="primary"
            onChange={handleChangeView}
        >
            {options.map((el) => {
                const enabled = solutionList.some(
                    (solution) => solution?.type === el
                );
                return (
                    <ToggleButton
                        key={el}
                        value={el}
                        disabled={!enabled}
                        aria-label={el}
                    >
                        <Typography>{el}</Typography>
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );
};

const DrawerContent = (props) => {
    const { threadId, ownerId } = props;
    const [selectedView, setSelectedView] = useState("");

    const {
        userAuthentication: { user },
    } = useContext(AuthContext);

    const {
        isLoading,
        isError,
        isPaused,
        data: solutions,
    } = useQuery({
        queryKey: ["threads", threadId, "solutions"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 450));
            const response = await threadService.getThreadSolutions(threadId);
            return response.data;
        },
        // enabled: !!selectedView,
    });

    const handleChangeView = (e, next) => {
        if (next !== null) {
            setSelectedView(next);
        }
    };

    return (
        <Grid container columnSpacing={2}>
            {isPaused ? (
                <AwaitConnectionIndicator />
            ) : isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator />
            ) : (
                <>
                    <Grid xs={3}>
                        <Stack justifyContent={"space-between"}>
                            <PlanChoices
                                selectedView={selectedView}
                                handleChangeView={handleChangeView}
                                solutionList={solutions}
                            />
                            {parseInt(user.id) === ownerId && (
                                <AddSolutionButton />
                            )}
                        </Stack>
                    </Grid>
                    <Grid xs={9}>
                        {/* {isLoading ? (
                        <LoadingIndicator />
                    ) : isError ? (
                        <ErrorIndicator />
                    ) : selectedView !== "" ? (
                        <PlanDetail />
                    ) : (
                        <Typography variant="dimmed">
                            Select an option to view detail.
                        </Typography>
                    )} */}

                        {selectedView !== "" ? (
                            <PlanDetail
                                selectedView={selectedView}
                                solutionList={solutions}
                            />
                        ) : (
                            <Typography variant="dimmed">
                                Select an option to view detail.
                            </Typography>
                        )}
                    </Grid>
                </>
            )}
        </Grid>
    );
};

const ActionPlanDrawer = (props) => {
    return (
        <Accordion
            sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
            }}
            TransitionProps={{ unmountOnExit: true }}
        >
            <AccordionSummary
                sx={{
                    bgcolor: "primary.main",
                    "& *": {
                        color: "primary.contrastText",
                    },
                    "& .MuiAccordionSummary-content": {
                        justifyContent: "center",
                    },
                    ".Mui-expanded > svg": {
                        transform: "rotate(180deg)",
                    },
                }}
            >
                <ExpandMoreIcon />
                <Typography textTransform={"uppercase"}>Action Plan</Typography>
                <ExpandMoreIcon />
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    height: 560,
                    "& .MuiGrid2-root, .MuiGrid2-root > .MuiStack-root": {
                        height: "100%",
                    },
                }}
            >
                <DrawerContent {...props} />
            </AccordionDetails>
        </Accordion>
    );
};

ActionPlanDrawer.propTypes = {
    threadId: PropTypes.number.isRequired,
    ownerId: PropTypes.number.isRequired,
};

DrawerContent.propTypes = {
    threadId: PropTypes.number.isRequired,
    ownerId: PropTypes.number.isRequired,
};

PlanChoices.propTypes = {
    selectedView: PropTypes.string.isRequired,
    handleChangeView: PropTypes.func.isRequired,
    solutionList: PropTypes.array,
};

PlanDetail.propTypes = {
    selectedView: PropTypes.string.isRequired,
    solutionList: PropTypes.array,
};

export default ActionPlanDrawer;
