import "./Form.css"
import { useState, useEffect } from "react";

const api_url="http://localhost:3010"

function Form(){
    const [email,setEmail]= useState<string>("");
    const [password,setPassword]= useState<string>("");
    const [showing,setShowing]= useState<boolean>(false);
    const [user,setUser]=useState<any>(null);


    
const login=async ({email,password}:{email:string,password:string} )=>{
    try{
        const response=await fetch(`${api_url}/api/v1/auth/login`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})

        });
        

        if(response.status===200 ){
            const data=await response.json();
            setUser(data)
        }else{
            alert("usuario y contraseña incorrecto")
        }
        
        console.log(response.status)
    }catch(err){
        console.error(err)
    }
}

    
    const handleChange=(stateUpdate)=>{
        return(event)=>{
            stateUpdate(event.target.value);
        }
    }
    const handleClick=()=>{
        login({email,password})
        setShowing(true);
    }
    
    return(
        <>
        <section>
            {
                
                user && (
                    //to do hacer que muestre monstruos en vez de el user
                    <>

                    <p>monstruo: {user.user.email}</p>
                    <p>nombre: {user.user.name}</p>
                    <p>id: {user.user._id}</p>
                    
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
                <input type="password" id="password" name="password" value={password} onChange={handleChange(setPassword)}/>
            </span>
            <button onClick={handleClick}>login</button>
        </section>
        </>
    );
    
}

export default Form;