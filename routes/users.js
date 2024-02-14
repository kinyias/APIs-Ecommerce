const { usersController } = require('../controllers')
const { verifyTokenUser, verifyTokenAdmin } = require('../middleware')
module.exports = function (router) {
    /**
     * GET /api/v1/users?page=1&limit=10&search=shoes
     * @desc Search pagination users
     */
    router.get('/v1/users', usersController.paginationUser)

    /**
     * POST /api/v1/users
     * @desc Get user by field
     */
    router.post('/v1/users', usersController.getUsersByField)

    /**
     * POST /api/v1/user/:id
     * @desc Get information user by id
     */
    router.get('/v1/user/:id', verifyTokenUser, usersController.getUserById)

    /**
     * POST /api/v1/user/:field/:value
     * @desc Get information user by field
     */

    /**
     * PUT /api/v1/user/:id
     * @desc Update information user by id
     */
    router.put('/v1/user/:id', verifyTokenUser, usersController.updateUserById)
    /**
     * DELETE /api/v1/user/:id
     * @desc Update information user by id (only admin can delete user)
     */
    router.delete(
        '/v1/user/:id',
        verifyTokenAdmin,
        usersController.deleteUserById
    )

    /**
     * DELETE /api/v1/user/:ids
     * @desc Update information user by id (only admin can delete user)
     */
    router.delete(
        '/v1/user/:ids',
        verifyTokenAdmin,
        usersController.deleteUserByIds
    )
}
