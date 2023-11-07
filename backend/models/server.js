const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.js')

class Server {
    constructor(){
        this.app = express();
        this.coffeeMachinePath = '/CoffeeMachine'
        this.port = process.env.port;
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.coffeeMachinePath, require('../routes/order.routes.js'))
        this.app.use(this.coffeeMachinePath, require('../routes/other.routes.js'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`SERVER RUNNING ON PORT : ${this.port}`);
        })
    }
}


module.exports = Server;

