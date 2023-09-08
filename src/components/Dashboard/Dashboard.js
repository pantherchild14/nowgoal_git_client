import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CaoThu from './components/CaoThu';
import Category from './components/Category';
import Users from './components/Users';
import NewPost from './components/Posts/NewPost';
import AllPosts from './components/Posts/AllPosts';
import UpdatePost from './components/Posts/UpdatePost';
import Widget from './components/Widgets';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Now Goal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState(6);
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [getIdPost, setGetIdPost] = React.useState(null);
  const [updatePostClicked, setUpdatePostClicked] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleTabChange}
            centered
          >
            <Tab label={drawerOpen ? "Dashboard" : ""} {...a11yProps(0)} icon={<DashboardIcon />} />
            <Tab label={drawerOpen ? "Category" : ""} {...a11yProps(1)} icon={<PostAddIcon />} />
            <Tab label={drawerOpen ? "Predictions" : ""} {...a11yProps(2)} icon={<SportsSoccerOutlinedIcon />} />
            <Tab label={drawerOpen ? "Source Tips" : ""} {...a11yProps(3)} icon={<BarChartIcon />} />
            <Tab label={drawerOpen ? "User" : ""} {...a11yProps(4)} icon={<PersonIcon />} />
            <Tab label={drawerOpen ? "Isport Setting" : ""} {...a11yProps(5)} icon={<SettingsIcon />} />
            <Tab label={drawerOpen ? "Cao Thu Setting" : ""} {...a11yProps(6)} icon={<SportsSoccerOutlinedIcon />} />
            <Tab label={drawerOpen ? "New Posts" : ""} {...a11yProps(7)} icon={<PostAddIcon />} />
            <Tab label={drawerOpen ? "All Posts" : ""} {...a11yProps(8)} icon={<PostAddIcon />} />
            <Tab
              label={drawerOpen ? "Update Post" : ""}
              {...a11yProps(9)}
              icon={<PostAddIcon />}
              style={{ display: updatePostClicked ? "block" : "none" }}
            />
          </Tabs>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <TabPanel value={selectedTab} index={0}>
                <Widget />
              </TabPanel>
              <TabPanel value={selectedTab} index={1}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Category />
                  </Paper>
                </Grid>
              </TabPanel>
              <TabPanel value={selectedTab} index={2}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    Content of Tab 3
                  </Paper>
                </Grid>
              </TabPanel>
              <TabPanel value={selectedTab} index={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    Content of Tab 4
                  </Paper>
                </Grid>
              </TabPanel>
              <TabPanel value={selectedTab} index={4}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Users />
                  </Paper>
                </Grid>
              </TabPanel>
              <TabPanel value={selectedTab} index={5}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    Content of Tab 6
                  </Paper>
                </Grid>
              </TabPanel>
              <TabPanel value={selectedTab} index={6}>
                <CaoThu />
              </TabPanel>
              <TabPanel value={selectedTab} index={7}>
                <NewPost />
              </TabPanel>
              <TabPanel value={selectedTab} index={8}>
                <AllPosts setSelectedTab={setSelectedTab} setGetIdPost={setGetIdPost} />
              </TabPanel>
              <TabPanel value={selectedTab} index={9}>
                <UpdatePost getIdPost={getIdPost} />
              </TabPanel>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
