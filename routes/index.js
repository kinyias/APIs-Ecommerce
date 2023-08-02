const fs = require('fs')
const path = require('path')

/**
 * Dynamically load routes
 * */
const InitRoutes = (express, server) => {
    const apiRouter = express.Router() // Route api for the front for client
    server.use('/api', apiRouter, (req, res, next) =>
        next(new Error('Api not found'))
    )
    loadDynamicRoutes(apiRouter) // Load API routes
}

/**
 * Dynamically load all routes from the routes folder
 */
const loadDynamicRoutes = (router) => {
    console.log('Routes : Loading...')
    const pathToRoutes = './routes'
    const date = Date.now()
    const allRoutes = fs
        .readdirSync(pathToRoutes)
        .filter(
            (file) =>
                file !== path.basename(__filename) ||
                path.extname(file) !== '.js'
        )
    allRoutes.forEach((file) => {
        require(`./${file}`)(router)
    })
    const time = (Date.now() - date) / 1000
    console.log(
        `Routes : Loaded in %s${time}%s%s`,
        '\x1b[33m',
        '\x1b[0m',
        '\x1b[32m \u2713 \x1b[0m'
    )
}

module.exports = {
    InitRoutes,
    loadDynamicRoutes,
}
