import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Typography,
    Box,
    Stepper,
    Step,
    StepButton,
    Stack,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Divider,
    TextField,
    StepLabel,
    CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { RmsButton as Button } from "../../../../components";
import constants from "../../../../shared/constants";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import threadService from "../../../../services/ThreadService";
import { useAlert } from "../../../../contexts";

const steps = ["Choose type", "Provide detail", "Review"];

const options = Object.keys(constants.description);

const StepThree = ({ getValues }) => {
    const type = getValues("type");
    const content = getValues("content");

    return (
        <Box sx={{ height: "100%", overflowY: "auto" }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
                Solution Type:{" "}
                {type ? (
                    <Typography
                        component={"span"}
                        fontStyle={"italic"}
                        fontSize={"1.5rem"}
                        color={"secondary"}
                    >
                        {type}
                    </Typography>
                ) : (
                    <Typography
                        component={"span"}
                        variant="dimmed"
                        fontStyle={"italic"}
                    >
                        Not selected
                    </Typography>
                )}
            </Typography>
            <Typography variant="h6" fontWeight={700}>
                Solution Description:
            </Typography>
            {content ? (
                <Typography paragraph>{content}</Typography>
            ) : (
                <Typography
                    component={"span"}
                    variant="dimmed"
                    fontStyle={"italic"}
                >
                    Not provided
                </Typography>
            )}
        </Box>
    );
};

const StepTwo = ({ control }) => {
    return (
        <Controller
            control={control}
            name="content"
            rules={{ required: true }}
            render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    error={invalid}
                    helperText={error?.message}
                    fullWidth
                    required
                    label="Solution Description"
                    multiline
                    minRows={12}
                />
            )}
        />
    );
};

const StepOne = ({ control, watch, threadId }) => {
    let type = watch("type");

    const { isLoading, data: solutions } = useQuery({
        queryKey: ["threads", threadId, "solutions"],
        queryFn: async () => {
            const response = await threadService.getThreadSolutions(threadId);
            return response.data;
        },
    });

    return (
        <Box display={"flex"}>
            <Controller
                control={control}
                name="type"
                rules={{ required: true }}
                render={({ field, fieldState: { error, invalid } }) => (
                    <FormControl
                        sx={{ m: 1, width: 320, pr: 3 }}
                        flex={1}
                        error={invalid}
                    >
                        <InputLabel id="solution-select-helper-label">
                            Solution Type
                        </InputLabel>
                        <Select
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            labelId="solution-select-helper-label"
                            id="solution-select-helper"
                            label="Solution Type"
                            required
                        >
                            {isLoading
                                ? ""
                                : options
                                      .filter((opt) => {
                                          const usedSolutions = solutions.map(
                                              (sol) => sol.type
                                          );
                                          return !usedSolutions.includes(opt);
                                      })
                                      .map((availableOpt) => (
                                          <MenuItem
                                              key={availableOpt}
                                              value={availableOpt}
                                          >
                                              <Typography
                                                  textTransform={"capitalize"}
                                              >
                                                  {availableOpt}
                                              </Typography>
                                          </MenuItem>
                                      ))}
                        </Select>
                        <FormHelperText>
                            {error?.message ??
                                "Select a solution type to see its description."}
                        </FormHelperText>
                    </FormControl>
                )}
            />
            <Box flex={5} sx={{ pl: 3 }}>
                <Typography variant="h6">{type}</Typography>
                <Typography paragraph>{constants.description[type]}</Typography>
            </Box>
        </Box>
    );
};

const ActionSteps = (props) => {
    const { activeStep, children } = props;
    return children.find((child) => child.props.stepValue === activeStep);
};

const ResultStep = ({ handleChangeVw }) => {
    const handleShowSolutions = (e) => {
        handleChangeVw(e, "detail");
    };

    return (
        <Stack flex={1} alignItems={"center"}>
            <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
            <Typography sx={{ mt: 2, mb: 1 }} gut>
                New solution has been added!
            </Typography>
            <Box sx={{ flex: "1 1 auto" }} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                }}
            >
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleShowSolutions}>Show Solutions</Button>
            </Box>
        </Stack>
    );
};

