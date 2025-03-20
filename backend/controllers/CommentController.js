const CommentService = require("../services/CommentService")

const createComment = async (req, res) => {
    try {
        const response = await CommentService.createComment(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

const getCommentsByPost = async (req, res) => {
    try {
        const { articleId } = req.params
        const response = await CommentService.getCommentsByPost(articleId)

        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const response = await CommentService.deleteComment(commentId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const response = await CommentService.updateComment(commentId, req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment,
    updateComment
}
