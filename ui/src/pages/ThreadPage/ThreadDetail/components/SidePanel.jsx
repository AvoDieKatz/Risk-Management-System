import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    ErrorIndicator,
    LoadingIndicator,
    Panel,
} from "../../../../components";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
    Avatar,
    Box,
    CircularProgress,
    IconButton,
    InputAdornment,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import threadService from "../../../../services/ThreadService";
import moment from "moment";
import constants from "../../../../shared/constants";
import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getTokenFromStorage } from "../../../../utils/storage";
import { Controller, useForm } from "react-hook-form";
import { useAlert } from "../../../../contexts";

const CommentCard = ({ data }) => {
    return (
        <Panel elevation={2}>
            <Grid container direction={"column"} sx={{ minHeight: 120 }}>
                <Grid container spacing={1} mb={1}>
                    <Grid>
                        <Avatar />
                    </Grid>
                    <Grid>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {data?.author?.lastName} {data?.author?.firstName}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ fontStyle: "italic" }}
                        >
                            {constants.roles["ROLE_" + data?.author?.role]}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid flexGrow={1}>
                    <Typography variant="body1">{data?.content}</Typography>
                </Grid>
                <Grid>
                    <Typography variant="caption">
                        {moment(data?.createdAt).format(
                            "DD/MM/YYYY [at] h:mm A"
                        )}
                    </Typography>
                </Grid>
            </Grid>
        </Panel>
    );
};

const CommentList = ({ commentList }) => {
    const endRef = useRef(null);
    const firstRender = useRef(true);

    const scrollToNewComment = () => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToNewComment();

        // console.log("current rend = ", firstRender);
        // if (!firstRender.current) {
        //     console.log("Scroll")
        //     scrollToNewComment()
        //     firstRender.current = false;
        // }
        // return () => {
        //     console.log("CLEANUP FIRST = ", firstRender.current)
        //     if (!firstRender.current) {
        //         firstRender.current = true;
        //     } else {
        //         firstRender.current = false;
        //     }
        // };
    }, [commentList]);

    return (
        <>
            {commentList.map((cmt) => (
                <CommentCard key={cmt.id} data={cmt} />
            ))}
            <div ref={endRef} />
        </>
    );
};

const CommentTab = ({ threadId }) => {
    const {
        isLoading,
        isError,
        data: fetchedData,
    } = useQuery({
        queryKey: ["threads", threadId, "comments"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 750));
            const response = await threadService.getThreadComments(threadId);
            return response.data;
        },
        staleTime: 6000,
    });

    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: (request) =>
            threadService.createThreadComment(threadId, request),
        onSuccess: () => {
            queryClient.invalidateQueries(["threads", threadId, "comments"]);
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            content: "",
        },
    });

    const inputRef = useRef(null);

    const { setOpen, setMessage, setSeverity } = useAlert();

    const onSubmit = async (data) => {
        const request = { ...data };
        console.log("Submitted");
        return mutateAsync(request)
            .then(() => {
                setMessage("Commented!");
                setSeverity(constants.notification.SUCCESS);
            })
            .catch((err) => {
                setMessage(err.response?.data?.message ?? err.message);
                setSeverity(constants.notification.ERROR);
            })
            .finally(() => {
                reset();
                setOpen(true);
                inputRef.current.blur();
            });
    };

    // const commentEndRef = useRef(null);

    // const scrollToBottom = () => {
    //     console.log("REF = ", commentEndRef.current);
    //     commentEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    /**
     *
     * Comment out to later implement WebSocket
     *
     */

    // const token = getTokenFromStorage("token");
    // const headers = { Authorization: `Bearer ${token}` };
    // const stompClient = new Client({
    //     brokerURL: "ws://localhost:8080/websocket",
    //     connectHeaders: headers
    // })

    // stompClient.onConnect = (frame) => {
    //     console.log("onConnect run")
    //     console.log("FRAME = ", frame)
    //     stompClient.subscribe('/topic/hello', (greeting) => {
    //         console.log("GREEETING = ", greeting)
    //     });
    // }

    // stompClient.onWebSocketError = (error) => {
    //     console.error('Error with websocket', error);
    // };

    // stompClient.onStompError = (frame) => {
    //     console.error('Broker reported error: ' + frame.headers['message']);
    //     console.error('Additional details: ' + frame.body);
    // };

    // const connect = () => {
    //     stompClient.activate()
    // };

    // const disconnect = () => {
    //     stompClient.deactivate();
    //     console.log("Disconnected");
    // }

    return (
        <>
            <Stack
                spacing={2}
                sx={{
                    flex: "1 1 auto",
                    height: 0,
                    overflowY: "auto",
                    p: 1,
                }}
            >
                {isLoading ? (
                    <LoadingIndicator />
                ) : isError ? (
                    <ErrorIndicator />
                ) : (
                    <>
                        {/* <Button onClick={connect}>Connect</Button>
                        <Button onClick={disconnect}>Disconnect</Button> */}
                        <CommentList commentList={fetchedData} />
                    </>
                )}
            </Stack>
            <Box
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    flex: "0 1 auto",
                    width: "100%",
                    p: 1,
                }}
            >
                <Controller
                    control={control}
                    name="content"
                    render={({ field, fieldState: { isDirty } }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Comment"
                            id="comment_tf"
                            ref={inputRef}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="send comment button"
                                            edge="end"
                                            type="submit"
                                            disabled={!isDirty || isSubmitting}
                                        >
                                            {!isSubmitting ? (
                                                <Send />
                                            ) : (
                                                <CircularProgress size={24} />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
            </Box>
        </>
    );
};

const ActivityTab = () => {
    return <>Activity Tab</>;
};

const SidePanelTab = (props) => {
    const { children, value, index, ...others } = props;
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`detail-tabpanel-${index}`}
            aria-labelledby={`detail-tab-${index}`}
            sx={{ height: "calc(100% - 48px)" }}
            {...others}
        >
            {value === index && (
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {children}
                </Box>
            )}
        </Box>
    );
};

const SidePanel = ({ threadId }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Panel
            sx={{
                p: 0,
                flex: "1 1 0",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
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

            <SidePanelTab value={tabIndex} index={0}>
                <CommentTab threadId={threadId} />
            </SidePanelTab>
            <SidePanelTab value={tabIndex} index={1}>
                <ActivityTab />
            </SidePanelTab>
        </Panel>
    );
};

SidePanel.propTypes = {
    threadId: PropTypes.string.isRequired,
};

SidePanelTab.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

CommentTab.propTypes = {
    threadId: PropTypes.string.isRequired,
};

CommentList.propTypes = {
    commentList: PropTypes.array.isRequired,
};

CommentCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SidePanel;
