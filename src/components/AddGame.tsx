import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddGame = ({ user }) => {
    const [name, setName] = useState("");
    const [gen, setGen] = useState("");
    const navigate = useNavigate();

    const handleAddGame = async () => {
        const response = await fetch("http://localhost:3010/api/v1/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ name, gen })
        });

        if (response.status === 201) {
            navigate("/games");
        } else {
            alert("Error al agregar el juego");
        }
    };

    return (
        <div>
            <h1>Agregar Juego</h1>
            <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" placeholder="Generación" value={gen} onChange={e => setGen(e.target.value)} />
            <button onClick={handleAddGame}>Agregar</button>
        </div>
    );
};

export default AddGame;
