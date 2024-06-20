import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MonstersList = ({ user }) => {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        const fetchMonsters = async () => {
            try {
                const response = await fetch("http://localhost:3010/api/v1/monsters", {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                setMonsters(data);
            } catch (error) {
                console.error("Error fetching monsters:", error);
            }
        };

        fetchMonsters();
    }, [user]);

    return (
        <div>
            <h1>Lista de Monstruos</h1>
            {monsters.length > 0 ? (
                monsters.map(monster => (
                    <div key={monster._id}>
                        <Link to={`/monsters/${monster._id}`}>{monster.name}</Link>
                    </div>
                ))
            ) : (
                <p>No hay monstruos registrados.</p>
            )}
            <Link to="/monsters/new">+ Añadir Monstruo</Link>
        </div>
    );
};

export default MonstersList;
