import "./Form.css"
import { useState, useEffect } from "react";


function Form(){
    const [email,setEmail]= useState<string>("");
    const [password,setPassword]= useState<string>("");
    const [showing,setShowing]= useState<boolean>(false);

    const user={
        email:"algo@nose.com",
        password:"1234"
    }
    const handleChange=(stateUpdate)=>{
        return(event)=>{
            stateUpdate(event.target.value);
        }
    }
    const handleClick=()=>{
        if(email===user.email && password===user.password){
            alert("login exitoso")
        }else{
            alert("informacion incorrecta")
        }
        setShowing(!showing);
    }
    useEffect(()=>{
        

    },[email,password]);
    return(
        <>
        <section>
            {
                
                showing && (
                    <>
                    <p>monstruo: {email}</p>
                    <p>id: {password}</p>
                    </>
                )
            }
        </section>
        <section className="formContainer">

            <span className="inputContainer">
                <label htmlFor="email" >email</label>
                <input type="text" id="email" name="email" value={email} onChange={handleChange(setEmail)}/>
            </span>

            <span className="inputContainer">
            
                <label htmlFor="password">contraseña</label>
                <input type="p" id="password" name="password" value={password} onChange={handleChange(setPassword)}/>
            </span>
            <button onClick={handleClick}>login</button>
        </section>
        </>
    );
    
}

export default Form;