const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')
// const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware')

router.post('/create', ArticleController.createArticle)

module.exports = router