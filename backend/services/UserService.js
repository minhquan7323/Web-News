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

module.exports = {
    loginUser,
    getDetailsUser,
    updateUser,
    getAllUser
}