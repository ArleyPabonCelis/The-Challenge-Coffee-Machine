const express = require('express');
const {MongoClient} = require('mongodb')
const router = express.Router();
require('dotenv').config();
const database = process.env.MONGO_URI;
const nameDB = 'coffeeMachine'


router.get('/hola', async(req, res) => {
    try {
        res.json('COFFEE MACHINE');
    } catch (e) {
        res.json('NO!, ESTA MAL!');
    }
});

// *********** ENDPOINTS *********** //
/* 1. API all orders */
router.get('/allOrders', async(req, res) => {
    try {
        const client = new MongoClient(database);
        await client.connect();
        const dataBase = client.db(nameDB);
        const collection = dataBase.collection('Orders');
        const result = await collection.aggregate([
            {
                $lookup: {
                    from: "drinkType",  
                    localField: "drinkType",
                    foreignField: "_id",
                    as: "drinkType"
                }
            },
            {
                $unwind: "$drinkType"
            },
            {
                $project: {
                    _id: 1,
                    drinkType: 1,
                    sugars: 1,
                    extrahot: 1,
                    money: 1,
                    date: 1,
                    process: 1
                }
            }
        ]).toArray();
        res.json(result);
        client.close;
    } catch (error) {
        res.status(404).json("Data not found");
    }
});

/* 2. API all orders today */
router.get('/allOrdersToday', async(req, res) => {
    try {
        const client = new MongoClient(database);
        await client.connect();
        const dataBase = client.db(nameDB);
        const collection = dataBase.collection('Orders');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const result = await collection.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [
                            { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                            { $dateToString: { format: "%Y-%m-%d", date: today } }
                        ]
                    }
                }
            }
        ]).toArray();
        res.json(result);
        client.close;
    } catch (error) {
        res.status(404).json("Data not found");
    }
});

/* 3. API all orders process: true --> Orders Executed*/
router.get('/OrdersExecuted', async(req, res) => {
    try {
        const client = new MongoClient(database);
        await client.connect();
        const dataBase = client.db(nameDB);
        const collection = dataBase.collection('Orders');
        const result = await collection.find({ process: true }).toArray();
        res.json(result);
        client.close;
    } catch (error) {
        res.status(404).json("Data not found");
    }
});

/* 3. API of all the coffees, teas or chocolates that were prepared, gives me the value of money that was collected according to the drink*/
router.get('/Coffees', async(req, res) => {
    try {
        const client = new MongoClient(database);
        await client.connect();
        const dataBase = client.db(nameDB);
        const collection = dataBase.collection('Orders');
        const result = await collection.aggregate([
            {
                $lookup: {
                    from: "drinkType",
                    localField: "drinkType",
                    foreignField: "_id",
                    as: "drinkType"
                }
            },
            {
                $unwind: "$drinkType"
            },
            {
                $match: {
                    "drinkType.drink": "Coffee",
                    process: true
                }
            }
        ]).toArray();

        const numberOfCoffeeOrders = result.length;
        const moneyRaised = numberOfCoffeeOrders * 0.5;
        console.log(`Dinero recuadado = ${moneyRaised}`);
        res.json({result, moneyRaised});

        client.close;
    } catch (error) {
        res.status(404).json("Data not found");
    }
});

router.get('/Teas', async(req, res) => {
    try {
        const client = new MongoClient(database);
        await client.connect();
        const dataBase = client.db(nameDB);
        const collection = dataBase.collection('Orders');
        const result = await collection.aggregate([
            {
                $lookup: {
                    from: "drinkType",
                    localField: "drinkType",
                    foreignField: "_id",
                    as: "drinkType"
                }
            },
            {
                $unwind: "$drinkType"
            },
            {
                $match: {
                    "drinkType.drink": "Tea",
                    process: true
                }
            }
        ]).toArray();
        const numberOfTeaOrders = result.length;
        const moneyRaised = numberOfTeaOrders * 0.4;
        console.log(`Dinero recuadado = ${moneyRaised}`);
        res.json({result, moneyRaised});
        client.close;
    } catch (error) {
        res.status(404).json("Data not found");
    }
});

router.get('/Chocolates', async(req, res) => {
    try {
        const client = new MongoClient(database);
        await client.connect();
        const dataBase = client.db(nameDB);
        const collection = dataBase.collection('Orders');
        const result = await collection.aggregate([
            {
                $lookup: {
                    from: "drinkType",
                    localField: "drinkType",
                    foreignField: "_id",
                    as: "drinkType"
                }
            },
            {
                $unwind: "$drinkType"
            },
            {
                $match: {
                    "drinkType.drink": "Chocolate",
                    process: true
                }
            }
        ]).toArray();
        const numberOfChocolateOrders = result.length;
        const moneyRaised = numberOfChocolateOrders * 0.6;
        console.log(`Dinero recuadado = ${moneyRaised}`);
        res.json({result, moneyRaised});
        client.close;
    } catch (error) {
        res.status(404).json("Data not found");
    }
});


module.exports = router;