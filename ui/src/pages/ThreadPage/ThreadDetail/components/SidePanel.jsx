import React, { useState } from "react";
import PropTypes from "prop-types";
import { Panel } from "../../../../components";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Avatar, Box, Stack, Tab, Tabs, Typography } from "@mui/material";

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

SidePanel.propTypes = {
    threadId: PropTypes.string.isRequired,
};

SidePanelTab.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default SidePanel;
