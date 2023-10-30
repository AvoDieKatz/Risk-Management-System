import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
    Unstable_Grid2 as Grid,
    Paper,
    Stack,
    Typography,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Box,
    Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import constants from "../../shared/constants";
import { AuthContext } from "../../contexts";
import authService from "../../services/AuthService";
import { setTokenToStorage } from "../../utils/storage";
import jwtDecode from "jwt-decode";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const PasswordField = ({
    field: { ref, value, onChange },
    fieldState: { invalid, error },
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            inputRef={ref}
            id="password"
            label="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            error={invalid}
            helperText={error?.message}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

const schema = yup.object({
    username: yup.string().required("Field is required"),
    password: yup.string().required("Field is required"),
});

const LoginForm = () => {
    const { setUserAuthentication } = useContext(AuthContext);

    const {
        handleSubmit,
        control,
        watch,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const request = {
            username: data.username,
            password: data.password,
        };

        authService
            .authenticate(request)
            .then((res) => {
                const token = res.data.token;
                if (token) {
                    setTokenToStorage(token);
                    const claims = jwtDecode(token);
                    console.log("login claims = ", claims)
                    setUserAuthentication(claims);
                }
            })
            .catch((err) => {
                console.log("Auth Error = ", err);
                setError("root.serverError", {
                    type: err.response?.status,
                    message: err.response?.data?.message,
                });
            });
    };

    return (
        <Box
            p={5}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                width: 360,
            }}
        >
            <Typography variant="h4" align="center" letterSpacing={2}>
                LOGIN
            </Typography>
            <Stack spacing={3} mt={3} justifyContent={"center"}>
                <Controller
                    name="username"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                            {...field}
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={field.value}
                            onChange={field.onChange}
                            error={invalid}
                            helperText={error?.message}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <PasswordField fieldState={fieldState} field={field} />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: 12 }}
                    disabled={
                        watch("username") === "" || watch("password") === ""
                    }
                >
                    LOGIN
                </Button>

                {errors.root?.serverError?.type === 401 && (
                    <Typography textAlign={"center"} color={"error"}>
                        {errors.root?.serverError?.message}
                    </Typography>
                )}

                <Link
                    variant="caption"
                    underline="hover"
                    component={RouterLink}
                    to="/admin/contact"
                    sx={{
                        textAlign: "justify",
                        textAlignLast: "center",
                    }}
                >
                    {constants.messages.CONTACT_ADMIN}
                </Link>
            </Stack>
        </Box>
    );
};

const LoginPage = () => {
    return (
        <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            sx={{
                height: "100vh",
            }}
        >
            <Grid>
                <Paper elevation={8}>
                    <LoginForm />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginPage;

PasswordField.propTypes = {
    field: PropTypes.object,
    fieldState: PropTypes.object,
};
