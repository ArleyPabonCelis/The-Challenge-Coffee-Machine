const DrinkType = require('../models/drinkType.js');
const Order = require('../models/Order.js');

const isValidDrink = async(drinkTypeId) => {
    const existDrink = await DrinkType.findOne({_id: drinkTypeId});
    if(!existDrink){
        throw new Error(`The drink ${drinkTypeId} isn't registered in the database`)
    }
}

const orderExistById = async (id) => {
    const orderExist = await Order.findById(id);
    if(!orderExist){
        throw new Error(`The id (order) not exist ${id}`)
    }
}

module.exports = {
    isValidDrink,
    orderExistById
}