require('dotenv').config()
const express = require('express')
var cors = require('cors')
var cookieParser = require('cookie-parser')
const server = express()
const PORT = process.env.PORT || 5000

server.use(express.json())
// server.use(cors())
const corsOptions = {
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000', 'yourwebsite'],
    credentials: true, // Allow credentials
}

server.use(cors(corsOptions))
server.use(cookieParser())

server.get('/', (req, res) => {
    res.send('Welcome to APIs-Ecommerce')
})

require('./routes').InitRoutes(express, server) //Global routes (WARNING: Don't move this line to another function to excute it. It will make u api not found (404) when deloy)

const initDatabase = async () => {
    // DB Layer
    const utilsDB = require('./utils/database')
    await utilsDB.connectDB()
    utilsDB.getMongdbVersion()
}

;(async () => {
    try {
        await initDatabase()
    } catch (error) {
        console.log(error)
        setTimeout(() => process.exit(1), 2000)
    }
})()

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
