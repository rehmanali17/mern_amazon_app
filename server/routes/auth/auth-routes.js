const router = require('express').Router()
const { check } = require('express-validator')
const { Signup, Login } = require('../../controllers/auth/auth-controller')


router.post('/signup',[
    check('username', 'Enter a valid username').notEmpty(),
    check('name', 'Enter a valid name').notEmpty(),
    check('password', 'Enter a 6 digits alphanumeric password').isLength({
        min: 6
    }),
],Signup)

router.post('/login',[
    check('username','Enter a valid username').notEmpty(),
    check('password','Enter a 6 digits alphanumeric password').isLength({
        min: 6
    }),
], Login )

module.exports = router