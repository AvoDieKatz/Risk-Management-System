import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    styled,
    CircularProgress,
} from "@mui/material";
import { RmsButton as Button } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import accountService from "../../services/AccountService";
import { useAlert } from "../../contexts";
import constants from "../../shared/constants";

const CharacterTextField = ({ field, invalid, error, ...props }) => {
    const handleKeyDown = (e) => {
        const regdx = /^\d{1}$/;
        if (regdx.test(e.key) && e.key !== "Backspace") {
            e.preventDefault();
        }
    };

    return (
        <TextField
            {...props}
            {...field}
            value={field.value}
            onChange={field.onChange}
            onKeyDown={handleKeyDown}
            error={invalid}
            helperText={error?.message}
            required
        />
    );
};

const GenderSelect = ({ field, invalid, error }) => {
    const genderMappings = [
        { value: "MALE", label: "Male" },
        { value: "FEMALE", label: "Female" },
        { value: "OTHERS", label: "Others" },
    ];

    return (
        <FormControl error={invalid} required>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
                {...field}
                label="Gender"
                value={field.value}
                onChange={field.onChange}
                required
            >
                {genderMappings.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};

const DobDatePicker = ({ field, fieldState }) => {
    return (
        <DatePicker
            {...field}
            value={field.value}
            onChange={field.onChange}
            label="Date of Birth"
            format="DD/MM/YYYY"
            slotProps={{
                textField: {
                    error: fieldState.invalid,
                    helperText: fieldState.error?.message,
                },
            }}
        />
    );
};

const NumberTextField = ({ field, invalid, error }) => {
    const handleKeyDown = (e) => {
        const regdx = /^\d{1}$/;
        if (!regdx.test(e.key) && e.key !== "Backspace") {
            e.preventDefault();
        }
    };

    return (
        <TextField
            {...field}
            value={field.value}
            onChange={field.onChange}
            onKeyDown={handleKeyDown}
            error={invalid}
            helperText={error?.message}
            required
            label="Phone No."
            inputProps={{ maxLength: 10 }}
        />
    );
};

const StyledBoxForm = styled(Box)(() => ({
    "& .MuiGrid2-root": {
        marginBottom: 40,
        width: "100%",
    },
    "& .MuiFormControl-root": {
        width: "100%",
    },
}));

const schema = yup.object({
    firstName: yup.string().required("Field is required"),
    lastName: yup.string().required("Field is required"),
    gender: yup.string().required("Field is required"),
    dob: yup
        .mixed()
        .nullable()
        .test("isEmpty", "Field is required", (value) => value && value !== "")
        .test(
            "afterToday",
            "Date of Birth can't be after today",
            (value) => value && new Date(value) < new Date()
        )
        .test("checkAge", "The user is not over 18", (value) => {
            const year = new Date().getFullYear();
            const age = new Date(value).getFullYear();
            return year - age >= 18;
        }),
    email: yup
        .string()
        .required("Field is required")
        .email("Not a correct email")
        .matches(/^\w+@fpt.com$/, "This email domain is not acceptable"),
    phone: yup
        .string()
        .required("Field is required")
        .matches(/^\d{10}$/, "This is not a valid phone number"),
});

const AddForm = () => {
    const navigate = useNavigate();
    const handleReturn = () => navigate("/admin/user", { replace: true });

    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: "",
            dob: null,
            email: "",
            phone: "",
            role: "",
        },
        resolver: yupResolver(schema),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (request) => accountService.createAccount(request),
        onSuccess: () => queryClient.invalidateQueries(["accounts"]),
    });

    const { setOpen, setMessage, setSeverity } = useAlert();

    const onSubmit = async (data) => {
        const request = {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            dob: moment(data.dob).format("YYYY-MM-DD"),
            email: data.email,
            phone: data.phone,
        };
        console.log("SUBMITTED REQ = ", request);

        return mutation
            .mutateAsync(request)
            .then((res) => {
                console.log("Axios res add account", res);
                setMessage("Account successfully added!");
                setSeverity(constants.notification.SUCCESS);
                setOpen(true);
                reset(), handleReturn();
            })
            .catch((err) => {
                setMessage(err.response?.data?.message ?? err.message);
                setSeverity(constants.notification.ERROR);
                setOpen(true);

                const errorMap = err.response.data.errorsMap;

                for (const [key, value] of Object.entries(errorMap)) {
                    console.log(`Key = ${key}; Value = ${value}`);
                    setError(key, { message: value });
                }
            });
    };

    return (
        <StyledBoxForm
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid>
                <Controller
                    control={control}
                    name="firstName"
                    render={({ field, fieldState: { invalid, error } }) => (
                        <CharacterTextField
                            field={field}
                            invalid={invalid}
                            error={error}
                            label={"First Name"}
                        />
                    )}
                />
            </Grid>
            <Grid>
                <Controller
                    control={control}
                    name="lastName"
                    render={({ field, fieldState: { invalid, error } }) => (
                        <CharacterTextField
                            field={field}
                            invalid={invalid}
                            error={error}
                            label={"Last Name"}
                        />
                    )}
                />
            </Grid>
            <Grid>
                <Controller
                    control={control}
                    name="gender"
                    render={({ field, fieldState: { invalid, error } }) => (
                        <GenderSelect
                            field={field}
                            invalid={invalid}
                            error={error}
                        />
                    )}
                />
            </Grid>
            <Grid>
                <Controller
                    control={control}
                    name="dob"
                    render={({ field, fieldState }) => (
                        <DobDatePicker field={field} fieldState={fieldState} />
                    )}
                />
            </Grid>
            <Grid>
                <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            error={invalid}
                            helperText={error?.message}
                            required
                            label="Email"
                        />
                    )}
                />
            </Grid>
            <Grid>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field, fieldState: { invalid, error } }) => (
                        <NumberTextField
                            field={field}
                            invalid={invalid}
                            error={error}
                        />
                    )}
                />
            </Grid>

            <Grid container justifyContent={"flex-end"} mt={4}>
                <Button
                    color="error"
                    variant={"outlined"}
                    onClick={handleReturn}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant={"outlined"}
                    sx={{ marginLeft: 3 }}
                    disabled={isSubmitting}
                >
                    Submit{" "}
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
            </Grid>
        </StyledBoxForm>
    );
};

const UserAddPage = () => {
    return (
        <Grid container justifyContent={"center"}>
            <Grid md={4}>
                <AddForm />
            </Grid>
        </Grid>
    );
};

CharacterTextField.propTypes = {
    field: PropTypes.object.isRequired,
    invalid: PropTypes.bool,
    error: PropTypes.object,
};

GenderSelect.propTypes = {
    field: PropTypes.object.isRequired,
    invalid: PropTypes.bool,
    error: PropTypes.object,
};

DobDatePicker.propTypes = {
    field: PropTypes.object.isRequired,
    fieldState: PropTypes.object.isRequired,
};

NumberTextField.propTypes = {
    field: PropTypes.object.isRequired,
    invalid: PropTypes.bool,
    error: PropTypes.object,
};

export default UserAddPage;
