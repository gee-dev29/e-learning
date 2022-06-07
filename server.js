const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const multer = require("multer")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const {success, error} = require("consola")
require("dotenv").config()
const myRoute = require("./route/route")

const apiDocConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "e-learning",
            version: "1.0.0"
        },
    },
    apis: ['./route/route.js']
}

const openapiSpec = swaggerJsdoc(apiDocConfig) 

//initialize express
const app = express()

//middleware
app.use(cors())
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())
//app.use(bcrypt())

//connecting to a database
mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true})
    .then((result)=> success({message: "Database Connected", badge: true }))
    .catch((err) => error({message: "Unable to connect to database.", badge: true}))

//route middleware
app.use(myRoute)
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(openapiSpec))

    //listening to a server with a port
app.listen(process.env.PORT, ()=>{
    success({message: `Server running on PORT ${process.env.PORT}` , badge: true })
})
