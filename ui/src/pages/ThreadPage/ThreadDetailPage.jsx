import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import {
    AssessmentRating,
    AwaitConnectionIndicator,
    RmsButton as Button,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
} from "../../components";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
    Avatar,
    Box,
    Skeleton,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ResponsiveLine } from "@nivo/line";
import { useQuery } from "@tanstack/react-query";
import threadService from "../../services/ThreadService";
import moment from "moment";

/**
 *
 *     Assessment Components
 *
 */

const AssessmentRatingBar = ({ data }) => {
    const reversedDataArr = [...data].reverse();
    return <AssessmentRating defaultValue={reversedDataArr[0].value} />;
};

const AssessmentLineChart = ({ data }) => {
    let likelihoodData = [];
    let severityData = [];

    data?.likelihoodList.forEach((el) => {
        const time = moment(el.updatedAt).format("DD/MM");
        likelihoodData.push({ x: time, y: el.value });
    });

    data?.severityList.forEach((el) => {
        const time = moment(el.updatedAt).format("DD/MM");
        severityData.push({ x: time, y: el.value });
    });

    const formattedDataForLineChart = [
        {
            id: "likelihood",
            data: likelihoodData,
        },
        {
            id: "severity",
            data: severityData,
        },
    ];

    return (
        <ResponsiveLine
            data={formattedDataForLineChart}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "1",
                max: "5",
                stacked: false,
                reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Date",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Value",
                legendOffset: -40,
                legendPosition: "middle",
            }}
            colors={{ scheme: "category10" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemBackground: "rgba(0, 0, 0, .03)",
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

const Assessment = ({ threadId }) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["threads", threadId, "assessment"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await threadService.getThreadAssessment(threadId);
            return response.data;
        },
        meta: {
            errorMessage: "There is an error while loading assessment data.",
        },
    });

    return (
        <>
            <Grid container>
                <Grid flex={1}>
                    <Box>Likelihood</Box>
                    {isLoading ? (
                        <Skeleton variant="rounded" height={20} />
                    ) : isError ? (
                        <ErrorIndicator />
                    ) : (
                        <AssessmentRatingBar data={data.likelihoodList} />
                    )}
                </Grid>
                <Grid flex={1}>
                    <Box>Severity</Box>
                    {isLoading ? (
                        <Skeleton variant="rounded" height={20} />
                    ) : isError ? (
                        <ErrorIndicator />
                    ) : (
                        <AssessmentRatingBar data={data.severityList} />
                    )}
                </Grid>
            </Grid>

            <Grid container justifyContent={"center"}>
                {isLoading ? (
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={240}
                        width={800}
                    />
                ) : (
                    <Box
                        sx={{
                            height: 240,
                            minWidth: 800,
                            border: 1,
                            borderColor: "primary.main",
                        }}
                    >
                        <AssessmentLineChart data={data} />
                    </Box>
                )}
            </Grid>
        </>
    );
};

/**
 *
 *     Side Panel Components
 *
 */

const SidePanelTab = (props) => {
    const { children, value, index, ...others } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`detail-tabpanel-${index}`}
            aria-labelledby={`detail-tab-${index}`}
            {...others}
        >
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
};

