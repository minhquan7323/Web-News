const express = require('express')
const router = express.Router()
const articleController = require('../controllers/ArticleController')
// const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware')

router.post('/create', articleController.createArticle)
router.put('/update/:id', articleController.updateArticle)
router.get('/details/:id', articleController.detailsArticle)
router.delete('/delete/:id', articleController.deleteArticle)
router.get('/getall', articleController.allArticle)
router.post('/deletemany', articleController.deleteManyArticles)
router.get('/getalltypearticle', articleController.getAllTypeArticle)

module.exports = router