const { Users } = require('../models')

const getUserById = async (req, res) => {
    try {
        const foundUser = await Users.findOne({ _id: req.params.id }).select('-password -isAdmin')
        if (!foundUser)
            return res
                .status(400)
                .json({ success: false, message: 'Cannot find user' })
        res.status(200).json({success:true, data: foundUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

module.exports = {
    getUserById,
}