const CommentTab = () => {
    return (
        <Stack spacing={2}>
            <Panel elevation={2}>
                <Grid container direction={"column"} sx={{ minHeight: 120 }}>
                    <Grid container spacing={1}>
                        <Grid>
                            <Avatar />
                        </Grid>
                        <Grid>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                            >
                                John Doe
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ fontStyle: "italic" }}
                            >
                                Analyst
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid flexGrow={1}>
                        <Typography variant="body1">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="caption">
                            09/11/2023 at 10:30 PM
                        </Typography>
                    </Grid>
                </Grid>
            </Panel>
            <Panel elevation={2}>
                <Grid container direction={"column"} sx={{ minHeight: 136 }}>
                    <Grid container spacing={1}>
                        <Grid>
                            <Avatar />
                        </Grid>
                        <Grid>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                            >
                                John Doe
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ fontStyle: "italic" }}
                            >
                                Analyst
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid flexGrow={1}>
                        <Typography variant="body1">
                            I have tested that particular example, but @Value
                            annotation seems to be neglected. I am not
                            interested in using @Query annotation to provide
                            custom constructor.
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="caption">
                            09/11/2023 at 10:30 PM
                        </Typography>
                    </Grid>
                </Grid>
            </Panel>
            <Panel elevation={2}>
                <Grid container direction={"column"} sx={{ minHeight: 136 }}>
                    <Grid container spacing={1}>
                        <Grid>
                            <Avatar />
                        </Grid>
                        <Grid>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                            >
                                John Doe
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ fontStyle: "italic" }}
                            >
                                Analyst
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid flexGrow={1}>
                        <Typography variant="body1">
                            It&apos;s not a bug, it&apos;s a feature.
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="caption">
                            09/11/2023 at 10:30 PM
                        </Typography>
                    </Grid>
                </Grid>
            </Panel>
            <Panel elevation={2}>
                <Grid container direction={"column"} sx={{ minHeight: 136 }}>
                    <Grid container spacing={1}>
                        <Grid>
                            <Avatar />
                        </Grid>
                        <Grid>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                            >
                                John Doe
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ fontStyle: "italic" }}
                            >
                                Analyst
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid flexGrow={1}>
                        <Typography variant="body1">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="caption">
                            09/11/2023 at 10:30 PM
                        </Typography>
                    </Grid>
                </Grid>
            </Panel>
            <Panel elevation={2}>
                <Grid container direction={"column"} sx={{ minHeight: 136 }}>
                    <Grid container spacing={1}>
                        <Grid>
                            <Avatar />
                        </Grid>
                        <Grid>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                            >
                                John Doe
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ fontStyle: "italic" }}
                            >
                                Analyst
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid flexGrow={1}>
                        <Typography variant="body1">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="caption">
                            09/11/2023 at 10:30 PM
                        </Typography>
                    </Grid>
                </Grid>
            </Panel>
        </Stack>
    );
};

const ActivityTab = () => {
    return <>Activity Tab</>;
};

const SidePanel = ({ threadId }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Panel
                sx={{
                    p: 0,
                    flex: "1 1 0",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleChange}
                            aria-label="detail side tabs"
                            variant="fullWidth"
                        >
                            <Tab
                                label="Comment"
                                id="detail-tab-0"
                                aria-controls="detail-tabpanel-0"
                            />
                            <Tab
                                label="Activity"
                                id="detail-tab-1"
                                aria-controls="detail-tabpanel-1"
                            />
                        </Tabs>
                    </Box>

                    <SidePanelTab value={tabIndex} index={0}>
                        <CommentTab />
                    </SidePanelTab>
                    <SidePanelTab value={tabIndex} index={1}>
                        <ActivityTab />
                    </SidePanelTab>
                </Box>
            </Panel>
        </Box>
    );
};

/**
 *
 *     Main Content Components
 *
 */

const MainPanel = ({ threadId }) => {
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

    const navigate = useNavigate();
    const handleBackNavigation = () => navigate(-1);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
                    <Stack spacing={2}>
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
                                Status: {data?.status}
                            </Typography>
                        </Grid>

                        <Typography variant="h5">{data?.title}</Typography>
                        <Grid container justifyContent={"space-between"}>
                            <Typography>
                                Category: {data?.category?.name}
                            </Typography>
                            <Typography>
                                Risk Owner: {data?.riskOwner?.fullName}
                            </Typography>
                        </Grid>

                        <Assessment threadId={threadId} />
                        <Button variant={"outlined"}>Assess</Button>

                        <Typography variant="h6">Detail</Typography>
                        <Typography variant="body1">
                            {data?.description}
                        </Typography>
                    </Stack>
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

export default ThreadDetailPage;

MainPanel.propTypes = {
    threadId: PropTypes.string.isRequired,
};

SidePanel.propTypes = {
    threadId: PropTypes.string.isRequired,
};

SidePanelTab.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

Assessment.propTypes = {
    threadId: PropTypes.string.isRequired,
};

AssessmentLineChart.propTypes = {
    data: PropTypes.object.isRequired,
};

AssessmentRatingBar.propTypes = {
    data: PropTypes.array.isRequired,
};
