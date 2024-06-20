import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMonster = ({ user }) => {
    const [name, setName] = useState("");
    const [size, setSize] = useState(0);
    const [body, setBody] = useState("");
    const [weakTo, setWeakTo] = useState([]);
    const [resistantTo, setResistantTo] = useState([]);
    const navigate = useNavigate();

    const weaknesses = ["fire", "thunder", "water", "dragon", "ice", "poison", "paralysis", "sleep"];
    const handleChangeWeakness = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setWeakTo([...weakTo, value]);
        } else {
            setWeakTo(weakTo.filter(item => item !== value));
        }
    };

    const resistances = ["fire", "thunder", "water", "dragon", "ice", "poison", "paralysis", "sleep"];
    const handleChangeResistance = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setResistantTo([...resistantTo, value]);
        } else {
            setResistantTo(resistantTo.filter(item => item !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMonster = { name, size, body, weakTo, resistantTo };

        try {
            const response = await fetch(`http://localhost:3010/api/v1/monsters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newMonster)
            });

            if (response.ok) {
                console.log('Monstruo añadido correctamente');
                navigate('/monsters');
            } else {
                console.error('Error al añadir el monstruo.');
            }
        } catch (error) {
            console.error('Error en la operación:', error);
        }
    };

    return (
        <div>
            <h1>Agregar Monstruo</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Tamaño:</label>
                <input type="number" value={size} onChange={(e) => setSize(e.target.value)} required />

                <label>Cuerpo:</label>
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required />

                <label>Debilidades:</label>
                {weaknesses.map((weakness, index) => (
                    <div key={index}>
                        <label>
                            <input type="checkbox" value={weakness} onChange={handleChangeWeakness} />
                            {weakness}
                        </label>
                    </div>
                ))}

                <label>Resistencias:</label>
                {resistances.map((resistance, index) => (
                    <div key={index}>
                        <label>
                            <input type="checkbox" value={resistance} onChange={handleChangeResistance} />
                            {resistance}
                        </label>
                    </div>
                ))}

                <button type="submit">Añadir</button>
            </form>
        </div>
    );
};

export default AddMonster;
