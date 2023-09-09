const { News } = require('../models')

const paginationNews = async (req, res) => {}

const addNew = async (req, res) => {
    try {
        const newNew = new News(req.body)
        await newNew.save()
        res.status(201).json({ success: true, data: newNew })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add the new',
        })
    }
}

const getNewsByField = async (req, res) => {
    try {
        const foundNews = await News.find(req.body)
        res.status(201).json({success: true, data: foundNews})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to get the news',
        })
    }
}

const getNewById = async (req, res) => {
    try {
        const foundNew = await News.findOne({ _id: req.params.id })
        res.status(200).json({ success: true, data: foundNew })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const udpateNewById = async (req, res) => {
    try {
        const updatedNew = await Categories.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )

        if (!updatedNew)
            return res
                .status(400)
                .json({ success: false, message: 'New not found' })
        res.status(200).json({
            success: true,
            data: updatedNew,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const deleteNewById = async (req, res) => {
    try {
        const deletedNew = await Users.findOneAndDelete({
            _id: req.params.id,
        })
        res.json({ success: true, data: deletedNew })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ success: false, message: 'Internal server error' })
    }
}

module.exports = {
    addNew,
    paginationNews,
    getNewsByField,
    getNewById,
    udpateNewById,
    deleteNewById,
}
