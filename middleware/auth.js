const { decodeToken } = require('../utils/auth')

const verifyTokenUser = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' })
    try {
        const decode = decodeToken(token)

        req.userId = decode._id
        next()
    } catch (error) {
        console.log(error)
        return res
            .status(403)
            .json({ success: false, message: 'Invalid token' })
    }
}

const verifyTokenAdmin = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' })
    try {
        const decode = decodeToken(token)

        req.info = decode.info
        next()
    } catch (error) {
        console.log(error)
        return res
            .status(403)
            .json({ success: false, message: 'Invalid token' })
    }
}

module.exports = {
    verifyTokenUser,
    verifyTokenAdmin,
}
