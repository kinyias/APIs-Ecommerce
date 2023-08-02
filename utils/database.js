const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const getMongdbVersion = async () => {
    try {
        const mongoVersion = await mongoose.connection.db.admin().buildInfo()
        console.log(
            `%s@@ MongoDB version : ${mongoVersion.version}%s`,
            '\x1b[32m',
            '\x1b[0m'
        )
    } catch (e) {
        console.error('MongoDB version : Unknow')
    }
}

module.exports = {
    connectDB,
    getMongdbVersion,
}
