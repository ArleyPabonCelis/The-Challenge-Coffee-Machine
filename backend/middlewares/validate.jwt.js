/* const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order.js');


const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-api-token-jwt-cofeemachine');
    console.log(token);

    if(!token){
        return res.status(401).json({
            msg :  'There is no token in the petition'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const order = await Order.findById(uid);

        if(!order){
            return res.status(401).json({
                msg : "Invalid token - Order does not exist in the DB"
            })
        }

        if(!order.process){
            return res.status(401).json({
                msg : 'Invalid token - Order with process: false'
            })
        }

        req.order = order;
        console.log('Req order in validate', req.order);
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {validateJWT} */