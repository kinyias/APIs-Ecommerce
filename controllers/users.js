const { Users } = require('../models')

const paginationUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const searchQuery = req.query.search || ''

    try {
        // Calculate the skip value
        const skip = (page - 1) * limit

        // Build the search condition using regular expression for case-insensitive search
        const searchCondition = {
            email: { $regex: searchQuery, $options: 'i' },
        }

        // Fetch paginated users, total count, and total pages from the database
        const [users, totalUsers] = await Promise.all([
            Users.find(searchCondition).skip(skip).limit(limit),
            Users.countDocuments(searchCondition),
        ])

        // Calculate total pages
        const totalPages = Math.ceil(totalUsers / limit)

        // Send the paginated users as the API response
        res.status(200).json({
            success: true,
            data: users,
            currentPage: page,
            totalPages: totalPages,
            limit: limit,
        })
    } catch (err) {
        console.error('Error fetching paginated users:', err)
        res.status(500).json({
            success: false,
            message: 'Error fetching paginated users',
        })
    }
}

const getUsersByField = async (req, res) => {
    try {
        const foundUsers = await Users.find(req.body)
        res.status(200).json({ success: true, data: foundUsers })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server errror',
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const foundUser = await Users.findOne({ _id: req.params.id }).select(
            '-password -isAdmin -refreshToken'
        )
        if (!foundUser)
            return res
                .status(400)
                .json({ success: false, message: 'Cannot find user' })
        res.status(200).json({ success: true, data: foundUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const updateUserById = async (req, res) => {
    try {
        const updatedUser = await Users.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )

        if (!updatedUser)
            return res
                .status(400)
                .json({ success: false, message: 'User not found' })
        res.status(200).json({
            success: true,
            data: updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await Users.findOneAndDelete({
            _id: req.params.id,
            user: req.userId,
        }).select('-password -isAdmin -refreshToken')
        res.json({ success: true, data: deletedUser })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ success: false, message: 'Internal server error' })
    }
}

const deleteUserByIds = async (req, res) => {
    try {
        let newArr = []
        const array = req.params.ids.split(',')
        array.forEach((e) => {
            if (!newArr.includes(e)) {
                newArr.push(e)
            }
        })
        const deletedUser = await Users.deleteMany({
            _id: { $in: newArr },
            user: req.userId,
        })
        res.json({ success: true, data: deletedUser })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ success: false, message: 'Internal server error' })
    }
}

module.exports = {
    getUsersByField,
    getUserById,
    updateUserById,
    deleteUserById,
    deleteUserByIds,
    paginationUser,
}
