import { Routes, Route, Link } from 'react-router-dom'
import { Container } from "@mui/material";
import HomePage from "./pages/HomePage";
import MatchPage from "./pages/MatchPage";
import Header from "./components/Header";


function App() {
    return ( 
        <>  
            <Container maxWidth="lg" className="container">
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />}/>
                    <Route path='/match/:id' element={<MatchPage />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;