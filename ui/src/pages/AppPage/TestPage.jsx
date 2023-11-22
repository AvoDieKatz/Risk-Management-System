import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../services/TestService";
import {
    AppDialog,
    AwaitConnectionIndicator,
    LoadingIndicator,
    RmsButton,
} from "../../components";
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

const TestPage = () => {
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => setOpen(true);

    const handleCloseModal = () => setOpen(false);

    const { isLoading, isError, isPaused, data } = useQuery({
        queryKey: ["fetchTodos"],
        queryFn: async () => {
            console.log("queryFn run");
            await new Promise((resolve) => setTimeout(resolve, 550));
            const response = await getTodos();
            return response.data;
        },
        meta: {
            successMessage: "Data loaded",
        },
    });

    return (
        <>
            {isPaused ? (
                <AwaitConnectionIndicator />
            ) : isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <p className="text-bold">Error!</p>
            ) : (
                <>
                    <AppDialog open={open}>
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your
                                email address here. We will send updates
                                occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <RmsButton onClick={handleCloseModal}>
                                Cancel
                            </RmsButton>
                            <RmsButton onClick={handleCloseModal}>
                                Subscribe
                            </RmsButton>
                        </DialogActions>
                    </AppDialog>
                    <RmsButton onClick={handleOpenModal}>Show modal</RmsButton>
                    {data.map((el) => (
                        <p key={el.id} className="text-thin">
                            {JSON.stringify(el)}
                        </p>
                    ))}
                </>
            )}
        </>
    );
};

export default TestPage;
