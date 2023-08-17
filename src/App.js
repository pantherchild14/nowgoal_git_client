import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Container } from "@mui/material";
import HomePage from "./pages/HomePage";
import MatchPage from "./pages/MatchPage";
import Header from "./components/Header";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ChangePassword from './components/auth/ChangePassword';
import Profile from './components/auth/Profile';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    const location = useLocation();

    // Check if the current location is the dashboard route
    const isDashboardRoute = location.pathname === '/profile/dashboard';

    return ( 
        <>  
            {/* Main routes */}
            <Container maxWidth="lg" className="container"> 
                {isDashboardRoute ? null : <Header />}
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/match/:id' element={<MatchPage />} />

                    {/* Auth  */}
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/profile/change-password' element={<ChangePassword />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </Container>

            {/* Dashboard route */}
            <Routes>
                <Route path='/profile/dashboard' element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
