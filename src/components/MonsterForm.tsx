import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MonsterForm = ({ user, monsterData, onSubmit }) => {
    const [name, setName] = useState(monsterData ? monsterData.name : "");
    const [size, setSize] = useState(monsterData ? monsterData.size : 0);
    const [body, setBody] = useState(monsterData ? monsterData.body : "");
    const [weakTo, setWeakTo] = useState(monsterData ? monsterData.weakTo.join(", ") : "");
    const [resistantTo, setResistantTo] = useState(monsterData ? monsterData.resistantTo.join(", ") : "");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMonster = { name, size, body, weakTo: weakTo.split(","), resistantTo: resistantTo.split(",") };

        try {
            const response = await fetch(`http://localhost:3010/api/v1/monsters/${monsterData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedMonster)
            });

            if (response.ok) {
                const updatedMonster = await response.json();
                console.log('Monstruo actualizado:', updatedMonster);
                navigate('/monsters');
            } else {
                console.error('Error al actualizar el monstruo.');
            }
        } catch (error) {
            console.error('Error en la operación:', error);
        }
    };

    return (
        <div>
            <h1>{monsterData ? `Editar Monstruo - ${monsterData.name}` : 'Agregar Monstruo'}</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Tamaño:</label>
                <input type="number" value={size} onChange={(e) => setSize(e.target.value)} required />

                <label>Cuerpo:</label>
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required />

                <label>Debilidades:</label>
                <input type="text" value={weakTo} onChange={(e) => setWeakTo(e.target.value)} />

                <label>Resistencias:</label>
                <input type="text" value={resistantTo} onChange={(e) => setResistantTo(e.target.value)} />

                <button type="submit">{monsterData ? 'Actualizar' : 'Agregar'}</button>
            </form>
        </div>
    );
};

export default MonsterForm;
