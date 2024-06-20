import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GameDetail = ({ user }) => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [monsters, setMonsters] = useState([]);
    const [allMonsters, setAllMonsters] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState("");

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

        const fetchAllMonsters = async () => {
            try {
                const response = await fetch(`http://localhost:3010/api/v1/monsters`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                setAllMonsters(data);
            } catch (error) {
                console.error("Error fetching all monsters:", error);
            }
        };

        fetchGame();
        fetchAllMonsters();
    }, [id, user]);

    const addMonsterToGame = async () => {
        try {
            const response = await fetch(`http://localhost:3010/api/v1/games/addmonster/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ game: game.name, monster: selectedMonster })
            });

            if (response.ok) {
                const updatedGame = await response.json();
                setGame(updatedGame);

                // Fetch the updated monster details
                const newMonsterResponse = await fetch(`http://localhost:3010/api/v1/monsters/name/?name=${selectedMonster}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const newMonster = await newMonsterResponse.json();
                setMonsters([...monsters, newMonster]);

                // Update the list of available monsters
                setAllMonsters(allMonsters.filter(monster => monster.name !== selectedMonster));
                setSelectedMonster("");
            } else {
                console.error('Error al añadir el monstruo al juego.');
            }
        } catch (error) {
            console.error('Error en la operación:', error);
        }
    };

    const deleteGame = async () => {
        try {
            const response = await fetch(`http://localhost:3010/api/v1/games/${game._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                console.log('Juego eliminado correctamente');
                window.location.href = '/'; // Redirigir a la página principal o alguna otra página después de eliminar
            } else {
                console.error('Error al eliminar el juego.');
            }
        } catch (error) {
            console.error('Error en la operación:', error);
        }
    };

    if (!game) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{game.name}</h1>
            
            <button onClick={deleteGame}>Eliminar Juego</button>

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
            {allMonsters.length > 0 ? (
                <div>
                    <select value={selectedMonster} onChange={(e) => setSelectedMonster(e.target.value)}>
                        <option value="" disabled>Selecciona un monstruo para añadir</option>
                        {allMonsters
                            .filter(monster => !monsters.some(m => m.name === monster.name)) // Exclude already added monsters
                            .map((monster) => (
                                <option key={monster._id} value={monster.name}>{monster.name}</option>
                            ))}
                    </select>
                    <button onClick={addMonsterToGame} disabled={!selectedMonster}>Añadir</button>
                </div>
            ) : (
                <p>No hay más monstruos disponibles para añadir.</p>
            )}
        </div>
    );
};

export default GameDetail;

