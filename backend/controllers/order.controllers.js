const Order = require('../models/Order.js');

const getOrder =  (req, res) => {
    res.status(403).json({
        'message' : 'Welcome to Coffee Machine'
    });
}

const postOrder = async (req, res) => {
    const body = req.body
    const order = new Order(body);

    await order.save();

    res.json({
        order
    });
}

const deleteOrder = async (req, res) => {
    const {id} = req.params
    const order = await Order.findByIdAndUpdate(id, {process : false})
    res.json(order);
}

const putOrder = (req, res) => {
    res.json({
        "message" : "Put API"
    });
}


module.exports = {
    getOrder,
    postOrder,
    deleteOrder,
    putOrder
}