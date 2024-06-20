

import "./Form.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const api_url = "http://localhost:3010";

function Form({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [monsters, setMonsters] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storagedUserString = window.localStorage.getItem("user");
        if (storagedUserString) {
            setUser(JSON.parse(storagedUserString));
        }
    }, [setUser]);

    const fetchmonsters = async (token) => {
        try {
            const response = await fetch(`${api_url}/api/v1/monsters`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (data) {
                setMonsters(data);
                console.log(data[0].name);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const login = async ({ email, password }) => {
        try {
            const response = await fetch(`${api_url}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 200) {
                const data = await response.json();
                setUser(data);
                window.localStorage.setItem("user", JSON.stringify(data));
                fetchmonsters(data.token);
                navigate("/games");
            } else {
                alert("Usuario y contraseña incorrecto");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (stateUpdate) => {
        return (event) => {
            stateUpdate(event.target.value);
        };
    };

    const handleClick = () => {
        login({ email, password });
    };

    return (
        <>
            <section>
                {
                    monsters && monsters.map(monster => (
                        <>
                            <p>monstruo: {monster.name}</p>
                            <p>size: {monster.size}</p>
                            <p>body: {monster.body}</p>
                        </>
                    ))
                }
            </section>
            <section className="formContainer">
                <span className="inputContainer">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value={email} onChange={handleChange(setEmail)} />
                </span>
                <span className="inputContainer">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleChange(setPassword)} />
                </span>
                <button onClick={handleClick}>Login</button>
                <Link to="/register">Registrar</Link>
            </section>
        </>
    );
}

export default Form;
