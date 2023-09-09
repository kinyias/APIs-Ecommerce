const { newsController } = require('../controllers')
const { verifyTokenUser, verifyTokenAdmin } = require('../middleware')
module.exports = function (router) {
     /* POST /api/v1/new
     * @desc Add new
     */
    router.post(
        '/v1/new',
        verifyTokenAdmin,
        newsController.addNew
    )

    /**
     * GET /api/v1/news?page=1&limit=10&search=shoes
     * @desc Search pagination news
     */
    router.get(
        '/v1/categories',
        verifyTokenAdmin,
        newsController.paginationNews
    )

    /**
     * GET /api/v1/news
     * @desc Get news by field
     */
    router.get(
        '/v1/categories',
        verifyTokenUser,
        newsController.getNewsByField
    )
    /**
     * GET /api/v1/new
     * @desc Get new by id
     */
    router.get(
        '/v1/new/:id',
        verifyTokenUser,
        newsController.getNewById
    )

    /**
     * PUT /api/v1/new/:id
     * @desc Update new by id
     */
    router.put(
        '/v1/new/:id',
        verifyTokenAdmin,
        newsController.udpateNewById
    )
    /**
     * DELETE /api/v1/new/:id
     * @desc Update new by id (only admin can delete category)
     */
    router.delete(
        '/v1/new/:id',
        verifyTokenAdmin,
        newsController.deleteNewById
    )
}
