import React, { useContext, useState } from "react";
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
    ListItemIcon,
    LinearProgress,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation, Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../contexts";
import constants from "../../shared/constants";
import authService from "../../services/AuthService";

const { ROLE_ANALYST, ROLE_MANAGER, ROLE_ADMIN, ROLE_CRO } = constants.roles;

const listItemsMapping = [
    {
        path: "",
        label: "Dashboard",
        sublist: [],
        permittedRoles: [ROLE_ANALYST, ROLE_MANAGER, ROLE_ADMIN, ROLE_CRO],
    },
    {
        path: "thread",
        label: "Thread",
        sublist: [
            {
                path: "",
                label: "Active Threads",
                permittedRoles: [
                    ROLE_ANALYST,
                    ROLE_MANAGER,
                    ROLE_ADMIN,
                    ROLE_CRO,
                ],
            },
            {
                path: "assignments",
                label: "Your Assignments",
                permittedRoles: [ROLE_ANALYST],
            },
        ],
        permittedRoles: [ROLE_ANALYST, ROLE_MANAGER, ROLE_ADMIN, ROLE_CRO],
    },
    {
        path: "meeting",
        label: "Meeting",
        sublist: [],
        permittedRoles: [ROLE_ANALYST, ROLE_MANAGER, ROLE_ADMIN, ROLE_CRO],
    },
    {
        path: "policy",
        label: "Policy",
        sublist: [],
        permittedRoles: [ROLE_ANALYST, ROLE_MANAGER, ROLE_ADMIN, ROLE_CRO],
    },
    {
        path: "admin",
        label: "Admin",
        sublist: [
            {
                path: "user",
                label: "User Management",
                permittedRoles: [ROLE_ADMIN],
            },
        ],
        permittedRoles: [ROLE_ADMIN],
    },

    /**
     *
     * Below routes are for development purposes only
     *
     */
    // {
    //     path: "test",
    //     label: "Test Page",
    //     sublist: [],
    //     permittedRoles: [ROLE_ANALYST, ROLE_MANAGER, ROLE_ADMIN, ROLE_CRO],
    // },
    {
        path: "login",
        label: "Login Page",
        sublist: [],
        permittedRoles: [ROLE_ANALYST, ROLE_MANAGER, ROLE_ADMIN, ROLE_CRO],
    },
];

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

const NavListButton = ({ item, currentLocation, currentRole }) => {
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
                            {item.sublist.map(
                                (i) =>
                                    i.permittedRoles?.includes(currentRole) && (
                                        <ListItemButton
                                            key={i.path}
                                            component={Link}
                                            to={`/${item.path}/${i.path}`}
                                            sx={{ pl: 3 }}
                                            dense={true}
                                            selected={
                                                i.path === currentLocation[2]
                                            }
                                        >
                                            <ListItemText primary={i.label} />
                                        </ListItemButton>
                                    )
                            )}
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

const NavigationList = ({ userRole }) => {
    const path = useLocation();
    const currentPath = path.pathname.split("/");

    console.log("List role = ", userRole)
    
    return (
        <>
            <StyledList disablePadding={true}>
                {listItemsMapping.map(
                    (item) =>
                        item?.permittedRoles.includes(userRole) && (
                            <NavListButton
                                key={item.path}
                                item={item}
                                currentLocation={currentPath}
                                currentRole={userRole}
                            />
                        )
                )}
            </StyledList>
        </>
    );
};

const ProfileBox = ({ profile }) => {
    return (
        <Box p={1} height={50}>
            <Grid container>
                <Grid container flexGrow={1} spacing={1}>
                    <Grid>
                        <Avatar alt={profile.lastName} />
                    </Grid>
                    <Grid>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {profile.lastName} {profile.firstName}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ fontStyle: "italic" }}
                        >
                            {constants.roles[profile.role]}
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

const LogoutButton = () => {
    const { handleDeauth } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const handleLogoutClicked = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1350));
        authService.logout().then((res) => {
            console.log("Logout Res = ", res);
            handleDeauth();
            setLoading(false);
        });
    };

    return (
        <>
            {loading && <LinearProgress />}
            <ListItemButton
                dense={true}
                onClick={handleLogoutClicked}
                disabled={loading}
                sx={{
                    py: 1,
                    px: 2,
                    opacity: loading ? 1 : 0.58,
                    "&:hover": { opacity: 1 },
                }}
            >
                <ListItemText primary="Logout" />
                <ListItemIcon sx={{ minWidth: "initial" }}>
                    <LogoutIcon />
                </ListItemIcon>
            </ListItemButton>
        </>
    );
};

const Sidenav = () => {
    const {
        userAuthentication: { user },
    } = useContext(AuthContext);

    console.log("List mapping = ", listItemsMapping)
    
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
                    <NavigationList userRole={constants.roles[user?.role]} />
                </Grid>
            </Grid>
            <Divider sx={{ margin: "0.5rem 0rem" }} />
            <Grid>
                <ProfileBox profile={user} />
            </Grid>
            <Divider />
            <Grid>
                <LogoutButton />
            </Grid>
        </Grid>
    );
};

export default Sidenav;

NavListButton.propTypes = {
    item: PropTypes.shape({
        path: PropTypes.string,
        label: PropTypes.string,
        sublist: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.string,
                label: PropTypes.string,
                permittedRoles: PropTypes.array,
            })
        ),
        permittedRoles: PropTypes.array,
    }),
    currentLocation: PropTypes.array,
    currentRole: PropTypes.string,
};

NavigationList.propTypes = {
    userRole: PropTypes.string.isRequired,
};

ProfileBox.propTypes = {
    profile: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        role: PropTypes.string,
    }),
};
