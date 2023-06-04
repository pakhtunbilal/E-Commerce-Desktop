import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Updateproduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const param = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        productdeatils();
    }, []);

    const productdeatils = async () => {
        console.warn(param)
        let result = await fetch(`http://localhost:4000/product/${param.id}`,{
            headers:{
                authorization : ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }


    const HandleUpdate = async () => {

        let result = await fetch(`http://localhost:4000/product/${param.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization : ` bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.warn(result)
        navigate('/');

    }

    return (
        <div className="product">
            <h1> Update Product</h1>
            <input type="text" placeholder="Enter product name" className="inputarea"
                onChange={(e) => { setName(e.target.value) }} value={name}
            />

            <input type="text" placeholder="Enter product price" className="inputarea"
                onChange={(e) => { setPrice(e.target.value) }} value={price}
            />

            <input type="text" placeholder="Enter product category" className="inputarea"
                onChange={(e) => { setCategory(e.target.value) }} value={category}
            />

            <input type="text" placeholder="Enter product company" className="inputarea"
                onChange={(e) => { setCompany(e.target.value) }} value={company}
            />
            <button type="button" className="appbutton" onClick={HandleUpdate}> Update Product</button>
        </div>
    )
}
export default Updateproduct;