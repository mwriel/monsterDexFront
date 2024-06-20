
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Games = ({ user }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch("http://localhost:3010/api/v1/games", {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, [user]);

    return (
        <div>
            <h1>Juegos</h1>
            {games.map(game => (
                <div key={game._id}>
                    <Link to={`/games/${game._id}`}>{game.name}</Link>
                </div>
            ))}
            <div>
                <Link to="/games/new">+ Agregar Juego</Link>
                <Link to="/monsters/new" style={{ marginLeft: '10px' }}>+ Registrar Monstruo</Link>
            </div>
        </div>
    );
};

export default Games;
