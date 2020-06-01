/**
 * This is routing management under user (/user/xxx)
 */
const Router = require('koa-router')
const { find, findById, create, update, delete: deleteUser, login } = require('../controllers/users')

const router = new Router({ prefix: '/users' })

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
router.patch('/:id', update)
router.delete('/:id', deleteUser)
router.post('/login', login)

module.exports = router
