import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{

    const [email,SetEmail]=useState("");
    const [password,SetPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('users');
        if(auth){
            navigate('/')
        }
    })

    const handlelogin=async()=>{
        let result = await fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });

        result =  await result.json();
        console.log(result);

        if(result.auth){
            localStorage.setItem("users", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate('/');
        }
        else{
            console.log("please enter correct info")
        }

    }

    return(
        

        <div className="login">
            <h1> Enter your details to Login </h1>
            <input className="inputarea" type="email" placeholder="Enter your email"
            onChange={(e)=>SetEmail(e.target.value)} value={email} />
            <input className="inputarea" type="password" placeholder="Enter your password"
            onChange={(e)=>SetPassword(e.target.value)} value={password} />
            <button className="appbutton" type="button" onClick={handlelogin}> Login </button>
        </div>
    )
};

export default Login;