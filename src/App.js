import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { Container } from "@mui/material";
import { useEffect } from "react"; // Import useEffect
import HomePage from "./pages/HomePage";
import MatchPage from "./pages/MatchPage";
import Header from "./components/Header";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ChangePassword from './components/auth/ChangePassword';
import Profile from './components/auth/Profile';
import Dashboard from './components/Dashboard/Dashboard';
import LiveScore from './pages/LiveScore';
import SinglePage from './pages/Single';
import PageToolTaiXiu2 from './pages/ToolTaiXiu2';

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const isLocalRole = localStorage.getItem('ROLE');

    // Check if the current location is the dashboard route
    const isDashboardRoute = location.pathname === '/profile/dashboard';

    // Use useEffect to navigate based on user role
    useEffect(() => {
        if (isLocalRole !== 'Administrator' && !isDashboardRoute) {
            navigate('/sign-in');
        }
    }, [isLocalRole, isDashboardRoute, navigate]);
    const style = {
        container: {
            padding: '0 10px 70px 10px',
        }
    };

    return (
        <>
            {/* Main routes */}
            {isDashboardRoute ? null : <Header />}
            <div style={style.container} className="container">
                <Routes>
                    {isLocalRole === 'Administrator' && (
                        <>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/tooltaixiu2' element={<PageToolTaiXiu2 />} />
                            <Route path='/live-score' element={<LiveScore />} />
                            <Route path='/match/:id' element={<MatchPage />} />
                        </>
                    )}

                    {/* Auth  */}
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/profile/change-password' element={<ChangePassword />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </div>

            {/* Dashboard route */}
            <Routes>
                <Route path='/profile/dashboard' element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
