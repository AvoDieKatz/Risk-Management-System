import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
    DialogContent,
    DialogTitle,
    TextField,
    DialogActions,
    Box,
    CircularProgress,
    IconButton,
    Dialog,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    AwaitConnectionIndicator,
    DataTable,
    ErrorIndicator,
    LoadingIndicator,
    Panel,
    RmsButton as Button,
} from "../../components";
import { createColumnHelper } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import categoryService from "../../services/CategoryService";
import { Controller, useForm } from "react-hook-form";
import { useAlert } from "../../contexts";
import constants from "../../shared/constants";

const AddCategoryDialog = ({ open, handleClose, defaultValues = null }) => {
    const { setOpen, setMessage, setSeverity } = useAlert();

    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { isSubmitting, isDirty },
    } = useForm({
        defaultValues: {
            name: defaultValues?.name ?? "",
        },
    });

    useEffect(() => {
        reset(defaultValues);
    }, [reset, defaultValues]);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (body) => {
            console.log("mutFn body = ", body);
            const { action, ...request } = body;

            switch (action) {
                case "add":
                    return categoryService.createCategory(request);
                case "update":
                    return categoryService.updateCategory(
                        defaultValues.id,
                        request
                    );
                case "delete":
                    return categoryService.deleteCateogry(defaultValues.id);
                default:
                    break;
            }
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries(["categories"]);
            setMessage(res.data?.response?.message ?? "Success!");
            setSeverity(constants.notification.SUCCESS);
            setOpen(true);
            reset();
            handleClose();
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        const request = {
            action: defaultValues ? "update" : "add",
            name: data.name,
        };

        return mutation.mutateAsync(request).catch((err) => {
            const errorMap = err.response.data.errorsMap;

            for (const [key, value] of Object.entries(errorMap)) {
                console.log(`Key = ${key}; Value = ${value}`);
                setError(key, { message: value });
            }

            setMessage(err.response?.data?.message ?? err.message);
            setSeverity(constants.notification.ERROR);
            setOpen(true);
        });
    };

    const handleDelete = () => {
        console.log("Cate deleted");
        const request = {
            action: "delete",
        };
        return mutation
            .mutateAsync(request)
            .catch((err) => {
                setMessage(err.response?.data?.message ?? err.message);
                setSeverity(constants.notification.ERROR);
                setOpen(true);
            })
            .finally(() => handleClose());
    };

    const handleKeyDown = (e) => {
        const regdx = /^\d{1}$/;
        if (regdx.test(e.key) && e.key !== "Backspace") {
            e.preventDefault();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
            <DialogTitle>Create Category</DialogTitle>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogContent>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Field is required." }}
                        render={({ field, fieldState: { error, invalid } }) => (
                            <TextField
                                {...field}
                                value={field.value}
                                onChange={field.onChange}
                                error={invalid}
                                helperText={error?.message}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Category Name"
                                fullWidth
                                variant="standard"
                                onKeyDown={handleKeyDown}
                                inputProps={{ maxLength: 20 }}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    {defaultValues && (
                        <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={handleDelete}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                    <Button onClick={handleClose}>Cancel</Button>

                    {defaultValues ? (
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isDirty}
                        >
                            Update{" "}
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
                    ) : (
                        <Button type="submit" disabled={isSubmitting}>
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
                    )}
                </DialogActions>
            </Box>
        </Dialog>
    );
};

const CategoryManagementPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        if (selectedData) {
            handleClick();
        }
    }, [selectedData]);

    const {
        isLoading,
        isError,
        isPaused,
        data: fetchedData,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await categoryService.getCategories();
            return response.data;
        },
        meta: {
            errorMessage: "There is an error while loading categories data.",
        },
    });

    const handleClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        setSelectedData(null);
        setOpenDialog(false);
    };

    const tableColumnHelper = createColumnHelper();

    const columns = [
        tableColumnHelper.accessor("id", {
            header: () => "ID",
            cell: (info) => info.getValue(),
        }),
        tableColumnHelper.accessor("name", {
            header: () => <span>Category Name</span>,
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
                            <Button
                                size={"small"}
                                startIcon={<AddIcon />}
                                sx={{
                                    position: "absolute",
                                }}
                                onClick={handleClick}
                            >
                                Add Category
                            </Button>
                            <DataTable
                                data={fetchedData}
                                columns={columns}
                                setSelectedData={setSelectedData}
                            />
                        </>
                    )}
                </Panel>
            </Grid>

            {openDialog && (
                <AddCategoryDialog
                    open={openDialog}
                    handleClose={handleCloseDialog}
                    defaultValues={selectedData}
                />
            )}
        </Grid>
    );
};

AddCategoryDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    defaultValues: PropTypes.object,
};

export default CategoryManagementPage;
