const jwt = require('jsonwebtoken')

const generateJWTToken = (user) => {
    return {
        accessToken: jwt.sign(
            {
                userId: user._id,
                info: {
                    _id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
            },
            process.env.SECRET_KEY_JWT,
            { expiresIn: '300s' }
        ),
        refreshToken: jwt.sign(
            {
                userId: user._id,
                info: {
                    _id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
            },
            process.env.SECRET_KEY_JWT,
            { expiresIn: '1d' }
        ),
    }
}

const decodeToken = (token) => {
    const decode = jwt.verify(token, process.env.SECRET_KEY_JWT)
    return decode
}

module.exports = {
    generateJWTToken,
    decodeToken,
}
