import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Form from './components/Form/Form';
import Register from './components/Register';
import Games from './components/Games';
import AddGame from './components/AddGame';
import GameDetail from './components/GameDetail';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storagedUserString = window.localStorage.getItem("user");
        if (storagedUserString) {
            setUser(JSON.parse(storagedUserString));
        }
    }, []);

    return (
        <Router>
            <main>
                <Header title="login" />
                <Routes>
                    <Route path="/login" element={<Form setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/games" element={user ? <Games user={user} /> : <Navigate to="/login" />} />
                    <Route path="/games/new" element={user ? <AddGame user={user} /> : <Navigate to="/login" />} />
                    <Route path="/games/:id" element={user ? <GameDetail user={user} /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
