const Comment = require("../models/CommentModel")

const createComment = (newComment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { articleId, userId, content } = newComment
            if (!articleId || !userId || !content) {
                return resolve({
                    status: "ERR",
                    message: "Missing required fields",
                })
            }

            const comment = await Comment.create({ articleId, userId, content })

            resolve({
                status: "OK",
                message: "Comment added successfully",
                data: comment,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getCommentsByPost = (articleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!articleId) {
                return resolve({
                    status: "ERR",
                    message: "Post ID is required",
                })
            }

            const comments = await Comment.find({ articleId }).populate("userId")

            resolve({
                status: "OK",
                message: "Fetched comments successfully",
                data: comments,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteComment = (commentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!commentId) {
                return resolve({
                    status: "ERR",
                    message: "Comment ID is required",
                })
            }

            await Comment.findByIdAndDelete(commentId)

            resolve({
                status: "OK",
                message: "Comment deleted successfully",
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment,
}
