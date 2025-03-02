const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
// const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware')

router.post('/login', userController.loginUser)
router.get('/getdetailsuser/:id', userController.getDetailsUser)

module.exports = router