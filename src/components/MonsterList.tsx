// MonsterList.tsx
import React, { useState, useEffect } from 'react';

const MonsterList = ({ user }) => {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        const fetchMonsters = async () => {
            try {
                const response = await fetch('http://localhost:3010/api/v1/monsters', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                setMonsters(data);
            } catch (error) {
                console.error('Error fetching monsters:', error);
            }
        };

        fetchMonsters();
    }, [user]);

    return (
        <div>
            <h1>Listado de Monstruos</h1>
            <ul>
                {monsters.map((monster) => (
                    <li key={monster._id}>
                        {monster.name} - <button onClick={() => addToGame(monster)}>Añadir a juego</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MonsterList;
