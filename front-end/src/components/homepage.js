import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'


const Homepage = ()=>{

    const[products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();

    },[]);

    const getProducts=async()=>{
        let result = await fetch('http://localhost:4000/products',{
            headers:{
                authorization : ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
         result = await result.json();
         setProducts(result)
    }

    const deleteproduct= async(id)=>{
    let result = await fetch(`http://localhost:4000/product/${id}`,{
        method:'DELETE',
        headers:{
            authorization : ` bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result = await result.json();
    getProducts();
    }

    const handleSearch=async(event)=>{

        const key = event.target.value;

        if(key){
        let result = await fetch(`http://localhost:4000/search/${key}`,{
            headers:{
                authorization : ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();

        if(result){
            setProducts(result)
        }            
        }
        else{
            getProducts();
        }

    }

    return(
        <div className="product-list">
            <h1> Homepage Component</h1>
            <input  className="inputarea" type="text" placeholder="Search Products"
            onChange={handleSearch}
            />
            <ul >
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Company</li>
                <li>Operations</li>
            </ul>

            {
               products.length>0 ? products.map((item,index)=>
                    <ul key={item._id}>
                <li>{index +1 }</li>
                <li> {item.name}</li>
                <li> RS. {item.price}</li>
                <li>{item.company}</li>
                <li><button onClick={()=>deleteproduct(item._id)}>Delete</button>
                    <Link to={"/update/"+ item._id}> update</Link>
                </li>
            </ul>
                )
                : <h1> No results found</h1>
            }
            
        </div>
    )
}

export default Homepage;