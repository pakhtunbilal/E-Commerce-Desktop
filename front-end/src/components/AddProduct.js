import React from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const[name,setName]=React.useState('');
    const[price,setPrice]=React.useState('');
    const[category,setCategory]=React.useState('');
    const[company,setCompany]=React.useState('');
    const[error, setError]=React.useState(false);
    const navigate = useNavigate();


    const handleAdd= async()=>{

        if(!name || !price || !category || !company){

            setError(true)
            return false
        }

        const userId = JSON.parse(localStorage.getItem('users'))._id;
        let result= await fetch('https://e-commerce-desktop.onrender.com/add-product',{
            method:"POST",
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                'Content-Type':'application/json',
                authorization : ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result= await result.json();
        console.log(result)
        navigate('/');
         
        

    }

    return (
        <div className="product">
            <h1> Add Product</h1>
            <input type="text" placeholder="Enter product name" className="inputarea"
            onChange={(e)=>{setName(e.target.value)}} value={name}
            />
            { error && !name && <span className="error-msg">Enter valid name</span>}


            <input type="text" placeholder="Enter product price" className="inputarea"
            onChange={(e)=>{setPrice(e.target.value)}} value={price}
            />
            { error && !price && <span className="error-msg">Enter valid price</span>}


            <input type="text" placeholder="Enter product category" className="inputarea"
            onChange={(e)=>{setCategory(e.target.value)}} value={category}
            />
            { error && !category && <span className="error-msg">Enter valid category</span>}


            <input type="text" placeholder="Enter product company" className="inputarea"
            onChange={(e)=>{setCompany(e.target.value)}} value={company}
            />
            { error && !company && <span className="error-msg">Enter valid company</span>}

            <button type="button" className="appbutton" onClick={handleAdd}> Add Product</button>
        </div>
    )
}
export default AddProduct;
