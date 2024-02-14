const { categoriesController } = require('../controllers')
const { verifyTokenUser, verifyTokenAdmin } = require('../middleware')
module.exports = function (router) {
    /**
     * POST /api/v1/category
     * @desc Add category
     */
    router.post(
        '/v1/category',
        verifyTokenAdmin,
        categoriesController.addCategory
    )

    /**
     * GET /api/v1/categories?page=1&limit=10&search=shoes
     * @desc Search pagination categories
     */
    router.get(
        '/v1/categories',
        verifyTokenAdmin,
        categoriesController.paginationCategories
    )

    /**
     * GET /api/v1/categories
     * @desc Get categories by field
     */
    router.get(
        '/v1/categories',
        verifyTokenUser,
        categoriesController.getCategoriesByField
    )
    /**
     * GET /api/v1/category
     * @desc Get category by id
     */
    router.get(
        '/v1/category/:id',
        verifyTokenUser,
        categoriesController.getCategoryById
    )

    /**
     * PUT /api/v1/category/:id
     * @desc Update category by id
     */
    router.put(
        '/v1/category/:id',
        verifyTokenAdmin,
        categoriesController.udpateCategoryById
    )
    /**
     * DELETE /api/v1/category/:id
     * @desc Update category by id (only admin can delete category)
     */
    router.delete(
        '/v1/category/:id',
        verifyTokenAdmin,
        categoriesController.deleteCategoryById
    )
}
