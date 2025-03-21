const User = require('../models/UserModel')

const loginUser = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId, imageUrl, fullName, isAdmin = false } = userData

            if (!userId || !fullName || !imageUrl) {
                return reject({
                    status: "ERR",
                    message: "the input is required"
                })
            }

            let user = await User.findOne({ userId })

            if (!user) {
                user = new User({ userId, imageUrl, fullName, isAdmin })
                await user.save()
                return resolve({
                    status: "OK",
                    message: "create new user success",
                    user
                })
            }

            resolve({
                status: "OK",
                message: "Login success",
                user
            })

        } catch (e) {
            reject({
                status: "ERR",
                message: "Lỗi server",
                error: e.message
            })
        }
    })
}

const getDetailsUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ userId: userId })

            if (user === null) {
                return resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ userId: userId })
            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            const updateUser = await User.findOneAndUpdate({ userId }, data, { new: true })

            resolve({
                status: 'OK',
                message: 'Update user success',
                data: updateUser
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const addWatchLater = (userId, articleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOneAndUpdate(
                { userId: userId },
                { $addToSet: { watchLater: articleId } },
                { new: true }
            )

            if (!user) {
                return reject({
                    status: "ERR",
                    message: "User not found"
                })
            }

            resolve({
                status: "OK",
                message: "Added to watch later",
                data: user
            })
        } catch (error) {
            reject({
                status: "ERR",
                message: "Server error",
                error: error.message
            })
        }
    })
}

const removeWatchLater = (userId, articleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOneAndUpdate(
                { userId: userId },
                { $pull: { watchLater: articleId } },
                { new: true }
            )

            if (!user) {
                return reject({
                    status: "ERR",
                    message: "User not found"
                })
            }

            resolve({
                status: "OK",
                message: "Removed from watch later",
                data: user
            })
        } catch (error) {
            reject({
                status: "ERR",
                message: "Server error",
                error: error.message
            })
        }
    })
}

const getWatchLater = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ userId: userId })
                .populate({
                    path: 'watchLater',
                    select: 'title description imageUrl author type read createdAt updatedAt'
                })

            if (!user) {
                return reject({
                    status: "ERR",
                    message: "User not found"
                })
            }

            resolve({
                status: "OK",
                message: "Get watch later list successfully",
                data: user.watchLater
            })
        } catch (error) {
            reject({
                status: "ERR",
                message: "Server error",
                error: error.message
            })
        }
    })
}

module.exports = {
    loginUser,
    getDetailsUser,
    updateUser,
    getAllUser,
    addWatchLater,
    removeWatchLater,
    getWatchLater
}