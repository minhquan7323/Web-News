const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/CategoryController')
// const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware')

router.post('/create', categoryController.createCategory)
router.put('/update/:id', categoryController.updateCategory)
router.get('/getall', categoryController.getAllCategory)
router.get('/details/:id', categoryController.getDetailsCategory)
router.delete('/delete/:id', categoryController.deleteCategory)

module.exports = router