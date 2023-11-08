# Coffee Machine Backend

For the realization of the Backend part of this project I took into account the following sections:

- [Section 1: Initiation of the project ](#section1)
- [Section 2: Connecting to the server](#section2)
- [Section 3: Creating and Connecting to the Database](#section3)
- [Section 4: Model Creation](#section4)
- [Section 5: Controller Creation](#section5)
- [Section 6: Route Creation](#section6)
- [Section 7: Middlewares and Validations](#section7)


## Section 1: Initiation of the project

The first thing I did was to create a carperta **COFFEE MACHINE**, which is the father caperta. Next, the **backend** folder was created, which is where all the API was made.

Once the folders are created, the **"package.json"** is started and all the npm we need are downloaded.

```terminal
    npm init -y
```

```terminal
    npm i express dotenv mongoose mongodb express-validator jsonwebtoken
```

```terminal
    npm i -D nodemon
```

In the **"package.json"** file, the correct "script" was appended for its successful initiation in the terminal.

```terminal
    "dev": "nodemon app.js",
```


## Section 2: Connecting to the server

In the "Models" folder the file "server.js" was created who is in charge of making the connection to the server.

A class called "Server" was made where the "constructor" was started where the variables were added, including the port, the middlewares and the routes.

For the port, outside the models folder, the ".env" file was created where the variable "PORT" was defined and then called.

Then we applied the express "listen" function, to be able to send a message to the console that the connection was working.

Finally the file "server.js" is exported, to be able to import it in a file "app.js" that is created inside the "backend" folder, this file, as seen in the script in Section 1, is the one that is going to be traversed. Where the "dotenv" configurations are also imported, the Server class is instantiated and started listening so that it finally works on the terminal.


## Section 3: Creating and Connecting to the Database

You can see a folder called "database", where there are two files, in "config.js" the process is carried out to be able to bring the path of the MongoDB Atlas database, where an environment variable is also established in the file ".env". 

The other file is as such some examples of data that can be sent to the database, a collection called "Orders", where are the data of each of the orders requested by customers, and the other collection "drinkType", where the types of drinks are, this was done separately in order to facilitate the implementation of new drinks later.

In the "server.js" file, the necessary variables were called to successfully connect to the database. In the following image you can see the database model used.

<img src="./database/Database Coffee Machine.png">


## Section 4: Model Creation

The models of the "Orders" and "drinkType" collections were created where the following business parameters were met:

- drinkType
    - Type: string
    - Required: true
    - Description: Type of drink
    - Values: tea, coffee, chocolate

- money
    - Type: float
    - Required: true
    - Description: Amount of money given by the user in unit of currency

- sugars
    - Type: int
    - Required: false
    - Description: Number of sugars
    - Values: 0, 1, 2
    - Default: 0

- extrahot
    - Type: boolean
    - Required: false
    - Description: Flag indicating if the user wants extra hot drink
    - Values: true, false
    - Default: false

- List of prices
    -   Tea: 0.4
    -   Coffee: 0.5
    -   Chocolate: 0.6

These models were exported, to then work in the controller, in this case only controller was used for the "Orders" collection, since the "drinkType" model is needed because in the "Orders" collection, this variable is a "ObjectId".

## Section 5: Controller Creation



## Section 6: Route Creation



## Section 7: Middlewares and Validations