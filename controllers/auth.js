const { Users } = require('../models')
const bcrypt = require('bcrypt')
const { generateJWTToken, decodeToken } = require('../utils/auth')

const register = async (req, res) => {
    const { email, password, firstname, lastname, phone } = req.body

    //Validation
    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing email or password',
        })
    try {
        //Check for existing user
        const user = await Users.findOne({ email })

        if (user)
            return res.status(400).json({
                success: false,
                message: 'Email already taken',
            })

        //All good
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new Users({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            phone,
        })
        newUser.save()

        //Return token
        const token = generateJWTToken(newUser)

        //Update user refresh token
        await Users.findOneAndUpdate(
            { _id: newUser._id },
            { refreshToken: token.refreshToken }
        )

        res.cookie('JWT', token.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 10, // 1d
        })

        res.status(200).json({
            success: true,
            message: 'User created successfuly',
            accessToken: token.accessToken,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    //validation
    if (!email || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing email or password' })
    try {
        //Check for user
        const user = await Users.findOne({ email })
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect email' })
        // User found
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect password' })
        // All good
        //Return token
        const token = generateJWTToken(user)

        //Update user refresh token
        await Users.findOneAndUpdate(
            { _id: user._id },
            { refreshToken: token.refreshToken }
        )

        res.cookie('JWT', token.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 10, // 1d
            secure: true,
            sameSite: 'None',
        })

        res.status(200).json({
            success: true,
            message: 'Logged in successfuly',
            user: user,
            accessToken: token.accessToken,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const refreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.JWT) return res.sendStatus(401) //Unauthorized
    const refreshToken = cookies.JWT

    //Find user match refreshToken
    const user = await Users.findOne({ refreshToken })
    if (!user) return res.sendStatus(403) //Forbidden

    //Handle refreshToken and return accessToken
    try {
        const decode = decodeToken(refreshToken)
        if (user._id != decode.userId) return res.sendStatus(403)

        //refreshToken verify and return accessToken
        const accessToken = generateJWTToken(user).accessToken
        res.status(200).json({ success: true, accessToken })
    } catch (error) {
        console.log(error)
        res.status(403).json({
            success: false,
            message: 'Your session login expired',
        })
    }
}

const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.JWT) return res.sendStatus(204)
    const refreshToken = cookies.JWT

    //Find user match refreshToken
    const user = await Users.findOne({ refreshToken })
    if (!user) {
        res.clearCookie('JWT', { httpOnly: true })
        return res.sendStatus(204)
    }
    //Delete refreshToken in database
    await Users.findOneAndUpdate({ refreshToken }, { refreshToken: '' })
    res.clearCookie('JWT', { httpOnly: true })
    res.sendStatus(204)
}
module.exports = {
    login,
    register,
    refreshToken,
    logout,
}
