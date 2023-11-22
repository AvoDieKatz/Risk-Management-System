import React from "react";
import PropTypes from "prop-types";
import { RmsButton as Button, ErrorIndicator } from "../../components";
import {
    Unstable_Grid2 as Grid,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Box,
    styled,
    Dialog,
    Slider,
    CircularProgress,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import categoryService from "../../services/CategoryService";
import threadService from "../../services/ThreadService";
import { useAlert } from "../../contexts";
import constants from "../../shared/constants";

const StyledBoxForm = styled(Box)(() => ({
    "& .MuiGrid2-root": {
        marginBottom: 12,
    },
}));

const schema = yup.object({
    title: yup.string().required("Title need to be provided."),
    categoryId: yup.string().required("Choose thread's category"),
    description: yup
        .string()
        .required("Please briefly describe what this thread is about."),
});

const CategorySelect = ({ field, invalid, error }) => {
    const {
        isLoading,
        isError,
        data: fetchedData,
    } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await categoryService.getCategories();
            return response.data;
        },
    });

    return (
        <FormControl error={invalid} required fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
                {...field}
                label="Category"
                value={field.value}
                onChange={field.onChange}
                required
                variant="standard"
            >
                {isLoading ? (
                    <MenuItem>Loading...</MenuItem>
                ) : isError ? (
                    <ErrorIndicator />
                ) : (
                    fetchedData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))
                )}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};

const AssessSlider = ({ label, field }) => {
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
        <>
            <InputLabel id={label}>{label}</InputLabel>
            <Slider
                {...field}
                value={field.value}
                onChange={field.onChange}
                aria-label={label}
                defaultValue={2}
                valueLabelDisplay="auto"
                step={1}
                marks={label === "Likelihood" ? likelihoodMarks : severityMarks}
                min={1}
                max={5}
            />
        </>
    );
};

const AddThreadDialog = ({ open, handleClose }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            categoryId: "",
            description: "",
            likelihoodValue: 2,
            severityValue: 2,
        },
        resolver: yupResolver(schema),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (request) => threadService.createThread(request),
        onSuccess: () => queryClient.invalidateQueries(["threads"]),
    });

    const { setOpen, setMessage, setSeverity } = useAlert();

    const onSubmit = async (data) => {
        const request = { ...data };
        console.log("request = ", request);

        return mutation
            .mutateAsync(request)
            .then(() => {
                setMessage("Thread successfully created!");
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

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
            <DialogTitle>Create New Thread</DialogTitle>
            <StyledBoxForm
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid xs={9}>
                            <Controller
                                control={control}
                                name="title"
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={fieldState.invalid}
                                        helperText={fieldState.error?.message}
                                        // autoFocus
                                        id="threadTitle"
                                        label="Title"
                                        fullWidth
                                        variant="standard"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({
                                    field,
                                    fieldState: { error, invalid },
                                }) => (
                                    <CategorySelect
                                        field={field}
                                        error={error}
                                        invalid={invalid}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Controller
                                control={control}
                                name="description"
                                render={({
                                    field,
                                    fieldState: { error, invalid },
                                }) => (
                                    <TextField
                                        {...field}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={invalid}
                                        helperText={error?.message}
                                        id="threadDescription"
                                        label="Description"
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={5}
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid
                            container
                            xs={12}
                            justifyContent={"space-between"}
                        >
                            <Grid xs={5}>
                                <Controller
                                    control={control}
                                    name="likelihoodValue"
                                    render={({ field }) => (
                                        <AssessSlider
                                            label={"Likelihood"}
                                            field={field}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid xs={5}>
                                <Controller
                                    control={control}
                                    name="severityValue"
                                    render={({ field }) => (
                                        <AssessSlider
                                            label={"Severity"}
                                            field={field}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    <Button type={"submit"} disabled={isSubmitting}>
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
            </StyledBoxForm>
        </Dialog>
    );
};

CategorySelect.propTypes = {
    field: PropTypes.object.isRequired,
    error: PropTypes.object,
    invalid: PropTypes.bool,
};

AssessSlider.propTypes = {
    label: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
};

AddThreadDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AddThreadDialog;
