const Comment = require("../models/CommentModel")
const mongoose = require("mongoose")
const Article = require("../models/ArticleModel")
const { getIO } = require('../socket')

const createComment = (newComment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { articleId, userId, content, fullName, imageUrl, pending, parentId } = newComment

            if (!articleId || !userId || !content) {
                return resolve({
                    status: "ERR",
                    message: "Missing required fields",
                })
            }

            const comment = await Comment.create({
                articleId,
                userId: String(userId),
                content,
                fullName,
                imageUrl,
                pending,
                parentId: parentId || null
            })

            if (parentId) {
                await Comment.findByIdAndUpdate(parentId, {
                    $push: { replies: comment._id }
                })
            }

            if (pending == false) {
                await Article.findByIdAndUpdate(articleId, {
                    $inc: { commentCount: 1 }
                })
            }

            const io = getIO()
            io.emit('comment_added', {
                articleId: articleId,
                comment: comment
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
                    parentId: 1,
                    replies: 1,
                    userId: "$user.userId",
                    fullName: { $ifNull: ["$user.fullName", "Unknown User"] },
                    imageUrl: { $ifNull: ["$user.imageUrl", "default-avatar.jpg"] }
                }
            }
        ])

        const commentMap = {};
        const rootComments = [];

        comments.forEach(comment => {
            commentMap[comment._id.toString()] = {
                ...comment,
                replies: []
            };
        });

        comments.forEach(comment => {
            if (comment.parentId) {
                const parentComment = commentMap[comment.parentId.toString()];
                if (parentComment) {
                    parentComment.replies.push(commentMap[comment._id.toString()]);
                }
            } else {
                rootComments.push(commentMap[comment._id.toString()]);
            }
        });

        return {
            status: "OK",
            message: "Fetched comments successfully",
            data: rootComments
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

            const comment = await Comment.findById(commentId)
            if (!comment) {
                return resolve({
                    status: "ERR",
                    message: "Comment not found",
                })
            }

            let approvedRepliesCount = 0;
            if (comment.replies && comment.replies.length > 0) {
                const replies = await Comment.find({ _id: { $in: comment.replies } });
                approvedRepliesCount = replies.filter(reply => !reply.pending).length;
            }

            if (comment.parentId) {
                await Comment.findByIdAndUpdate(comment.parentId, {
                    $pull: { replies: commentId }
                });
            }

            if (comment.replies && comment.replies.length > 0) {
                await Comment.deleteMany({ _id: { $in: comment.replies } });
            }

            await Comment.findByIdAndDelete(commentId)

            if (!comment.pending) {
                await Article.findByIdAndUpdate(comment.articleId, {
                    $inc: { commentCount: -(1 + approvedRepliesCount) }
                })
            }

            const io = getIO()
            io.emit('comment_removed', {
                articleId: comment.articleId,
                commentId: commentId
            })

            resolve({
                status: "OK",
                message: "Comment deleted successfully",
            })
        } catch (e) {
            reject(e)
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
            .populate('parentId', 'content')
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

const approveComment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const comment = await Comment.findByIdAndUpdate(id, { pending: false }, { new: true })
            if (!comment) {
                resolve({
                    status: 'ERR',
                    message: 'Comment not found'
                })
                return
            }

            await Article.findByIdAndUpdate(comment.articleId, {
                $inc: { commentCount: 1 }
            })

            const io = getIO()
            io.emit('comment_updated', {
                articleId: comment.articleId,
                comment: comment
            })

            resolve({
                status: 'OK',
                message: 'Approve comment success',
                data: comment
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment,
    getAllComments,
    approveComment
}
