const { Categories } = require('../models')

const paginationCategories = async (req, res) => {}

const addCategory = async (req, res) => {
    try {
        const newCategory = new Categories(req.body)
        await newCategory.save()
        res.status(201).json({ success: true, data: newCategory })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add the category',
        })
    }
}

const getCategoriesByField = async (req, res) => {
    try {
        const foundCategories = await Categories.find(req.body)
        res.status(201).json({success: true, data: foundCategories})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to add the category',
        })
    }
}

const getCategoryById = async (req, res) => {
    try {
        const foundCategory = await Categories.findOne({ _id: req.params.id })
        res.status(200).json({ success: true, data: foundCategory })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const udpateCategoryById = async (req, res) => {
    try {
        const updatedCategory = await Categories.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )

        if (!updatedCategory)
            return res
                .status(400)
                .json({ success: false, message: 'Category not found' })
        res.status(200).json({
            success: true,
            data: updatedCategory,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const deleteCategoryById = async (req, res) => {
    try {
        const deletedCategory = await Categories.findOneAndDelete({
            _id: req.params.id,
        })
        res.json({ success: true, data: deletedCategory })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ success: false, message: 'Internal server error' })
    }
}

module.exports = {
    addCategory,
    paginationCategories,
    getCategoriesByField,
    getCategoryById,
    udpateCategoryById,
    deleteCategoryById,
}
