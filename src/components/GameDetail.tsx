import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GameDetail = ({ user }) => {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        const fetchGame = async () => {
            const response = await fetch(`http://localhost:3010/api/v1/games/id/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            setGame(data);
        };

        fetchGame();
    }, [id, user]);

    if (!game) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{game.name}</h1>
            <h2>Monstruos</h2>
            {game.monster.map(monster => (
                <p key={monster._id}>{monster.name}</p>
            ))}
        </div>
    );
};

export default GameDetail;
