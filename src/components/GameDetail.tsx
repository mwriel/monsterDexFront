import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GameDetail = ({ user }) => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`http://localhost:3010/api/v1/games/id/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                setGame(data);
                
                // Fetch monsters details using their IDs
                const monsterDetails = await Promise.all(data.monster.map(async (monsterId) => {
                    const monsterResponse = await fetch(`http://localhost:3010/api/v1/monsters/id/${monsterId}`, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    });
                    return await monsterResponse.json();
                }));
                setMonsters(monsterDetails);
            } catch (error) {
                console.error("Error fetching game:", error);
            }
        };

        fetchGame();
    }, [id, user]);

    if (!game) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{game.name}</h1>
            <h2>Monstruos</h2>
            {monsters.map((monster) => (
                <div key={monster._id}>
                    <p>{monster.name}</p>
                    <p>Size: {monster.size}</p>
                    <p>Body: {monster.body}</p>
                    <p>Debilidades: {monster.weakTo.join(', ')}</p>
                    <p>Resistencias: {monster.resistantTo.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default GameDetail;
