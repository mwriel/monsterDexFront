import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        const response = await fetch("http://localhost:3010/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, password })
        });

        if (response.status === 201) {
            navigate("/login");
        } else {
            alert("Error en el registro");
        }
    };

    return (
        <div>
            <h1>Registro de Usuario</h1>
            <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Registrar</button>
        </div>
    );
};

export default Register;
