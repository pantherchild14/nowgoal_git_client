import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DiamondIcon from '@mui/icons-material/Diamond';
import WalletIcon from '@mui/icons-material/Wallet';
import HttpsIcon from '@mui/icons-material/Https';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const styles = {
    profile: {
        warp :{
            width: '100%',
            padding: '10px 20px',
        },
        title: {
            fontSize: '15px',
            fontWeight: 'bold',
            padding: '0 5px 5px 5px',
            lineHeight: '30px',
            marginBottom: '10px',
            borderBottom: 'solid 1px #f1f1f1',
        },
        info: {
            gird: {
                borderRadius: '4px',
                padding: '10px',
                minHeight: '50px',
                display: 'flex',
                alignItems: 'center',
                margin: '1%',
                flex: '0 0 48%',
                justifyContent: 'space-between',
                border: 'solid 1px #ddd',
                background: 'linear-gradient(to bottom, #ffffff, #f7f7f7)',
            },
            tit: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
            },
            des : {
                color: 'gray',
                fontSize: '12px',
                wordBreak: 'break-word',
                lineHeight: '20px',
                overflow: 'hidden',
                width: '100%',
            }
        }
    },
    headerProfilde: {
        padding: '20px 30px 20px 30px',
        border: '1px solid',
    },
};

const Profile = (props) => {
    const navigate = useNavigate();

    const isLocalUser = localStorage.getItem('USER_NAME');
    const isLocalEmail = localStorage.getItem('EMAIL');
    const isLocalRole = localStorage.getItem('ROLE');

    const settingsMappings = {
        Change_password: '/change-password',
    };


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderDashboard = () => {
        if (isLocalRole === 'Administrator') {
            return (
                <Grid item xs={12}>
                    <Button variant="outlined">
                        <Link to={'/profile/dashboard'} >Dashboard</Link>
                    </Button>
                </Grid>
            );
        } else {
            return (
                <Grid item xs={12}>
                    <Typography>
                        <DiamondIcon />
                        My Diamond
                    </Typography>
                    <Typography>
                        <WalletIcon />
                        My Bonus
                    </Typography>
                </Grid>
            );
        }
    };

    const renderProfile = () => {
        if (isLocalRole === 'Administrator') {
            return (
                <Grid container >
                    <Grid item xs={12} sm={6} style={styles.profile.info.gird}>
                        <div style={{display: 'flex'}}>
                            <HttpsIcon />
                            <div className="listitemInfo">
                                <div class="row tit" style={styles.profile.info.tit}>Password</div>
                                <div class="row des" style={styles.profile.info.des}>Change Password</div>
                            </div>
                        </div>
                        <Button variant="contained"  textAlign='right'>
                            <Link to={'change-password'}>Change</Link>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={styles.profile.info.gird}>
                        <div style={{display: 'flex'}}>
                            <LogoutIcon />
                            <div className="listitemInfo">
                                <div class="row tit" style={styles.profile.info.tit}>Logout</div>
                            </div>
                        </div>
                        <Button onClick={handleLogout} variant="contained"  textAlign='right'>
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            );
        } else if(isLocalRole === 'Subscriber') {
            return (
                <Grid container >
                    <Grid item xs={12} sm={6} style={styles.profile.info.gird}>
                        <div style={{display: 'flex'}}>
                            <HttpsIcon />
                            <div className="listitemInfo">
                                <div class="row tit" style={styles.profile.info.tit}>Password</div>
                                <div class="row des" style={styles.profile.info.des}>Change Password</div>
                            </div>
                        </div>
                        <Button variant="contained"  textAlign='right'>
                            <Link to={'change-password'}>Change</Link>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={styles.profile.info.gird}>
                        <div style={{display: 'flex'}}>
                            <LogoutIcon />
                            <div className="listitemInfo">
                                <div class="row tit" style={styles.profile.info.tit}>Logout</div>
                            </div>
                        </div>
                        <Button onClick={handleLogout} variant="contained"  textAlign='right'>
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            );
        } else {
            return (
                <Grid container >
                    <Grid item xs={12} sm={6} style={styles.profile.info.gird}>
                        <div style={{display: 'flex'}}>
                            <LoginIcon />
                            <div className="listitemInfo">
                                <div class="row tit" style={styles.profile.info.tit}>Sign in</div>
                            </div>
                        </div>
                        <Button variant="contained"  textAlign='right'>
                            <Link to={'change-password'}>Sign in</Link>
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("ROLE");
        localStorage.removeItem("EMAIL");
        localStorage.removeItem("USER_NAME");

        navigate('/');
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Grid container style={styles.headerProfilde}>
                    <Grid item xs={12} sm={6}>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt={isLocalUser} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                            <span className="userName">
                                {isLocalUser}
                            </span>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={6} textAlign='right' >
                        <Grid container spacing={2}>
                            {renderDashboard()}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{ 
                    marginTop: 4,
                    flexGrow: 1, 
                    bgcolor: 'background.paper', 
                    display: 'flex', height: 224 
                }}
            >
                <Tabs
                    orientation="vertical"
                    // variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    // sx={{ borderRight: 1, borderColor: 'divider' }}
                    style={{ width: '15%' }}
                >
                    <Tab label="Profile" {...a11yProps(0)} />
                    {/* <Tab label="Item Two" {...a11yProps(1)} /> */}
                </Tabs>
                <TabPanel value={value} index={0} style={styles.profile.warp}>
                    <div class="title" style={styles.profile.title}>
                        Profile
                    </div>
                    {renderProfile()}
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    Content of Item Two
                </TabPanel> */}
            </Box>
        </React.Fragment>
    )
}

export default Profile;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
