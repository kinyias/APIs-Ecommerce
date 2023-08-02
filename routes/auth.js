const { authController } = require('../controllers')
module.exports = function (router) {
    /**
     * POST /api/v1/login
     * @desc Authentification
     */
    router.post('/v1/login', authController.login)

    /**
     * POST /api/v1/register
     * @desc Create Account
     */
    router.post('/v1/register', authController.register)
    /**
     * POST /api/v1/refreshToken
     * @desc Get refeshToken JWT
     */
    router.post('/v1/refreshToken', authController.refreshToken)
    /**
     * GET /api/v1/logout
     * @desc Logout user
     */
    router.get('/v1/logout', authController.logout)
}
