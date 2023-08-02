const { userController } = require('../controllers')
const { verifyTokenUser } = require('../middleware')
module.exports = function (router) {
    /**
     * POST /api/v1/user/
     * @desc Get all information user
     */
    // router.post('v1/user/', userController.login)
    /**
     * POST /api/v1/user/:id
     * @desc Get information user by id
     */
    // router.get('v1/user/',(req,res)=>{
    //   res.send('heelo')
    // })
    router.get('/v1/user/:id', verifyTokenUser, userController.getUserById)
}
