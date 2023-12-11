import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
    Autocomplete,
    Avatar,
    Box,
    CircularProgress,
    Unstable_Grid2 as Grid,
    IconButton,
    Skeleton,
    TextField,
    Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import accountService from "../../../../services/AccountService";
import threadService from "../../../../services/ThreadService";

const ControlledOwnerSelect = ({ fetchedUsers, control }) => {
    return (
        <Controller
            control={control}
            name="riskOwner"
            rules={{ required: true }}
            onChange={([, data]) => data}
            render={({ field, fieldState }) => {
                return (
                    <Autocomplete
                        {...field}
                        options={fetchedUsers}
                        getOptionLabel={(option) => option.fullName}
                        renderOption={(props, option) => (
                            <Box
                                component="li"
                                sx={{ mr: 2, flexShrink: 0 }}
                                {...props}
                            >
                                <Avatar sx={{ width: 24, height: 24 }} />
                                <Typography mx={1} fontSize={13}>
                                    {option.fullName}
                                </Typography>
                                <Typography
                                    component={"span"}
                                    variant="dimmed"
                                    fontSize={11}
                                >
                                    (#{option.id})
                                </Typography>
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Risk Owner"
                                variant="outlined"
                                error={fieldState.invalid}
                            />
                        )}
                        onChange={(e, data) => {
                            field.onChange(data);
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        sx={{ width: 280 }}
                    />
                );
            }}
        />
    );
};

const OwnerSelectForm = ({ fetchedUsers, currentThreadId, currentOwnerId }) => {
    const owner = useRef(fetchedUsers.find((el) => el.id === currentOwnerId));

    const {
        control,
        handleSubmit,
        watch,
        formState: { isSubmitting, isDirty},
    } = useForm({
        mode: "onChange",
        defaultValues: {
            riskOwner: owner.current,
        },
    });

    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: (request) =>
            threadService.assignThreadOwner(
                currentThreadId,
                request?.riskOwner?.id
            ),
        onSuccess: () => {
            queryClient.invalidateQueries(["threads"]);
            queryClient.invalidateQueries(["threads", currentThreadId]);
        },
    });

    const onSubmit = async (data) => {
        const request = { ...data };
        return mutateAsync(request);
    };

    return (
        <Grid
            container
            spacing={2}
            component={"form"}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <ControlledOwnerSelect
                control={control}
                fetchedUsers={fetchedUsers}
            />

            {isDirty && (
                <Box sx={{ m: 1, position: "relative" }}>
                    <IconButton
                        aria-label="save"
                        color="primary"
                        disabled={watch("riskOwner") === null}
                        type="submit"
                        sx={{ ml: 1 }}
                    >
                        <SaveIcon />
                    </IconButton>
                    {isSubmitting && (
                        <CircularProgress
                            size={40}
                            sx={{
                                position: "absolute",
                                top: 1,
                                left: 6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
            )}
        </Grid>
    );
};

const OwnerSelect = ({ currentThreadId, currentOwnerId }) => {
    const {
        isLoading,
        isError,
        data: users,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const reqParam = { role: "ANALYST" };
            const response = await accountService.getAccounts(reqParam);
            return response.data;
        },
    });

    return (
        <>
            {isLoading ? (
                <Skeleton>
                    <TextField />
                </Skeleton>
            ) : isError ? (
                <Typography color={"error.main"}>ERROR!</Typography>
            ) : (
                <OwnerSelectForm
                    fetchedUsers={users}
                    currentOwnerId={currentOwnerId}
                    currentThreadId={currentThreadId}
                />
            )}
        </>
    );
};

ControlledOwnerSelect.propTypes = {
    fetchedUsers: PropTypes.array.isRequired,
    control: PropTypes.object.isRequired,
};

OwnerSelectForm.propTypes = {
    fetchedUsers: PropTypes.array.isRequired,
    currentOwnerId: PropTypes.number.isRequired,
    currentThreadId: PropTypes.number.isRequired,
};

OwnerSelect.propTypes = {
    currentThreadId: PropTypes.number.isRequired,
    currentOwnerId: PropTypes.number.isRequired,
};

export default OwnerSelect;
