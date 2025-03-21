const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
// const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware')

router.post('/login', userController.loginUser)
router.get('/details/:id', userController.getDetailsUser)
router.put('/update/:id', userController.updateUser)
router.get('/getall', userController.getAllUser)
router.post('/add-watch-later', userController.addWatchLater)
router.post('/remove-watch-later', userController.removeWatchLater)
router.get('/watch-later/:id', userController.getWatchLater)

module.exports = router