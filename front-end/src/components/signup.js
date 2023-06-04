import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";



const SignUp =()=>
{
    const [name, SetName] = useState("");
    const [password, SetPassword] = useState("");
    const [email, SetEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('users')
        if (auth){
         navigate("/")   
        }
    })

    const Collectdata =async()=>{
        console.warn({name,password,email})
        let result = await fetch('https://e-commerce-desktop.onrender.com/register',{
        method:'post',
        body: JSON.stringify({name,email,password}),
        headers:{
            'Content-Type' :'application/json'
        },
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("users", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/');

       
        
    }
 

    return(
        <div className="register">
            <h1>SignUP into new Acount</h1>
            <input className="inputarea" type="text" value={name} onChange={(e)=>{SetName(e.target.value)}}  placeholder="enter your name" />
            <input className="inputarea" type="email" value={email} onChange={(e)=>{SetEmail(e.target.value)}} placeholder="enter your email" />
            <input className="inputarea" type="password" value={password} onChange={(e)=>{SetPassword(e.target.value)}} placeholder="enter your password" />
            <button className="appbutton" type="button" onClick={Collectdata}> submit </button>
        </div>
    )
}

export default SignUp;
