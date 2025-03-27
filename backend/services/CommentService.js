const Comment = require("../models/CommentModel")
const mongoose = require("mongoose")

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

            const comment = await Comment.create({
                articleId,
                userId: String(userId),
                content
            })

            resolve({
                status: "OK",
                message: "Comment added successfully",
                data: comment,
            })
        } catch (e) {
            reject({
                status: "ERR",
                message: "Server error",
                error: e.message
            })
        }
    })
}

const getCommentsByPost = async (articleId) => {
    try {
        if (!articleId) {
            return {
                status: "ERR",
                message: "Post ID is required",
            }
        }


        const articleObjectId = mongoose.Types.ObjectId.isValid(articleId)
            ? new mongoose.Types.ObjectId(articleId)
            : articleId

        const comments = await Comment.aggregate([
            { $match: { articleId: articleObjectId } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "userId",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    articleId: 1,
                    content: 1,
                    createdAt: 1,
                    pending: 1,
                    userId: "$user.userId",
                    fullName: { $ifNull: ["$user.fullName", "Unknown User"] },
                    imageUrl: { $ifNull: ["$user.imageUrl", "default-avatar.jpg"] }
                }
            }
        ])


        return {
            status: "OK",
            message: "Fetched comments successfully",
            data: comments
        }
    } catch (e) {
        return { status: "ERR", message: e.message }
    }
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

const updateComment = (commentId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!commentId) {
                return resolve({
                    status: "ERR",
                    message: "Comment ID is required",
                })
            }

            const checkComment = await Comment.findById(commentId)
            if (!checkComment) {
                return resolve({
                    status: "ERR",
                    message: "Comment not found",
                })
            }

            const updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                data,
                { new: true }
            )

            resolve({
                status: "OK",
                message: "Comment updated successfully",
                data: updatedComment
            })
        } catch (e) {
            reject({
                status: "ERR",
                message: e.message
            })
        }
    })
}

const getAllComments = async () => {
    try {
        const comments = await Comment.find()
            .populate({
                path: 'userId',
                model: 'User',
                select: 'fullName imageUrl',
                localField: 'userId',
                foreignField: 'userId'
            })
            .populate('articleId', 'title imageUrl')
            .sort({ createdAt: -1 })
        return {
            status: "OK",
            message: "Fetched comments successfully",
            data: comments
        }
    } catch (e) {
        throw e
    }
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment,
    updateComment,
    getAllComments
}
