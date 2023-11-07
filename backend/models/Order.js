const {Schema, model} = require('mongoose');

const OrderSchema = Schema({
    drinkType : {
        type : Schema.Types.ObjectId,
        ref : 'drinkType',
        required : [true, 'drinkType is required']
    },
    
    sugars : {
        type : Number,
        required : false,
        default : 0,
        enum: [0, 1, 2]
    }, 

    extrahot : {
        type : Boolean,
        required : false,
        default : false
    }, 

    money : {
        type : Number,
        required: [true, 'The money is required']
    }, 

    date : {
        type : Date,
        default : Date.now
    },

    process : {
        type : Boolean,
        required : true,
        default : true
    }
})


module.exports = model('Order', OrderSchema, 'Orders')