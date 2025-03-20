const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
// const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware')

router.post('/login', userController.loginUser)
router.get('/details/:id', userController.getDetailsUser)
router.put('/update/:id', userController.updateUser)
router.get('/getall', userController.getAllUser)

module.exports = router