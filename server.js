const express = require('express');
const Jwt = require('jsonwebtoken');
require('dotenv').config()
const JwtKey = 'e-comm';
require('./DB/config');
const users = require('./DB/users');
const Product = require('./DB/product');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors())

const verifyToken = (req,res,next)=>{
    let token = req.headers['authorization']
    if(token){
        token = token.split(' ')[1];
        console.warn("middleware called", token);
        Jwt.verify(token, JwtKey,(err, valid)=>{
            if(err){
                res.status(401).send({result : "please enter valid token"})
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(403).send({ result :"token to dalo "})
    }
    
}

app.post('/register', async (req, res) => {
    let data = new users(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, JwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            res.send("something went wrong, please try again after some time")
        }
        res.send( {result, auth: token })
    })
});

app.post('/login', async (req, res) => {

    if (req.body.email && req.body.password) {
        user = await users.findOne(req.body).select("-password");

        if (user) {

            Jwt.sign({ user }, JwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.send("something went wrong, please try again after some time")
                }
                res.send( {user, auth: token })
            })

        }
        else {
            res.send("user not found")
        }
    }
    else {
        console.log("enter proper details")
    }

});

app.post('/add-product',verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)

});

app.get('/products',verifyToken , async (req, res) => {
    let products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send("no products listed on the app")
    }
});

app.delete('/product/:id',verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
});

app.get('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    }
    else {
        res.send("result : invalid id")
    }
});

app.put('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
});

app.get('/search/:key' , verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });
    res.send(result)
});




app.listen(4000);