const {Schema, model} = require('mongoose');

const DrinkTypeSchema = Schema({
    drink : {
        type : String,
        required : [true, 'The drink is required']
    },
    cost : {
        type : Number,
        required : [true, 'The cost of the drink is required']
    }
})

module.exports = model('drinkType', DrinkTypeSchema, 'drinkType')