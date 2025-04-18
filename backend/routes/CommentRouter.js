const express = require('express')
const router = express.Router()
const commentController = require('../controllers/CommentController')
// const { authUserMiddleware, authMiddleware } = require('../middleware/authMiddleware')

router.get('/:articleId', commentController.getCommentsByPost)
router.post('/', commentController.createComment)
router.delete('/:commentId', commentController.deleteComment)
router.put('/:commentId', commentController.approveComment)
router.get('/', commentController.getAllComments)

module.exports = router