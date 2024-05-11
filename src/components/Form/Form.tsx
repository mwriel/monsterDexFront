import "./Form.css"
import { useState, useEffect } from "react";

const api_url="http://localhost:3010"

function Form(){
    const [email,setEmail]= useState<string>("");
    const [password,setPassword]= useState<string>("");
    const [showing,setShowing]= useState<boolean>(false);
    const [user,setUser]=useState<any>(null);
    const [monster,setMonster]=useState<any>(null);
    const [count,setCount]=useState<number>(0);
    useEffect(()=>{
        const storagedUserString=window.localStorage.getItem("user");
        const storagedUser=JSON.parse(storagedUserString);
        setUser(storagedUser);
        //console.log(storagedUser);
    },[]);



const monsters=async ()=>{
    try{
        const response=await fetch(`${api_url}/api/v1/monsters`,{
            
            headers:{
                'Authorization':`Bearer ${user.token}`
            },
            

        });
        const data=await response.json();
        if(data){
            
            
            setMonster(data);
            console.log(data[0].name)
        }
        //console.log(data)
        
        
    }catch(err){
        console.error(err)
    }
}

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
            window.localStorage.setItem("user",JSON.stringify(data));
            
        }else{
            alert("usuario y contraseña incorrecto pero en login")
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
        //login({email,password})

        monsters()
        setShowing(true);
    }
    
    return(
        
        <>
        <section>
            //ToDo usar ciclo while para insertar todos los monstruos del arreglo
            {
                
                monster && (
                    //to do hacer que muestre monstruos en vez de el user
                    <>

                    <p>monstruo: {monster[0].name}</p>
                    <p>size: {monster[0].size}</p>
                    <p>body: {monster[0].body}</p>
                    
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