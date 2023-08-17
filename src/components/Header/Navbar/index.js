import * as React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinkMui from '@mui/material/Link';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


const Navbar = (props) => {
    const { sections, title, isLoggedIn, isLocalUser } = props; 
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button size="small">Subscribe</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                {/* <IconButton>
                    <SearchIcon />
                </IconButton> */}
                {isLoggedIn ? (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">

                            {/* onClick={handleOpenUserMenu} */}
                            <IconButton  sx={{ p: 0 }}>
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
                                    <Link to={settingsMappings[setting]}>{setting}</Link>
                                </Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
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
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {sections.map((section) => (
                    <LinkMui
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </LinkMui>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

export default Navbar;