const AddSolutionStepper = (props) => {
    const { threadId, handleChangeVw } = props;

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const {
        control,
        handleSubmit,
        getValues,
        watch,
        reset,
        formState: { isSubmitting },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            type: "",
            content: "",
        },
    });

    const { setOpen, setMessage, setSeverity } = useAlert();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (request) =>
            threadService.createThreadSolution(threadId, request),
        onSuccess: () =>
            queryClient.invalidateQueries(["threads", threadId, "solutions"]),
    });

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = (e) => {
        e.preventDefault();
        const type = getValues("type");
        const content = getValues("content");

        if (type) {
            const newCompleted = completed;
            newCompleted[0] = true;
            setCompleted(newCompleted);
        }

        if (content) {
            const newCompleted = completed;
            newCompleted[1] = true;
            setCompleted(newCompleted);
        }

        if (type && content) {
            setActiveStep(steps.length - 1);
            return;
        }

        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = (e) => {
        e.preventDefault();
        if (activeStep === 0) {
            handleChangeVw(e, "detail");
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const onSubmit = async (data) => {
        const request = { ...data };
        return mutation
            .mutateAsync(request)
            .then(() => {
                setMessage("Solution submitted!");
                setSeverity(constants.notification.SUCCESS);
            })
            .catch((err) => {
                setMessage(err.response?.data?.message ?? err.message);
                setSeverity(constants.notification.ERROR);
            })
            .finally(() => {
                const newCompleted = completed;
                newCompleted[2] = true;
                setCompleted(newCompleted);
                setOpen(true);
                reset();
            });
    };

    return (
        <Stack sx={{ height: "100%" }}>
            <Stepper
                nonLinear
                alternativeLabel
                activeStep={activeStep}
                sx={{ mt: 2, mb: 1 }}
            >
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton
                            color="inherit"
                            onClick={handleStep(index)}
                            sx={{ p: 0, m: 0 }}
                        >
                            <StepLabel>{label}</StepLabel>
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            <Divider sx={{ mt: 2, mb: 3 }} />

            <Stack flex={1}>
                {allStepsCompleted() ? (
                    <ResultStep handleChangeVw={handleChangeVw} />
                ) : (
                    <>
                        <ActionSteps activeStep={activeStep}>
                            <StepOne
                                stepValue={0}
                                control={control}
                                watch={watch}
                                threadId={threadId}
                            />
                            <StepTwo stepValue={1} control={control} />
                            <StepThree stepValue={2} getValues={getValues} />
                        </ActionSteps>

                        <Box sx={{ flex: "1 1 auto" }} />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 2,
                            }}
                            component={"form"}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Button
                                color="inherit"
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                {activeStep === 0 ? "Return" : "Previous"}
                            </Button>

                            <Box sx={{ flex: "1 1 auto" }} />

                            {activeStep !== steps.length &&
                            completedSteps() === totalSteps() - 1 ? (
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && (
                                        <CircularProgress
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    )}{" "}
                                    Finish
                                </Button>
                            ) : (
                                <Button onClick={handleNext}>Next</Button>
                            )}
                        </Box>
                    </>
                )}
            </Stack>
        </Stack>
    );
};

AddSolutionStepper.propTypes = {
    threadId: PropTypes.number.isRequired,
    handleChangeVw: PropTypes.func.isRequired,
};

ResultStep.propTypes = {
    handleChangeVw: PropTypes.func.isRequired,
};

ActionSteps.propTypes = {
    activeStep: PropTypes.number.isRequired,
};

StepOne.propTypes = {
    control: PropTypes.object.isRequired,
    watch: PropTypes.func,
    threadId: PropTypes.number.isRequired,
};

StepTwo.propTypes = {
    control: PropTypes.object.isRequired,
};

StepThree.propTypes = {
    getValues: PropTypes.func.isRequired,
};

export default AddSolutionStepper;
