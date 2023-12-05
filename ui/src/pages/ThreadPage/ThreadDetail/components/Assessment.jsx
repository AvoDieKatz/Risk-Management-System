import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    AssessmentRating,
    EmptyDataIndicator,
    ErrorIndicator,
    RmsButton as Button,
} from "../../../../components";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import {
    Box,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    Skeleton,
    Slider,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import threadService from "../../../../services/ThreadService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useAlert } from "../../../../contexts";
import constants from "../../../../shared/constants";

export const RatingBar = ({ data }) => {
    const reversedDataArr = [...data].reverse();
    return data.length > 0 ? (
        <AssessmentRating value={reversedDataArr[0].value} />
    ) : (
        <EmptyDataIndicator />
    );
};

const formatAssessData = (assessData) => {
    const assessMap = new Map();
    const currentDate = moment();
    const startDate = moment(currentDate).subtract(6, "d");

    // "latest date assessed but before start date"
    let currentLatestBeforeDate = startDate;

    // "latest item but before start date"
    let itemBeforeStartDate = null
    
    for (let i = 0; i < 7; i++) {
        const date = moment(startDate).add(i, "d");
        let value = null;

        for (const item of assessData) {
            const itemUpdatedAt = moment(item.updatedAt)

            if (itemUpdatedAt.isBefore(startDate, "date")) {
                // Check if the current item is later than 
                // the current "latest item but before start date"

                // itemBeforeStartDate will be set here because once 'item' is before 'startDate'
                // the below 'if' will surely run because 'currentLastestBeforeDate' is equal 'startDate'
                if (itemUpdatedAt.diff(startDate) < currentLatestBeforeDate.diff(startDate)) {
                    currentLatestBeforeDate = itemUpdatedAt
                    itemBeforeStartDate = item;
                } 

                // Only set during first iteration because 
                // this if statement is used to find the "latest item but before start date"
                if (i === 0) {
                    value = itemBeforeStartDate.value;
                    break;
                }

            } else if (moment(item.updatedAt).isSame(date, "date")) {
                value = item.value;
                break;
            }
        }

        if (value === null && i > 0) {
            const previousDate = moment(date).subtract(1, "d");
            value = assessMap.get(moment(previousDate).format("DD/MM"));
        }

        assessMap.set(moment(date).format("DD/MM"), value);
    }

    const arr = Array.from(assessMap, ([key, value]) => {
        return { x: key, y: value };
    });

    return arr;
};

export const LineChart = ({ data }) => {
    let likelihoodData = formatAssessData(data.likelihoodList);
    let severityData = formatAssessData(data.severityList);

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

const AssessDialog = ({ open, handleClose, threadData }) => {
    const { id, likelihoodList, severityList } = threadData;

    const revLikelihoodList = [...likelihoodList].reverse();
    const revSeverityList = [...severityList].reverse();

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting, isDirty },
    } = useForm({
        defaultValues: {
            likelihood: revLikelihoodList[0].value,
            severity: revSeverityList[0].value,
        },
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (request) => threadService.assessThread(id, request),
        onSuccess: () =>
            queryClient.invalidateQueries(["threads", id, "assessment"]),
    });

    const { setOpen, setMessage, setSeverity } = useAlert();

    const onSubmit = async (data) => {
        const request = { ...data };

        return mutation
            .mutateAsync(request)
            .then(() => {
                setMessage("Assess Thread!");
                setSeverity(constants.notification.SUCCESS);
            })
            .catch((err) => {
                setMessage(err.response?.data?.message ?? err.message);
                setSeverity(constants.notification.ERROR);
            })
            .finally(() => {
                reset();
                handleClose(), setOpen(true);
            });
    };

    const likelihoodMarks = [
        {
            value: 1,
            label: "1",
        },
        {
            value: 2,
            label: "2",
        },
        {
            value: 3,
            label: "3",
        },
        {
            value: 4,
            label: "4",
        },
        {
            value: 5,
            label: "5",
        },
    ];

    const severityMarks = [
        {
            value: 1,
            label: "1",
        },
        {
            value: 2,
            label: "2",
        },
        {
            value: 3,
            label: "3",
        },
        {
            value: 4,
            label: "4",
        },
        {
            value: 5,
            label: "5",
        },
    ];

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
            <DialogTitle>
                Assessment for {moment().format("DD/MM/YYYY")}
            </DialogTitle>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid xs={12}>
                            <Controller
                                control={control}
                                name="likelihood"
                                render={({ field }) => (
                                    <>
                                        <InputLabel id="likelihood">
                                            Likelihood
                                        </InputLabel>
                                        <Slider
                                            {...field}
                                            value={field.value}
                                            onChange={field.onChange}
                                            aria-label="Likelihood"
                                            defaultValue={field.value}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks={likelihoodMarks}
                                            min={1}
                                            max={5}
                                        />
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Controller
                                control={control}
                                name="severity"
                                render={({ field }) => (
                                    <>
                                        <InputLabel id="Severity">
                                            Severity
                                        </InputLabel>
                                        <Slider
                                            {...field}
                                            value={field.value}
                                            onChange={field.onChange}
                                            aria-label="Severity"
                                            defaultValue={field.value}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks={severityMarks}
                                            min={1}
                                            max={5}
                                        />
                                    </>
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button type={"submit"} disabled={!isDirty || isSubmitting}>
                        Create{" "}
                        {isSubmitting && (
                            <CircularProgress
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

const Assessment = ({ threadId, user, ownerId }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClick = () => setOpenDialog(true);

    const handleDialogClose = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        setOpenDialog(false);
    };

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
                        <RatingBar data={data.likelihoodList} />
                    )}
                </Grid>
                <Grid flex={1}>
                    <Box>Severity</Box>
                    {isLoading ? (
                        <Skeleton variant="rounded" height={20} />
                    ) : isError ? (
                        <ErrorIndicator />
                    ) : (
                        <RatingBar data={data.severityList} />
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
                        <LineChart data={data} />
                    </Box>
                )}
            </Grid>

            {/* {user?.id === data?.riskOwner?.id && ( */}
            {user?.id === ownerId.toString() && (
                <Button disabled={isLoading} onClick={handleClick}>
                    Assess
                </Button>
            )}

            {openDialog && (
                <AssessDialog
                    open={openDialog}
                    handleClose={handleDialogClose}
                    threadData={{
                        id: threadId,
                        likelihoodList: data.likelihoodList,
                        severityList: data.severityList,
                    }}
                />
            )}
        </>
    );
};

RatingBar.propTypes = {
    data: PropTypes.array.isRequired,
};

LineChart.propTypes = {
    data: PropTypes.object.isRequired,
};

AssessDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    threadData: PropTypes.object.isRequired,
};

Assessment.propTypes = {
    threadId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    ownerId: PropTypes.number.isRequired,
};

export default Assessment;
