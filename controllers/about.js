const { About } = require('../models')

const addAbout = async (req, res) => {
    const { title, content } = req.body
    if (!title || !content)
        return res.status(400).json({
            success: false,
            message: 'Missing title or content',
        })
    try {
        const newAbout = new About({
            title,
            content,
        })
        await newAbout.save()
        res.status(201).json({ success: true, data: newAbout })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Failed to add about' })
    }
}

const getAboutById = async (req, res) => {
    try {
        const foundAbout = await About.findOne({ _id: req.params.id })
        if (!foundAbout)
            return res
                .status(400)
                .json({ success: false, message: 'About can not found' })
        res.status(200).json({ success: true, data: foundAbout })
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message:'Failed to get about'})
    }
}

const deleteAboutById = async (req,res)=>{
    try {
        const deletedAbout = await About.findOneAndDelete({
            _id: req.params.id,
        })
        res.json({ success: true, data: deletedAbout })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ success: false, message: 'Failed to delete about' })
    }
}

module.exports = {
    addAbout,
    getAboutById,
    deleteAboutById
}
