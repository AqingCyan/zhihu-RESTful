/**
 * This is routing management under user (/user/xxx)
 */
const Router = require('koa-router')
const koaJWT = require('koa-jwt')
const { secret } = require('../../config')
const { find, findById, create, update, delete: deleteUser, login } = require('../controllers/users')
const checkOwner = require('../../middlewares/userAuthorization')

/**
 * This is my own implementation of the simple authentication and authorization middleware：
 *
 * const userAuthMiddleWare = require('../../middlewares/userAuthentication')
 *
 * router.patch('/:id', userAuthMiddleWare, checkOwner, update)
 * router.delete('/:id', userAuthMiddleWare, checkOwner, deleteUser)
 */

const router = new Router({ prefix: '/users' })
const auth = koaJWT({ secret })

/**
 * Get user list
 * Create one user
 * Queries specify user information
 * Change specify user information
 * Delete specify user
 * User login
 */
router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/:id', auth, checkOwner, update)
router.delete('/:id', auth, checkOwner, deleteUser)
router.post('/login', login)

module.exports = router
