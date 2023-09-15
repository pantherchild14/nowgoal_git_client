import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoDevIcon from "@mui/icons-material/LogoDev";

const Navbar = (props) => {
    const { isLoggedIn, isLocalUser, isLocalTimeZone } = props;
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [timeZoneOffset, setTimeZoneOffset] = useState(0);

    const sections = [
        { title: 'Home', url: '' },
        { title: 'Live Scores', url: '' },
        { title: 'Betting Odds', url: '' },
        { title: 'Betting Tips', url: '' },
    ];

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const settingsMappings = {
        Profile: '/profile',
        Account: '/account',
        Dashboard: '/dashboard',
        Logout: '/logout',
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        const savedTimeZone = parseInt(isLocalTimeZone);
        if (!isNaN(savedTimeZone)) {
            setTimeZoneOffset(savedTimeZone);
        }
    }, []);

    const handleTimeZoneChange = (event) => {
        const selectedOffset = parseInt(event.target.value, 10);
        setTimeZoneOffset(selectedOffset);
        localStorage.setItem('TIME_ZONE', selectedOffset);
    };

    return (
        <React.Fragment>
            <Toolbar sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                    aria-label="Website Title"
                >
                    Admin
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    <nav className='navbar_headerTips'>
                        <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                            {sections.map((section) => (
                                <li key={section.title} sx={{ marginRight: '10px' }}>
                                    <NavLink
                                        to={section.url}
                                        activeclassname="active"
                                        aria-current={section.title === "Home" ? "page" : undefined}
                                        style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold', paddingRight: '20px' }}
                                    >
                                        {section.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Box>
                <select value={timeZoneOffset} onChange={handleTimeZoneChange}>
                    <option value={-11}>GMT -11</option>
                    <option value={-10}>GMT -10</option>
                    <option value={-9}>GMT -9</option>
                    <option value={-8}>GMT -8</option>
                    <option value={-7}>GMT -7</option>
                    <option value={-6}>GMT -6</option>
                    <option value={-5}>GMT -5</option>
                    <option value={-4}>GMT -4</option>
                    <option value={-3}>GMT -3</option>
                    <option value={-2}>GMT -2</option>
                    <option value={-1}>GMT -1</option>
                    <option value={+0}>GMT 0</option>
                    <option value={+1}>GMT +1</option>
                    <option value={+2}>GMT +2</option>
                    <option value={+3}>GMT +3</option>
                    <option value={+4}>GMT +4</option>
                    <option value={+5}>GMT +5</option>
                    <option value={+6}>GMT +6</option>
                    <option value={+7}>GMT +7</option>
                    <option value={+8}>GMT +8</option>
                    <option value={+9}>GMT +9</option>
                    <option value={+10}>GMT +10</option>
                    <option value={+11}>GMT +11</option>
                </select>
                {isLoggedIn ? (
                    <>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }}>
                                    <Link to={'/profile'} >
                                        <Avatar alt={isLocalUser} src="/static/images/avatar/2.jpg" />
                                    </Link>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">
                                            <NavLink to={settingsMappings[setting]}>{setting}</NavLink>
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </>
                ) : (
                    <React.Fragment>
                        <Button variant="outlined" size="small" style={{ marginRight: '10px' }}>
                            <Link to="/sign-in" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Sign In
                            </Link>
                        </Button>
                        <Button variant="outlined" size="small">
                            <Link to="/sign-up" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Sign up
                            </Link>
                        </Button>
                    </React.Fragment>
                )}
            </Toolbar>
        </React.Fragment>
    );
}

export default Navbar;
