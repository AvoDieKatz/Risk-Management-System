import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Unstable_Grid2 as Grid,
    List,
    ListItemButton,
    Divider,
    ListItemText,
    Typography,
    Badge,
    styled,
    Avatar,
    IconButton,
    Collapse,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation, Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const StyledList = styled(List)(({ theme }) => ({
    "& .MuiListItemButton-root:hover, .MuiListItemButton-root.Mui-selected, .MuiListItemButton-root.Mui-selected:hover":
        {
            color: theme.palette.rms.contrastText,
            backgroundColor: theme.palette.rms.light,
        },
}));

const NavTop = () => {
    const [notiCount, setNotiCount] = useState(1);
    return (
        <>
            <Typography
                variant="h6"
                px={2}
                py={1}
                sx={{ letterSpacing: 3, color: "#0A2647" }}
            >
                Risk MS
            </Typography>
            <ListItemButton dense={true}>
                <ListItemText primary="Notification" />
                <Badge badgeContent={notiCount} color="primary" />
            </ListItemButton>
        </>
    );
};

const NavListButton = ({ item, currentLocation }) => {
    const [listOpen, setListOpen] = useState(false);
    const isSubmenu = item.sublist.length > 0;

    const handleOpenSubmenu = () => {
        setListOpen(!listOpen);
    };

    return (
        <>
            {isSubmenu ? (
                <>
                    <ListItemButton onClick={handleOpenSubmenu}>
                        <ListItemText primary={item.label} />
                        {listOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={listOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.sublist.map((i) => (
                                <ListItemButton
                                    key={i.path}
                                    component={Link}
                                    to={`/${item.path}/${i.path}`}
                                    sx={{ pl: 3 }}
                                    dense={true}
                                    selected={i.path === currentLocation[2]}
                                >
                                    <ListItemText primary={i.label} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </>
            ) : (
                <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={item.path === currentLocation[1]}
                >
                    <ListItemText primary={item.label} />
                </ListItemButton>
            )}
        </>
    );
};

NavListButton.propTypes = {
    item: PropTypes.shape({
        path: PropTypes.string,
        label: PropTypes.string,
        sublist: PropTypes.array,
        permittedRoles: PropTypes.array,
    }),
    currentLocation: PropTypes.array,
};

const NavigationList = () => {
    const listItemsMapping = [
        {
            path: "",
            label: "Dashboard",
            sublist: [],
            permittedRoles: [],
        },
        {
            path: "thread",
            label: "Thread",
            sublist: [],
            permittedRoles: [],
        },
        {
            path: "meeting",
            label: "Meeting",
            sublist: [],
            permittedRoles: [],
        },
        {
            path: "policy",
            label: "Policy",
            sublist: [],
            permittedRoles: [],
        },
        {
            path: "admin",
            label: "Admin",
            sublist: [
                {
                    path: "user",
                    label: "User Management",
                },
            ],
            permittedRoles: [],
        },
        {
            path: "test",
            label: "Test Page",
            sublist: [],
            permittedRoles: [],
        },
        {
            path: "login",
            label: "Login Page",
            sublist: [],
            permittedRoles: [],
        },
    ];

    const path = useLocation();
    const currentPath = path.pathname.split("/");

    return (
        <>
            <StyledList disablePadding={true}>
                {listItemsMapping.map((item) => (
                    <NavListButton
                        key={item.path}
                        item={item}
                        currentLocation={currentPath}
                    />
                ))}

                {/* <ListItemButton
                    component={Link}
                    to="/"
                    selected={location === ""}
                >
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/thread"
                    selected={location === "thread"}
                >
                    <ListItemText primary="Thread" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/meeting"
                    selected={location === "meeting"}
                >
                    <ListItemText primary="Meeting" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/policy"
                    selected={location === "policy"}
                >
                    <ListItemText primary="Policy" />
                </ListItemButton>

                <ListItemButton onClick={handleOpenAdminMenu}>
                    <ListItemText primary="Admin" />
                    {adminMenuOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={adminMenuOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/admin/user"
                            sx={{ pl: 3 }}
                        >
                            <ListItemText primary="User Management" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <Divider />

                <ListItemButton
                    component={Link}
                    to="/test"
                    selected={location === "test"}
                >
                    <ListItemText primary="Test Page" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/login"
                    selected={location === "login"}
                >
                    <ListItemText primary="Login Form" />
                </ListItemButton> */}
            </StyledList>
        </>
    );
};

const ProfileBox = () => {
    const [profile, setProfile] = useState({
        fullName: "John Doe",
        role: "Administrator",
    });

    return (
        <Box p={1} height={50}>
            <Grid container>
                <Grid container flexGrow={1} spacing={1}>
                    <Grid>
                        <Avatar alt={profile.fullName} />
                    </Grid>
                    <Grid>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {profile.fullName}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ fontStyle: "italic" }}
                        >
                            {profile.role}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid>
                    <IconButton aria-label="profile-setting" size="small">
                        <SettingsIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

const Sidenav = () => {
    return (
        <Grid
            container
            flexDirection={"column"}
            borderRight={`1px solid rgba(0, 0, 0, .2)`}
            sx={{
                height: "100%",
            }}
        >
            <Grid container flexGrow={1} flexDirection={"column"}>
                <Grid>
                    <NavTop />
                </Grid>
                <Divider sx={{ margin: "0.5rem 0rem" }} />
                <Grid>
                    <NavigationList />
                </Grid>
            </Grid>
            <Divider sx={{ margin: "0.5rem 0rem" }} />
            <Grid>
                <ProfileBox />
            </Grid>
        </Grid>
    );
};

export default Sidenav;
